export interface UserSliceFace {
  userToken: string | null
  userData: userDataFace | null
  authLoading: number
  isLoadedData: boolean
}

export interface userDataFace {
  id: number
  name: string
  email: string
  role: string
  status: string
}
