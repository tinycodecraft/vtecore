using vteCore.Woker;

namespace vteCore.Extensions
{
    public static class SubscriberExtensions
    {
        public static string GetConnectionId(this HttpContext context)
        {
            var connectionid = context.Session.GetStr(Sessions.CONNECTIONID);

            if (string.IsNullOrEmpty(connectionid) && ResultObrHub.InterChangeSessionWithConn.ContainsKey(context.Connection.Id))
            {
                return ResultObrHub.InterChangeSessionWithConn[context.Connection.Id];
            }
            return connectionid;
        }
    }
}
