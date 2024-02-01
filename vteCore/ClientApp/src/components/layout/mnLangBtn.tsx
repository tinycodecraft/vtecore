import React, { useCallback, useContext, useState } from 'react'
import { ManControlBtn } from './mnControlBtn'
import { DefaultProps, rem } from '@mantine/core'
import LanguageContext from '@/hooks/context/lang'
import { LangEnum } from '@/constants/types/enums'
import { DyLangicon } from '@/components/dyLangicon'

export function LanguageControl({ className }: DefaultProps) {
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

  return (
    <ManControlBtn onClick={langbtnClick} tooltip={`${isAlternate ? `Chinese` : `English`} mode`} className={className}>
      <DyLangicon isTranslate={isAlternate} />
    </ManControlBtn>
  )
}
