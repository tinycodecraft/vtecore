import { ComponentProps, FC, Fragment, FunctionComponent, StrictMode, PropsWithChildren } from 'react'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { store, persistor } from '@/hooks'
import { PersistGate } from 'redux-persist/integration/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const AppProvider: FC<PropsWithChildren> = ({ children }) => {
  const query = new QueryClient()
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
