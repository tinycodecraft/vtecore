using Mapster;
using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using vteCore.ErrorOr;
using vteCore.Extensions;
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
        public IActionResult Token(QM.TokenProps input)
        {
            var userid = HttpContext.Session.Get<String>(Sessions.USERID);
            var refresh = HttpContext.Session.Get<String>(Sessions.REFRESHTOKEN);
            if(refresh == input.RefreshToken && !string.IsNullOrEmpty(input.RefreshToken))
            {
                var user = UserMap.FromModel(new QM.LoginProps { UserName = userid });
                input.Token = tokenService.CreateToken(user);
                input.RefreshToken = TokenService.GenerateRefreshToken();
                return Ok((ErrorOr<QM.TokenProps>)input);
            }
            return Ok((ErrorOr<QM.TokenProps>) Error.Failure(description:"Token does not match!!"));
        }

        [HttpPost]
        public IActionResult Login(QM.LoginProps login)
        {
            var user = UserMap.FromModel(login);
            var token = tokenService.CreateToken(user);
            var refresh = TokenService.GenerateRefreshToken();
            HttpContext.Session.Set<String>(Sessions.USERID, user.UserId);
            HttpContext.Session.Set<String>(Sessions.REFRESHTOKEN, refresh);

            var result = (ErrorOr<RM.UserResult>) new RM.UserResult(user.UserName, token, refresh);

            return Ok(result);
        }
    }
}
