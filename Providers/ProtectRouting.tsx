import { View, Text } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { StateFace } from 'Types/Store/StateFace'
import { useFocusEffect, usePathname, useRouter } from 'expo-router'
import { ActivityIndicator } from 'react-native-paper'
import { getUserInfo } from 'Services/Storage'

export default function ProtectRoutingProvider({ children }: { children: React.ReactNode }) {
  const { userToken, userData } = useSelector((state: StateFace) => state.UserReducer)
  const [authLoading, setAuthLoading] = useState(-1)
  const dispatch = useDispatch()
  const router = useRouter()
  const pathName = usePathname()

  useEffect(() => {
    if (authLoading == 0 || authLoading == 1) {
      if (pathName == '/') {
        if (userToken) {
          setAuthLoading(1)
        } else {
          router.replace('/SignIn')
        }
      }
      if (pathName == '/SignIn' || pathName == '/SignUp') {
        if (userToken) {
          router.replace('/')
        } else {
          setAuthLoading(1)
        }
      }
    }
  }, [userToken, authLoading, pathName])

  useFocusEffect(
    useCallback(() => {
      console.log('runApp')
      async function handleGetInfo() {
        await getUserInfo(dispatch)
        setAuthLoading(0)
      }

      handleGetInfo()

      return () => {
        console.log('CloseApp')
      }
    }, [userToken])
  )

  return authLoading == -1 ? (
    <View className="flex-1 items-center justify-center">
      <ActivityIndicator size={100} />
    </View>
  ) : (
    children
  )
}
