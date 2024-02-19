import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { FormPostInit } from '@/constants/types/values'
import { ApiErrorState, ErrorOr, FormPostState, LoginProps, SelectOption } from '@/constants/types/views'
import { ApiStatusEnum } from '@/constants/types'
import { LoginApi } from '@/api/login.service'
import { clearError, receiveError } from './dmFieldSlice'
import { RootState } from '@/hooks'

export const dmFormSlice = createSlice({
  name: 'dmForm',
  initialState: FormPostInit,
  reducers: {
    waitFormState: (state, action: PayloadAction<string>) => {
      state.userName = action.payload
      state.status = ApiStatusEnum.PROCESS
    },
    receiveFormState: (state, action: PayloadAction<ErrorOr<FormPostState>>) => {
      if (action.payload.isError) {
        state.status = ApiStatusEnum.FAILURE
        return
      }
      if (action.payload.value && action.payload.value.userName) {
        state.userName = action.payload.value?.userName
        state.status = ApiStatusEnum.SUCCESS
      }
    },
  },
})

export const changePsswdAsync = createAsyncThunk(
  'dmForm/changePsswdAsync',
  async (login: LoginProps, { dispatch, getState }) => {
    const {
      dmHub: { token: accessToken, refreshToken: renewToken },
    } = (getState as () => RootState)()
    console.log(`change password async thunk! with token ${accessToken} + renew ${renewToken}`)

    try {
      if (accessToken) {
        LoginApi.token = accessToken
      }
      if (renewToken) {
        LoginApi.refreshToken = renewToken
      }
      dispatch(waitFormState(login.userName))
      const response = await LoginApi.changePasswdAsync(login)
      console.log(`the response from change password:`,response)
      dispatch(clearError())
      if (response.isError) {
        dispatch(receiveError(Object.fromEntries(response.errors.map((e) => [e.code, e.description])) as ApiErrorState))
      }
      dispatch(receiveFormState(response))
    } catch (error) {
      console.error(error)
    }
  },
)

export const { waitFormState, receiveFormState } = dmFormSlice.actions

export default dmFormSlice.reducer
