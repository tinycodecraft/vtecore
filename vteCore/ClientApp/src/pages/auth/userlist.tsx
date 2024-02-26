import { UserTableContextProvider } from '@/components/context/CtxForUserTable'
import UserDataTable from '@/components/table/userDataTable'
import { ApiErrorInit, ApiErrorState, HubInit, HubState, UserData } from '@/constants/types'
import { useAppDispatch, useAppSelector } from '@/hooks'
import { clsxm } from '@/utils/methods'
import { Container, MantineProvider } from '@mantine/core'
import { FunctionComponent, useCallback, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router'
import { toast } from 'react-toastify'

export const UserListComponent: FunctionComponent = () => {
  const fields = useAppSelector<ApiErrorState>((state) => state.dmField ?? ApiErrorInit)

  const { token, userName, refreshToken } = useAppSelector<HubState>((state) => state.dmHub ?? HubInit)
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const toastId = useRef<string | number | null>(null)

  const toastHandler = useCallback((message: string) => {
    if (!toastId || !toastId.current) {
      toastId.current = toast(message, { position: 'top-center' })
    }
  }, [])
  const editHandler = useCallback(
    (value: UserData) => {
      if (value) {
        console.log(`try to edit the user id`, value.userId)
        navigate('/edituser', { state: { id: value.userId } })
      }
    },
    [token],
  )
  const deleteHandler = useCallback(
    (values: UserData[]) => {
      if (values && values.length > 0) {
        console.log(`remove the user ids`, values)
      }
    },
    [token],
  )

  useEffect(() => {
    console.log(`the status: `, status, fields)
    if (!token) {
      navigate('/login')
      return
    }
  }, [fields, token])

  return (
    <MantineProvider inherit theme={{ colorScheme: 'light' }}>
      <Container
        fluid={true}
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
          {token && refreshToken && (
            <UserTableContextProvider
              fetchSize={20}
              token={token}
              refreshToken={refreshToken}
              handleEdit={editHandler}
              handleDelete={deleteHandler}
            >
              <UserDataTable />
            </UserTableContextProvider>
          )}
        </div>
      </Container>
    </MantineProvider>
  )
}
