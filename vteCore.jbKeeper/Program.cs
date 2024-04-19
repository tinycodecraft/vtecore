// See https://aka.ms/new-console-template for more information
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging.Configuration;
using Microsoft.Extensions.Logging.EventLog;
using Serilog;
using vteCore.jbKeeper;

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

builder.Services.AddSerilog();
//using targetframework windows to remove the compiler warning
LoggerProviderOptions.RegisterProviderOptions<
    EventLogSettings, EventLogLoggerProvider>(builder.Services);

builder.Services.AddHostedService<JobKeeper>();

IHost host = builder.Build();

host.Run();