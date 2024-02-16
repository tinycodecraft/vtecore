using Microsoft.Extensions.Logging;
using vteCore.Shared.Tools;

namespace vteCore.dbService
{
    public class UserService:IUserService
    {
        private readonly ILogger<IUserService>  logger;
        private readonly BFAContext db;
        public UserService(ILogger<IUserService> log,BFAContext ctx)
        {
            logger = log;
            db = ctx;
        }

        public bool ChangePassword(string username, string password, string byusername, string oldpassword = null)
        {
            try
            {
                var user = db.DFAUsers.FirstOrDefault(e => e.UserName == username || e.UserId == username);
                if(user==null )
                {
                    return false;
                }
                var ph = new PasswordHasher();
                var encpwd = ph.HashPassword(password);
                if(oldpassword != null)
                {
                    if(user.Disabled)
                    {
                        return false;
                    }

                    if(ph.VerifyHashedPassword(user.EncPassword,oldpassword)!= PasswordVerificationResult.Success)
                    {
                        return false;
                    }
                    user.IsReset = false;
                }
                else
                {
                    user.IsReset = true;
                    user.Disabled = false;

                }

                user.EncPassword = encpwd;
                user.updatedBy = byusername;
                user.updatedAt = DateTime.Now;
                db.Entry(user).State = Microsoft.EntityFrameworkCore.EntityState.Modified;
                db.SaveChanges();
                return true;

            }
            catch (Exception ex)
            {
                logger.LogError(ex, ex.Message);
            }
            return false;
        }

        public IAuthResult? Login(string username, string password)
        {
            var user = db.DFAUsers.FirstOrDefault(e=> e.UserName == username || e.UserId == username);
            var ph = new PasswordHasher();
            
            if (user!=null && ph.VerifyHashedPassword(user.EncPassword,password)== PasswordVerificationResult.Success && !user.Disabled)
            {
                user.loginedAt = DateTime.Now;
                db.Entry(user).State = Microsoft.EntityFrameworkCore.EntityState.Modified;
                db.SaveChanges();

                return user;
            }
                
            return null;

        }

        public bool HasUser(string username)
        {
            var user = db.DFAUsers.FirstOrDefault(e => e.UserName == username || e.UserId == username);
            if(user!=null) return true;

            return false;
        }
    }
}