import { AnchorHTMLAttributes, ComponentType, SetStateAction } from 'react'
import { SelectItemProps } from '@mantine/core'
import { ApiStatusEnum, ErrorEnum, LinkNameEnum, MenuPositionEnum } from './enums'
import { TRANSITION_DEFAULT } from './values'
import { Params } from 'react-router'
import { ListResult } from './inouts'

// view help types

export type WindowSize = Readonly<{
  winWidth: number | undefined
  winHeight: number | undefined
}>


export const LINK_ATTRIBUTES: AnchorHTMLAttributes<HTMLAnchorElement> = {
  role: 'button',
  target: '_blank',
  rel: 'noopener noreferrer',
}

// route help types


export type RouteComponent = ComponentType<any>

export type ReactTransition = typeof TRANSITION_DEFAULT

export type RouteInput = Readonly<{
  name: LinkNameEnum
  path: string
  popUpOnly: boolean
  transition: ReactTransition
  Component: RouteComponent
  params?: Readonly<Params<string>>
  iconIndex?: number
  position: MenuPositionEnum
  locked: boolean
  parentName?: LinkNameEnum
}>

export type RouteDepth = Readonly<Record<number,RouteInput[]>>
export type RouteDepthList = RouteDepth[]

// lang help types

export interface LangContextProps {
  locale: string
  setLocale: (value: SetStateAction<string>) => void
}


//Generic State

export type ApiErrorState = Readonly<Record<string, string>>

export type FormPostState = Readonly<{
  userName: string
  status: ApiStatusEnum
}>
export type HubState = Readonly<{
  userName: string
  token?: string
  refreshToken?: string
  connectionId: string
  controlAdminEnabled: boolean
  divisionAdminEnabled: boolean
  dataAdminEnabled: boolean
  status: ApiStatusEnum
  needReset: boolean
}>

export type UserState = Omit<HubState, 'connectionId'>






