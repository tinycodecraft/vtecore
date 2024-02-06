using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace vteCore.Handles
{
    public static class Queries
    {

        public class TokenProps
        {
            [JsonPropertyName("token")]
            public string Token { get; set; }
            [JsonPropertyName("refreshToken")]
            public string RefreshToken { get; set; }
        }

        public class LoginProps
        {

            [JsonPropertyName("userName")]
            public string UserName { get; set; }

            [JsonPropertyName("password")]
            public string Password { get; set; }

            [JsonPropertyName("newPassword")]
            public string NewPassword { get; set; }

            [JsonPropertyName("confirmPassword")]
            public string ConfirmPassword { get; set; }

            [JsonPropertyName("forSignup")]
            public bool ForSignup { get; set; }

        }

    }
}
