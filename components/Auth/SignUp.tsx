import { View, ScrollView, useWindowDimensions } from 'react-native'
import { useCallback, useState } from 'react'
import InputField from 'components/form/InputField'
import { ActivityIndicator, Button, HelperText } from 'react-native-paper'
import { useFormik } from 'formik'
import axios from 'axios'
import { storeUserInfo } from 'Services/Storage'
import { useFocusEffect, useRouter } from 'expo-router'
import { API_BASE_URL } from 'config'
import { useDispatch } from 'react-redux'
import { SignUpvalidationSchema } from 'lib/Vaildtions/SignupSchema'
import * as Animatable from 'react-native-animatable'

export default function SignUp() {
  const { width, height } = useWindowDimensions()
  const [errorMes, setErrorMes] = useState<string | null>(null)
  const [isLoadingBtn, setIsLoadingBtn] = useState(false)
  const router = useRouter()
  const dispatch = useDispatch()

  async function handleSignUp(formValues: any) {
    if (!isLoadingBtn) {
      setErrorMes(null)
      setIsLoadingBtn(true)
      try {
        const res = await axios.post(`${API_BASE_URL}/auth/signup`, formValues)
        const data = res.data
        await storeUserInfo(data.token, data.user, router, dispatch)
      } catch (err: any) {
        setIsLoadingBtn(false)
        setErrorMes(err.response?.data?.message ?? 'Error Sign up')
      }
    }
  }

  const formik = useFormik({
    initialValues: {
      name: 'sasa',
      email: 'sasa@octane-tech.io',
      password: '123456789',
    },
    validationSchema: SignUpvalidationSchema,
    onSubmit: handleSignUp,
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
        paddingHorizontal: 20,
        paddingVertical: 40,
      }}>
      <Animatable.View className="flex-1" animation="fadeIn" duration={600} easing="ease-in-out">
        {/* مدخلات */}
        <View style={{ marginBottom: 40 }}>
          <InputField lable={'Username'} name={'name'} formik={formik} errorMes={errorMes} />
          <InputField lable={'Email'} name={'email'} formik={formik} errorMes={errorMes} />
          <InputField lable={'Password'} name={'password'} formik={formik} errorMes={errorMes} />
        </View>

        {/* زرار التسجيل */}
        <View>
          {isLoadingBtn ? (
            <ActivityIndicator size={height * 0.05} />
          ) : (
            <Button
              onPress={() => formik.handleSubmit()}
              style={{
                borderRadius: 20,
                height: height * 0.09,
                justifyContent: 'center',
              }}
              contentStyle={{
                height: height * 0.09,
                alignItems: 'center',
                justifyContent: 'center',
              }}
              labelStyle={{
                fontSize: height * 0.025,
                textAlignVertical: 'center',
              }}
              textColor="#FFFFFF"
              buttonColor="#8d1c47">
              Sign Up
            </Button>
          )}
        </View>

        {/* رسالة الخطأ */}
        {errorMes && (
          <View style={{ marginTop: 30, alignItems: 'center' }}>
            <HelperText
              style={{
                fontSize: height * 0.022,
                color: '#e03c3c',
              }}
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
