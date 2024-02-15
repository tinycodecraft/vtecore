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
        private readonly IUserService userService;
        public AuthController(ILogger<AuthController> log, ISender send, TokenService tkserv,IUserService usrmgr) { 

            logger = log;
            sender = send;
            tokenService = tkserv;
            userService = usrmgr;
        }

        [HttpPost]
        public IActionResult Token(QM.TokenProps input)
        {
            var userid = HttpContext.Session.GetStr(Sessions.USERID);
            var refresh = HttpContext.Session.GetStr(Sessions.REFRESHTOKEN);
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
            var hasUser = userService.HasUser(login.UserName);
            if (!hasUser)
            {                
                return Ok(Error.Failure(code: nameof(FieldType.userName),description: $"No such user {login.UserName} exist").ToErrorOr<RM.UserResult>());

            }
            var user = userService.Login(login.UserName, login.Password);
            if(user!=null)
            {
                var token = tokenService.CreateToken(user);
                var refresh = TokenService.GenerateRefreshToken();
                HttpContext.Session.SetStr(Sessions.USERID, user.UserId);
                HttpContext.Session.SetStr(Sessions.REFRESHTOKEN, refresh);
                var result = (ErrorOr<RM.UserResult>)new RM.UserResult(user.UserName, token, refresh);
                return Ok(result);
            }
            else
            {
                return Ok(Error.Failure(code: nameof(FieldType.password), description: $"the password is invalid!").ToErrorOr<RM.UserResult>());
            }
        }
    }
}
