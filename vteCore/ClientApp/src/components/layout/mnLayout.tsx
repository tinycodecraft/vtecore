import { AppShell, Header, MantineProvider, NativeSelect } from '@mantine/core'
import { FC, Fragment, PropsWithChildren, useContext, useEffect } from 'react'
import { DyNavBar } from './dyNavBar'
import CtxForLayout from '@/components/context/CtxForLayout'
import { Bounce, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { SignalRApi } from '@/api/signalr.service'
import { receiveHubInfo } from '@/hooks/store/dmHubSlice'
import { useAppDispatch } from '@/hooks'
import { canWait, getRouteByDepth } from '@/utils/methods'

import asidelist from '@/constants/routes/aside'
import { DrawerPositionEnum } from '@/constants/types'
import { DyAsideMenu } from './dyAsideMenu'
import { LeftDrawer } from './LeftDrawer'

const ManLayout: FC<PropsWithChildren> = ({ children }) => {
  const { navBarRef, isNavOpen, setNavOpen } = useContext(CtxForLayout)

  const routesDepth = getRouteByDepth(asidelist)
  const depth0routes = [...routesDepth[0]]
  const dispatch = useAppDispatch()
  useEffect(() => {
    const handle = async () => {
      let check = true
      let count = 0
      while (check || count < 3) {
        if (SignalRApi.connectionId) {
          check = false
          dispatch(receiveHubInfo(SignalRApi.connectionId))
        } else {
          await canWait(1000)
        }
        count++
      }
    }
    handle()
  }, [])

  return (
    <Fragment>
      <MantineProvider
        withGlobalStyles
        withNormalizeCSS
        theme={{
          colorScheme: 'dark',
          // components: {
          //   NativeSelect: {
          //     styles: {
          //       root: {
          //         '&[data-disabled]': {
          //           opacity: '1 !important',
          //           color: 'blue !important',
          //         },
          //       },
          //     },
          //   },
          // },
          fontFamily: 'Montserrat, sans-serif',
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
            sharp: [
              '#FDE7F3',
              '#FBBCDC',
              '#F891C6',
              '#F566AF',
              '#F23B99',
              '#EF1082',
              '#BF0D68',
              '#8F0A4E',
              '#600634',
              '#30031A',
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
          <div className="flex items-center justify-center flex-col">
            {children}
            <LeftDrawer title="Side Menu">
              <DyAsideMenu asideList={depth0routes} routeDepth={routesDepth} />
            </LeftDrawer>
          </div>
        </AppShell>
      </MantineProvider>
    </Fragment>
  )
}
export default ManLayout
