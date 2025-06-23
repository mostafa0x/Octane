export interface UserSliceFace {
  userToken: string | null
  userData: userDataFace | null
  isLoadedUserData: boolean
  isLoadedData: boolean
}

export interface userDataFace {
  id: number
  name: string
  email: string
  role: string
  status: string
  avatar: string
}
