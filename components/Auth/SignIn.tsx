import { View } from 'react-native'
import { useEffect, useState } from 'react'
import { useFormik } from 'formik'
import InputField from 'components/form/InputField'
import { ActivityIndicator, Button, HelperText } from 'react-native-paper'
import { responsiveWidth as rw, responsiveHeight as rh } from 'react-native-responsive-dimensions'
import { RFValue } from 'react-native-responsive-fontsize'
import axios from 'axios'
import { API_BASE_URL } from 'config'
import { useDispatch } from 'react-redux'
import { useRouter } from 'expo-router'
import * as Animatable from 'react-native-animatable'
import { LoginSchema } from 'lib/Vaildtions/SignInValid'
import { deleteLastLogin, getLastLogin, storeUserInfo } from 'Services/Storage'
import LastAuthCard from 'components/form/LastAuthCard'

export type InfoLoginType = { email: string; password: string; image?: string }

export default function SignIn({ setIsLoadingRes }: any) {
  const [errorMes, setErrorMes] = useState<string | null>(null)
  const [isLoadingBtn, setIsLoadingBtn] = useState(false)
  const [infoLogin, setinfoLogin] = useState<InfoLoginType | null>(null)
  const router = useRouter()
  const dispatch = useDispatch()
  const [isMainLoader, setIsMainLoader] = useState(true)

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      // email: 'sasa@octane-tech.io',
      // password: '123456789',
    },
    validationSchema: LoginSchema,
    onSubmit: handleLogin,
  })

  async function handleLogin(formValues: InfoLoginType) {
    if (isLoadingBtn) return
    setIsMainLoader(true)
    setIsLoadingBtn(true)
    setIsLoadingRes(true)
    setErrorMes(null)
    try {
      const res = await axios.post(`${API_BASE_URL}/auth/login`, formValues)
      const data = res.data

      await storeUserInfo(data.token, data.user, router, dispatch, {
        email: formValues.email,
        password: formValues.password,
        image: data.user.image,
      })
    } catch (err: any) {
      setErrorMes(err.response?.data?.message ?? 'Login Error')
    } finally {
      setIsLoadingBtn(false)
      setIsLoadingRes(false)
    }
  }

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
    handleLogin({ email: infoLogin.email, password: infoLogin.password })
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
          isMainLoader ? (
            <ActivityIndicator size={RFValue(28)} />
          ) : null
        ) : (
          <Button
            onPress={() => {
              setIsMainLoader(true)
              formik.handleSubmit()
            }}
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
        <LastAuthCard
          rh={rh}
          rw={rw}
          RFValue={RFValue}
          isMainLoader={isMainLoader}
          isLoadingBtn={isLoadingBtn}
          setIsMainLoader={setIsMainLoader}
          LoginByLastLogin={LoginByLastLogin}
          callDeleteLastLogin={callDeleteLastLogin}
          infoLogin={infoLogin}
        />
      )}
    </Animatable.View>
  )
}
