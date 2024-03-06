import { LoginApi } from '@/api/login.service'
import { HubInit, HubState, ListResult, UserData, UserListContextProps, UserListResult } from '@/constants/types'
import { useAppSelector } from '@/hooks'
import { useInfiniteQuery } from '@tanstack/react-query'

import { MRT_ColumnFiltersState, MRT_Row, MRT_RowSelectionState, MRT_SortingState, MRT_Virtualizer } from 'mantine-react-table'
import { createContext, PropsWithChildren, useRef, useState } from 'react'

const UserTableContext = createContext<Partial<UserListContextProps>>({})

type HandlerForEdit = (value: UserData) => void
type HandlerForDelete = (values: UserData[]) => void
type HandlerForNew = ()=> void

export const UserTableContextProvider = ({
  children,
  fetchSize,
  token,
  refreshToken,
  handleDelete,
  handleEdit,
  getDoubleClick,
  handleNew
}: PropsWithChildren<{
  fetchSize: number
  token: string
  refreshToken: string
  handleEdit: HandlerForEdit
  handleDelete: HandlerForDelete,
  handleNew?: HandlerForNew
  getDoubleClick: (row: UserData) => React.MouseEventHandler<HTMLTableRowElement>
}>) => {
  const tableRef = useRef<HTMLDivElement | null>(null)
  const rowRef = useRef<MRT_Virtualizer<HTMLDivElement, HTMLTableRowElement> | null>(null)
  const [columnFilters, setColumnFilters] = useState<MRT_ColumnFiltersState>([])
  const [globalFilter, setGlobalFilter] = useState<string>()
  const [sorting, setSorting] = useState<MRT_SortingState>([])
  const [rowSelection, setRowSelection] = useState<MRT_RowSelectionState>({})

  const { data, fetchNextPage, isError, isFetching, isLoading } = useInfiniteQuery<UserListResult>({
    queryKey: ['table-user', columnFilters, globalFilter, sorting],
    getNextPageParam: (_lastGroup, groups) => groups.length,
    queryFn: async ({ pageParam = 0 }) => {
      console.log(`the filter values of columns`, columnFilters)

      LoginApi.token = token
      LoginApi.refreshToken = refreshToken
      const response = await LoginApi.listAsync({
        type: 'usertable',
        start: pageParam * fetchSize,
        size: fetchSize,
        filtering: columnFilters,
        globalFilter,
        sorting,
      })

      if (response.isError) {
        console.log(`the response has error`, response.errors)
      }
      console.log(`the response value is :`, response.value)
      return response.value!
    },
    keepPreviousData: true,
    refetchOnWindowFocus: false,
  })

  return (
    <UserTableContext.Provider
      value={{
        data,
        isError,
        isFetching,
        isLoading,
        filtering: columnFilters,
        sorting,
        rowSelection,
        setFiltering: setColumnFilters,
        setRowSelection,
        setSorting,
        globalFilter,
        setGlobalFilter,
        ref: tableRef,
        rowRef,
        fetchNextPage,
        handleDelete,
        handleEdit,
        handleNew,
        getDoubleClick
      }}
    >
      {children}
    </UserTableContext.Provider>
  )
}

export default UserTableContext
