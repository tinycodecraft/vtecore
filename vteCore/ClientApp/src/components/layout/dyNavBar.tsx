import { useHover } from '@mantine/hooks'
import React from 'react'

export const DyNavBar = () => {
  const { hovered, ref } = useHover<HTMLDetailsElement>()
  return (
    <div className="navbar bg-base-100" data-theme="lemonade">
      <div className="flex-1">
        <a className="btn btn-ghost text-xl">daisyUI</a>
      </div>
      <div className="flex-none">
        <ul className="menu menu-horizontal px-1">
          <li className="underline-flash">
            <a>Link</a>
          </li>
          <li className="underline-flash">
            <details ref={ref} open={hovered}>
              <summary>Parent</summary>
              <ul className="p-2 bg-base-100 rounded-t-none">
                <li>
                  <a>Link 1</a>
                </li>
                <li>
                  <a>Link 2</a>
                </li>
              </ul>
            </details>
          </li>
        </ul>
      </div>
    </div>
  )
}
