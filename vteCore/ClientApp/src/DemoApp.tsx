import { FunctionComponent } from 'react'
import AppProvider from './components/provider'
import RouterComponent from '@/constants/routes'
import Layout from '@/components/layout/mnLayout'
import IntlProvider from '@/hooks/context/intl'
import { LangProvider } from '@/hooks/context/lang'
import '@/assets/scss/site.scss'

const DemoApp: FunctionComponent = () => {
  return (
    <AppProvider>
      <LangProvider>
        <IntlProvider>
          <Layout>
            <RouterComponent />
          </Layout>
        </IntlProvider>
      </LangProvider>
    </AppProvider>
  )
}

export default DemoApp
