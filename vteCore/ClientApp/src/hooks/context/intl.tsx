import { useContext, useEffect, useState } from 'react'
import { IntlProvider as Provider } from 'react-intl'
import type { PropsWithChildren } from 'react'
import LanguageContext from '@/hooks/context/lang'
import enUS from '@/constants/locales/en-US'
import zhHK from '@/constants/locales/zh-HK'

// import { useLayout } from '../layouts'

export default function IntlProvider({ children }: PropsWithChildren<any>) {
  // const [{ locale }] = useLayout()
  const { locale} = useContext(LanguageContext)
  const [message, setMessage] = useState(enUS)

  
  useEffect(() => {
    console.log(`lan provider called! with ${locale}`)
    if(locale === 'en-US')
    {
      setMessage(enUS)
    }
    else {
      setMessage(zhHK)
    }

  }, [locale])

  return (
    <Provider messages={message} defaultLocale="en-US" locale={locale ?? 'en-US'} >
      {children}
    </Provider>
  )
}
