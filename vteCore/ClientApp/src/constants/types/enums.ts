export const ApiStatusEnum = {
  FAILURE: 'failure',
  NONE: 'none',
  CHANGE: 'change',
  PROCESS: 'process',
  SUCCESS: 'success',
} as const

export type ApiStatusEnum = (typeof ApiStatusEnum)[keyof typeof ApiStatusEnum]

export const FieldsEnum = {
  WHOLERECORD: 'all',
  USERNAME: 'userName',
  PASSWORD: 'password',
} as const
export type FieldsEnum = (typeof FieldsEnum)[keyof typeof FieldsEnum]

export const LangEnum = {
  CHINESE: 'zh-HK',
  DEFAULT: 'en-US',
} as const
export type LangEnum = (typeof LangEnum)[keyof typeof LangEnum]

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