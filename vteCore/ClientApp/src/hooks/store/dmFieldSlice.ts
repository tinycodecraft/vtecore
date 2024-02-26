import { ApiErrorInit, ApiErrorState, ApiFieldEnum } from '@/constants/types'
import { PayloadAction, createSlice } from '@reduxjs/toolkit'

export const dmFieldState = createSlice({
  name: 'dmField',
  initialState: ApiErrorInit,
  reducers: {
    clearError: (state) => {
      state = {}
    },
    receiveError: (state, action: PayloadAction<ApiErrorState>) => {
      if (action.payload) {
        Object.entries(action.payload).forEach(([key, value]) => {
          switch (key) {
            case ApiFieldEnum.UserName:
              state[ApiFieldEnum.UserName] = value
              break
            case ApiFieldEnum.Password:
              state[ApiFieldEnum.Password] = value
              break
            case ApiFieldEnum.ConfirmPassword:
              state[ApiFieldEnum.ConfirmPassword] = value
              break
            case ApiFieldEnum.NewPassword:
              state[ApiFieldEnum.NewPassword] = value
              break
            case ApiFieldEnum.GetUser:
              state[ApiFieldEnum.GetUser] = value
              break
            case ApiFieldEnum.userList:
              state[ApiFieldEnum.userList] = value
              break
          }
        })
      }
    },
  },
})

export const { clearError, receiveError } = dmFieldState.actions
export default dmFieldState.reducer
