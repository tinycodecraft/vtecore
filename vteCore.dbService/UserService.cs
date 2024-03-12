using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
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
        private readonly TemplateSetting templateOps;
        private readonly PathSetting pathOps;
        public UserService(ILogger<IUserService> log,BFAContext ctx,IOptions<TemplateSetting> tpstg,IOptions<PathSetting> pthstg)
        {
            logger = log;
            db = ctx;
            templateOps = tpstg.Value;
            pathOps = pthstg.Value;
            
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

        public bool Remove(string ids)
        {
            try
            {
                if(!string.IsNullOrEmpty(ids))
                {
                    var idlist = ids.ItSplit(",").Where(e=> PropsExtensions.IsInteger(e)).Select(e=> int.Parse(e)).ToArray();
                    var removeUsers = db.DFAUsers.Where(e=> idlist.Contains(e.Id)).ToList();
                    foreach( var user in removeUsers )
                    {
                        user.Disabled = true;
                        db.Entry(user).State = Microsoft.EntityFrameworkCore.EntityState.Modified;
                        
                    }
                    db.SaveChanges();
                    return true;
                }

            }
            catch(Exception ex) {
                logger.LogError(ex, ex.Message);
            }

            return false;
        }


        public bool Save(IUser user)
        {
            try {
                var founduser = db.DFAUsers.FirstOrDefault(e => e.UserId == user.UserId);
                var map = user as UserMap;
                
                if (map != null )
                {
                    var isnew = founduser == null && map.Id == 0;
                    if (isnew)
                        founduser = new DFAUser();
                    if(founduser != null)
                    {
                        map.ToModel(founduser);
                        if(isnew)
                        {
                            db.DFAUsers.Add(founduser);
                            var hasher = new PasswordHasher();
                            founduser.EncPassword = hasher.HashPassword(Setting.DefaultPassword);
                            founduser.IsReset = true;
                            db.Entry(founduser).State = Microsoft.EntityFrameworkCore.EntityState.Added;

                        }
                        else
                        {
                            db.Entry(founduser).State = Microsoft.EntityFrameworkCore.EntityState.Modified;
                        }

                        
                        db.SaveChanges();
                        return true;
                    }


                }
                logger.LogDebug($"the user {user.UserId} could not be found for updating!");
                return false;

            }
            catch(Exception ex)
            {
                logger.LogError(ex, ex.Message);
            }

            return false;
        }

        public RM.LinkResult Export(EM.MantineTableProps query)
        {
            try
            {
                query.Start = 0;
                query.Size = db.DFAUsers.Count();
                var dataresult = List(query).data.ToList();
                var datatable = ExcelHelper.ListToDataTable(dataresult.Select(e => UserMap.FromModel((DFAUser)e)).ToList(),true);
                var exportfile = SubStringExtensions.GetPath(pathOps, PathType.Share, "excel", "User" + "User".RandomString() + ".xlsm");
                var templatefile = SubStringExtensions.GetPath(pathOps, PathType.Template, "excel", templateOps.User);
                var error = ExcelHelper.CreateExcelFromDt(datatable, templatefile, exportfile);
                if(!string.IsNullOrEmpty(error))
                {
                    logger.LogDebug(error);
                    return null;
                }
                //Please use "Share." prefix for the type argument , otherwise, Upload path will be used for Stream.
                var apipath = SubStringExtensions.GetPath(pathOps,PathType.Stream,"Share.excel",Path.GetFileName(exportfile));
                return new RM.LinkResult("excel", apipath);

            }
            catch(Exception ex)
            {
                logger.LogError(ex, ex.Message);
            }
            return null;
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
                var allRecords = query.WithDisabled == null || query.WithDisabled.Value;
                if(!allRecords)
                {
                    nv.AddQueryParam(db.DFAUsers,x=> x.Disabled, false.ToString(), Op.equal);
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