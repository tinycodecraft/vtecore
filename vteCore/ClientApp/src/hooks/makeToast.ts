import { ToastEnum } from '@/constants/types'
import { useCallback, useRef } from 'react'
import { Id, ToastOptions, toast } from 'react-toastify'

interface ToastMaker {
  type: string
}
export function makeToast({ type }: ToastMaker) {
  const toastId = useRef<Id>('')
  const toastMaker = useCallback(async (message: string) => {
    let toastOps: ToastOptions<unknown> = { position: 'top-center' }
    if (toastId && toastId.current) {
      toastOps = { ...toastOps, ...{ toastId: toastId.current } }
    }
    switch (type) {
      case ToastEnum.Success:
        toastId.current = toast.success(message, toastOps)
        break
      case ToastEnum.Warn:
        toastId.current = toast.warn(message, toastOps)
        break
      case ToastEnum.Error:
        toastId.current = toast.error(message, toastOps)
        break
      default:
        toastId.current = toast(message, toastOps)
    }
  }, [])

  return toastMaker
}
