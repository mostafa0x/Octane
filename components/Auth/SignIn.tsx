import { TouchableOpacity, View } from 'react-native'
import { useEffect, useRef, useState } from 'react'
import { useFormik } from 'formik'
import InputField from 'components/form/InputField'
import { ActivityIndicator, Avatar, Button, HelperText, Icon, Text } from 'react-native-paper'
import { responsiveWidth as rw, responsiveHeight as rh } from 'react-native-responsive-dimensions'
import { RFValue } from 'react-native-responsive-fontsize'
import axios from 'axios'
import { API_BASE_URL } from 'config'
import { useDispatch } from 'react-redux'
import { useRouter } from 'expo-router'
import * as Animatable from 'react-native-animatable'
import { LoginSchema } from 'lib/Vaildtions/SignInValid'
import { deleteLastLogin, getLastLogin, storeUserInfo } from 'Services/Storage'
import SwipeBtn from 'components/SwipeBtn'
import { SwipeButton } from 'react-native-expo-swipe-button'

export type InfoLoginType = { email: string; password: string; image: string }

export default function SignIn({ setIsLoadingRes }: any) {
  const avatarDef = useRef(require('../../assets/avatar.png'))
  const [errorMes, setErrorMes] = useState<string | null>(null)
  const [isLoadingBtn, setIsLoadingBtn] = useState(false)
  const [infoLogin, setinfoLogin] = useState<InfoLoginType | null>(null)
  const router = useRouter()
  const dispatch = useDispatch()

  const formik = useFormik({
    initialValues: {
      email: 'sasa@octane-tech.io',
      password: '123456789',
    },
    validationSchema: LoginSchema,
    onSubmit: async (formValues) => {
      if (isLoadingBtn) return
      setIsLoadingBtn(true)
      setIsLoadingRes(true)
      setErrorMes(null)
      try {
        const res = await axios.post(`${API_BASE_URL}/auth/login`, formValues)
        const data = res.data

        await storeUserInfo(data.token, data.user, router, dispatch, {
          email: formik.values.email,
          password: formik.values.password,
          image: data.user.image,
        })
      } catch (err: any) {
        setErrorMes(err.response?.data?.message ?? 'Login Error')
      } finally {
        setIsLoadingBtn(false)
        setIsLoadingRes(false)
      }
    },
  })

  async function callLastLogin() {
    try {
      const infoLogin: InfoLoginType = await getLastLogin()
      setinfoLogin(infoLogin)
    } catch (err: any) {
      setinfoLogin(null)
    }
  }

  function LoginByLastLogin() {
    if (!infoLogin) return
    formik.setFieldValue('email', infoLogin.email)
    formik.setFieldValue('password', infoLogin.password)
    formik.handleSubmit()
  }
  async function callDeleteLastLogin() {
    try {
      const res = await deleteLastLogin()
      setinfoLogin(null)
    } catch (err: any) {
      console.log(err)
    }
  }

  useEffect(() => {
    callLastLogin()

    return () => {}
  }, [])

  return (
    <Animatable.View
      animation="fadeIn"
      duration={400}
      style={{
        justifyContent: 'flex-start',
        paddingHorizontal: rw(4),
      }}>
      <View
        style={{
          paddingHorizontal: rw(4),
          paddingVertical: rh(3),
        }}>
        <InputField label="Email" name="email" formik={formik} errorMes={errorMes} />
        <InputField label="Password" name="password" formik={formik} errorMes={errorMes} />
      </View>

      <View style={{ alignItems: 'center', marginTop: rh(2) }}>
        {isLoadingBtn ? (
          <ActivityIndicator size={RFValue(28)} />
        ) : (
          <Button
            onPress={() => formik.handleSubmit()}
            style={{
              borderRadius: rw(5),
              height: rh(6),
              width: rw(50),
              justifyContent: 'center',
            }}
            contentStyle={{
              height: rh(6),
              alignItems: 'center',
              justifyContent: 'center',
            }}
            labelStyle={{
              fontSize: RFValue(14),
              textAlignVertical: 'center',
              height: rh(4),
            }}
            textColor="#FFFFFF"
            buttonColor="#8d1c47">
            Log In
          </Button>
        )}
      </View>

      {!!errorMes && (
        <HelperText
          type="error"
          style={{ textAlign: 'center', marginTop: rh(2), fontSize: RFValue(13), color: 'red' }}>
          {errorMes}
        </HelperText>
      )}
      {infoLogin && (
        <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: rh(4) }}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              backgroundColor: 'rgba(100, 8, 62, 0.2)',
              borderRadius: rw(2),
              padding: rw(1),
              width: rw(90),
            }}>
            <View
              style={{ flexDirection: 'row', alignItems: 'center', gap: rw(2), flexWrap: 'wrap' }}>
              <Avatar.Image
                size={RFValue(25)}
                source={infoLogin.image ? { uri: infoLogin.image } : avatarDef.current}
              />

              <Text style={{ fontSize: RFValue(12), width: rw(45) }}>{infoLogin.email}</Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                width: rw(28),
              }}>
              {isLoadingBtn ? (
                <ActivityIndicator size={RFValue(20)} />
              ) : (
                <Button
                  style={{ width: rw(15), height: rh(4) }}
                  contentStyle={{ height: '100%' }}
                  labelStyle={{ fontSize: RFValue(12) }}
                  onPress={LoginByLastLogin}
                  textColor="white"
                  buttonColor="#8d1c47">
                  Login
                </Button>
              )}
              <TouchableOpacity onPress={() => !isLoadingBtn && callDeleteLastLogin()}>
                <Icon
                  color={isLoadingBtn ? '#ACB5BB' : 'black'}
                  size={RFValue(30)}
                  source={'delete'}
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      )}
      <View style={{ alignItems: 'center', marginTop: 2 }}>
        <SwipeButton
          height={rh(4)}
          borderRadius={rw(10)}
          underlayTitleStyle={{ fontSize: RFValue(1.3), width: rw(50) }}
          width={rw(89)}
          onSwipeStart={() => {
            console.log('st')
          }}
          goBackToStart={true}
          circleSize={RFValue(40)}
          circleBackgroundColor="#8d1c47"
          titleStyle={{
            width: rw(80),
            fontSize: RFValue(12),
            marginLeft: rw(10),
          }}
          underlayStyle={{
            backgroundColor: '#c47b9f',
            width: rw(60),
          }}
          onComplete={function (): void {
            console.log('x')
          }}
          Icon={
            <Avatar.Image
              size={RFValue(40)}
              source={infoLogin?.image ? { uri: infoLogin.image } : avatarDef.current}
            />
          }
          title={'Login'}
        />
      </View>
    </Animatable.View>
  )
}
