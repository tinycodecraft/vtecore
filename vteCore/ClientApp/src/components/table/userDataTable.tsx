import React, { UIEvent, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import UserTableContext from '@/components/context/CtxForUserTable'
import { MRT_SelectCheckbox, MantineReactTable, useMantineReactTable } from 'mantine-react-table'
import { UserDataColumns } from './userDataColumns'
import { ActionIcon, Button, Flex, Group, SegmentedControl, Text, Tooltip } from '@mantine/core'
import {
  IconCross,
  IconEdit,
  IconEraser,
  IconFileExport,
  IconPlus,
  IconRowRemove,
  IconTrash,
  IconX,
} from '@tabler/icons-react'
import { AddControl } from '@/components/layout/mnAddBtn'
import { ExportControl } from '@/components/layout/mnExportBtn'
import { ApiFieldEnum, ApiStatusEnum, FormPostInit, FormPostState } from '@/constants/types'
import { useAppSelector } from '@/hooks'

const UserDataTable = () => {
  const {
    data,
    fetchNextPage,
    filtering,
    rowSelection,
    globalFilter,
    isError,
    isFetching,
    ref,
    rowRef,
    isLoading,
    withDisabled,
    setWithDisabled,
    setFiltering,
    setGlobalFilter,
    setSorting,
    setRowSelection,
    sorting,
    handleDelete,
    handleEdit,
    handleNew,
    getDoubleClick,
    refetch,
    handleExport,
  } = useContext(UserTableContext)

  const flatData = useMemo(() => data?.pages.flatMap((page) => page.data) ?? [], [data])
  const { status } = useAppSelector<FormPostState>((state) => state.dmForm ?? FormPostInit)

  const totalDBRowCount = data?.pages?.[0]?.total_count ?? 0
  const totalFetched = flatData.length

  // called on scroll and possibly on mount to fetch more data as the user scrolls and reaches bottom of table
  const fetchMoreOnBottomReached = useCallback(
    (containerRefElement?: HTMLDivElement | null) => {
      if (containerRefElement) {
        const { scrollHeight, scrollTop, clientHeight } = containerRefElement
        // once the user has scrolled within 400px of the bottom of the table, fetch more data if we can
        if (scrollHeight - scrollTop - clientHeight < 400 && !isFetching && totalFetched < totalDBRowCount) {
          fetchNextPage && fetchNextPage()
        }
      }
    },
    [fetchNextPage, isFetching, totalFetched, totalDBRowCount],
  )

  // scroll to top of table when sorting or filters change
  useEffect(() => {
    if (rowRef) {
      if (rowRef.current) {
        try {
          rowRef.current.scrollToIndex(0)
        } catch (e) {
          console.error(e)
        }
      }
    }
  }, [sorting, filtering, globalFilter, rowRef])

  // a check on mount to see if the table is already scrolled to the bottom and immediately needs to fetch more data
  useEffect(() => {
    if (ref) {
      fetchMoreOnBottomReached(ref.current)
    }
  }, [fetchMoreOnBottomReached, ref])

  useEffect(() => {
    if (status === ApiStatusEnum.SUCCESS || status === ApiStatusEnum.FAILURE) {
      refetch && refetch()
    }
  }, [status])

  const table = useMantineReactTable({
    initialState: {
      density: 'xs',
    },
    enableRowActions: !!handleEdit,
    positionActionsColumn: 'last',
    renderRowActions: ({ row }) =>
      !!handleEdit && (
        <Flex justify="space-between">
          <button
            type="button"
            className="border flex items-center border-red-300 bg-red-300 rounded-md px-4 py-2 transition duration-500 ease select-none hover:bg-red-400 focus:outline-none focus:shadow-outline"
            onClick={() => handleEdit && handleEdit(row.original)}
          >
            <IconEdit /> Edit
          </button>
        </Flex>
      ),
    columns: UserDataColumns,
    data: flatData,
    enableRowSelection: true,
    enableColumnResizing: true,
    enableDensityToggle: false,
    enablePagination: false,
    enableRowNumbers: false,
    enableFullScreenToggle: false,
    enableHiding: false,
    enableRowVirtualization: true, // optional, but recommended if it is likely going to be more than 100 rows
    manualFiltering: true,
    manualSorting: true,
    mantineTableBodyRowProps: ({ row }) => ({
      onDoubleClick: getDoubleClick && getDoubleClick(row.original),
    }),
    positionToolbarAlertBanner: 'head-overlay',
    renderTopToolbarCustomActions: () => (
      <Group>
        <AddControl label="Add" clickHandler={(e) => handleNew && handleNew()} tooltip="Add User" className='mx-2' />
        <ExportControl
          label="Export"
          clickHandler={(e) =>
            handleExport &&
            handleExport({
              start: 0,
              size: totalDBRowCount,
              type: ApiFieldEnum.exportUsers,
              filtering,
              globalFilter,
              sorting,
              withDisabled,
            })
          }
          tooltip="Export All"
          className='ml-2 mr-4' 
        />

        <SegmentedControl
          data={[
            { label: 'All', value: 'all' },
            { label: 'Active Only', value: 'active' },
          ]}
          value={withDisabled ? 'all' : 'active'}
          onChange={(value) => setWithDisabled && setWithDisabled(value === 'all')}
          className="ml-4"
        />
      </Group>
    ),
    renderToolbarAlertBannerContent: ({ selectedAlert, table }) => (
      <Flex justify="space-between">
        <Flex p="6px" gap="xl">
          <MRT_SelectCheckbox selectAll table={table} />
          {selectedAlert}{' '}
        </Flex>
        <Flex gap="xs">

          {!!handleDelete && table.getSelectedRowModel().rows.length > 0 && (
            <button
              type="button"
              className="border flex items-center border-pink-500 bg-pink-500 rounded-md px-4 py-2 transition duration-500 ease select-none hover:bg-pink-300 focus:outline-none focus:shadow-outline"
              onClick={() => handleDelete && handleDelete(table.getSelectedRowModel().rows.map((e) => e.original))}
            >
              <IconTrash /> Remove Selected
            </button>
          )}
        </Flex>
      </Flex>
    ),
    mantineTableContainerProps: {
      ref, // get access to the table container element
      sx: { maxHeight: '500px' }, // give the table a max height
      onScroll: (
        event: UIEvent<HTMLDivElement>, // add an event listener to the table container element
      ) => fetchMoreOnBottomReached(event.target as HTMLDivElement),
    },

    mantineFilterDateInputProps: {
      valueFormat: 'DD/MM/YYYY',
      // maxDate, minDate, dateParser
    },
    onColumnFiltersChange: setFiltering,
    onGlobalFilterChange: setGlobalFilter,
    onSortingChange: setSorting,

    onRowSelectionChange: setRowSelection,
    renderBottomToolbarCustomActions: () => (
      <Text>
        Fetched {totalFetched} of {totalDBRowCount} total rows.
      </Text>
    ),
    state: {
      columnFilters: filtering,
      globalFilter,
      isLoading,
      showAlertBanner: isError,
      showProgressBars: isFetching,
      sorting,
      rowSelection,
    },
    rowVirtualizerInstanceRef: rowRef, // get access to the virtualizer instance
    rowVirtualizerProps: { overscan: 10 },
  })

  return <MantineReactTable table={table} />
}

export default UserDataTable
