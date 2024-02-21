import { LoginApi } from '@/api/login.service'
import { HubInit, HubState, UserListContextProps, UserListResult } from '@/constants/types'
import { useAppSelector } from '@/hooks'
import { useInfiniteQuery } from '@tanstack/react-query'

import { MRT_ColumnFiltersState, MRT_SortingState, MRT_Virtualizer } from 'mantine-react-table'
import { createContext, PropsWithChildren, useRef, useState } from 'react'

const UserTableContext = createContext<Partial<UserListContextProps>>({})

export const UserTableContextProvider = ({ children, fetchSize, token, refreshToken }: PropsWithChildren<{ fetchSize: number, token: string, refreshToken: string }>) => {
  const tableRef = useRef<HTMLDivElement | null>(null)
  const rowRef = useRef<MRT_Virtualizer<HTMLDivElement, HTMLTableRowElement> | null>(null)
  const [columnFilters, setColumnFilters] = useState<MRT_ColumnFiltersState>([])
  const [globalFilter, setGlobalFilter] = useState<string>()
  const [sorting, setSorting] = useState<MRT_SortingState>([])


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
        setFiltering: setColumnFilters,
        setSorting,
        globalFilter,
        setGlobalFilter,
        ref: tableRef,
        rowRef,
        fetchNextPage,
      }}
    >
      {children}
    </UserTableContext.Provider>
  )
}

export default UserTableContext
