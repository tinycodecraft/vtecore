import { MRT_ColumnFiltersState, MRT_RowSelectionState, MRT_SortingState, MRT_Virtualizer } from 'mantine-react-table'
import { ApiStatusEnum } from './enums'
import {
  FetchNextPageOptions,
  InfiniteData,
  InfiniteQueryObserver,
  InfiniteQueryObserverResult,
} from '@tanstack/react-query'
import { SetStateAction } from 'react'
import {  UserListResult } from './views'

export type UploadedFileState = {
  filePath?: string
  fileDesc?: string
}

export type UploadState = {
  connectionId: string
  status: ApiStatusEnum
  progress?: number
  fileResults?: UploadedFileState[]
}

export type DownloadLinkResult = Readonly<{
  status: ApiStatusEnum
  downloadLink: string
  type: string
}>

export type FileUploadSummaryState = {
  totalFilesUploaded: number
  totalSizeUploaded: string
  filePaths: string[]
  fileDescs: string[]
}

export type MantineTableProps = Readonly<{
  type: string
  start: number
  size: number
  filtering?: MRT_ColumnFiltersState
  globalFilter?: string
  sorting?: MRT_SortingState
}>

export type ListResult<T> = Readonly<{
  start: number
  total_count: number
  data: T[]
}>

export interface ListContextProps<T> {
  ref: React.MutableRefObject<HTMLDivElement | null>
  rowRef: React.MutableRefObject<MRT_Virtualizer<HTMLDivElement, HTMLTableRowElement> | null>

  data: InfiniteData<T>
  isError: boolean
  isFetching: boolean
  isLoading: boolean
  filtering: MRT_ColumnFiltersState
  sorting: MRT_SortingState
  rowSelection: MRT_RowSelectionState
  globalFilter: string
  setFiltering: (value: SetStateAction<MRT_ColumnFiltersState>) => void
  setSorting: (value: SetStateAction<MRT_SortingState>) => void
  setGlobalFilter: (value: SetStateAction<string | undefined>) => void
  setRowSelection: (value: SetStateAction<MRT_RowSelectionState>) => void
  fetchNextPage: (options?: FetchNextPageOptions | undefined) => Promise<InfiniteQueryObserverResult<T, unknown>>
}

export type UserListContextProps = ListContextProps<UserListResult>