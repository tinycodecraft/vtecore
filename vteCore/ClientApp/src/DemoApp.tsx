import { FunctionComponent } from 'react'
import AppProvider from './components/provider'
import RouterComponent from '@/constants/routes'
import '@/assets/scss/site.scss'

const DemoApp: FunctionComponent = () => {
  return (
    <AppProvider>
      <RouterComponent />
    </AppProvider>
  )
}

export default DemoApp