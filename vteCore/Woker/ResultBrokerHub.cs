using Microsoft.AspNetCore.SignalR;
using vteCore.Shared;
using vteCore.ErrorOr;
using System.Collections.Concurrent;
using vteCore.Shared.Tools;
using DocumentFormat.OpenXml.Wordprocessing;

namespace vteCore.Woker
{
    public class ResultBrokerHub: ResultObrHub
    {
        private readonly IServiceProvider provider;
        private readonly ILogger<ResultBrokerHub> log;
        private readonly ConcurrentDictionary<string, object> gatewaylist = new();
        public ResultBrokerHub(IServiceProvider serviceProvider, ILogger<ResultBrokerHub> logger)
        {
            provider = serviceProvider;
            log = logger;
            
        }
        private IDisposable? TrySend<T>(ISingleClientProxy proxy, string connectionid,string method)
        {
            var gateway = gatewaylist.ContainsKey(method) ? gatewaylist[method] : null;

            var wrsubscriber = new ModelResultObr<ErrorOr<T>>(proxy, connectionid);
            if (!gatewaylist.ContainsKey(method) || gatewaylist[method] == null)
            {
                var mygateway = provider.GetService<IResultGateway<ErrorOr<T>>>();
                gateway = mygateway;
                if (gateway != null)
                {
                    gatewaylist.TryRemove(method, out _);

                    gatewaylist.TryAdd(method, gateway);
                    log.LogInformation($"the gateway for method {method} created for client {connectionid}");
                }
                else
                {
                    log.LogError($"the gateway for method {method} could not be created for client {connectionid}!");
                }

            }


            var wrsubscription = (gateway as ModelResultGateway<ErrorOr<T>>)?.Subscribe(wrsubscriber);
            if (wrsubscription != null)
            {
                proxy.SendAsync("subscribed", $"Subscribe to {method} for client {connectionid}");
                return wrsubscription;

            }
            log.LogError($"the gateway subscription not completed for client {connectionid} for method {method}");
            return null;
        }
        protected override IDisposable? OnSubscribe(ISingleClientProxy client, string connectionid,string method)
        {
            
            switch (method)
            {
                case HubMethod.weather:
                    return TrySend<IEnumerable<RM.WeatherForcast>>(client, connectionid, method);

                case HubMethod.login:
                    return TrySend<RM.LoginResult>(client, connectionid, method);

                    
            }
            return null;
        }
    }
}
