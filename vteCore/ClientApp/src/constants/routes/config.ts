import { type RouteInput, TRANSITION_DEFAULT } from '@/constants/types'
import HomeComponent from '@/pages/landing'
import LoginFormComponent from '@/pages/login'

const routes: RouteInput[] = [
  {
    path: '/home',
    name: 'Home',
    Component: HomeComponent,
    transition: TRANSITION_DEFAULT,
    iconIndex: 0,
    popUpOnly: false,
  },
  {
    path: '/login',
    name: 'Login',
    Component: LoginFormComponent,
    transition: TRANSITION_DEFAULT,
    iconIndex: 1,
    popUpOnly: false

  }
]

export default routes
