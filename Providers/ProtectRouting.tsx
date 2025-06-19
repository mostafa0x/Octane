import { View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { StateFace } from 'Types/Store/StateFace'
import { usePathname, useRouter } from 'expo-router'
import { ActivityIndicator } from 'react-native-paper'
import { getUserInfo } from 'Services/Storage'

export default function ProtectRoutingProvider({ children }: { children: React.ReactNode }) {
  const { userToken } = useSelector((state: StateFace) => state.UserReducer)
  const [loading, setLoading] = useState(true)

  const dispatch = useDispatch()
  const router = useRouter()
  const pathName = usePathname()

  useEffect(() => {
    async function init() {
      await getUserInfo(dispatch)
      setLoading(false)
    }
    init()
  }, [])

  useEffect(() => {
    if (!loading) {
      if (userToken) {
        if (pathName === '/SignIn' || pathName === '/SignUp') {
          router.replace('/')
        }
      } else {
        if (pathName === '/') {
          router.replace('/SignIn')
        }
      }
    }
  }, [loading, userToken, pathName])

  if (loading) {
    return (
      <View className="flex-1 items-center justify-center">
        <ActivityIndicator size={100} />
      </View>
    )
  }

  return children
}
