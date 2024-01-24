import { LoginFormInit, LoginProps } from '@/constants/types'
import { Input, Tooltip } from '@mantine/core'
import { useForm } from '@mantine/form'
import { IconAlertCircle, IconLock, IconUser } from '@tabler/icons-react'
import React, { FunctionComponent, useEffect, useState } from 'react'

const LoginForm: FunctionComponent = () => {
  const [loginValues, setLoginValues] = useState<LoginProps>()
  const loginForm = useForm({
    initialValues: LoginFormInit,
  })

  useEffect(() => {
    console.log(`the values submitted: `, loginValues)
  }, [loginValues])

  return (
    <div
      className="relative flex flex-col items-center justify-center overflow-hidden py-10 rounded-lg"
      data-theme="coffee"
    >
      <div className="w-full p-6 border-t-4 border-pink-600 rounded-md border-b-4 shadow-md lg:max-w-lg">
        <h1 className="text-3xl font-semibold text-center text-gray-700">DaisyUI</h1>
        <form className="space-y-4 p-5" onSubmit={loginForm.onSubmit((values) => setLoginValues(values))}>
          <Input
            icon={<IconUser size="1rem" />}
            placeholder="User Name"
            rightSection={
              <Tooltip label="Please enter user name" position="top-end" withArrow>
                <div>
                  <IconAlertCircle size="1rem" style={{ display: 'block', opacity: 0.5 }} />
                </div>
              </Tooltip>
            }
            {...loginForm.getInputProps('UserName')}
          />

          <Input
            icon={<IconLock size="1rem" />}
            placeholder="Password"
            rightSection={
              <Tooltip label="Please enter password" position="top-end" withArrow>
                <div>
                  <IconAlertCircle size="1rem" style={{ display: 'block', opacity: 0.5 }} />
                </div>
              </Tooltip>
            }
            {...loginForm.getInputProps('Password')}
          />
          <div>
            <button type="submit" className="btn btn-block">
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default LoginForm
