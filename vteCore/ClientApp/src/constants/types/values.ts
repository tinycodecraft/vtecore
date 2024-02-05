import { IconHome, IconLogin, IconLogout } from '@tabler/icons-react'
import { DemoFormState, HubState, LoginProps, RouteInput, SelectOption, WeatherState } from './views'
import { ApiStatusEnum } from './enums'

export const SELECT_OPTION_TEMPLATE: SelectOption[] = [
  { value: '', label: '(All)' },
  { value: '', label: '(Any)' },
]

export const DemoFormStateInit: DemoFormState = {
  count: 0,
  checked: false,
  selectedOption: SELECT_OPTION_TEMPLATE[0],
}

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

export const HubInit: HubState = {
  userName: '',
  connectionId: '',
  status: ApiStatusEnum.NONE,
}
