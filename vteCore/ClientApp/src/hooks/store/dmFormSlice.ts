import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { FormPostInit } from '@/constants/types/values'
import { ApiErrorState, ErrorOr, FormPostState, LabelDetail, LoginProps, SelectOption, UserData } from '@/constants/types'
import { ApiStatusEnum, QueryForm } from '@/constants/types'
import { LoginApi } from '@/api/login.service'
import { clearError, receiveError } from './dmFieldSlice'
import { RootState } from '@/hooks'
import { LabelApi } from '@/api/label.service'

export const dmFormSlice = createSlice({
  name: 'dmForm',
  initialState: FormPostInit,
  reducers: {
    waitFormState: (state, action: PayloadAction<string>) => {
      state.userName = action.payload
      state.status = ApiStatusEnum.PROCESS
    },
    raiseErrorFormState: (state) => {
      state.status = ApiStatusEnum.FAILURE
    },
    forceSuccssState: (state)=> {
      state.status = ApiStatusEnum.SUCCESS
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

export const getUserLevelAsync = createAsyncThunk('dmForm/getUserLevelAsync',async (query: QueryForm<LabelDetail[]>,{ dispatch, getState})=> {
  const {
    dmHub: { token: accessToken, refreshToken: renewToken, userName },
  } = (getState as () => RootState)()
  console.log(`change password async thunk! with token ${accessToken} + renew ${renewToken}`)

  try {
    if(accessToken)
    {
      LabelApi.token = accessToken
    }
    if(renewToken)
    {
      LabelApi.refreshToken = renewToken
    }
    dispatch(waitFormState(query.id))
    const response = await LabelApi.getLabelsAsync(query.id)
    console.log(`the response from get label: `,response)

    query.handler(response)

    dispatch( forceSuccssState())
    

  }
  catch(e){
    console.error(e)
    dispatch( raiseErrorFormState())

  }

})

export const getUserAsync = createAsyncThunk(
  'dmForm/getUserAsync',
  async (query: QueryForm<UserData>, { dispatch, getState }) => {
    const {
      dmHub: { token: accessToken, refreshToken: renewToken, userName },
    } = (getState as () => RootState)()
    console.log(`change password async thunk! with token ${accessToken} + renew ${renewToken}`)
    try {
      if (accessToken) {
        LoginApi.token = accessToken
      }
      if (renewToken) {
        LoginApi.refreshToken = renewToken
      }
      dispatch(waitFormState(query.id))
      const response = await LoginApi.getAsync(query.id)
      console.log(`the response from get user: `, response)
      if (response.isError) {
        dispatch(receiveError(Object.fromEntries(response.errors.map((e) => [e.code, e.description])) as ApiErrorState))
      }
      if(query.handler)
      {
        query.handler(response)

      }
      dispatch(forceSuccssState())
    } catch (e) {
      console.error(e)
      dispatch( raiseErrorFormState())
    }
  },
)

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
      console.log(`the response from change password:`, response)
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

export const { waitFormState, receiveFormState, raiseErrorFormState,forceSuccssState } = dmFormSlice.actions

export default dmFormSlice.reducer
