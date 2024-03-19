import { DrawerPositionEnum, drawerCloseClasses, drawerDefaultClasses, drawerOpenClasses } from '@/constants/types'
import { clsxm } from '@/utils/methods'
import React, { PropsWithChildren, useContext, useEffect } from 'react'
import LayoutContext from '@/components/context/CtxForLayout'
import { ScrollArea, Skeleton } from '@mantine/core'
import useBoxStyles from '@/constants/styles/mnBoxShadow'
import { useClickOutside, useHotkeys, useViewportSize } from '@mantine/hooks'

interface TwDrawerProps {
  isOpen: boolean

  side?: DrawerPositionEnum
}

const TwDrawer = ({ isOpen, children, side = DrawerPositionEnum.right }: PropsWithChildren<TwDrawerProps>) => {
  const { drawerTop, isNavOpen, setNavOpen } = useContext(LayoutContext)
  const { classes, cx, theme } = useBoxStyles()
  const { height } = useViewportSize()
  useHotkeys([['escape', () => setNavOpen && setNavOpen(false)]])
  useEffect(() => {
    console.log(`the drawertop is ${drawerTop}`)
  }, [drawerTop])

  return (
    <div
      id={`dialog-${side}`}
      className="relative z-10"
      aria-labelledby="slide-over"
      role="dialog"
      aria-modal="true"
      data-theme="lemonade"
    >
      <div
        className={clsxm(
          classes.shadowOverlay,
          'fixed inset-0 transition-all',
          {
            'opacity-100 duration-500 ease-in-out visible': isNavOpen,
          },
          { 'opacity-0 duration-500 ease-in-out invisible': !isNavOpen },
        )}
      ></div>
      <div className={clsxm({ 'fixed inset-0 ': isNavOpen })}>
        <div className="absolute inset-0">
          <div className={clsxm('fixed max-w-full', drawerDefaultClasses[side],{'w-0': !isNavOpen})}>
            <Skeleton mt={drawerTop ? drawerTop - 25 : 0} />
            <div
              className={clsxm(
                'pointer-events-auto relative min-w-80  h-full transform transition ease-in-out duration-500 pt-3 text-5xl',
                { [drawerCloseClasses[side]]: !isNavOpen },
                { [drawerOpenClasses[side]]: isNavOpen },
              )}
            >
              <ScrollArea h={height - (drawerTop ?? 0)}> {children}</ScrollArea>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TwDrawer
