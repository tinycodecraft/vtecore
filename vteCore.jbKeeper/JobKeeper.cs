using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace vteCore.jbKeeper
{
    public sealed class JobKeeper: BackgroundService
    {
        private readonly ILogger<JobKeeper> log;
        protected override async Task ExecuteAsync(CancellationToken stoppingToken)
        {
            try
            {
                while (!stoppingToken.IsCancellationRequested)
                {
                    log.LogInformation("the job keeper is still alive!");

                    await Task.Delay(TimeSpan.FromSeconds(10),stoppingToken);
                }

            }
            catch (OperationCanceledException)
            {

            }
            catch(Exception ex)
            {
                log.LogError(ex, ex.Message);
                // Terminates this process and returns an exit code to the operating system.
                // This is required to avoid the 'BackgroundServiceExceptionBehavior', which
                // performs one of two scenarios:
                // 1. When set to "Ignore": will do nothing at all, errors cause zombie services.
                // 2. When set to "StopHost": will cleanly stop the host, and log errors.
                //
                // In order for the Windows Service Management system to leverage configured
                // recovery options, we need to terminate the process with a non-zero exit code.
                Environment.Exit(1);
            }
        }
    }
}
