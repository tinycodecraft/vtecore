import React, { useCallback, useContext, useState } from 'react'

import { IconLanguage, IconLanguageOff } from '@tabler/icons-react'
import { ManControlBtn } from './mnControlBtn'
import { rem } from '@mantine/core'
import LanguageContext from '@/hooks/context/lang'
import { LangEnum } from '@/constants/types/enums'
import { useEventListener } from '@mantine/hooks'

export function LanguageControl() {
  const [isAlternate, setIsAlternate] = useState(false)
  const { locale, setLocale } = useContext(LanguageContext)

  const langbtnClick = useCallback(async () => {
    if (!isAlternate) {
      setLocale && setLocale(LangEnum.CHINESE)
    } else {
      setLocale && setLocale(LangEnum.DEFAULT)
    }
    setIsAlternate(!isAlternate)
  }, [locale, isAlternate])

  const langbtnRef = useEventListener('click', langbtnClick)

  return (
    <ManControlBtn ref={langbtnRef} tooltip={`${isAlternate ? `Chinese` : `English`} mode`}>
      {isAlternate ? <IconLanguageOff size={rem(22)} stroke={1.5} /> : <IconLanguage size={rem(22)} stroke={1.5} />}
    </ManControlBtn>
  )
}
