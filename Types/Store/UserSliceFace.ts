export interface UserSliceFace {
  userToken: string | null
  userData: userDataFace | null
}

export interface userDataFace {
  id: number
  name: string
  email: string
  role: string
  status: string
}
