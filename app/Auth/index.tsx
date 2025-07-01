import { View } from 'react-native'
import { useCallback, useEffect, useState } from 'react'
import { Image } from 'expo-image'
import { Button } from 'react-native-paper'
import { useFocusEffect, useRouter } from 'expo-router'
import { useDispatch } from 'react-redux'
import SignIn from 'components/Auth/SignIn'
import SignUp from 'components/Auth/SignUp'
import { scale, verticalScale, moderateScale } from 'react-native-size-matters'

const logo = require('assets/mainLogo.png')
const backImg = require('assets/backn.png')

export default function Auth() {
  const router = useRouter()
  const dispatch = useDispatch()
  const [authMode, setAuthMode] = useState(1)
  const [isLoadingRes, setIsLoadingRes] = useState(false)

  useEffect(() => {
    router.prefetch('/')
  }, [])

  useFocusEffect(
    useCallback(() => {
      return () => {}
    }, [])
  )

  return (
    <View style={{ backgroundColor: '#661534', flex: 1 }}>
      <View
        style={{
          position: 'absolute',
          top: verticalScale(130),
          width: '100%',
        }}>
        <Image
          style={{ width: '100%', height: verticalScale(200) }}
          contentFit="fill"
          source={backImg}
        />
      </View>

      <View style={{ flex: 1 }}>
        <View style={{ width: '100%', height: verticalScale(200) }}>
          <Image source={logo} contentFit="contain" style={{ width: '100%', height: '100%' }} />
        </View>

        <View
          style={{
            minHeight: verticalScale(600),
            borderTopLeftRadius: moderateScale(100),
            borderTopRightRadius: moderateScale(100),
            backgroundColor: 'white',
            paddingHorizontal: scale(20),
            paddingBottom: verticalScale(85),
          }}>
          <View
            style={{
              borderRadius: moderateScale(100),
              padding: scale(8),
              marginTop: verticalScale(20),
              height: verticalScale(50),
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              borderWidth: 3,
              borderColor: '#F5F6F9',
              backgroundColor: '#e2e4e9',
            }}>
            <Button
              onPress={() => !isLoadingRes && setAuthMode(1)}
              mode={authMode === 1 ? 'contained' : 'text'}
              buttonColor={authMode === 1 ? 'white' : ''}
              style={{ flex: 1, borderRadius: moderateScale(20) }}
              contentStyle={{
                height: verticalScale(40),
                alignItems: 'center',
                justifyContent: 'center',
              }}
              labelStyle={{
                color: authMode === 1 ? '#232447' : '#7D7D91',
                fontSize: moderateScale(14),
                textAlign: 'center',
              }}>
              Log In
            </Button>

            <Button
              onPress={() => !isLoadingRes && setAuthMode(2)}
              mode={authMode === 2 ? 'contained' : 'text'}
              buttonColor={authMode === 2 ? 'white' : ''}
              style={{ flex: 1, borderRadius: moderateScale(20) }}
              contentStyle={{
                height: verticalScale(40),
                alignItems: 'center',
                justifyContent: 'center',
              }}
              labelStyle={{
                color: authMode === 2 ? '#232447' : '#7D7D91',
                fontSize: moderateScale(14),
                textAlign: 'center',
              }}>
              Sign Up
            </Button>
          </View>

          {authMode === 1 ? (
            <SignIn setIsLoadingRes={setIsLoadingRes} />
          ) : (
            <SignUp setIsLoadingRes={setIsLoadingRes} />
          )}
        </View>
      </View>
    </View>
  )
}
