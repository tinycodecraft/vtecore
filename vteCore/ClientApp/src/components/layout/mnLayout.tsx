import { AppShell, Container, Header, MantineProvider, clsx, rem } from '@mantine/core'
import { FC, Fragment, PropsWithChildren, useContext } from 'react'
import { DyNavBar } from './dyNavBar'
import CtxForLayout from '@/components/context/CtxForLayout'
import { Bounce, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const ManLayout: FC<PropsWithChildren> = ({ children }) => {
  const { navBarRef } = useContext(CtxForLayout)
  return (
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
        <AppShell
          header={
            <Header height={{ base: 50, md: 70 }} pt={0} pb={'xs'} pl={0} pr={0} ref={navBarRef}>
              {' '}
              <DyNavBar />
            </Header>
          }
        >
          <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
            transition={Bounce}
          />
          {children}
        </AppShell>
      </MantineProvider>
    </Fragment>
  )
}
export default ManLayout
