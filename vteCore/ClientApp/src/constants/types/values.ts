import { IconHome, IconLogin, IconLogout } from '@tabler/icons-react'
import { ApiErrorState, FormPostState, HubState } from './views'
import { ApiStatusEnum, DrawerPositionEnum } from './enums'
import { LoginProps, UserData, WeatherState } from './apis'

export const TRANSITION_DEFAULT = {
  classNames: 'fade',
  timeout: { enter: 250, exit: 250 },
}

export const LINK_ICONS = [IconHome, IconLogin, IconLogout]

export const LoginFormInit: LoginProps = {
  userName: '',
  forSignup: false,
  password: '',
}

export const WeatherInit: WeatherState = {
  forecasts: [],
  isLoading: true,
  debug: true,
}

export const FormPostInit: FormPostState = {
  userName: '',
  status: ApiStatusEnum.NONE,
}

export const HubInit: HubState = {
  userName: '',
  connectionId: '',
  status: ApiStatusEnum.NONE,
  controlAdminEnabled: false,
  dataAdminEnabled: false,
  divisionAdminEnabled: false,
  needReset: false,
}

export const EditUserFormInit: UserData = {
  disabled: false,
  division: '',
  isControlAdmin: false,
  isDataAdmin: false,
  isDivisionAdmin: false,
  isReset: false,
  level: 18,
  post: '',
  updatedAt: new Date(),
  userId: '',
  updatedBy: '',
  userName: '',
  id: 0,
}

export const ApiErrorInit: ApiErrorState = {}

//Drawer Classes

export const drawerOpenClasses: Readonly<Record<DrawerPositionEnum,string>> = {
  right: 'translate-x-0',
  left: 'translate-x-0',
  top: 'translate-y-0',
  bottom: 'translate-y-0',
}

export const drawerCloseClasses: Readonly<Record<DrawerPositionEnum,string>> = {
  right: 'translate-x-full',
  left: '-translate-x-full',
  top: '-translate-y-full',
  bottom: 'translate-y-full',
}

export const drawerDefaultClasses: Readonly<Record<DrawerPositionEnum,string>> = {
  right: 'inset-y-0 right-0',
  left: 'inset-y-0 left-0',
  top: 'inset-x-0 top-0',
  bottom: 'inset-x-0 bottom-0',
}
