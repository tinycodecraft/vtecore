import { IconHome, IconLogin, IconLogout } from '@tabler/icons-react'
import { ApiErrorState,  FormPostState,  HubState, LoginProps, RouteInput, SelectOption, WeatherState } from './views'
import { ApiStatusEnum } from './enums'

export const SELECT_OPTION_TEMPLATE: SelectOption[] = [
  { value: '', label: '(All)' },
  { value: '', label: '(Any)' },
]



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

export const FormPostInit : FormPostState= {
  userName: '',
  status: ApiStatusEnum.NONE
}

export const HubInit: HubState = {
  userName: '',
  connectionId: '',
  status: ApiStatusEnum.NONE,
  controlAdminEnabled: false,
  dataAdminEnabled: false,
  divisionAdminEnabled: false,
}

export const ApiErrorInit: ApiErrorState = {}
