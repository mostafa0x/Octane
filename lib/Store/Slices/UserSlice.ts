import { createSlice } from '@reduxjs/toolkit'
import { userDataFace, UserSliceFace } from 'Types/Store/UserSliceFace'

interface ActionInfo {
  payload: {
    userToken: string | null
    userData: userDataFace | null
  }
  type: string
}
const initialState: UserSliceFace = {
  userToken: null,
  userData: null,
  authLoading: -1,
  isLoadedData: false,
}
const UserSlice = createSlice({
  name: 'UserSlice',
  initialState,
  reducers: {
    ChangeLoadedData: (state, action) => {
      state.isLoadedData = action.payload
    },
    fillUserInfo: (state, action: ActionInfo) => {
      state.userToken = action.payload.userToken
      state.userData = action.payload.userData
    },
    changeAuthLoading: (state, action) => {
      state.authLoading = action.payload
    },
  },
})

export const UserReducer = UserSlice.reducer
export const { fillUserInfo, changeAuthLoading, ChangeLoadedData } = UserSlice.actions
