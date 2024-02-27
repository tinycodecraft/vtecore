import { MRT_ColumnFiltersState, MRT_RowSelectionState, MRT_SortingState, MRT_Virtualizer } from 'mantine-react-table'
import { ApiStatusEnum, ErrorEnum } from './enums'
import {
  FetchNextPageOptions,
  InfiniteData,
  InfiniteQueryObserver,
  InfiniteQueryObserverResult,
} from '@tanstack/react-query'
import { SetStateAction } from 'react'
import { UserData, UserListResult } from './views'

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

export type LabelDetail = Readonly<{
  value: string
  label: string
}>

export type ErrorDetail = Readonly<{
  code: string
  description: string
  type: ErrorEnum | number
  numericType: number
}>

export type ErrorOr<T> = Readonly<{
  status?: ApiStatusEnum
  isError: boolean
  errors: ErrorDetail[]
  value?: T
}>

export type UnsubscribeFunc = () => void
export type receiveHandlerType<T> = (data: ErrorOr<T>) => void

export type QueryForm<T> = Readonly<{
  id: string
  handler: receiveHandlerType<T>
}>



export interface ListContextProps<T> {
  ref: React.MutableRefObject<HTMLDivElement | null>
  rowRef: React.MutableRefObject<MRT_Virtualizer<HTMLDivElement, HTMLTableRowElement> | null>

  data: InfiniteData<ListResult<T>>
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
  fetchNextPage: (
    options?: FetchNextPageOptions | undefined,
  ) => Promise<InfiniteQueryObserverResult<ListResult<T>, unknown>>
  handleEdit: (value: T) => void
  handleDelete: (values: T[]) => void
}

export type UserListContextProps = ListContextProps<UserData>
