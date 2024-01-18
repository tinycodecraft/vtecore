import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { DemoFormStateInit } from '@/constants/types/values'
import { SelectOption } from '@/constants/types/views'

export const dmFormSlice = createSlice({
  name: 'dmForm',
  initialState: DemoFormStateInit,
  reducers: {
    increment: (state) => {
      state.count += 1
    },
    decrement: (state) => {
      state.count -= 1
    },
    setChecked: (state, action: PayloadAction<boolean>) => {
      state.checked = action.payload
    },
    selectOption: (state, action: PayloadAction<SelectOption>) => {
      state.selectedOption = action.payload
    },
  },
})

export const { increment, decrement, setChecked, selectOption } = dmFormSlice.actions

export default dmFormSlice.reducer
