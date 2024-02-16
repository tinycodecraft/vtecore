import { FC, Fragment, PropsWithChildren, useEffect, useRef } from 'react'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { store, persistor } from '@/hooks'
import { PersistGate } from 'redux-persist/integration/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { canWait } from '@/utils/methods'
import { SignalRApi } from '@/api/signalr.service'
import { HubConnectionState } from '@microsoft/signalr'

const AppProvider: FC<PropsWithChildren> = ({ children }) => {
  const query = new QueryClient()

  const signalrState = useRef<HubConnectionState>()
  useEffect(() => {
    const connect = async () => {
      await canWait(250)
      // await SignalRApi.initConnection()
      if (!signalrState || !signalrState.current) {
        console.log(`the hub state ${SignalRApi.signalrState}`)
        if (SignalRApi.signalrState !== HubConnectionState.Connected) {
          await SignalRApi.initConnection()

          signalrState.current = SignalRApi.signalrState
        }
      }
    }
    connect()
  }, [])

  return (
    <Fragment>
      <BrowserRouter>
        <QueryClientProvider client={query}>
          <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
              {children}
            </PersistGate>
          </Provider>
        </QueryClientProvider>
      </BrowserRouter>
    </Fragment>
  )
}

export default AppProvider
