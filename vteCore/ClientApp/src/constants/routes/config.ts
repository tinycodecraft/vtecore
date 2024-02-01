import { type RouteInput, TRANSITION_DEFAULT, MenuPositionEnum } from '@/constants/types'
import HomeComponent from '@/pages/landing'
import WeatherComponent from '@/pages/weather'
import LoginFormComponent from '@/pages/login'

const routes: RouteInput[] = [
  {
    path: '/home',
    name: 'Home',
    Component: HomeComponent,
    transition: TRANSITION_DEFAULT,
    iconIndex: 0,
    popUpOnly: false,
    position: MenuPositionEnum.center,
  },
  {
    path: '/forecast',
    name: 'Forecast',
    Component: WeatherComponent,
    transition: TRANSITION_DEFAULT,
    iconIndex: 2,
    popUpOnly: false,
    position: MenuPositionEnum.center,
  }
  ,
  {
    path: '/login',
    name: 'Login',
    Component: LoginFormComponent,
    transition: TRANSITION_DEFAULT,
    iconIndex: 1,
    popUpOnly: false,
    position: MenuPositionEnum.right,

  }
]

export default routes
