using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace vteCore.Shared
{
    public static class Constants
    {
        public enum AdminScopeType
        {
            Division,
            Archive,
            Full
        }
        public enum FieldType
        {
            userName,
            password,
            confirmPassword,
            newPassword,
        }
        public enum QueryOpType
        {
            Equal,
            StartsWith,
            EndsWith,
            ContainsWith,
            LikesWith,
            NotEq,
            GreaterOrEq,
            LessOrEq,
            Less,
            InListOp,
            OrderBy,
            ThenBy,
        }
        public static class HubMethod
        {
            public const string login = nameof(login);
            public const string expire = nameof(expire);
            public const string weather = nameof(weather);
            public const string register =nameof(register);
            public const string pwdchange = nameof(pwdchange);

        }
        public static class Op
        {

            public const string equal = "eq";
            public const string greaterThanOrEqual = "gte";
            public const string lessThanOrEqual = "lte";
            public const string lessThan = "lt";
            public const string itLikes = "ct";
            public const string Between = "bw";
            public const string BeginWith = "bt";
            public const string EndWith = "et";
            public const string Within = "in";
            public const string CheckListIn = "at";
        }

        public static class Status
        {
            public const string success = nameof(success);
            public const string failure = nameof(failure);  
        }
        public static class Sessions
        {
            public const string REFRESHTOKEN = nameof(REFRESHTOKEN);
            public const string USERID=nameof(USERID);
            public const string CONNECTIONID=nameof(CONNECTIONID);
            
        }

        public static class AuthClaims
        {
            public const string ControlAdminEnabled = nameof(ControlAdminEnabled);
            public const string DataAdminEnabled = nameof(DataAdminEnabled);    
            public const string DivisionAdminEnabled = nameof(DivisionAdminEnabled);
        }

        public static class Setting
        {
            public const string AuthSetting = nameof(AuthSetting);
            public const string PathSetting = nameof(PathSetting);

            public const string CorsPolicySetting = nameof(CorsPolicySetting);

            public const int JWTExpirationInMins = 8 * 30 * 2;
            
        }
    }
}
