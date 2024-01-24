import { LoginFormInit, LoginProps } from '@/constants/types'
import { useForm } from '@mantine/form'
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
      data-theme="dark"
    >
      <div className="w-full p-6 bg-white border-t-4 border-gray-600 rounded-md shadow-md border-top lg:max-w-lg">
        <h1 className="text-3xl font-semibold text-center text-gray-700">DaisyUI</h1>
        <form className="space-y-4 p-5" onSubmit={loginForm.onSubmit((values) => setLoginValues(values))}>
          <div>
            <label className="label">
              <span className="text-base label-text">User Name</span>
            </label>
            <input
              type="text"
              placeholder="User Name"
              className="w-full input input-bordered bg-info"
              {...loginForm.getInputProps('UserName')}
            />
          </div>
          <div>
            <label className="label">
              <span className="text-base label-text">Password</span>
            </label>
            <input
              type="password"
              placeholder="Enter Password"
              className="w-full input input-bordered bg-info"
              {...loginForm.getInputProps('Password')}
            />
          </div>
          <a href="#" className="text-xs text-gray-600 hover:underline hover:text-blue-600">
            Forget Password?
          </a>
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
