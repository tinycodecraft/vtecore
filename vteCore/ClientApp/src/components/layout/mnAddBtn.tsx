import { DefaultProps } from '@mantine/core'
import React, { useCallback } from 'react'
import { ManControlBtn } from './mnControlBtn'
import { DyAddicon } from '../dyAddicon'

interface AddControlProps {
  clickHandler: (event: React.MouseEvent<HTMLButtonElement>) => void
  tooltip: string
  label: string
}

export function AddControl({ className, clickHandler, tooltip, label }: DefaultProps & AddControlProps) {
  return (
    <ManControlBtn onClick={clickHandler} tooltip={tooltip} className={className}>
      <DyAddicon label={label} />
    </ManControlBtn>
  )
}
