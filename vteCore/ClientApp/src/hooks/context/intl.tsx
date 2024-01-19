import enUS from '@/constants/locales/en-US'
import { useEffect, useState } from 'react'
import { IntlProvider as Provider } from 'react-intl'
import type { PropsWithChildren } from 'react'
// import { useLayout } from '../layouts'

export default function IntlProvider({ children }: PropsWithChildren<any>) {
  // const [{ locale }] = useLayout()
  const locale = 'en-US'
  const [message, setMessage] = useState(enUS)

  useEffect(() => {
    import(`../locales/${locale}.ts`).then((module) => {
      setMessage(module.default)
    })
  }, [locale])

  return (
    <Provider messages={message} defaultLocale="en-US" locale="en-US">
      {children}
    </Provider>
  )
}
