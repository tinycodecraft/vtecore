using Microsoft.AspNetCore.SignalR;
using System.Collections.Concurrent;

namespace vteCore.Woker
{
    public abstract class ResultObrHub: Hub
    {
        private readonly ConcurrentDictionary<string, IDisposable> _observerList = new();

        protected abstract IDisposable OnSubscribe(ISingleClientProxy client, string connectionid);

        public Task Subscribe()
        {
            var id = Context.ConnectionId;
            if(_observerList.ContainsKey(id))
            {
                var client = Clients.Client(id);
                if(client != null) {

                    var subscription = OnSubscribe(client, id);
                    _observerList[id] = subscription;
                }
            }
            return Task.CompletedTask;
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
