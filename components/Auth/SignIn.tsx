import { View, ScrollView, useWindowDimensions } from 'react-native'
import { useCallback, useEffect, useState } from 'react'
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

export default function SignIn({ setIsLoadingRes }: any) {
  const { width, height } = useWindowDimensions()
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
        // router.replace('/');
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

  // useEffect(() => {
  //   router.push('/')

  //   return () => {}
  // }, [router])

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
      <Animatable.View className="flex-1" animation="fadeIn" duration={400} easing="ease-in-out">
        <View style={{ marginBottom: 40 }}>
          <InputField label={'Email'} name={'email'} formik={formik} errorMes={errorMes} />
          <InputField label={'Password'} name={'password'} formik={formik} errorMes={errorMes} />
        </View>

        <View style={{ alignItems: 'center' }}>
          {isLoadingBtn ? (
            <ActivityIndicator size={height * 0.05} />
          ) : (
            <Button
              onPress={() => formik.handleSubmit()}
              style={{
                borderRadius: 20,
                height: height * 0.07,
                width: width * 0.5,
                justifyContent: 'center',
              }}
              contentStyle={{
                height: height * 0.09,
                alignItems: 'center',
                justifyContent: 'center',
              }}
              labelStyle={{
                fontSize: height * 0.025,
                height: height * 0.09,
                textAlignVertical: 'center',
              }}
              textColor="#FFFFFF"
              buttonColor="#8d1c47">
              Log In
            </Button>
          )}
        </View>

        {errorMes && (
          <View style={{ marginTop: 30, alignItems: 'center' }}>
            <HelperText
              style={{ fontSize: height * 0.022, height: height * 0.032, color: '#e03c3c' }}
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
