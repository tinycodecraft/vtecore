using Microsoft.Extensions.Logging;
using System.Collections.Specialized;
using System.Text.Json;
using vteCore.Shared.Models;
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

        public IUser Get(string id)
        {
            var user = db.DFAUsers.FirstOrDefault(e => e.UserId == id || e.UserName == id);
            if (user!=null)
            {
                var map = UserMap.FromModel(user);
                return map;
            }
            return null;
        }

        public bool Save(IUser user)
        {
            var founduser = db.DFAUsers.FirstOrDefault(e => e.UserId == user.UserId);
            var map = user as UserMap;
            if(map!=null && founduser!=null)
            {
                map.ToModel(founduser);
            }
            return false;
        }

        public RM.UserListResult List(EM.MantineTableProps query)
        {
            try
            {
                var nv = new NameValueCollection();
                
                foreach(var filter in  query.Filtering)
                {
                    var value = (string)filter.Value.ToString();
                    if (value == null)
                        continue;
                    var isarray = value.StartsWith("[");
                    var valueobjs = isarray ? JsonSerializer.Deserialize<object[]>(value) : new object[]{ JsonSerializer.Deserialize<object>(filter.Value)};
                    value = valueobjs![0] !=null ? valueobjs![0]!.ToString() : null;
                    


                    var filterIds = new string[] { filter.Id.PascaltoCamel(true), filter.Id };

                    nv = filterIds switch
                    {
                        var x when x.Contains(nameof(DFAUser.UserId)) => nv.AddQueryParam(db.DFAUsers, x => x.UserId, value),
                        var x when x.Contains(nameof(DFAUser.UserName)) => nv.AddQueryParam(db.DFAUsers, x => x.UserName, value),
                        var x when x.Contains(nameof(DFAUser.loginedAt)) =>
                        
                        nv.AddQueryParam(db.DFAUsers, x=> x.loginedAt, valueobjs[0]?.ToString(), Op.greaterThanOrEqual)
                        .AddQueryParam(db.DFAUsers, x => x.loginedAt, valueobjs[1]?.ToString(), Op.lessThanOrEqual)
                         ,
                        var x when x.Contains(nameof(DFAUser.IsControlAdmin)) =>
                        nv.AddQueryParam(db.DFAUsers, x => x.IsAdmin, value, Op.equal)
                        .AddQueryParam(db.DFAUsers, x => x.AdminScope,bool.Parse(value ?? "False") ? "Full": null, Op.equal),
                        _ => nv,

                    };



                }

                var result = db.GetSearch<DFAUser>(nv);
                
                var sorter = new SortDescription[] { }.ToList();
                foreach(var sort in query.Sorting)
                {
                    var sortby = new SortDescription { PropertyName = sort.Id, Direction = sort.Desc ? System.ComponentModel.ListSortDirection.Descending : System.ComponentModel.ListSortDirection.Ascending };
                    sorter.Add(sortby);
                }

                if(sorter.Count > 0)
                {
                    result= result.BuildOrder(sorter.ToArray());
                }
                var total_count = result.Count();
                var new_start = query.Start + query.Size;
                return
                    new RM.UserListResult
                    {
                        data = result.Skip(query.Start).Take(query.Size).ToList().Select(e => (IUser)e).ToArray(),
                        total_count = total_count,
                        start = total_count > new_start ? new_start : total_count
                    };
            }
            catch (Exception ex)
            {
                logger.LogError(ex, ex.Message);
            }
            return new RM.UserListResult {  total_count = 0, data = null, start = 0};

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