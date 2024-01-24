import { IconHome, IconLogin, IconLogout } from '@tabler/icons-react'
import { DemoFormState, LoginProps, RouteInput, SelectOption } from './views'

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
  UserName: '',
  ForSignup: false,
  Password: '',
}
