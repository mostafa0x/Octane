import { View } from 'react-native'
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

export default function SignIn() {
  const [errorMes, setErrorMes] = useState<string | null>(null)
  const [isLoadingBtn, setIsLoadingBtn] = useState(false)
  const router = useRouter()
  const dispatch = useDispatch()
  async function handleLogin(formValues: any) {
    if (!isLoadingBtn) {
      setErrorMes(null)
      setIsLoadingBtn(true)
      try {
        const res = await axios.post(`${API_BASE_URL}/auth/login`, formValues)
        const data = res.data
        console.log(data)
        await storeUserInfo(data.token, data.user, router, dispatch)
        // router.replace('/')
      } catch (err: any) {
        setIsLoadingBtn(false)
        console.log(err.response.data.message ?? 'Error Login')
        setErrorMes(err.response.data.message ?? 'Error Login')
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
    <Animatable.View className="z-50 flex-1" animation="fadeIn" duration={600} easing="ease-in-out">
      <View className="mt-10">
        <InputField lable={'Email'} name={'email'} formik={formik} errorMes={errorMes} />
        <InputField lable={'Password'} name={'password'} formik={formik} errorMes={errorMes} />
      </View>
      <View className="mt-[40px]">
        {isLoadingBtn ? (
          <ActivityIndicator size={70} />
        ) : (
          <Button
            onPress={() => formik.handleSubmit()}
            style={{
              borderRadius: 20,
              height: 90,
              justifyContent: 'center',
            }}
            contentStyle={{
              height: 90,
              alignItems: 'center',
              justifyContent: 'center',
            }}
            labelStyle={{ fontSize: 22, height: 100, textAlignVertical: 'center' }}
            textColor="#FFFFFF"
            buttonColor="#8d1c47">
            Log In
          </Button>
        )}

        <View className="mt-10 items-center">
          <HelperText style={{ fontSize: 20, color: '#e03c3c' }} type="error" visible={!!errorMes}>
            {errorMes}
          </HelperText>
        </View>
      </View>
    </Animatable.View>
  )
}
