import { createSlice } from '@reduxjs/toolkit'
import { AppSliceFace } from 'Types/Store/AppSliceFace'

const initialState: AppSliceFace = {
  isMountApp: false,
}

const AppSlice = createSlice({
  name: 'AppSlice',
  initialState,
  reducers: {
    ChangeIsMountApp: (state, action) => {
      state.isMountApp = action.payload
    },
  },
})

export const AppReducer = AppSlice.reducer

export const { ChangeIsMountApp } = AppSlice.actions
