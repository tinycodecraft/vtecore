using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace vteCore.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly ILogger<AuthController> logger;
        private readonly ISender sender;
        public AuthController(ILogger<AuthController> log, ISender send) { 

            logger = log;
            sender = send;
        }

        [HttpPost]
        public IActionResult Login(QM.LoginProps login)
        {

            return Ok(login);
        }
    }
}
