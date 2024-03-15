import { DrawerPositionEnum, drawerCloseClasses, drawerDefaultClasses, drawerOpenClasses } from '@/constants/types'
import { clsxm } from '@/utils/methods'
import React, { PropsWithChildren, useContext, useEffect } from 'react'
import LayoutContext from '@/components/context/CtxForLayout'
import { Skeleton } from '@mantine/core'
import useBoxStyles  from '@/constants/styles/mnBoxShadow'

interface TwDrawerProps {
  isOpen: boolean
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
  side?: DrawerPositionEnum
}

const TwDrawer = ({ isOpen, setOpen, children, side = DrawerPositionEnum.right }: PropsWithChildren<TwDrawerProps>) => {
  const { drawerTop, setNavOpen } = useContext(LayoutContext)
  const { classes,cx,theme} = useBoxStyles()
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
      onClick={() => {
        setOpen((value) => !value)
        console.log(`overlay open value ${isOpen}`)
        setNavOpen && setNavOpen(isOpen ? false : true)
      }}
    >
      <div
        className={clsxm(
          classes.shadowOverlay,
          'fixed inset-0 transition-all',
          {
            'opacity-100 duration-500 ease-in-out visible': isOpen,
          },
          { 'opacity-0 duration-500 ease-in-out invisible': !isOpen },
        )}
      ></div>
      <div className={clsxm({ 'fixed inset-0 overflow-hidden': isOpen })}>
        <div className="absolute inset-0 overflow-hidden">
          <div className={clsxm('pointer-events-none fixed max-w-full', drawerDefaultClasses[side])}>
            <Skeleton mt={drawerTop ? drawerTop - 25 : 0} />
            <div
              className={clsxm(                
                'pointer-events-auto relative w-full h-full transform transition ease-in-out duration-500 pl-5 pt-3 pr-14 text-5xl glass',
                { [drawerCloseClasses[side]]: !isOpen },
                { [drawerOpenClasses[side]]: isOpen },
              )}
              onClick={(event) => {
                event.preventDefault()
                event.stopPropagation()
              }}
            >
              {' '}
              {children}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TwDrawer
