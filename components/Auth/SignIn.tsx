import { View, ScrollView } from 'react-native'
import { useCallback, useState } from 'react'
import InputField from 'components/form/InputField'
import { ActivityIndicator, Button, HelperText } from 'react-native-paper'
import { useFormik } from 'formik'
import { LoginSchema } from 'lib/Vaildtions/SignInValid'
import axios from 'axios'
import { storeUserInfo } from 'Services/Storage'
import { useFocusEffect, useRouter } from 'expo-router'
import { API_BASE_URL } from 'config'
import { useDispatch } from 'react-redux'
import * as Animatable from 'react-native-animatable'
import { scale, verticalScale, moderateScale } from 'react-native-size-matters'

export default function SignIn({ setIsLoadingRes }: any) {
  const [errorMes, setErrorMes] = useState<string | null>(null)
  const [isLoadingBtn, setIsLoadingBtn] = useState(false)
  const router = useRouter()
  const dispatch = useDispatch()

  async function handleLogin(formValues: any) {
    if (!isLoadingBtn) {
      setErrorMes(null)
      setIsLoadingRes(true)
      setIsLoadingBtn(true)
      try {
        const res = await axios.post(`${API_BASE_URL}/auth/login`, formValues)
        const data = res.data
        await storeUserInfo(data.token, data.user, router, dispatch)
      } catch (err: any) {
        setIsLoadingBtn(false)
        setErrorMes(err.response?.data?.message ?? err.message ?? 'Error Login')
      } finally {
        setIsLoadingRes(false)
      }
    }
  }

  const formik = useFormik({
    initialValues: {
      email: 'sasa@octane-tech.io',
      password: '123456789',
    },
    validationSchema: LoginSchema,
    onSubmit: handleLogin,
  })

  useFocusEffect(
    useCallback(() => {
      return () => {
        formik.resetForm()
        setIsLoadingBtn(false)
        setErrorMes(null)
      }
    }, [])
  )

  return (
    <ScrollView
      keyboardShouldPersistTaps="handled"
      contentContainerStyle={{
        flexGrow: 1,
        paddingHorizontal: scale(12),
        paddingVertical: verticalScale(24),
      }}>
      <Animatable.View style={{ flex: 1 }} animation="fadeIn" duration={400} easing="ease-in-out">
        <View style={{ marginBottom: verticalScale(24) }}>
          <InputField label={'Email'} name={'email'} formik={formik} errorMes={errorMes} />
          <InputField label={'Password'} name={'password'} formik={formik} errorMes={errorMes} />
        </View>

        <View style={{ alignItems: 'center' }}>
          {isLoadingBtn ? (
            <ActivityIndicator size={moderateScale(32)} />
          ) : (
            <Button
              onPress={() => formik.handleSubmit()}
              style={{
                borderRadius: moderateScale(20),
                height: verticalScale(48),
                width: scale(160),
                justifyContent: 'center',
              }}
              contentStyle={{
                height: verticalScale(50),
                alignItems: 'center',
                justifyContent: 'center',
              }}
              labelStyle={{
                fontSize: moderateScale(14),
                textAlignVertical: 'center',
              }}
              textColor="#FFFFFF"
              buttonColor="#8d1c47">
              Log In
            </Button>
          )}
        </View>

        {errorMes && (
          <View style={{ marginTop: verticalScale(20), alignItems: 'center' }}>
            <HelperText
              style={{ fontSize: moderateScale(12), color: '#e03c3c' }}
              type="error"
              visible={!!errorMes}>
              {errorMes}
            </HelperText>
          </View>
        )}
      </Animatable.View>
    </ScrollView>
  )
}
