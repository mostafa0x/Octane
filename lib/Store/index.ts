import { configureStore } from '@reduxjs/toolkit'
import { UserReducer } from './Slices/UserSlice'
import { MainReducer } from './Slices/MainSlice'
import { AppReducer } from './Slices/AppSlice'
import { CompanyReducer } from './Slices/CompanySlice'
import { DashboardReducer } from './Slices/DashboardSlice'

export const Store = configureStore({
  reducer: {
    AppReducer,
    UserReducer,
    MainReducer,
    CompanyReducer,
    DashboardReducer,
  },
})
