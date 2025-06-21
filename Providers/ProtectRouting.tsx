import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { StateFace } from 'Types/Store/StateFace'
import { usePathname, useRouter } from 'expo-router'
import { ActivityIndicator, Button } from 'react-native-paper'
import { getUserInfo } from 'Services/Storage'
import { GetAcknowledgments } from 'Services/GetAcknowledgments'
import { GetNfcs } from 'Services/GetNfs'

export default function ProtectRoutingProvider({ children }: { children: React.ReactNode }) {
  const { userToken } = useSelector((state: StateFace) => state.UserReducer)
  const [isMountApp, setMountApp] = useState(false)
  const [isGetData, setIsGetData] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [isError, setIsError] = useState<string | null>(null)
  const dispatch = useDispatch()
  const router = useRouter()
  const pathName = usePathname()

  useEffect(() => {
    async function init() {
      await getUserInfo(dispatch)
      setMountApp(true)
    }
    console.log('run app')

    init()
  }, [])

  async function GetData() {
    setIsLoading(true)
    setIsError(null)

    try {
      console.log('load data...')
      await GetNfcs(dispatch)
      await GetAcknowledgments('monthly', dispatch)
      await GetAcknowledgments('weekly', dispatch)
      await GetAcknowledgments('daily', dispatch)
      setIsLoading(false)
      setIsGetData(true)
    } catch (err: any) {
      setIsError(err?.response?.data?.message ?? 'Something went wrong !')
      console.log(err ?? 'Something went wrong')
    }
  }

  useEffect(() => {
    async function handleGetData() {
      GetData()
    }
    if (isMountApp) {
      if (userToken) {
        if (pathName === '/Auth') {
          //router.replace('/')
        }
        !isGetData && handleGetData()
      } else {
        if (pathName === '/' && '/Profile') {
          router.replace('/Auth')
        } else {
        }
        setIsLoading(false)
      }
      //  setIsLoading(false)
    }
  }, [isMountApp, userToken, pathName])

  if (isError) {
    return (
      <View className="flex-1 items-center justify-center gap-10">
        <Text style={{ fontSize: 26, color: 'red', textAlign: 'center' }}>{isError}</Text>
        <Button mode="contained" onPress={GetData}>
          Try Again
        </Button>
      </View>
    )
  }

  if (isLoading) {
    return (
      <View className="flex-1 items-center justify-center">
        <ActivityIndicator size={100} />
      </View>
    )
  }

  return children
}
