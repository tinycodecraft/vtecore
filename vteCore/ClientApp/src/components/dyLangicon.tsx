import { IconLanguageOff,IconLanguage } from '@tabler/icons-react'
import React from 'react'

interface dyLangProps {
  isTranslate: boolean
}

export const DyLangicon = ({ isTranslate }: dyLangProps) => {
  return (
    <div role="button" className="btn btn-ghost btn-circle">
      <div className="indicator">
        {!isTranslate && <IconLanguageOff />}
        {isTranslate && <IconLanguage />}
        <span className="badge badge-sm indicator-item bg-transparent border-none">{isTranslate ? 'ZH' : 'EN'}</span>
      </div>
    </div>
  )
}

