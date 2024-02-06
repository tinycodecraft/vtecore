using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

using vteCore.ErrorOr;
using vteCore.Woker;

namespace Net6_Controller_And_VIte.Controllers
{
    [ApiController]
    [Route("api/[controller]/[action]")]
    public class SampleController : ControllerBase
    {

        ISender broker;

        private readonly ILogger<SampleController> _logger;

        public SampleController(ILogger<SampleController> logger,ISender itbroker)
        {
            _logger = logger;
            broker = itbroker;
        }

        [Authorize]
        [HttpGet]
        public async Task<IActionResult> GetWeathers()
        {
            var connectionid = HttpContext.Session.Get<string>(Sessions.CONNECTIONID);
            if (ResultObrHub.InterChangeSessionWithConn.ContainsKey(HttpContext.Connection.Id) && string.IsNullOrEmpty(connectionid))
                connectionid = ResultObrHub.InterChangeSessionWithConn[HttpContext.Connection.Id];
            
            _logger.LogInformation($"connection {connectionid} is received for Getting Weather Forecast!");
            
            var result= await broker.Send(new SM.RqWeatherForcast { ConnectionId = connectionid });

            _logger.LogInformation($"connection {connectionid} has got result from broker");

            return Ok(result);
        }

        [HttpGet]
        public string GetBackendMessage() => "This is message from backend";
    }
}