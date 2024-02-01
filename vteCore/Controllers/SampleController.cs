using MediatR;
using Microsoft.AspNetCore.Mvc;

using vteCore.ErrorOr;

namespace Net6_Controller_And_VIte.Controllers
{
    [ApiController]
    [Route("api/[controller]/[action]")]
    public class SampleController : ControllerBase
    {

        ISender broker;
        private static readonly string[] Summaries = new[]
        {
            "Freezing", "Bracing", "Chilly", "Cool", "Mild", "Warm", "Balmy", "Hot", "Sweltering", "Scorching"
        };

        private readonly ILogger<SampleController> _logger;

        public SampleController(ILogger<SampleController> logger,ISender itbroker)
        {
            _logger = logger;
            broker = itbroker;
        }

        [HttpGet]
        public async Task<IActionResult> GetWeathers()
        {
            var connectionid = HttpContext.Session.Get<string>(Sessions.CONNECTIONID);
            _logger.LogInformation($"connection {connectionid} is received for Getting Weather Forecast!");

            var result= await broker.Send(new SM.RqWeatherForcast { ConnectionId = connectionid });

            _logger.LogInformation($"connection {connectionid} has got result from broker");

            return Ok(result);
        }

        [HttpGet]
        public string GetBackendMessage() => "This is message from backend";
    }
}