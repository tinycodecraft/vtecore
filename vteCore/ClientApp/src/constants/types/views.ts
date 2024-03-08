import { AnchorHTMLAttributes, ComponentType, SetStateAction } from 'react'
import { SelectItemProps } from '@mantine/core'
import { ApiStatusEnum, ErrorEnum, MenuPositionEnum } from './enums'
import { TRANSITION_DEFAULT } from './values'
import { Params } from 'react-router'
import { ListResult } from './inouts'

// view help types

export type WindowSize = Readonly<{
  winWidth: number | undefined
  winHeight: number | undefined
}>

export type RouteComponent = ComponentType<any>

export type ReactTransition = typeof TRANSITION_DEFAULT

export type RouteInput = Readonly<{
  name: string
  path: string
  popUpOnly: boolean
  transition: ReactTransition
  Component: RouteComponent
  params?: Readonly<Params<string>>
  iconIndex?: number
  position: MenuPositionEnum
  locked: boolean
}>

// AUTH HELP TYPES

export interface LangContextProps {
  locale: string
  setLocale: (value: SetStateAction<string>) => void
}
export interface TokenProps {
  token: string
  refreshToken?: string
}
export interface LoginProps {
  userName: string
  password: string
  newPassword?: string
  confirmPassword?: string
  forSignup: boolean
}

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

// FORM HELP TYPES

export const LINK_ATTRIBUTES: AnchorHTMLAttributes<HTMLAnchorElement> = {
  role: 'button',
  target: '_blank',
  rel: 'noopener noreferrer',
}



export type WeatherForecast = Readonly<{
  id: number
  summary: string
  temperatureC: number
  temperatureF: number
  dateFormatted: string
  recordDate: Date
}>

export type WeatherState = Readonly<{
  debug?: boolean
  isLoading: boolean
  forecasts: WeatherForecast[]
}>

export type ReceiveForecastsPayload = Pick<WeatherState, 'forecasts'>

//User List Result
export type UserData = Readonly<{
  loginedAt?: Date
  isReset: boolean
  updatedAt: Date
  updatedBy: string
  post: string
  disabled: boolean
  level: number
  division: string
  isDivisionAdmin: boolean
  isDataAdmin: boolean
  isControlAdmin: boolean
  adminType?: string
  userName: string
  userId: string
  id: number
}>
export type UserListResult = ListResult<UserData>

export type UserListState = Readonly<{
  status: ApiStatusEnum
  result: UserListResult
}>
