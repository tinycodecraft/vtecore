import { AnchorHTMLAttributes, ComponentType, SetStateAction } from 'react'

import { SelectItemProps } from '@mantine/core'
import { ApiStatusEnum } from './enums'
import { TRANSITION_DEFAULT } from './values'
import { Params } from 'react-router'

export const LINK_ATTRIBUTES: AnchorHTMLAttributes<HTMLAnchorElement> = {
  role: 'button',
  target: '_blank',
  rel: 'noopener noreferrer',
}

export type SelectOption = Readonly<Pick<SelectItemProps, 'value' | 'label'>>

export type WeatherForecast = Readonly<{
  id: number
  summary: string
  temperatureC: number
  temperatureF: number
  dateFormatted: string
}>

export type WeatherState = Readonly<{
  isLoading: boolean
  startDateIndex: number
  forecasts: WeatherForecast[]
}>

export type ReceiveForecastsPayload = Pick<WeatherState, 'forecasts' | 'startDateIndex'>

export type DemoFormState = Readonly<{
  count: number
  checked: boolean
  selectedOption: SelectOption
}>

export type MapItemSuggestion = Readonly<{
  addressZH: string
  nameZH: string
  x: number
  y: number
  nameEN: string
  addressEN: string
}>

export type MapNearBySuggestion = Readonly<{
  address?: string
  additionalInfoValue?: string[]
  name?: string
  x: number
  y: number
  additionalInfoKey?: string[]
}>

export type WindowSize = Readonly<{
  winWidth: number | undefined
  winHeight: number | undefined
}>

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

export type DataVerseState = {
  status: ApiStatusEnum
  total_count: number
  start: number
  data: DataVerseItem[]
  error: string
}
export type DataVerseItem = Readonly<{
  name: string
  description?: string
  type: string
  url?: string
  dataset_name: string
  file_id: string
  file_type: string
  file_content_type: string
  size_in_bytes: string
  published_at: Date
}>
export type ApiError = Readonly<{
  error?: string
  status: ApiStatusEnum
}>

export type RouteComponent = ComponentType<any>

export type ReactTransition = typeof TRANSITION_DEFAULT

export type RouteInput = Readonly<{
  name: string
  path: string
  popUpOnly: boolean
  transition: ReactTransition
  Component: RouteComponent
  params?: Readonly<Params<string>>
  iconIndex?: number
}>

export interface LangContextProps {
  locale: string
  setLocale: (value: SetStateAction<string>) => void
}