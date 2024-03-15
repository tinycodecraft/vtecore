import { type RouteInput, TRANSITION_DEFAULT, MenuPositionEnum, LinkNameEnum } from '@/constants/types'
import HomeComponent from '@/pages/landing'
import WeatherComponent from '@/pages/weather'
import LoginFormComponent from '@/pages/login'
import { ChangePasswordComponent } from '@/pages/auth/chgpsswd'
import SetPasswordComponent from '@/pages/auth/setpsswd'
import { UserListComponent } from '@/pages/auth/userlist'
import { EditUserComponent } from '@/pages/auth/edituser'
import { UserComponent } from '@/pages/auth/user'

const routes: RouteInput[] = [
  {
    path: '/home',
    name: LinkNameEnum.home,
    Component: HomeComponent,
    transition: TRANSITION_DEFAULT,
    iconIndex: 0,
    popUpOnly: false,
    position: MenuPositionEnum.center,
    locked: false,
  },
  {
    path: '/forecast',
    name: LinkNameEnum.forecast,
    Component: WeatherComponent,
    transition: TRANSITION_DEFAULT,
    iconIndex: 2,
    popUpOnly: false,
    position: MenuPositionEnum.center,
    locked: true,
  },
  {
    path: '/chgpsswd',
    name: LinkNameEnum.chgpassword,
    Component: ChangePasswordComponent,
    transition: TRANSITION_DEFAULT,
    iconIndex: 4,
    popUpOnly: false,
    position: MenuPositionEnum.right,
    locked: true,
  },
  {
    path: '/userlist',
    name: LinkNameEnum.userlist,
    Component: UserListComponent,
    transition: TRANSITION_DEFAULT,
    iconIndex: 6,
    popUpOnly: false,
    position: MenuPositionEnum.right,
    locked: true,
  },
  {
    path: '/user',
    name: LinkNameEnum.userdisplay,
    Component: UserComponent,
    transition: TRANSITION_DEFAULT,
    iconIndex: 8,
    popUpOnly: false,
    position: MenuPositionEnum.right,
    locked: true,
  },    
  {
    path: '/edituser',
    name: LinkNameEnum.useredit,
    Component: EditUserComponent,
    transition: TRANSITION_DEFAULT,
    iconIndex: 7,
    popUpOnly: false,
    position: MenuPositionEnum.right,
    locked: true,
  },  
  {
    path: '/setpsswd',
    name: LinkNameEnum.setpassword,
    Component: SetPasswordComponent,
    transition: TRANSITION_DEFAULT,
    iconIndex: 5,
    popUpOnly: false,
    position: MenuPositionEnum.right,
    locked: true,
  },

  {
    path: '/login',
    name: LinkNameEnum.login,
    Component: LoginFormComponent,
    transition: TRANSITION_DEFAULT,
    iconIndex: 1,
    popUpOnly: false,
    position: MenuPositionEnum.right,
    locked: false,
  },
  {
    path: '/logout',
    name: LinkNameEnum.logout,
    Component: LoginFormComponent,
    transition: TRANSITION_DEFAULT,
    iconIndex: 3,
    popUpOnly: false,
    position: MenuPositionEnum.right,
    locked: true,
  },
]

export default routes
