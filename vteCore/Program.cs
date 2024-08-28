using DocumentFormat.OpenXml.Spreadsheet;
using MediatR;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Http.Features;
using Microsoft.AspNetCore.Mvc.Infrastructure;
using Microsoft.AspNetCore.WebSockets;
using Microsoft.Extensions.FileProviders;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using Net6_Controller_And_VIte;
using Org.BouncyCastle.Pqc.Crypto.Lms;
using Serilog;
using System.Text;
using System.Text.Json.Serialization;
using vteCore.dbService;
using vteCore.Extensions;
using vteCore.Middleware;
using vteCore.Shared;
using vteCore.Woker;
var corsPolicyName = "AllowAll";

Log.Logger = new LoggerConfiguration().MinimumLevel.Override("Microsoft", Serilog.Events.LogEventLevel.Information)
    .Enrich.FromLogContext()
    .WriteTo.Console()
    .CreateBootstrapLogger();

var builder = WebApplication.CreateBuilder(new WebApplicationOptions
{
    Args = args,
    ApplicationName = typeof(Program).Assembly.FullName,
    ContentRootPath = Directory.GetCurrentDirectory(),

    //EnvironmentName =  Environments.Development,
    WebRootPath = "ClientApp/dist"
});

//setting configurations

var authsetting = builder.Configuration.GetSection(Setting.AuthSetting);
var pathsetting = builder.Configuration.GetSection(Setting.PathSetting);
var templatesetting = builder.Configuration.GetSection(Setting.TemplateSetting);
var CorsPolicy = builder.Configuration.GetSection(Setting.CorsPolicySetting).Get<EM.CorsPolicySetting>();
var encryptionService = new StringEncrypService();
authsetting[nameof(EM.AuthSetting.Secret)] = encryptionService.EncryptString(authsetting[nameof(EM.AuthSetting.SecretKey)] ?? "");
pathsetting[nameof(EM.PathSetting.Base)] = Directory.GetCurrentDirectory();
builder.Services.Configure<EM.AuthSetting>(authsetting);
builder.Services.Configure<EM.PathSetting>(pathsetting);
builder.Services.Configure<EM.TemplateSetting>(templatesetting);
builder.Services.Configure<EM.CorsPolicySetting>(builder.Configuration.GetSection(Setting.CorsPolicySetting));



builder.Services.Configure<FormOptions>(opt =>
{
    //opt.BufferBodyLengthLimit = 512 * 1024 * 1024;

    //it needs
    opt.MultipartBodyLengthLimit = 512 * 1024 * 1024;

});

builder.Services.Configure<IISServerOptions>(opt =>
{
    opt.MaxRequestBodySize = 512 * 1024 * 1024;

});

//Setup DB Context
builder.Services.AddDbContext<BFAContext>();


builder.Services.AddTransient<ProblemDetailsFactory, CustomProblemDetailsFactory>();

builder.Host.UseSerilog((ctx, srv, cfg) =>
{

    cfg
    .ReadFrom.Configuration(ctx.Configuration)
    .ReadFrom.Services(srv);


});

builder.Services.AddMapster();

builder.Services.AddScoped<TokenService, TokenService>();
builder.Services.AddScoped<IFileService, FileService>();

builder.Services.AddScoped<IUserService, UserService>();

builder.Services.AddHostedService<TracerService>();

//try to add cors
builder.Services.AddCorsConfig(corsPolicyName, CorsPolicy!);

//Add SignalR
builder.Services.AddSignalR(hubOptions =>
{
    hubOptions.KeepAliveInterval = TimeSpan.FromSeconds(15);
    hubOptions.HandshakeTimeout = TimeSpan.FromSeconds(15);
    hubOptions.EnableDetailedErrors = true;
});


// Add services to the container.
builder.Services.AddControllers().AddJsonOptions(opt =>
{
    opt.JsonSerializerOptions.ReferenceHandler = ReferenceHandler.IgnoreCycles;
});

// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();



// Add Brotli/Gzip response compression (prod only)
builder.Services.AddResponseCompressionConfig(builder.Configuration);

builder.Services.AddSwaggerGen(option =>
{
    option.SwaggerDoc("v1", new OpenApiInfo { Title = "vteCore React", Version = "v1" });

    option.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
    {
        In = ParameterLocation.Header,
        Description = "Please enter a valid token",
        Name = "Authorization",
        Type = SecuritySchemeType.Http,
        BearerFormat = "JWT",
        Scheme = "Bearer"
    });

    option.AddSecurityRequirement(new OpenApiSecurityRequirement
    {
        {
            new OpenApiSecurityScheme
            {
                Reference = new OpenApiReference
                {
                    Type=ReferenceType.SecurityScheme,
                    Id="Bearer"
                }
            },
            new string[]{}
        }
    });
});


//Try to add Jwt setup

