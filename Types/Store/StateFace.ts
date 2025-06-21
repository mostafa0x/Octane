import { MainSliceFace } from './MainSliceFace'
import { UserSliceFace } from './UserSliceFace'

export interface StateFace {
  UserReducer: UserSliceFace
  MainReducer: MainSliceFace
}
