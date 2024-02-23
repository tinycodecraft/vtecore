using Mapster;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Specialized;
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

        [Authorize]
        [HttpGet]
        public IActionResult GetModel(string id)
        {
            var user = userService.Get(id) as UserMap;
            if(user == null)
            {
                return Ok((ErrorOr<UserMap>)Error.Failure(code: "GetUser", description: "user id could not be located!"));
            }
            return Ok((ErrorOr<UserMap>)user);
        }

        [Authorize]
        [HttpPost]
        public IActionResult List(EM.MantineTableProps query)
        {
            var result = userService.List(query);

            if(result.data==null)
            {
                return Ok((ErrorOr<RM.UserListResult>)Error.Failure(code: "UserList",description: "user list could not be generated!"));
            }
            var errwrapresult = (ErrorOr<RM.UserListResult>)result;
            return Ok(errwrapresult);
        }

        [HttpPost]
        public IActionResult Token(QM.TokenProps input)
        {
            var userid = HttpContext.Session.GetStr(Sessions.USERID);
            var refresh = HttpContext.Session.GetStr(Sessions.REFRESHTOKEN);
            if(refresh == input.RefreshToken && !string.IsNullOrEmpty(input.RefreshToken))
            {
                var user = new UserMap {  UserName = userid};
                input.Token = tokenService.CreateToken(user);
                input.RefreshToken = TokenService.GenerateRefreshToken();
                return Ok((ErrorOr<QM.TokenProps>)input);
            }
            return Ok((ErrorOr<QM.TokenProps>) Error.Failure(description:"Token does not match!!"));
        }
        [Authorize]
        [HttpPost]
        public IActionResult ChangePassword(QM.LoginProps login)
        {
            if(login.NewPassword!=login.ConfirmPassword)
            {
                return Ok(Error.Failure(code: nameof(FieldType.confirmPassword), description: $"the retyped new password not matched").ToErrorOr<RM.ChangePasswordResult>());

            }
            var byuser = HttpContext.Session.GetStr(Sessions.USERID);
            var changed = userService.ChangePassword(login.UserName, login.NewPassword, byuser, login.Password);
            if(!changed)
            {
                return Ok(Error.Failure(code: nameof(FieldType.newPassword), description: $"the old password not matched ").ToErrorOr<RM.ChangePasswordResult>());
            }
            return Ok((ErrorOr<RM.ChangePasswordResult>)new RM.ChangePasswordResult(login.UserName));
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
                var result = (ErrorOr<RM.UserResult>)new RM.UserResult(user.UserName, token, refresh,user.IsDataAdmin,user.IsDivisionAdmin,user.IsControlAdmin);
                return Ok(result);
            }
            else
            {
                return Ok(Error.Failure(code: nameof(FieldType.password), description: $"the password is invalid!").ToErrorOr<RM.UserResult>());
            }
        }
    }
}
