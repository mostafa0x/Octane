import { View, ScrollView } from 'react-native'
import { useCallback, useState } from 'react'
import { Image } from 'expo-image'
import { Button } from 'react-native-paper'
import { useFocusEffect, useRouter } from 'expo-router'
import { useDispatch } from 'react-redux'
import SignIn from 'components/Auth/SignIn'
import SignUp from 'components/Auth/SignUp'

const logo = require('assets/mainLogo.png')
const backImg = require('assets/backn.png')

export default function Auth() {
  const router = useRouter()
  const dispatch = useDispatch()
  const [authMode, setAuthMode] = useState(1)

  useFocusEffect(
    useCallback(() => {
      return () => {}
    }, [])
  )

  return (
    <ScrollView
      contentContainerStyle={{
        backgroundColor: '#661534',
      }}
      style={{ flex: 1, height: '100%' }}
      keyboardShouldPersistTaps="handled">
      <View className="absolute left-[0] top-[200px] " style={{ width: '100%' }}>
        <Image style={{ width: '100%', height: 200 }} contentFit="fill" source={backImg} />
      </View>

      <View className="flex-1">
        <View style={{ width: '100%', height: 300 }}>
          <Image source={logo} contentFit="fill" style={{ width: '100%', height: '100%' }} />
        </View>
        <View className="h-full rounded-t-[70px]  bg-white  px-6 pb-[85px]">
          <View
            style={{ borderRadius: 30, padding: 8 }}
            className="border-3 mt-10 h-[70px] flex-row items-center justify-center  border-[#F5F6F9] bg-[#e2e4e9] ">
            <Button
              onPress={() => setAuthMode(1)}
              mode={authMode == 1 ? 'contained' : 'text'}
              buttonColor={authMode == 1 ? 'white' : ''}
              style={{ flex: 1, borderRadius: 20 }}
              contentStyle={{
                height: 56,
                alignItems: 'center',
                justifyContent: 'center',
              }}
              labelStyle={{
                color: authMode == 1 ? '#232447' : '#7D7D91',
                fontSize: 14,
                textAlign: 'center',
              }}>
              Log In
            </Button>

            <Button
              onPress={() => setAuthMode(2)}
              mode={authMode == 2 ? 'contained' : 'text'}
              buttonColor={authMode == 2 ? 'white' : ''}
              style={{ flex: 1, borderRadius: 20 }}
              contentStyle={{
                height: 56,
                alignItems: 'center',
                justifyContent: 'center',
              }}
              labelStyle={{
                color: authMode == 2 ? '#232447' : '#7D7D91',
                fontSize: 14,
                textAlign: 'center',
              }}>
              Sign Up
            </Button>
          </View>
          {authMode === 1 ? <SignIn /> : <SignUp />}
        </View>
      </View>
    </ScrollView>
  )
}
