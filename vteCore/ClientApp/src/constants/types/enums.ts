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
  DEFAULT: 'en-US'
} as const
export type LangEnum = (typeof LangEnum)[keyof typeof LangEnum]