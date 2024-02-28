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
  LabelDetail,
  UserData,
} from '@/constants/types'
import { useAppDispatch, useAppSelector } from '@/hooks'
import { getUserAsync, getUserLevelAsync, saveUserAsync } from '@/hooks/store/dmFormSlice'
import { clsxm } from '@/utils/methods'
import { Container, Group, Input, MantineProvider, NativeSelect, Radio, Select } from '@mantine/core'
import { useForm } from '@mantine/form'
import { IconBadge, IconBrightness2, IconLoader2, IconManualGearbox, IconUser } from '@tabler/icons-react'
import { FunctionComponent, useCallback, useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router'

export const EditUserComponent: FunctionComponent = () => {
  const loc = useLocation()
  const [userLevels, setUserLevels] = useState<LabelDetail[]>([])
  const [saved, setSaved] = useState<boolean>(false)
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
            console.log(`the user value of field level return: `, editform.getInputProps('level'))
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
    dispatch(
      getUserLevelAsync({
        id: 'UserLevel',
        handler: (data) => {
          if (data.value) {
            setUserLevels(data.value)
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

      if (newvalues) {
        dispatch(
          saveUserAsync({
            data: newvalues,
            handler: (result) => {
              console.log(`the result saved!`, result)
              setSaved(!result.isError)
              return result.isError
            },
          }),
        )
      }
    }),
    [editform],
  )

  useEffect(() => {
    if (!token) {
      navigate('/login')
      return
    }
    if (saved) {
      navigate('/userlist')
    }
    initHandler(loc.state.id)
  }, [token, loc.state.id, saved])
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
            <Input.Wrapper
              error={status === ApiStatusEnum.FAILURE ? fields[ApiFieldEnum.Post] : ''}
              id={`${ApiFieldEnum.Post}-input`}
              withAsterisk
            >
              <Input
                
                id={`${ApiFieldEnum.Post}-input`}
                styles={(theme) => ({
                  icon: {
                    pointerEvents: 'auto',
                  },
                })}
                autoComplete="off"
                icon={
                  <div className="tooltip tooltip-top" data-tip="Your Post">
                    <IconManualGearbox size="1rem" />
                  </div>
                }
                placeholder="Your Post"
                {...editform.getInputProps('post')}
              />
            </Input.Wrapper>
            <Input.Wrapper
              error={status === ApiStatusEnum.FAILURE ? fields[ApiFieldEnum.Division] : ''}
              id={`${ApiFieldEnum.Division}-input`}
              withAsterisk
            >
              <Input
                
                id={`${ApiFieldEnum.Division}-input`}
                styles={(theme) => ({
                  icon: {
                    pointerEvents: 'auto',
                  },
                })}
                autoComplete="off"
                icon={
                  <div className="tooltip tooltip-top" data-tip="Division">
                    <IconManualGearbox size="1rem" />
                  </div>
                }
                placeholder="Your Division"
                {...editform.getInputProps('division')}
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
            <NativeSelect
              data={userLevels}
              label="Your User Level"
              error={status === ApiStatusEnum.FAILURE ? fields[ApiFieldEnum.level] : ''}
              withAsterisk
              styles={(theme) => ({
                icon: {
                  pointerEvents: 'auto',
                },
              })}
              icon={
                <div className="tooltip tooltip-top" data-tip="Your Operation level">
                  <IconBrightness2 size="1rem" />
                </div>
              }
              {...editform.getInputProps('level')}
            />
            <div>
              <button type="submit" className="btn btn-block bg-green-300 hover:bg-blue-400">
                Save {status === ApiStatusEnum.PROCESS && <IconLoader2 className="motion-safe:animate-load-turn" />}
              </button>
            </div>
          </form>
        </div>
      </Container>
    </MantineProvider>
  )
}
