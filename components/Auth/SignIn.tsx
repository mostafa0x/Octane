import { View, KeyboardAvoidingView, Platform } from 'react-native'
import { useCallback, useState } from 'react'
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
import { storeUserInfo } from 'Services/Storage'

export default function SignIn({ setIsLoadingRes, keyboardVisible }: any) {
  const [errorMes, setErrorMes] = useState<string | null>(null)
  const [isLoadingBtn, setIsLoadingBtn] = useState(false)
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
        await storeUserInfo(data.token, data.user, router, dispatch)
      } catch (err: any) {
        setErrorMes(err.response?.data?.message ?? 'Login Error')
      } finally {
        setIsLoadingBtn(false)
        setIsLoadingRes(false)
      }
    },
  })

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
    </Animatable.View>
  )
}
