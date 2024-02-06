import { HubInit, HubState, LoginFormInit, LoginProps } from '@/constants/types'
import { Container, Input, Tooltip } from '@mantine/core'
import { useForm } from '@mantine/form'
import { IconAlertCircle, IconEye, IconEyeClosed, IconLock, IconUser } from '@tabler/icons-react'
import React, { FunctionComponent, useCallback, useContext, useEffect, useRef, useState } from 'react'
import CtxForLayout from '@/components/context/CtxForLayout'
import { clsxm } from '@/utils/methods'
import { toast } from 'react-toastify'
import { LoginApi } from '@/api/login.service'
import useControlStyles from '@/constants/styles/mnControlBtn'
import { getAuthAsync } from '@/hooks/store/dmHubSlice'
import { useAppDispatch, useAppSelector } from '@/hooks'
import { useNavigate } from 'react-router'

const LoginForm: FunctionComponent = () => {
  const [loginValues, setLoginValues] = useState<LoginProps>()
  const [visible, setVisible] = useState<boolean>(false)
  const { token, refreshToken, userName } = useAppSelector<HubState>((state) => state.dmHub ?? HubInit)
  const dispatch = useAppDispatch()
  const toastId = useRef<string | number | null>(null)
  const { navHeight } = useContext(CtxForLayout)
  const navigate = useNavigate()
  const loginForm = useForm({
    initialValues: LoginFormInit,
  })
  const toastHandler = useCallback((message: string) => {
    if (!toastId || !toastId.current) {
      toastId.current = toast(message, { position: 'top-center' })
    }
  }, [])

  const submitHandler = useCallback(
    loginForm.onSubmit((values) => {
      console.log(`the form values are : `, values)
      setLoginValues(values)
      dispatch(getAuthAsync(values))
    }),
    [loginValues, loginForm],
  )
  useEffect(()=> {
    if(token && userName)
    {
      navigate('/home')
    }
  },[token])

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
        <form className="space-y-4 p-5" onSubmit={submitHandler}>
          <Input
            styles={(theme) => ({
              icon: {
                pointerEvents: 'auto',
              },
            })}
            icon={
              <div className="tooltip tooltip-top" data-tip="Please enter user name or email addres">
                <IconUser size="1rem" />
              </div>
            }
            placeholder="User Name or Email Address"
            {...loginForm.getInputProps('userName')}
          />

          <Input
            styles={(theme) => ({
              icon: {
                pointerEvents: 'auto',
              },
              input: {
                '::-ms-reveal': {
                  display: 'none',
                },
                '::-ms-clear': {
                  display: 'none',
                },
              },
            })}
            icon={
              <div className="tooltip tooltip-top" data-tip="Please enter password">
                <IconLock size="1rem" />
              </div>
            }
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
