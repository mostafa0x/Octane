import { View, Text } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { StateFace } from 'Types/Store/StateFace'
import { useFocusEffect, usePathname, useRouter } from 'expo-router'
import { ActivityIndicator } from 'react-native-paper'
import { getUserInfo } from 'Services/Storage'
import { changeAuthLoading } from 'lib/Store/Slices/UserSlice'

export default function ProtectRoutingProvider({ children }: { children: React.ReactNode }) {
  const { userToken, userData } = useSelector((state: StateFace) => state.UserReducer)
  const { authLoading } = useSelector((state: StateFace) => state.UserReducer)
  const dispatch = useDispatch()
  const router = useRouter()
  const pathName = usePathname()

  useEffect(() => {
    console.log('runApp')
    async function handleGetInfo() {
      await getUserInfo(dispatch)
      dispatch(changeAuthLoading(0))
    }
    handleGetInfo()
    return () => {}
  }, [])

  useEffect(() => {
    if (authLoading == 0 || authLoading == 1) {
      if (pathName == '/') {
        if (userToken) {
          dispatch(changeAuthLoading(1))
          router.replace('/')
        } else {
          router.replace('/SignIn')
        }
      }
      if (pathName == '/SignIn' || pathName == '/SignUp') {
        if (userToken) {
          router.replace('/')
        } else {
          dispatch(changeAuthLoading(1))
        }
      }
    }
    if (authLoading == -2) {
    }
  }, [userToken, authLoading, pathName])

  return authLoading == -1 || authLoading == -2 ? (
    <View className="flex-1 items-center justify-center">
      <ActivityIndicator size={100} />
    </View>
  ) : (
    children
  )
}
