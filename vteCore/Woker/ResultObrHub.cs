using Microsoft.AspNetCore.SignalR;
using System.Collections.Concurrent;
using System.Reflection.Metadata.Ecma335;
using static vteCore.Extensions.SessionExtensions;


namespace vteCore.Woker
{
    public abstract class ResultObrHub: Hub
    {
        public static readonly ConcurrentDictionary<string, string> InterChangeSessionWithConn = new();
        private readonly ConcurrentDictionary<string, IDisposable> _observerList = new();

        public Task<string> GetId() => Task.FromResult(Context.ConnectionId);

        protected abstract IDisposable? OnSubscribe(ISingleClientProxy client, string connectionid,string method);

        public Task<string> Subscribe(string method)
        {
            var id = Context.ConnectionId;
            var sessionId = Context.GetHttpContext()?.Connection.Id;
            if(!string.IsNullOrEmpty(sessionId))
            {
                InterChangeSessionWithConn[sessionId] = id;
            }
            if(!_observerList.ContainsKey(id))
            {
                var client = Clients.Client(id);
                if(client != null) {

                    var subscription = OnSubscribe(client, id,method);
                    if(subscription != null)
                    {
                        _observerList[id] = subscription;
                    }
                    
                }
            }

            return Task.FromResult(id);
        }


        public Task Unsubscribe()
        {
            var id = Context.ConnectionId;
            if(_observerList.TryRemove(id, out var observer))
            {
                observer.Dispose();
            }

            return Task.CompletedTask;
        }
    }
}
