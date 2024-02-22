import React, { UIEvent, useCallback, useContext, useEffect, useMemo } from 'react'
import UserTableContext from '@/components/context/CtxForUserTable'
import { MRT_SelectCheckbox, MantineReactTable, useMantineReactTable } from 'mantine-react-table'
import { UserDataColumns } from './userDataColumns'
import { ActionIcon, Button, Flex, Text, Tooltip } from '@mantine/core'
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
    setFiltering,
    setGlobalFilter,
    setSorting,
    setRowSelection,
    sorting,
  } = useContext(UserTableContext)

  const flatData = useMemo(() => data?.pages.flatMap((page) => page.data) ?? [], [data])

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

  const table = useMantineReactTable({
    initialState: {
      density: 'xs',
    },
    enableRowActions: true,
    positionActionsColumn: 'last',
    renderRowActions: ({ row }) => (
      <div style={{ display: 'flex', flexWrap: 'nowrap', gap: '2px' }}>
        <button className="btn btn-xs  btn-info">
          <IconEdit className="size-3" />
          Edit
        </button>
        <button className="btn btn-xs  btn-error">
          <IconRowRemove className="size-3" /> Delete
        </button>
      </div>
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
    positionToolbarAlertBanner: 'head-overlay',
    renderTopToolbarCustomActions: () => (
      <Tooltip label="Create New User">
        <ActionIcon>
          <IconPlus />
        </ActionIcon>
      </Tooltip>
    ),
    renderToolbarAlertBannerContent: ({ selectedAlert, table }) => (
      <Flex justify="space-between">
        <Flex p="6px" gap="xl">
          <MRT_SelectCheckbox selectAll table={table} />
          {selectedAlert}{' '}
        </Flex>
        <Flex gap="xs">
          <button
            type="button"
            className="border flex items-center border-green-500 bg-green-500 rounded-md px-4 py-2 transition duration-500 ease select-none hover:bg-green-300 focus:outline-none focus:shadow-outline"
          >
            <IconFileExport /> Export Selected
          </button>
          <button
            type="button"
            className="border flex items-center border-pink-500 bg-pink-500 rounded-md px-4 py-2 transition duration-500 ease select-none hover:bg-pink-300 focus:outline-none focus:shadow-outline"
          >
            <IconTrash /> Remove Selected
          </button>
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
