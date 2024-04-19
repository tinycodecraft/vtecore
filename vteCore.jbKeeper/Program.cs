// See https://aka.ms/new-console-template for more information
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging.Configuration;
using Microsoft.Extensions.Logging.EventLog;
using Serilog;
using vteCore.jbKeeper;
using vteCore.Shared.Tools;
using static vteCore.Shared.Constants;

Console.WriteLine("Hello, World!");

Directory.SetCurrentDirectory(AppDomain.CurrentDomain.BaseDirectory);

var environment = Environment.GetEnvironmentVariable("DOTNET_ENVIRONMENT");
var configuration = new ConfigurationBuilder()
    .AddJsonFile($"appsettings.json", true, true)
    .AddJsonFile($"appsettings.{environment}.json", true, true)
    .AddEnvironmentVariables();
var configurationRoot = configuration.Build();


Log.Logger = new LoggerConfiguration().ReadFrom.Configuration(configurationRoot).CreateBootstrapLogger();

var builder = Host.CreateApplicationBuilder(args);
builder.Services.AddWindowsService(options =>
{
    options.ServiceName = "Service Core Job Keeper";
    
});

builder.Services.AddSerilog(Log.Logger);
//using targetframework windows to remove the compiler warning
LoggerProviderOptions.RegisterProviderOptions<
    EventLogSettings, EventLogLoggerProvider>(builder.Services);

var authsetting = builder.Configuration.GetSection(Setting.AuthSetting);
var pathsetting = builder.Configuration.GetSection(Setting.PathSetting);
var templatesetting = builder.Configuration.GetSection(Setting.TemplateSetting);
var encryptionService = new StringEncrypService();
authsetting[nameof(EM.AuthSetting.Secret)] = encryptionService.EncryptString(authsetting[nameof(EM.AuthSetting.SecretKey)] ?? "");
pathsetting[nameof(EM.PathSetting.Base)] = Directory.GetCurrentDirectory();
builder.Services.Configure<EM.AuthSetting>(authsetting);
builder.Services.Configure<EM.PathSetting>(pathsetting);
builder.Services.Configure<EM.TemplateSetting>(templatesetting);

builder.Services.AddHostedService<JobKeeper>();



IHost host = builder.Build();

host.Run();