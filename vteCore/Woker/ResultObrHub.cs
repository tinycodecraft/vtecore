﻿using Microsoft.AspNetCore.SignalR;
using System.Collections.Concurrent;
using static vteCore.Extensions.SessionExtensions;


namespace vteCore.Woker
{
    public abstract class ResultObrHub: Hub
    {
        private readonly ConcurrentDictionary<string, IDisposable> _observerList = new();

        protected abstract IDisposable? OnSubscribe(ISingleClientProxy client, string connectionid,string method);

        public Task<string> Subscribe(string method)
        {
            var id = Context.ConnectionId;
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
            lock (_observerList)
            {
                var httpcontext = Context.GetHttpContext();
                if(httpcontext != null)
                {
                    httpcontext.Session.Set(Sessions.CONNECTIONID, id);
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
