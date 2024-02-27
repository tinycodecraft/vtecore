using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Linq.Dynamic.Core;
using vteCore.ErrorOr;
using vteCore.Extensions;
using vteCore.Shared.Models;
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
        public async Task<IActionResult> GetLabels(string type)
        {
            switch (type)
            {
                case nameof(LabelType.UserLevel):
                    var result = await new[] { new DescProps { value= $"{5}", label = UI.NAME_USER_ENDAUDOR },
                    new DescProps{ value ="6", label = UI.NAME_USER_AUDITOR},
                    new DescProps{ value = "8", label = UI.NAME_USER_ENDDRAFTER},
                    new DescProps{ value = "9",label = UI.NAME_USER_ENDORSER},
                    new DescProps{ value = "18",label = UI.NAME_USER_DRAFTER}}.ToDynamicArrayAsync<DescProps>();
                    return Ok((ErrorOr<DescProps[]>)result);
                    
            }

            var emptyresult = await Task.FromResult(new DescProps[] { });
            return Ok((ErrorOr<DescProps[]>)emptyresult);
        }

        [Authorize]
        [HttpGet]
        public async Task<IActionResult> GetWeathers()
        {
            // connectionId is required for distribute the message against particular observer
            // because the gateway will delivery with key = "{connectionid}:{method}" , value = data
            var connectionid = HttpContext.GetConnectionId();

            _logger.LogInformation($"connection {connectionid} is received for Getting Weather Forecast!");
            
            var result= await broker.Send(new UM.RqWeatherForcast { ConnectionId = connectionid });

            _logger.LogInformation($"connection {connectionid} has got result from broker");

            return Ok(result);
        }

        [HttpGet]
        public string GetBackendMessage() => "This is message from backend";
    }
}