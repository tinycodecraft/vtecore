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
import { IconUser } from '@tabler/icons-react'
import React, { FunctionComponent, useCallback, useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router'
import { toast } from 'react-toastify'

export const ChangePasswordComponent: FunctionComponent = () => {
  const [psswdValues, setPsswdValues] = useState<LoginProps>()
  const fields = useAppSelector<ApiErrorState>((state) => state.dmField ?? ApiErrorInit)
  const { status } = useAppSelector<FormPostState>((state) => state.dmForm ?? FormPostInit)
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
        data-theme="coffee"
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
        </form>
      </div>
    </Container>
  )
}
