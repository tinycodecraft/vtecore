import { ListResult } from "./inouts"


//Auth Query Props

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


//Weather List Result

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