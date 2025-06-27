import { AppSliceFace } from './AppSliceFace'
import { CompanySliceFace } from './CompanySliceFace'
import { DashboardSliceFace } from './DashboardSliceFace'
import { MainSliceFace } from './MainSliceFace'
import { UserSliceFace } from './UserSliceFace'

export interface StateFace {
  UserReducer: UserSliceFace
  MainReducer: MainSliceFace
  AppReducer: AppSliceFace
  CompanyReducer: CompanySliceFace
  DashboardReducer: DashboardSliceFace
}
