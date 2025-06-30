import { View, Text } from 'react-native'
import React, { createContext, useCallback, useContext, useState } from 'react'
import { UserInfoFace } from 'app/Dashboard/UserInfo/[userID]'
import axiosClient from 'lib/api/axiosClient'
interface UserInfoContextType {
  userInfo: UserInfoFace | null | undefined
  setUserInfo: (data: UserInfoFace | null | undefined) => void
  isCallSupspend: boolean
  setIsCallSupspend: any
}

export const UserInfoContext = createContext<UserInfoContextType>({
  userInfo: undefined,
  setUserInfo: () => {},
  isCallSupspend: false,
  setIsCallSupspend: () => {},
})

export const useUserInfoContext = () => useContext(UserInfoContext)

export default function UserInfoProvider({ children }: any) {
  const [userInfo, setUserInfo] = useState<UserInfoFace | null>()
  const [isCallSupspend, setIsCallSupspend] = useState(false)

  return (
    <UserInfoContext.Provider value={{ userInfo, setUserInfo, isCallSupspend, setIsCallSupspend }}>
      {children}
    </UserInfoContext.Provider>
  )
}
