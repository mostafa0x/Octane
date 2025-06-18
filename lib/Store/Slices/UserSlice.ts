import { createSlice } from '@reduxjs/toolkit'
import { userDataFace, UserSliceFace } from 'Types/Store/UserSliceFace'

interface ActionInfo {
  payload: {
    userToken: string
    userData: userDataFace
  }
  type: string
}
const initialState: UserSliceFace = {
  userToken: null,
  userData: null,
}
const UserSlice = createSlice({
  name: 'UserSlice',
  initialState,
  reducers: {
    fillUserInfo: (state, action: ActionInfo) => {
      state.userToken = action.payload.userToken
      state.userData = action.payload.userData
    },
  },
})

export const UserReducer = UserSlice.reducer
export const { fillUserInfo } = UserSlice.actions
