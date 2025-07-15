import { View, Text } from 'react-native'
import React, { createContext, useCallback, useContext, useState } from 'react'
import { UserInfoFace } from 'app/Dashboard/UserInfo/[userID]'
import axiosClient from 'lib/api/axiosClient'
import { RoleType } from 'Types/Store/UserSliceFace'
interface UserInfoContextType {
  userInfo: UserInfoFace | null | undefined
  setUserInfo: (data: UserInfoFace | null | undefined) => void
  isCallSupspend: boolean
  setIsCallSupspend: any
  userId: number | null
  setUserId: any
  userRole: RoleType | null
  setUserRole: any
  isLoadingApi: boolean
  setIsLoadingApi: any
  isShowModel: boolean
  setIsShowModel: any
}

export const UserInfoContext = createContext<UserInfoContextType>({
  userInfo: undefined,
  setUserInfo: () => {},
  isCallSupspend: false,
  setIsCallSupspend: () => {},
  userId: null,
  setUserId: () => {},
  userRole: null,
  setUserRole: () => {},
  isLoadingApi: false,
  setIsLoadingApi: () => {},
  isShowModel: false,
  setIsShowModel: () => {},
})

export const useUserInfoContext = () => useContext(UserInfoContext)

export default function UserInfoProvider({ children }: any) {
  const [userInfo, setUserInfo] = useState<UserInfoFace | null>()
  const [isCallSupspend, setIsCallSupspend] = useState(false)
  const [userId, setUserId] = useState<number | null>(null)
  const [userRole, setUserRole] = useState<RoleType | null>(null)
  const [isLoadingApi, setIsLoadingApi] = useState(false)
  const [isShowModel, setIsShowModel] = useState(false)

  return (
    <UserInfoContext.Provider
      value={{
        userInfo,
        setUserInfo,
        isCallSupspend,
        setIsCallSupspend,
        userId,
        setUserId,
        userRole,
        setUserRole,
        isLoadingApi,
        setIsLoadingApi,
        isShowModel,
        setIsShowModel,
      }}>
      {children}
    </UserInfoContext.Provider>
  )
}
