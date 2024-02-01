import { ApiStatusEnum, HubInit, HubState } from '@/constants/types'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export const dmHubState = createSlice({
  name: 'dmHub',
  initialState: HubInit,
  reducers: {
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
      }
    },  
})

export const { receiveHubInfo,waitForHubInfo } = dmHubState.actions

export default dmHubState.reducer
