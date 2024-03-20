import React, { PropsWithChildren, useContext } from 'react'
import LayoutContext from '@/components/context/CtxForLayout'

interface LeftDrawerProps {
  title: string
}

export const LeftDrawer = ({ children, title }: PropsWithChildren<LeftDrawerProps>) => {
  const { isNavOpen, setNavOpen } = useContext(LayoutContext)
  return (
    <main
      className={
        ' fixed overflow-hidden z-10 bg-gray-900 bg-opacity-25 inset-0 transform ease-in-out ' +
        (isNavOpen
          ? ' transition-opacity opacity-100 duration-500 translate-x-0  '
          : ' transition-all delay-500 opacity-0 -translate-x-full  ')
      }
      data-theme="lemonade"
    >
      <section
        className={
          ' w-screen max-w-lg left-0 absolute bg-white h-full shadow-xl delay-400 duration-500 ease-in-out transition-all transform  ' +
          (isNavOpen ? ' translate-x-0 ' : ' -translate-x-full ')
        }
      >
        <article className="relative w-screen max-w-lg pb-10 flex flex-col space-y-6 overflow-y-auto h-full">
          <header className="p-4 font-bold text-lg">{`${title}`}</header>
          {children}
        </article>
      </section>
      <section
        className=" w-screen h-full cursor-pointer "
        onClick={() => {
          setNavOpen && setNavOpen(false)
        }}
      ></section>
    </main>
  )
}
