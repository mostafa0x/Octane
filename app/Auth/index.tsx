import {
  View,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native'
import { useCallback, useEffect, useState } from 'react'
import { Image } from 'expo-image'
import { Button } from 'react-native-paper'
import { useFocusEffect, useRouter } from 'expo-router'
import { useDispatch } from 'react-redux'
import SignIn from 'components/Auth/SignIn'
import SignUp from 'components/Auth/SignUp'
import { responsiveWidth, responsiveHeight } from 'react-native-responsive-dimensions'
import { RFValue } from 'react-native-responsive-fontsize'

const logo = require('assets/mainLogo.png')
const backImg = require('assets/backn.png')

export default function Auth() {
  const router = useRouter()
  const dispatch = useDispatch()
  const [authMode, setAuthMode] = useState(1)
  const [isLoadingRes, setIsLoadingRes] = useState(false)
  const [keyboardVisible, setKeyboardVisible] = useState(false)

  useEffect(() => {
    router.prefetch('/')
    const showSubscription = Keyboard.addListener('keyboardDidShow', () => {
      setKeyboardVisible(true)
    })
    const hideSubscription = Keyboard.addListener('keyboardDidHide', () => {
      setKeyboardVisible(false)
    })

    return () => {
      showSubscription.remove()
      hideSubscription.remove()
    }
  }, [])

  useFocusEffect(
    useCallback(() => {
      return () => {}
    }, [])
  )

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={{ flex: 1 }}>
        <View
          style={{
            position: 'absolute',
            top: responsiveHeight(0),
            width: '100%',
          }}>
          <Image
            style={{ width: '100%', height: responsiveHeight(70) }}
            contentFit="fill"
            source={backImg}
          />
        </View>

        <View style={{ flex: 1 }}>
          <View
            style={{
              width: '100%',
              height: responsiveHeight(30),
            }}>
            <Image
              source={logo}
              contentFit="contain"
              style={{
                width: '100%',
                height: '100%',
              }}
            />
          </View>

          <View
            style={{
              flex: 1,
              borderTopLeftRadius: responsiveWidth(25),
              borderTopRightRadius: responsiveWidth(25),
              backgroundColor: 'white',
              paddingHorizontal: responsiveWidth(3),
              paddingBottom: responsiveHeight(10),
              justifyContent: 'flex-start',
            }}>
            <View
              style={{
                borderRadius: responsiveWidth(25),
                padding: responsiveWidth(2),
                marginTop: responsiveHeight(5),
                height: responsiveHeight(7),
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
                style={{ flex: 1, borderRadius: responsiveWidth(5) }}
                contentStyle={{
                  height: responsiveHeight(5),
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
                labelStyle={{
                  color: authMode === 1 ? '#232447' : '#7D7D91',
                  fontSize: RFValue(14),
                  textAlign: 'center',
                  height: responsiveHeight(2.5),
                }}>
                Log In
              </Button>

              <Button
                onPress={() => !isLoadingRes && setAuthMode(2)}
                mode={authMode === 2 ? 'contained' : 'text'}
                buttonColor={authMode === 2 ? 'white' : ''}
                style={{ flex: 1, borderRadius: responsiveWidth(5) }}
                contentStyle={{
                  height: responsiveHeight(5),
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
                labelStyle={{
                  height: responsiveHeight(2.5),

                  color: authMode === 2 ? '#232447' : '#7D7D91',
                  fontSize: RFValue(14),
                  textAlign: 'center',
                }}>
                Sign Up
              </Button>
            </View>

            {authMode === 1 ? (
              <SignIn keyboardVisible={keyboardVisible} setIsLoadingRes={setIsLoadingRes} />
            ) : (
              <SignUp keyboardVisible={keyboardVisible} setIsLoadingRes={setIsLoadingRes} />
            )}
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  )
}
