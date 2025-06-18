import { configureStore } from '@reduxjs/toolkit'
import { UserReducer } from './Slices/UserSlice'

export const Store = configureStore({
  reducer: {
    UserReducer,
  },
})
