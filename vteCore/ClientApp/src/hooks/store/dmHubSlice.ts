import { LoginApi } from '@/api/login.service'
import { SignalRApi } from '@/api/signalr.service'
import { ApiStatusEnum, HubInit, HubState, ErrorOr, UserState, LoginProps, ApiErrorState } from '@/constants/types'
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { clearError, receiveError } from './dmFieldSlice'
import { stat } from 'fs'

export const dmHubState = createSlice({
  name: 'dmHub',
  initialState: HubInit,
  reducers: {
    removeToken: () => HubInit,
    waitForHubInfo: (state) => {
      state.status = ApiStatusEnum.PROCESS
    },
    receiveHubInfo: (state, action: PayloadAction<string>) => {
      if (action.payload) {
        state.connectionId = action.payload
        state.status = ApiStatusEnum.SUCCESS
      } else {
        state.status = ApiStatusEnum.FAILURE
      }
    },
    receiveAuthInfo: (state, action: PayloadAction<ErrorOr<UserState>>) => {
      if (action.payload) {
        if (action.payload.isError || !action.payload.value) {
          console.log(`error`)
          state.status = ApiStatusEnum.FAILURE
        } else {
          state.status = ApiStatusEnum.SUCCESS
          state.refreshToken = action.payload.value.refreshToken
          state.token = action.payload.value.token
          state.userName = action.payload.value.userName
          state.controlAdminEnabled = action.payload.value.controlAdminEnabled
          state.dataAdminEnabled =action.payload.value.dataAdminEnabled
          state.divisionAdminEnabled = action.payload.value.divisionAdminEnabled
          state.needReset = action.payload.value.needReset
        }
      }
    },
  },
})

export const getAuthAsync = createAsyncThunk(
  'dmHub/getAuthAsync',
  async (login: LoginProps, { dispatch, getState }) => {
    try {
      dispatch(waitForHubInfo())
      const response = await LoginApi.loginAsync(login)
      dispatch(clearError())
      if (response.isError) {
        dispatch(receiveError(Object.fromEntries(response.errors.map((e) => [e.code, e.description])) as ApiErrorState))
      }
      dispatch(receiveAuthInfo(response))
    } catch (e) {
      console.error(e)
    }
  },
)

export const { receiveHubInfo, waitForHubInfo, receiveAuthInfo, removeToken } = dmHubState.actions

export default dmHubState.reducer
