export interface UserSliceFace {
  userToken: string | null
  userData: userDataFace | null
  isLoadedUserData: boolean
  isLoadedData: boolean
}
export type RoleType = 'admin' | 'user'
export interface userDataFace {
  id: number
  name: string
  email: string
  role: RoleType
  status: string
  image: string | null
}
