import clsx, { type ClassValue } from 'clsx'
import { ErrorDetail, ErrorOr } from '@/constants/types'

import { twMerge } from 'tailwind-merge'

export const clsxm = (...classes: ClassValue[]) => twMerge(clsx(...classes))
export const canWait = (delay: number) => new Promise((resolve) => setTimeout(resolve, delay))
export const idGen = (() => {
  let id = 0
  return () => id++
})()

export const noEmptyOr = (value: string | number | undefined, def = 0): number => {
  try {
    if (value && value !== '') return typeof value === 'string' ? parseInt(value) : value
    return def
  } catch {
    return def
  }
}
export const valueOr = <T>(value: T | undefined, def: T): T => {
  if (value === undefined || value === null) return def
  return value
}
export const value3Or = <T>(value: T | undefined, def1: T | undefined, def2: T): T => {
  if (value === undefined || value === null) {
    if (def1 === undefined || value === null) {
      return def2
    } else {
      return def1
    }
  }
  return value
}

export const getErrorOr = <T>(value?: T | undefined, errors: ErrorDetail[] = []): ErrorOr<T> => {
  return { value, isError: !value || (errors && errors.length >0), errors }
}

export const isArrayWithLength = (val: unknown): boolean => Array.isArray(val) && !!val.length
