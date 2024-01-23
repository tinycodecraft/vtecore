import { useHover } from '@mantine/hooks'
import React, { useEffect, useState } from 'react'

export const DyNavBar = () => {


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
          <li className="underline-flash" >
            <details>
              <summary>Parent</summary>
              <ul className="bg-base-100 rounded-t-none  top-[25px]" >
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