builder.Services
        .AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    //.AddAuthentication(option =>
    //{
    //    option.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    //    option.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;

    //})    
    .AddJwtBearer(options =>
    {

        options.TokenValidationParameters = new TokenValidationParameters()
        {
            ClockSkew = TimeSpan.Zero,
            ValidateIssuer = true,
            ValidateAudience = true,
            ValidateLifetime = true,
            ValidateIssuerSigningKey = true,
            ValidIssuer = authsetting[nameof(EM.AuthSetting.Issuer)],
            ValidAudience = authsetting[nameof(EM.AuthSetting.Audience)],
            IssuerSigningKey = new SymmetricSecurityKey(
                Encoding.UTF8.GetBytes(authsetting[nameof(EM.AuthSetting.Secret)] ?? "")
            ),

        };
        options.Events = new JwtBearerEvents()
        {

            OnAuthenticationFailed = (context) =>
            {
                if(context.Exception.GetType()== typeof(SecurityTokenExpiredException))
                {
                    var broker= context.HttpContext.RequestServices.GetRequiredService<ISender>();
                    
                }
                
                var requestContent = new StringBuilder();
                requestContent.AppendLine("=== Error happens to Request Info ===");
                requestContent.AppendLine($"method = {context.Request.Method.ToUpper()}");
                requestContent.AppendLine($"path = {context.Request.Path}");

                requestContent.AppendLine("-- headers");
                foreach (var (headerKey, headerValue) in context.Request.Headers)
                {
                    requestContent.AppendLine($"header = {headerKey} value = {headerValue}");
                }
                Log.Logger.Error(context.Exception, $"{requestContent.ToString()} get JWT Auth error at path {context.Request.Path}");

                return Task.CompletedTask;


            },
            OnMessageReceived = context =>
            {
                var accessToken = context.Request.Query["access_token"];

                var path = context.HttpContext.Request.Path;
                if (!string.IsNullOrEmpty(accessToken) &&
                    path.StartsWithSegments("/signalr"))
                {
                    context.Token = accessToken;
                }

                return Task.CompletedTask;
            }
        };

    });


//Try to add session
builder.Services.AddDistributedMemoryCache();

builder.Services.AddSession(options =>
{
    options.IdleTimeout = TimeSpan.FromDays(1);
    options.Cookie.HttpOnly = true;
    options.Cookie.IsEssential = true;
    options.Cookie.Name = ".vteCore.Session";
});

//MediatR + Other Hub Gateways

builder.Services.AddSingleton(typeof(IResultGateway<>),typeof(ModelResultGateway<>));

builder.Services.AddMediatR(cfg => cfg.RegisterServicesFromAssemblyContaining<Interfaces>());

// In production, the Vite files will be served from this directory
builder.Services.AddSpaStaticFiles(configuration =>
{
    configuration.RootPath = "ClientApp/dist";
});

//builder.Services.AddHsts(options =>
//{
//    options.Preload = true;
//    options.IncludeSubDomains = true;
//    options.MaxAge = TimeSpan.FromDays(60);
//    options.ExcludedHosts.Add("example.com");
//    options.ExcludedHosts.Add("www.example.com");
//});

//builder.Services.AddHttpsRedirection(options =>
//{
//    options.RedirectStatusCode =307; //temporaryredirect
//    options.HttpsPort = 5001;
//});


var app = builder.Build();


if(app.Environment.IsDevelopment())
{
    app.UseApiExceptionHandling();
    //HSTS Middleware(UseHsts) to send HTTP Strict Transport Security Protocol (HSTS) headers to clients.
    //app.UseHsts();

}
else
{
    app.UseResponseCompression();
}



if (string.IsNullOrEmpty(CorsPolicy?.Name))
{
    app.UseCors(corsPolicyName);
}
else
{
    app.UseCors(CorsPolicy.Name);
}


// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

//add enrich parameter for each logging request
app.UseSerilogRequestLogging(option =>
{
    option.EnrichDiagnosticContext = (diagnostic, http) =>
    {
        diagnostic.Set("LocalTime", DateTime.Now.ToString("yyyyMMdd+HHmmss"));

    };
});

//HTTPS Redirection Middleware (UseHttpsRedirection) to redirect HTTP requests to HTTPS.
app.UseHttpsRedirection();

//var options = new DefaultFilesOptions();
//options.DefaultFileNames.Clear();
//options.DefaultFileNames.Add("index.html");
//app.UseDefaultFiles(options);

app.UseStaticFiles();

//app.UseStaticFiles(new StaticFileOptions
//{
//    FileProvider = new PhysicalFileProvider(
//           Path.Combine(app.Environment.ContentRootPath, "ClientApp", "dist")),
//    RequestPath = ""
//});
app.UseSpaStaticFiles();


app.UseRouting();

//*Jwt enabled for auth*/
app.UseAuthentication();
app.UseAuthorization();

app.UseSession();
// setup routes
//app.MapHub<ResultBrokerHub>("/signalr/resultbroker");
//app.MapControllers();
app.UseEndpoints(cfg =>
{
    cfg.MapControllers();
    cfg.MapHub<ResultBrokerHub>("/signalr/resultbroker");
});

app.UseSpa(spa =>
{
    if (app.Environment.IsDevelopment())
        spa.UseViteDevelopmentServer(sourcePath: "ClientApp");
});

app.MapFallbackToFile("index.html");

app.Run();
