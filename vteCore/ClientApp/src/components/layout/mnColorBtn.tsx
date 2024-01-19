import React from 'react'
import { useMantineColorScheme, rem } from '@mantine/core'
import { IconSun, IconMoon } from '@tabler/icons-react'
import { ManControlBtn } from './mnControlBtn'

export function ColorSchemeControl() {
  const { colorScheme, toggleColorScheme } = useMantineColorScheme()

  return (
    <ManControlBtn onClick={() => toggleColorScheme()} tooltip={`${colorScheme === 'dark' ? 'Light' : 'Dark'} mode`}>
      {colorScheme === 'dark' ? <IconSun size={rem(22)} stroke={1.5} /> : <IconMoon size={rem(22)} stroke={1.5} />}
    </ManControlBtn>
  )
}
