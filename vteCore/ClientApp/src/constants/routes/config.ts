import { type RouteInput, TRANSITION_DEFAULT, MenuPositionEnum } from '@/constants/types'
import HomeComponent from '@/pages/landing'
import WeatherComponent from '@/pages/weather'
import LoginFormComponent from '@/pages/login'
import { ChangePasswordComponent } from '@/pages/auth/chgpsswd'
import SetPasswordComponent from '@/pages/auth/setpsswd'

const routes: RouteInput[] = [
  {
    path: '/home',
    name: 'Home',
    Component: HomeComponent,
    transition: TRANSITION_DEFAULT,
    iconIndex: 0,
    popUpOnly: false,
    position: MenuPositionEnum.center,
    locked: false,
  },
  {
    path: '/forecast',
    name: 'Forecast',
    Component: WeatherComponent,
    transition: TRANSITION_DEFAULT,
    iconIndex: 2,
    popUpOnly: false,
    position: MenuPositionEnum.center,
    locked: true,
  },
  {
    path: '/chgpsswd',
    name: 'Change Password',
    Component: ChangePasswordComponent,
    transition: TRANSITION_DEFAULT,
    iconIndex: 4,
    popUpOnly: false,
    position: MenuPositionEnum.right,
    locked: true

  },
  {
    path: '/setpsswd',
    name: 'Set Password',
    Component: SetPasswordComponent,
    transition: TRANSITION_DEFAULT,
    iconIndex: 5,
    popUpOnly: false,
    position: MenuPositionEnum.right,
    locked: true

  },  

  {
    path: '/login',
    name: 'Login',
    Component: LoginFormComponent,
    transition: TRANSITION_DEFAULT,
    iconIndex: 1,
    popUpOnly: false,
    position: MenuPositionEnum.right,
    locked: false,
  },
  {
    path: '/logout',
    name: 'Logout',
    Component: LoginFormComponent,
    transition: TRANSITION_DEFAULT,
    iconIndex: 3,
    popUpOnly: false,
    position: MenuPositionEnum.right,
    locked: true,
  },  
]

export default routes
