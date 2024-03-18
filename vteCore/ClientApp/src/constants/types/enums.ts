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
  RemoveUsers: 'removeUsers',
  userList: 'userList',
  exportUsers: 'exportUsers'



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
  right: 'right',
  aside: 'aside',
} as const
export type MenuPositionEnum = (typeof MenuPositionEnum)[keyof typeof MenuPositionEnum]

export const DrawerPositionEnum = {
  right: 'right',
  left: 'left',
  top: 'top',
  bottom: 'bottom'
}

export type DrawerPositionEnum = (typeof DrawerPositionEnum)[keyof typeof DrawerPositionEnum]

export const LinkNameEnum = {
  home: 'Home',
  forecast: 'Forecast',
  chgpassword: 'Change Password',
  userlist: 'User List',
  userdisplay: 'User Display',
  useredit: 'User Edit',
  setpassword: 'Set Password',
  login: 'Login',
  logout: 'Logout',
  menu1: 'Menu 1',
  menu2: 'Menu 2',
  submenu1: 'M2 Sub Menu 1',
  submenu2: 'M2 Sub Menu 2',
  menu3: 'Menu 3',
  submenu3: 'M3 Sub Menu 3',
  sub1menu1: 'M3-S3 Sub Sub Menu 1',
  sub1menu2: 'M3-S3 Sub Sub Menu 2',
  submenu4: 'M3 Sub Menu 4',
  sub1menu3: 'M3-S4 Sub Sub Menu 3',
  sub1menu4: 'M3-S4 Sub Sub Menu 4',
  sub2menu1: 'M3-S4-S4 Sub Sub Sub Menu 1',
  sub2menu2: 'M3-S4-S4 Sub Sub Sub Menu 2',
  sub3menu1: 'M3-S4-S4-S2 Sub Sub Sub Sub Menu 1',
  submenu5: 'M3 Sub Menu 5',
  submenu6: 'M3 Sub Menu 6',
  sub1menu5: 'M3-S6 Sub Sub Menu 5',
  sub1menu6: 'M3-S6 Sub Sub Menu 6',
  sub1menu7: 'M3-S6 Sub Sub Menu 7',
  menu4: 'Menu 4'


}
export type LinkNameEnum = (typeof LinkNameEnum)[keyof typeof LinkNameEnum]