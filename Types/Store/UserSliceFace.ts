export interface UserSliceFace {
  userToken: string | null
  userData: userDataFace | null
  isLoadedUserData: boolean
  isLoadedData: boolean
}
type Role = 'admin' | 'user'
export interface userDataFace {
  id: number
  name: string
  email: string
  role: Role
  status: string
  image: string | null
}
