import { FunctionComponent } from 'react'
import AppProvider from './components/provider'
import RouterComponent from '@/constants/routes'
import Layout from '@/components/layout/mnContainer'
import LanguageProvider from '@/hooks/context/intl'
import '@/assets/scss/site.scss'

const DemoApp: FunctionComponent = () => {
  return (
    <Layout>
      <LanguageProvider>
        <AppProvider>
          <RouterComponent />
        </AppProvider>
      </LanguageProvider>
    </Layout>
  )
}

export default DemoApp
