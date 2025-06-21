import { configureStore } from '@reduxjs/toolkit'
import { UserReducer } from './Slices/UserSlice'
import { MainReducer } from './Slices/MainSlice'

export const Store = configureStore({
  reducer: {
    UserReducer,
    MainReducer,
  },
})
