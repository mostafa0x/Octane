import { View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { StateFace } from 'Types/Store/StateFace'
import { usePathname, useRouter } from 'expo-router'
import { ActivityIndicator } from 'react-native-paper'
import { getUserInfo } from 'Services/Storage'
import { GetAcknowledgments } from 'Services/GetAcknowledgments'
import { GetNfcs } from 'Services/GetNfs'

export default function ProtectRoutingProvider({ children }: { children: React.ReactNode }) {
  const { userToken } = useSelector((state: StateFace) => state.UserReducer)
  const [isMountApp, setMountApp] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const dispatch = useDispatch()
  const router = useRouter()
  const pathName = usePathname()

  useEffect(() => {
    async function init() {
      await getUserInfo(dispatch)
      setMountApp(true)
    }
    init()
  }, [])

  useEffect(() => {
    async function handleGetData() {
      await GetNfcs(dispatch)
      await GetAcknowledgments('monthly', dispatch)
      await GetAcknowledgments('weekly', dispatch)
      await GetAcknowledgments('daily', dispatch)
      setIsLoading(false)
    }
    if (isMountApp) {
      if (userToken) {
        if (pathName === '/Auth') {
          router.replace('/')
        }
        handleGetData()
      } else {
        if (pathName === '/') {
          router.replace('/Auth')
        } else {
        }
        setIsLoading(false)
      }
      //  setIsLoading(false)
    }
  }, [isMountApp, userToken, pathName])

  if (isLoading) {
    return (
      <View className="flex-1 items-center justify-center">
        <ActivityIndicator size={100} />
      </View>
    )
  }

  return children
}
