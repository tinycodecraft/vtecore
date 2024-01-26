using Microsoft.AspNetCore.SignalR;
using Serilog;

namespace vteCore.Woker
{
    public class ModelResultObr<T>: IObserver<KeyValuePair<string, T>>
    {

        private readonly ISingleClientProxy pxyclient;
        private readonly string connectionId;
        

        public ModelResultObr(ISingleClientProxy proxy,string connid)
        {
            pxyclient = proxy;
            connectionId = connid;
            
        }
        public void OnCompleted()
        {
            
        }

        public void OnError(Exception error)
        {
            
        }

        public void OnNext(KeyValuePair<string, T> value)
        {
            try
            {

                var keyparts = value.Key.ItSplit(":").ToArray();
                var method = keyparts.LastOrDefault() ?? value.Key;
                if(keyparts.Length >1 )
                {
                    if (keyparts[0] != connectionId)
                        return;
                }
               pxyclient.SendAsync(method, value.Value);
            }
            catch (Exception ex)
            {
                
                Log.Logger.Error(ex, $"error for client ${value.Key}: {ex.Message}");
            }
        }
    }
}
