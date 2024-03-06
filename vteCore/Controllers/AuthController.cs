using Mapster;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion.Internal;
using System.Collections.Specialized;
using vteCore.dbService;
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
        [HttpPost]
        public IActionResult SaveModel(UserMap model)
        {
            var val = new UserValidator();
            var errors = val.Validate(model);
            if (errors != null)
            {
                var msgs = errors.Errors.Select(e=> Error.Failure(code: e.PropertyName.PascaltoCamel(), description: e.ErrorMessage)).ToArray();

                return Ok((ErrorOr<string>)msgs);

            }

            
            var okay = userService.Save(model);

            if (okay)
            {
                return Ok((ErrorOr<string>)model.UserName);
            }
            
            return Ok((ErrorOr<string>)Error.Failure(code: nameof(FieldType.saveUser),description: $"fail to save {model.UserName} due to internal error(Please check the log for detail)"));
        }

        [Authorize]
        [HttpGet]
        public IActionResult GetModel(string id)
        {
            var user = userService.Get(id) as UserMap;
            if(user == null)
            {
                return Ok((ErrorOr<UserMap>)Error.Failure(code: nameof(FieldType.getUser), description: "user id could not be located!"));
            }
            return Ok((ErrorOr<UserMap>)user);
        }

        [Authorize]
        [HttpPost]
        public IActionResult Export(EM.MantineTableProps query)
        {
            var result = userService.Export(query);
            if (result == null)
            {
                return Ok((ErrorOr<RM.LinkResult>)Error.Failure(code: nameof(FieldType.userExport), description: "user export could not be generated! please check log for details!"));
            }
            return Ok(result);

        }

        [Authorize]
        [HttpPost]
        public IActionResult List(EM.MantineTableProps query)
        {
            var result = userService.List(query);

            if(result.data==null)
            {
                return Ok((ErrorOr<RM.UserListResult>)Error.Failure(code: nameof(FieldType.userList),description: "user list could not be generated!"));
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
                var user = userService.Get(userid) as IAuthResult;
                
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
                return Ok(Error.Failure(code: nameof(FieldType.confirmPassword), description: $"the retyped new password not matched").ToErrorOr<string>());

            }
            var byuser = HttpContext.Session.GetStr(Sessions.USERID);
            var changed = userService.ChangePassword(login.UserName, login.NewPassword, byuser, login.Password);
            if(!changed)
            {
                return Ok(Error.Failure(code: nameof(FieldType.newPassword), description: $"the old password not matched ").ToErrorOr<string>());
            }
            return Ok((ErrorOr<string>)login.UserName);
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
