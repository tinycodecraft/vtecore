import { DefaultProps } from '@mantine/core'
import React, { useCallback } from 'react'
import { ManControlBtn } from './mnControlBtn'
import { DyExporticon } from '@/components/dyExporticon'

interface ExportControlProps {
  clickHandler: (event: React.MouseEvent<HTMLButtonElement>) => void
  tooltip: string
  label: string
}

export function ExportControl({ className, clickHandler, tooltip, label }: DefaultProps & ExportControlProps) {
  return (
    <ManControlBtn onClick={clickHandler} tooltip={tooltip} className={className}>
      <DyExporticon label={label} />
    </ManControlBtn>
  )
}
