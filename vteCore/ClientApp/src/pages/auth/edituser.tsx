import {
  ApiErrorInit,
  ApiErrorState,
  ApiFieldEnum,
  ApiStatusEnum,
  EditUserFormInit,
  FormPostInit,
  FormPostState,
  HubInit,
  HubState,
  UserData,
} from '@/constants/types'
import { useAppDispatch, useAppSelector } from '@/hooks'
import { getUserAsync } from '@/hooks/store/dmFormSlice'
import { clsxm } from '@/utils/methods'
import { Container, Group, Input, MantineProvider, Radio } from '@mantine/core'
import { useForm } from '@mantine/form'
import { IconBadge, IconUser } from '@tabler/icons-react'
import { FunctionComponent, useCallback, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router'

export const EditUserComponent: FunctionComponent= () => {
  const loc = useLocation()
  const { token } = useAppSelector<HubState>((state) => state.dmHub ?? HubInit)
  const { status, userName } = useAppSelector<FormPostState>((state) => state.dmForm ?? FormPostInit)
  const fields = useAppSelector<ApiErrorState>((state) => state.dmField ?? ApiErrorInit)
  const dispatch = useAppDispatch()
  const editform = useForm<UserData>({ initialValues: EditUserFormInit })
  const navigate = useNavigate()
  const initHandler = async (id: string) => {
    dispatch(
      getUserAsync({
        id: id,
        handler: (data) => {
          if (!data.isError && data.value) {
            editform.setValues(data.value)
            if (data.value.isControlAdmin) editform.setFieldValue('adminType', 'Full')
            else if (data.value.isDataAdmin) editform.setFieldValue('adminType', 'Archive')
            else if (data.value.isDivisionAdmin) editform.setFieldValue('adminType', 'Division')
            else {
              editform.setFieldValue('adminType', 'None')
            }
          }
        },
      }),
    )
  }

  const submitHandler = useCallback(
    editform.onSubmit((values) => {
      let newvalues: UserData | null = null
      switch (values.adminType) {
        case 'None':
          newvalues = { ...values, ...{ isControlAdmin: false, isDataAdmin: false, isDivisionAdmin: false } }
          break
        case 'Full':
          newvalues = { ...values, ...{ isControlAdmin: true, isDataAdmin: false, isDivisionAdmin: false } }
          break
        case 'Division':
          newvalues = { ...values, ...{ isControlAdmin: false, isDataAdmin: false, isDivisionAdmin: true } }
          break
        case 'Archive':
          newvalues = { ...values, ...{ isControlAdmin: false, isDataAdmin: true, isDivisionAdmin: false } }
          break
        default:
          newvalues = { ...values, ...{ isControlAdmin: false, isDataAdmin: false, isDivisionAdmin: false } }
          break
      }
      console.log(`the password change values are: `, newvalues)
    }),
    [editform],
  )

  useEffect(() => {
    if (!token) {
      navigate('/login')
      return
    }
    initHandler(loc.state.id)
  }, [userName,loc.state])
  return (
    <MantineProvider inherit theme={{ colorScheme: 'light' }}>
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
        <div className="w-full p-6 border-t-4 border-pink-600 rounded-md border-b-4 shadow-md" data-theme="lemonade">
          <h1 className="text-3xl font-semibold text-center text-gray-700">Edit User</h1>
          <form className="space-y-4 p-5" onSubmit={submitHandler}>
            <Input.Wrapper
              error={status === ApiStatusEnum.FAILURE ? fields[ApiFieldEnum.UserId] : ''}
              id={`${ApiFieldEnum.UserId}-input`}
              withAsterisk
            >
              <Input
                required
                id={`${ApiFieldEnum.UserId}-input`}
                styles={(theme) => ({
                  icon: {
                    pointerEvents: 'auto',
                  },
                })}
                disabled={true}
                autoComplete="off"
                icon={
                  <div className="tooltip tooltip-top" data-tip="Your User Id">
                    <IconBadge size="1rem" />
                  </div>
                }
                placeholder="User Id"
                {...editform.getInputProps('userId')}
              />
            </Input.Wrapper>
            <Input.Wrapper
              error={status === ApiStatusEnum.FAILURE ? fields[ApiFieldEnum.UserName] : ''}
              id={`${ApiFieldEnum.UserName}-input`}
              withAsterisk
            >
              <Input
                required
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
                {...editform.getInputProps('userName')}
              />
            </Input.Wrapper>
            <Radio.Group
              withAsterisk
              required
              name="AdminType"
              label="Select which admin type you belong to"
              description="User Admin level"
              {...editform.getInputProps('adminType')}
            >
              <Group mt="xs">
                <Radio value="None" label="None" />
                <Radio value="Full" label="Control Admin" />
                <Radio value="Division" label="Division Admin" />
                <Radio value="Archive" label="Data Admin" />
              </Group>
            </Radio.Group>
          </form>
        </div>
      </Container>
    </MantineProvider>
  )
}
