import { FC, forwardRef, useEffect, useRef, useState } from 'react'
import { Route, Routes, useLocation } from 'react-router'
import routes from '@/constants/routes/config'
import LazyLoad from 'react-lazy-load'
import HomeComponent from '@/pages/landing'
import { generatePath } from 'react-router'

const RouterComponent: FC = () => {
  const location = useLocation()
  const nodeRefs: any[] = []
  const [refIndex, setRefIndex] = useState(0)

  return (
    <Routes location={location}>
      {routes.map(({ path, params, Component, name, ...rest }, index) => {
        nodeRefs[index] = useRef(null)
        const ForwComponent = forwardRef<HTMLDivElement>((props, ref) => (
          <div ref={ref}>
            <LazyLoad onContentVisible={() => console.log(`${index} of page loaded.`)}>
              <Component {...props} />
            </LazyLoad>
          </div>
        ))
        ForwComponent.displayName = `${name}Forwarded`
        return (
          <Route
            key={name}
            path={generatePath(path, params)}
            action={async () => setRefIndex(index)}
            element={<ForwComponent ref={nodeRefs[index]} {...rest} />}
          />
        )
      })}

      {/* catch all  */}
      {<Route path="*" element={<HomeComponent />} />}
    </Routes>
  )
}

export default RouterComponent
