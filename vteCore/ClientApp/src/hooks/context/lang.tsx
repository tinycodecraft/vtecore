import { LangContextProps } from '@/constants/types'
import React, { PropsWithChildren, SetStateAction, createContext, useState } from 'react'

const LangContext = createContext<Partial<LangContextProps>>({ locale: 'en-US' })

export const LangProvider = ({ children }: PropsWithChildren) => {
  const [locale, setLocale] = useState<string>('en-US')
  return (
    <LangContext.Provider
      value={{
        locale,
        setLocale,
      }}
    >
      {children}
    </LangContext.Provider>
  )
}

export default LangContext