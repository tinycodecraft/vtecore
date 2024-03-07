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
  ToastEnum,
  UserData,
} from '@/constants/types'
import { makeToast, useAppDispatch, useAppSelector } from '@/hooks'
import { getUserAsync, getUserLevelAsync, saveUserAsync } from '@/hooks/store/dmFormSlice'
import { clsxm } from '@/utils/methods'
import { Container, Group, Input, MantineProvider, NativeSelect, Radio, Select, SimpleGrid } from '@mantine/core'
import { useForm } from '@mantine/form'
import RSelect, { CSSObjectWithLabel } from 'react-select'
import {
  IconBadge,
  IconBrightness2,
  IconChevronDown,
  IconLoader2,
  IconManualGearbox,
  IconUser,
} from '@tabler/icons-react'
import { FunctionComponent, useCallback, useEffect, useRef, useState } from 'react'
import { useLocation, useNavigate } from 'react-router'
import useMenuLinkStyle from '@/constants/styles/mnMenuLink'
import { toast } from 'react-toastify'
import { clearError } from '@/hooks/store/dmFieldSlice'

export const EditUserComponent: FunctionComponent = () => {
  const loc = useLocation()
  const { classes: menuLinkStyle, theme } = useMenuLinkStyle()
  const [userLevels, setUserLevels] = useState<LabelDetail[]>([])
  const [saved, setSaved] = useState<boolean>(false)
  const { token } = useAppSelector<HubState>((state) => state.dmHub ?? HubInit)
  const { status, userName } = useAppSelector<FormPostState>((state) => state.dmForm ?? FormPostInit)
  const fields = useAppSelector<ApiErrorState>((state) => state.dmField ?? ApiErrorInit)
  const dispatch = useAppDispatch()
  const editform = useForm<UserData>({ initialValues: EditUserFormInit })
  const navigate = useNavigate()
  const toastError = makeToast({ type: ToastEnum.Error })

  const newHandler = async () => {
    console.log(`the new user called!`)
    editform.setFieldValue('adminType', 'None')
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
    if (loc.state.id) {
      console.log(`try to initHandler`)
      initHandler(loc.state.id)
    } else {
      newHandler()
    }
  }, [token, loc.state.id, saved])

  useEffect(() => {
    console.log(`the save has error!`, fields)
    if (fields[ApiFieldEnum.SaveUser]) {
      toastError(fields[ApiFieldEnum.SaveUser])
    }
  }, [fields])

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
            <SimpleGrid cols={2} spacing={'xs'} verticalSpacing={'xs'}>
              <Input.Wrapper
                error={status === ApiStatusEnum.FAILURE ? fields[ApiFieldEnum.UserId] : ''}
                id={`${ApiFieldEnum.UserId}-input`}
                withAsterisk
                required
              >
                <Input
                  required
                  id={`${ApiFieldEnum.UserId}-input`}
                  styles={(theme) => ({
                    icon: {
                      pointerEvents: 'auto',
                    },
                  })}
                  disabled={!(Number(editform.getInputProps('id').value) === 0)}
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
                  disabled={!(Number(editform.getInputProps('id').value) === 0)}
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
            </SimpleGrid>

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
            <Input.Wrapper
              label="Your User Level"
              error={status === ApiStatusEnum.FAILURE ? fields[ApiFieldEnum.level] : ''}
              withAsterisk
            >
              <RSelect
                styles={{
                  dropdownIndicator: (base, state) =>
                    ({
                      ...base,
                      transition: 'all .2s ease',
                      transform: state.selectProps.menuIsOpen ? ['rotate(180deg)'] : [],
                    } as CSSObjectWithLabel),
                  control: (baseStyles, state) =>
                    ({
                      ...baseStyles,
                      borderColor: state.isFocused ? 'rgba(9,211,172,0.75)' : 'rgb(206, 212, 218)',
                      boxShadow: state.isFocused ? 'rgb(9, 211, 172, 0.225) 0px 0px 0px 0.2rem' : 'inherit',
                    } as CSSObjectWithLabel),
                  option: (baseStyles, state) =>
                    ({
                      ...baseStyles,
                      backgroundColor: state.isSelected ? '#09d3ac' : 'inherit',

                      ':hover': {
                        backgroundColor: state.isSelected ? '#09d3ac' : 'rgba(9,211,172,0.224)',
                      },
                    } as CSSObjectWithLabel),
                }}
                options={userLevels}
                defaultValue={userLevels.find((e) => editform.getInputProps('level').value == e.value)}
                value={userLevels.find((e) => editform.getInputProps('level').value == e.value)}
                onChange={(item) => item && editform.getInputProps('level').onChange(item.value)}
              />
            </Input.Wrapper>
            {/* <NativeSelect
              
              data={userLevels}
              label="Your User Level"
              error={status === ApiStatusEnum.FAILURE ? fields[ApiFieldEnum.level] : ''}
              withAsterisk
              styles={(theme) => ({
                icon: {
                  pointerEvents: 'auto',
                },
              })}
              className={menuLinkStyle.select}
              icon={
                <div className="tooltip tooltip-top" data-tip="Your Operation level">
                  <IconBrightness2 size="1rem" />
                </div>
              }
              rightSection={<IconChevronDown size={16} color={theme.fn.primaryColor()} className="arrow" />}
              {...editform.getInputProps('level')}
              
            /> */}
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
