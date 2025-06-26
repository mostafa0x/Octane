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
  isLoadedUserData: false,
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
    changeIsLoadedUserData: (state, action) => {
      state.isLoadedUserData = action.payload
    },
    changeImageProfile: (state, action) => {
      if (state.userData) {
        state.userData.image = action.payload
      }
    },
  },
})

export const UserReducer = UserSlice.reducer
export const { fillUserInfo, changeIsLoadedUserData, ChangeLoadedData, changeImageProfile } =
  UserSlice.actions
