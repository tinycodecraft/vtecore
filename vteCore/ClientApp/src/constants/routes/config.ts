import { type RouteInput, TRANSITION_DEFAULT } from '@/constants/types'
import HomeComponent from '@/pages/landing'

const routes: RouteInput[] = [
  {
    path: '/home',
    name: 'Home',
    Component: HomeComponent,
    transition: TRANSITION_DEFAULT,
    iconIndex: 0,
    popUpOnly: false,
  },
]

export default routes
