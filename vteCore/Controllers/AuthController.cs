using Mapster;
using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using vteCore.ErrorOr;
using vteCore.Mappers;

namespace vteCore.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly ILogger<AuthController> logger;
        private readonly ISender sender;
        private readonly TokenService tokenService;
        public AuthController(ILogger<AuthController> log, ISender send, TokenService tkserv) { 

            logger = log;
            sender = send;
            tokenService = tkserv;
        }

        [HttpPost]
        public IActionResult Login(QM.LoginProps login)
        {
            var user = UserMap.FromModel(login);
            var token = tokenService.CreateToken(user);

            var result = (ErrorOr<RM.UserResult>) new RM.UserResult(user.UserName, token, null);

            return Ok(result);
        }
    }
}
