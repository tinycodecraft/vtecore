import React, { PropsWithChildren, SetStateAction, createContext, useState } from 'react'
interface LangContextProps {
  locale: string
  setLocale: (value: SetStateAction<string>) => void
}
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
