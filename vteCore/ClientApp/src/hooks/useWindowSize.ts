import { WindowSize } from '@/constants/types'
import { useEffect, useState } from 'react'

export function useWindowSize() {
  const [windSize, setWindSize] = useState<WindowSize>({ winHeight: 0, winWidth: 0 })

  useEffect(() => {
    console.log(`use window size called`)
    const handleResize = ()=> {
      setWindSize({
        winHeight: window.innerHeight,
        winWidth: window.innerWidth,
      })
    }
    window.addEventListener('resize', handleResize)
    handleResize()
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return windSize
}
