import { LoginFormInit, LoginProps } from '@/constants/types'
import { Container, Input, Tooltip } from '@mantine/core'
import { useForm } from '@mantine/form'
import { IconAlertCircle, IconEye, IconEyeClosed, IconLock, IconUser } from '@tabler/icons-react'
import React, { FunctionComponent, useCallback, useContext, useEffect, useRef, useState } from 'react'
import CtxForLayout from '@/components/context/CtxForLayout'
import { clsxm } from '@/utils/methods'
import { toast } from 'react-toastify'
import { LoginApi } from '@/api/login.service'
import useControlStyles from '@/constants/styles/mnControlBtn'

const LoginForm: FunctionComponent = () => {
  const [loginValues, setLoginValues] = useState<LoginProps>()
  const [visible, setVisible] = useState<boolean>(false)
  const { classes } = useControlStyles()
  const toastId = useRef<string | number | null>(null)
  const { navHeight } = useContext(CtxForLayout)
  const loginForm = useForm({
    initialValues: LoginFormInit,
  })
  const toastHandler = useCallback((message: string) => {
    if (!toastId || !toastId.current) {
      toastId.current = toast(message, { position: 'top-center' })
    }
  }, [])
  const effectHandler = useCallback(
    async (query: LoginProps) => {
      const result = await LoginApi.loginAsync(query)
    },
    [loginValues],
  )

  useEffect(() => {
    console.log(`the values submitted: `, loginValues)
    if (loginValues) {
      toastHandler('Hi! Thank you using vite for login')
      effectHandler(loginValues)
    }
  }, [loginValues])

  return (
    <Container
      sx={(theme) => ({
        height: `calc(100vh - ${navHeight}px)`,
      })}
      className={clsxm(
        'relative',
        'flex',
        'flex-col',
        'items-center',
        'justify-center',
        'overflow-hidden',
        'py-10',
        'rounded-lg',
      )}
    >
      <div
        className="w-full p-6 border-t-4 border-pink-600 rounded-md border-b-4 shadow-md lg:max-w-lg"
        data-theme="coffee"
      >
        <h1 className="text-3xl font-semibold text-center text-gray-700">DaisyUI</h1>
        <form className="space-y-4 p-5" onSubmit={loginForm.onSubmit((values) => setLoginValues(values))}>
          <Input icon={<IconUser size="1rem" />} placeholder="User Name or Email Address" />

          <Input
            icon={<IconLock size="1rem" />}
            className={classes.hidepwdicon}
            placeholder="Password"
            type={visible ? 'text' : 'password'}
            rightSection={
              visible ? (
                <IconEye onClick={() => setVisible(false)} />
              ) : (
                <IconEyeClosed onClick={() => setVisible(true)} />
              )
            }
            {...loginForm.getInputProps('password')}
          />
          <div>
            <button type="submit" className="btn btn-block">
              Login
            </button>
          </div>
        </form>
      </div>
    </Container>
  )
}

export default LoginForm
