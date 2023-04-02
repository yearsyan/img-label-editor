import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface SettingState {
  listColumnNum: number
}

const initialState: SettingState = {
  listColumnNum: 6
}

export const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    setListColumnNum: (state, action: PayloadAction<number>) => {
      state.listColumnNum = action.payload
    }
  }
})

export const { setListColumnNum } = counterSlice.actions

export default counterSlice.reducer
