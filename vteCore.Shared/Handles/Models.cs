using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using vteCore.ErrorOr;
using vteCore.Shared;

namespace vteCore.Handles
{
    public static class Models
    {

        public class UserListResult
        {
            public int total_count { get; set; }

            public IEnumerable<IUser> data { get; set; }

            public int start { get; set; }


        }

        public record LinkResult(string Type, string Link);

        public record UserResult(string UserName, string Token, string RefreshToken,bool DataAdminEnabled,bool DivisionAdminEnabled,bool ControlAdminEnabled,bool NeedReset);

        
        
        public class LoginResult
        {
            public string UserName { get; set; }
            public string Password { get; set; }
            public bool? IsNew { get; set; }
        }

        public class ExpireResult
        {

        }
        public class WeatherForcast
        {
            public int Id { get; set; }
            public DateTime RecordDate { get; set; }

            public int TemperatureC { get; set; }

            public int TemperatureF => 32 + (int)(TemperatureC / 0.5556);

            public string? Summary { get; set; }
        }

        
    }


    public static class Requests
    {
        public class RqWeatherForcast : IRqWeatherForcast
        {
            public string ConnectionId { get; set; }    
        }



    }
}
