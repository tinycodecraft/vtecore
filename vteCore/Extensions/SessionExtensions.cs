using Microsoft.AspNetCore.Http;
using System.Text.Json;

namespace vteCore.Extensions
{
    public static class SessionExtensions
    {
        public static void Set<T>(this ISession session, string key, T value)
        {
            session.SetString(key, JsonSerializer.Serialize(value));
        }

        public static T? Get<T>(this ISession session, string key)
        {
            var value = session.GetString(key);

            return value == null ? default : JsonSerializer.Deserialize<T>(value);
        }

        public static void SetStr(this ISession session, string key, string value)
        {
            session.SetString(key, value ?? "");
        }

        public static string GetStr(this ISession session,string key)
        {
            var value = session.GetString(key);
            return value ?? "";

        }
    }
}
