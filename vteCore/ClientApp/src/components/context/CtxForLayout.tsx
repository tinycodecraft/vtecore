import { useViewportSize } from '@mantine/hooks'
import React, {
  FunctionComponent,
  PropsWithChildren,
  SetStateAction,
  createContext,
  useEffect,
  useRef,
  useState,
} from 'react'

interface LayoutCtxProps {
  navBarRef: React.MutableRefObject<HTMLDivElement | null>
  navHeight: number
}

const LayoutContext = createContext<Partial<LayoutCtxProps>>({})

export const CtxForLayoutProvider: FunctionComponent<PropsWithChildren> = ({ children }) => {
  const [drawerTop, setDrawerTop] = useState<number>(0)
  const { width } = useViewportSize()
  const headRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    console.log(`rerender happens`)
    if (headRef.current) {
      const { height } = headRef.current.getBoundingClientRect()
      console.log(`the height is ${height}`)
      if (height) {
        setDrawerTop(height)
      }
    }
  }, [width])
  return (
    <LayoutContext.Provider
      value={{
        navBarRef: headRef,
        navHeight: drawerTop,
      }}
    >
      {children}
    </LayoutContext.Provider>
  )
}

export default LayoutContext
