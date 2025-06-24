import { configureStore } from '@reduxjs/toolkit'
import { UserReducer } from './Slices/UserSlice'
import { MainReducer } from './Slices/MainSlice'
import { AppReducer } from './Slices/AppSlice'

export const Store = configureStore({
  reducer: {
    AppReducer,
    UserReducer,
    MainReducer,
  },
})
