import { createSlice } from '@reduxjs/toolkit'
import { DashboardSliceFace } from 'Types/Store/DashboardSliceFace'

const initialState: DashboardSliceFace = {
  users: [],
}
const DashboardSlice = createSlice({
  name: 'DashboardSlice',
  initialState,
  reducers: {
    GetUsers: (state, action) => {
      state.users = action.payload
    },
  },
})

export const DashboardReducer = DashboardSlice.reducer
export const { GetUsers } = DashboardSlice.actions
