import { AppShell, Header, MantineProvider } from '@mantine/core'
import { FC, Fragment, PropsWithChildren } from 'react'
import { DyNavBar } from './dyNavBar'

const ManLayout: FC<PropsWithChildren> = ({ children }) => (
  <Fragment>
    <MantineProvider
      withGlobalStyles
      withNormalizeCSS
      theme={{
        colorScheme: 'dark',

        colors: {
          brand: [
            '#F3E5F5',
            '#E1BEE7',
            '#CE93D8',
            '#BA68C8',
            '#9C27B0',
            '#8E24AA',
            '#7B1FA2',
            '#720b6f',
            '#6A1B9A',
            '#4A148C',
          ],
        },

        breakpoints: {
          xs: '30em',
          sm: '48em',
          md: '64em',
          lg: '74em',
          xl: '90em',
          xll: '200em',
        },
      }}
    >
      <AppShell header={<Header height={{base: 50, md: 70}} pt={0} pb={'xs'} pl={0} pr={0}> <DyNavBar /></Header>}>{children}</AppShell>
    </MantineProvider>
  </Fragment>
)

export default ManLayout
