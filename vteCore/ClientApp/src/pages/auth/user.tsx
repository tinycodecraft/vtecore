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
import { getUserAsync, getUserLevelAsync } from '@/hooks/store/dmFormSlice'
import { clsxm } from '@/utils/methods'
import styled from '@emotion/styled'
import { Container, Group, Input, MantineProvider, NativeSelect, Radio, SimpleGrid } from '@mantine/core'
import { useForm } from '@mantine/form'
import { IconBadge, IconBriefcase2, IconManualGearbox, IconUser } from '@tabler/icons-react'
import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router'

export const UserComponent = () => {
  const loc = useLocation()
  const [userLevels, setUserLevels] = useState<LabelDetail[]>([])
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

  useEffect(() => {
    if (!token) {
      navigate('/login')
      return
    }
    initHandler(loc.state.id)
  }, [token, loc.state.id])

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
          <h1 className="text-3xl font-semibold text-center text-gray-700">User ({`${editform.values.userId}`})</h1>
          <form className="space-y-4 p-5">
            <SimpleGrid cols={2} spacing={'xs'} verticalSpacing={'xs'}>
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
                  readOnly
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
                  readOnly
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
            <SimpleGrid cols={2} spacing={'xs'} verticalSpacing={'xs'}>
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
                  readOnly
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
                  readOnly
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
            </SimpleGrid>
            <Radio.Group
              withAsterisk
              required
              name="AdminType"
              label="Select which admin type you belong to"
              description="User Admin level"
              {...editform.getInputProps('adminType')}
            >
              <Group mt="xs">
                <Radio value="None" label="None" disabled />
                <Radio value="Full" label="Control Admin" disabled />
                <Radio value="Division" label="Division Admin" disabled />
                <Radio value="Archive" label="Data Admin" disabled />
              </Group>
            </Radio.Group>
            <NativeSelect
              color="dark.9"
              data={userLevels}
              label="Your User Level"
              error={status === ApiStatusEnum.FAILURE ? fields[ApiFieldEnum.level] : ''}
              withAsterisk
              disabled={true}
              styles={(theme) => ({
                icon: {
                  pointerEvents: 'auto',
                },
              })}
              icon={
                <div className="tooltip tooltip-top" data-tip="Your Operation level">
                  <IconBriefcase2 size="1rem" />
                </div>
              }
              {...editform.getInputProps('level')}
            />
          </form>
        </div>
      </Container>
    </MantineProvider>
  )
}
