import { RouteDepth, RouteInput } from '@/constants/types'
import { getRouteByDepth, recordKeys } from '@/utils/methods'
import { IconCloudCog, IconHome, IconList, IconLock, IconLogout, IconSwitch2 } from '@tabler/icons-react'
import clsx from 'clsx'
import React, { useContext, useEffect } from 'react'
import { generatePath } from 'react-router'
import { NavLink } from 'react-router-dom'
import LayoutContext from '@/components/context/CtxForLayout'
import { useClickOutside } from '@mantine/hooks'

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

  if (maxDepth === 0) {
    maxDepth = recordKeys(cloneDepth).length
  }
  const parentnames = routeDepth && depth && depth < maxDepth && routeDepth[depth].map((e) => e.parentName)
  const leaves = asideList.filter((e) => !parentnames || !parentnames.includes(e.name))
  const parents = asideList
    .filter((e) => parentnames && parentnames.includes(e.name))
    .map((e) => ({ menu: e, submenu: cloneDepth[depth].filter((f) => f.parentName === e.name) }))

  return (
    <ul className={clsx(depth <= 1 ? 'menu bg-base-200 w-full rounded-box pt-0' : '')}>
      {leaves.length > 0 &&
        leaves.map((l) => (
          <li data-depth={`${depth}`} key={`${l.name}-${depth}`}>
            {' '}
            <NavLink key={l.name} to={generatePath(l.path, l.params)} onClick={() => setNavOpen && setNavOpen(false)}>
              {React.createElement(icons[l.iconIndex ?? 0], { className: 'h-[18px] w-[18px] inline' })} {l.name}
            </NavLink>{' '}
          </li>
        ))}
      {parents.length > 0 &&
        parents.map((p) =>
          p.submenu && p.submenu.length > 0 ? (
            <li data-depth={`${depth}`} key={`${p.menu.name}-${depth}`}>
              <details>
                <summary>{p.menu.name}</summary>
                <DyAsideMenu asideList={[...p.submenu]} depth={depth + 1} routeDepth={cloneDepth} />{' '}
              </details>
            </li>
          ) : (
            <li data-depth={`${depth}`} key={`${p.menu.name}-${depth}`}>
              <NavLink
                key={p.menu.name}
                to={generatePath(p.menu.path, p.menu.params)}
                onClick={() => setNavOpen && setNavOpen(false)}
              >
                {React.createElement(icons[p.menu.iconIndex ?? 0], { className: 'h-[18px] w-[18px] inline' })}
                {p.menu.name}
              </NavLink>{' '}
            </li>
          ),
        )}
    </ul>
  )
}
