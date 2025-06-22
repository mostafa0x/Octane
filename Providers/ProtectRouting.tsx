import { View, Text } from 'react-native'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { StateFace } from 'Types/Store/StateFace'
import { usePathname, useRouter } from 'expo-router'
import { ActivityIndicator, Button } from 'react-native-paper'
import { getUserInfo } from 'Services/Storage'
import { GetAcknowledgments } from 'Services/GetAcknowledgments'
import { GetNfcs } from 'Services/GetNfs'
import { ChangeLoadedData } from 'lib/Store/Slices/UserSlice'
import { useInitApp } from 'Hooks/useInitApp'
import SpinnerLoading from 'components/SpinnerLoading'

export default function ProtectRoutingProvider({ children }: { children: React.ReactNode }) {
  console.log('Protect render')
  const { userToken, isLoadedData, isLoadedUserData } = useSelector(
    (state: StateFace) => state.UserReducer
  )
  const [isLoading, setIsLoading] = useState(true)
  const [isError, setIsError] = useState<string | null>(null)
  const dispatch = useDispatch()
  const router = useRouter()
  const pathName = usePathname()
  const { init } = useInitApp()

  useEffect(() => {
    if (isLoadedUserData) return

    const initApp = async () => {
      await getUserInfo(dispatch)
      console.log('✅ run app')
    }

    initApp()
  }, [])

  const GetData = useCallback(async () => {
    setIsLoading(true)
    setIsError(null)

    try {
      console.log('loading data...')
      await init()
      setIsLoading(false)
    } catch (err: any) {
      setIsError(err?.response?.data?.message ?? 'Something went wrong !')
      console.log(err ?? 'Something went wrong')
    }
  }, [init])

  useEffect(() => {
    if (!isLoadedUserData) return
    if (userToken) {
      if (pathName == '/Auth') {
        if (isLoadedData) {
          router.replace('/')
        } else {
          console.log('xxx')
        }
      }
      if (!isLoadedData) {
        GetData()
      }
    } else {
      if (pathName === '/' || pathName === '/Profile') {
        router.replace('/Auth')
      }
      setIsLoading(false)
    }
  }, [isLoadedUserData, isLoadedData, userToken, pathName])

  if (isError) {
    return (
      <View className="flex-1 items-center justify-center gap-10">
        <Text style={{ fontSize: 26, color: 'red', textAlign: 'center', width: '100%' }}>
          {isError}
        </Text>
        <Button mode="contained" onPress={GetData}>
          Try Again
        </Button>
      </View>
    )
  }

  if (isLoading) {
    return (
      <View className="flex-1 items-center justify-center">
        <SpinnerLoading />
      </View>
    )
  }

  return children
}
