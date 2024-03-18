import { RouteDepth, RouteInput } from '@/constants/types'
import { getRouteByDepth, recordKeys } from '@/utils/methods'
import { IconCloudCog, IconHome, IconList, IconLock, IconLogout, IconSwitch2 } from '@tabler/icons-react'
import clsx from 'clsx'
import React, { useContext, useEffect } from 'react'
import { generatePath } from 'react-router'
import { NavLink } from 'react-router-dom'
import LayoutContext from '@/components/context/CtxForLayout'

interface DyAsideProps {
  asideList: RouteInput[]
  routeDepth?: RouteDepth
  depth?: number
  maxDepth?: number
}
const icons = [IconHome, IconLock, IconCloudCog, IconLogout, IconSwitch2, IconList]

export const DyAsideMenu = ({ asideList, routeDepth, depth = 1, maxDepth = 0 }: DyAsideProps) => {
  const cloneDepth = routeDepth ? routeDepth : getRouteByDepth(asideList)
  const { setNavOpen } = useContext(LayoutContext)
  console.log(asideList)
  if (maxDepth === 0) {
    maxDepth = recordKeys(cloneDepth).length
  }
  const parentnames = routeDepth && depth && depth <maxDepth && routeDepth[depth].map((e) => e.parentName)
  const leaves = asideList.filter((e) => !parentnames || !parentnames.includes(e.name))
  const parents = asideList.filter((e) => parentnames && parentnames.includes(e.name))

  useEffect(()=> {
    console.log(asideList)
  },[])
  return (
    <ul className={clsx(depth <=1 ? 'menu bg-base-200 w-106 rounded-box' : '')} data-theme="retro">
      {(() => {
        let childarr: any[] = []
        for (var i = 0; i < leaves.length; i++) {
          let route = leaves[i]
          childarr.push(
            <li data-depth={`${depth}`} key={`${leaves[i].name}-${depth}`}>
              {' '}
              <NavLink key={route.name} to={generatePath(route.path, route.params)} onClick={() => setNavOpen && setNavOpen(false)}>
                {React.createElement(icons[route.iconIndex ?? 0], { className: 'h-[18px] w-[18px] inline' })}
                {route.name}
              </NavLink>
            </li>,
          )
        }

        return childarr.map((e) => e)
      })()}
      {(() => {
        let parentarr: any[] = []
        
        for (var j = 0; j < parents.length; j++) {
          let submenu = routeDepth && routeDepth[depth].filter((e) => e.parentName === parents[j].name)
          if (submenu) {
            parentarr.push(
              <li data-depth={`${depth}`} key={`${parents[j].name}-${depth}`}>
                <details open>
                  <summary>{parents[j].name}</summary>
                  <DyAsideMenu asideList={[...submenu]} depth={depth+1} routeDepth={routeDepth} />{' '}
                </details>
              </li>,
            )
          } else {
            let route = parents[j]
            parentarr.push(
              <li data-depth={`${depth}`} key={`${parents[j].name}-${depth}`}>
                {' '}
                <NavLink key={route.name} to={generatePath(route.path, route.params)} onClick={() => setNavOpen && setNavOpen(false)}>
                  {React.createElement(icons[route.iconIndex ?? 0], { className: 'h-[18px] w-[18px] inline' })}
                  {route.name}
                </NavLink>
              </li>,
            )
          }
        }
        return parentarr.map((e) => e)
      })()}
    </ul>
  )
}
