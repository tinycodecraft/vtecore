import React, { PropsWithChildren, useContext } from 'react'
import LayoutContext from '@/components/context/CtxForLayout'
import Scrollbars from 'rc-scrollbars'

interface LeftDrawerProps {
  title: string
}

export const LeftDrawer = ({ children, title }: PropsWithChildren<LeftDrawerProps>) => {
  const { isNavOpen, setNavOpen } = useContext(LayoutContext)
  // css explanation
  // w-screen set the width as large as possible till the max-w allowed.
  return (
    <main
      className={
        ' fixed overflow-hidden z-10  inset-0 transform bg-purple-300 bg-opacity-25 ease-in-out ' +
        (isNavOpen
          ? ' transition-opacity opacity-100 duration-800 translate-x-0  '
          : ' transition-all delay-800 opacity-0 -translate-x-full  ')
      }
      data-theme="nord"
    >
      <section
        className={
          ' w-screen max-w-md left-0 absolute  h-full shadow-xl delay-400 duration-500 ease-in-out transition-all transform  ' +
          (isNavOpen ? ' translate-x-0 ' : ' -translate-x-full ')
        }
      >
        <article className="relative w-screen max-w-md flex flex-col space-y-0.5 h-full">
          <header className="pt-9 font-bold text-lg">{`${title}`}</header>
          <Scrollbars autoHide className='h-screen' data-theme="lemonade">{children}</Scrollbars>
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
