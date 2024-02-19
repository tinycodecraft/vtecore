import {
  ApiErrorInit,
  ApiErrorState,
  ApiFieldEnum,
  ApiStatusEnum,
  FormPostInit,
  FormPostState,
  HubInit,
  HubState,
  LoginFormInit,
  LoginProps,
} from '@/constants/types'
import { useAppDispatch, useAppSelector } from '@/hooks'
import { changePsswdAsync } from '@/hooks/store/dmFormSlice'
import { clsxm } from '@/utils/methods'
import { Container, Input } from '@mantine/core'
import { useForm } from '@mantine/form'
import { IconEye, IconEyeClosed, IconLoader2, IconPassword, IconUser } from '@tabler/icons-react'
import React, { FunctionComponent, useCallback, useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router'
import { toast } from 'react-toastify'

export const ChangePasswordComponent: FunctionComponent = () => {
  const [psswdValues, setPsswdValues] = useState<LoginProps>()
  const [visible, setVisible] = useState(false)
  const fields = useAppSelector<ApiErrorState>((state) => state.dmField ?? ApiErrorInit)
  const { status,userName:returnUserName } = useAppSelector<FormPostState>((state) => state.dmForm ?? FormPostInit)
  const { token, userName } = useAppSelector<HubState>((state) => state.dmHub ?? HubInit)
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const toastId = useRef<string | number | null>(null)
  const psswdForm = useForm<LoginProps>({
    initialValues: {
      userName: userName,
      password: '',
      forSignup: false,
    },
  })
  const toastHandler = useCallback((message: string) => {
    if (!toastId || !toastId.current) {
      toastId.current = toast(message, { position: 'top-center' })
    }
  }, [])
  const submitHandler = useCallback(
    psswdForm.onSubmit((values) => {
      console.log(`the password change values are: `, values)
      setPsswdValues(values)
      dispatch(changePsswdAsync(values))
    }),
    [psswdValues, psswdForm],
  )

  useEffect(() => {
    if (!token) {
      navigate('/login')
    }
  }, [status, fields, token])

  return (
    <Container
      className={clsxm(
        'relative',
        'flex',
        'flex-col',
        'items-center',
        'justify-center',
        'overflow-hidden',
        'py-10',
        'round-lg',
      )}
    >
      <div
        className="w-full p-6 border-t-4 border-pink-600 rounded-md border-b-4 shadow-md lg:max-w-lg"
        data-theme="lemonade"
      >
        <h1 className="text-3xl font-semibold text-center text-gray-700">Change Password</h1>
        <form className="space-y-4 p-5" onSubmit={submitHandler}>
          <Input.Wrapper
            error={status === ApiStatusEnum.FAILURE ? fields[ApiFieldEnum.UserName] : ''}
            id={`${ApiFieldEnum.UserName}-input`}
          >
            <Input
              id={`${ApiFieldEnum.UserName}-input`}
              styles={(theme) => ({
                icon: {
                  pointerEvents: 'auto',
                },
              })}
              disabled={true}
              autoComplete="off"
              icon={
                <div className="tooltip tooltip-top" data-tip="Your Name">
                  <IconUser size="1rem" />
                </div>
              }
              placeholder="User Name"
              {...psswdForm.getInputProps('userName')}
            />
          </Input.Wrapper>
          <Input.Wrapper
            error={status === ApiStatusEnum.FAILURE ? fields[ApiFieldEnum.Password] : ''}
            id={`${ApiFieldEnum.Password}-input`}
          >
            <Input
              id={`${ApiFieldEnum.Password}-input`}
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
              
              autoComplete="off"
              icon={
                <div className="tooltip tooltip-top" data-tip="Old password">
                  <IconPassword size="1rem" />
                </div>
              }

              rightSection={
                visible ? (
                    <IconEye onClick={() => setVisible(false)} />
                  ) : (
                    <IconEyeClosed onClick={() => setVisible(true)} />
                  )
              }

              placeholder="Old Password"
              {...psswdForm.getInputProps('password')}
            />
          </Input.Wrapper>   

          <Input.Wrapper
            error={status === ApiStatusEnum.FAILURE ? fields[ApiFieldEnum.NewPassword] : ''}
            id={`${ApiFieldEnum.NewPassword}-input`}
          >
            <Input
              id={`${ApiFieldEnum.NewPassword}-input`}
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
              
              autoComplete="off"
              icon={
                <div className="tooltip tooltip-top" data-tip="New password">
                  <IconPassword size="1rem" />
                </div>
              }

              rightSection={
                visible ? (
                    <IconEye onClick={() => setVisible(false)} />
                  ) : (
                    <IconEyeClosed onClick={() => setVisible(true)} />
                  )
              }

              placeholder="New Password"
              {...psswdForm.getInputProps('newPassword')}
            />
          </Input.Wrapper>  
          <Input.Wrapper
            error={status === ApiStatusEnum.FAILURE ? fields[ApiFieldEnum.ConfirmPassword] : ''}
            id={`${ApiFieldEnum.ConfirmPassword}-input`}
          >
            <Input
              id={`${ApiFieldEnum.ConfirmPassword}-input`}
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
              
              autoComplete="off"
              icon={
                <div className="tooltip tooltip-top" data-tip="Confirm password">
                  <IconPassword size="1rem" />
                </div>
              }

              rightSection={
                visible ? (
                    <IconEye onClick={() => setVisible(false)} />
                  ) : (
                    <IconEyeClosed onClick={() => setVisible(true)} />
                  )
              }

              placeholder="Confirm Password"
              {...psswdForm.getInputProps('confirmPassword')}
            />
          </Input.Wrapper>                           
          <div>
            <button type='submit' className='btn btn-block bg-green-300 hover:bg-blue-400'>
                Change { status === ApiStatusEnum.PROCESS && <IconLoader2  className='motion-safe:animate-load-turn' />}
            </button>
        </div>   
        </form>
      </div>
    </Container>
  )
}
