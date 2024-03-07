export const ApiStatusEnum = {
  FAILURE: 'failure',
  NONE: 'none',
  CHANGE: 'change',
  PROCESS: 'process',
  SUCCESS: 'success',
} as const

export type ApiStatusEnum = (typeof ApiStatusEnum)[keyof typeof ApiStatusEnum]


export const LangEnum = {
  CHINESE: 'zh-HK',
  DEFAULT: 'en-US',
} as const
export type LangEnum = (typeof LangEnum)[keyof typeof LangEnum]

export const ApiFieldEnum = {
  UserId: 'userId',
  level: 'level',
  UserName: 'userName',  
  Division: 'division',
  Post: 'post',
  Password: 'password',
  NewPassword: 'newPassword',
  ConfirmPassword: 'confirmPassword',
  GetUser: 'getUser',
  SaveUser: 'saveUser',
  userList: 'userList'


} as const 
export type ApiFieldEnum = (typeof ApiFieldEnum)[keyof typeof ApiFieldEnum]

export const ToastEnum = {
  Warn: 'warn',
  Success: 'success',
  Info: 'info',
  Error: 'error'

} as const
export type ToastEnum = (typeof ToastEnum)[keyof typeof ToastEnum]

export const ErrorEnum = {
  Failure: 'Failure',
  Unexpected: 'Unexpected',
  Validation: 'Validation',
  Conflict: 'Conflict',
  NotFound: 'NotFound',
  Unauthorized: 'Unauthorized',
} as const
export type ErrorEnum = (typeof ErrorEnum)[keyof typeof ErrorEnum]

export const HubMethodEnum = {
  login: 'login',
  weather: 'weather',
  register: 'register',
  pwdchange: 'pwdchange',
  getId: 'GetId',
} as const

export type HubMethodEnum = (typeof HubMethodEnum)[keyof typeof HubMethodEnum]

export const MenuPositionEnum = {
  center: 'center',
  right: 'right'
} as const
export type MenuPositionEnum = (typeof MenuPositionEnum)[keyof typeof MenuPositionEnum]