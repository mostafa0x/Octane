export interface DashboardSliceFace {
  users: UsersFace[]
}

export interface UsersFace {
  id: number
  name: string
  image: string
}
