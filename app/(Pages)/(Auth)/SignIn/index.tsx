import { View, Text, TouchableOpacity, ScrollView } from 'react-native'
import React, { useCallback, useState } from 'react'
import { Image } from 'expo-image'
import InputField from 'components/form/InputField'
import { ActivityIndicator, Button, HelperText } from 'react-native-paper'
import { useFormik } from 'formik'
import { LoginSchema } from 'lib/Vaildtions/SignInValid'
import axios from 'axios'
import { storeUserInfo } from 'Services/Storage'
import { useFocusEffect, useRouter } from 'expo-router'
import { API_BASE_URL } from 'config'
const logo = require('../../../../assets/mainLogo.png')

export default function SignIn() {
  const [errorMes, setErrorMes] = useState<string | null>(null)
  const [isLoadingBtn, setIsLoadingBtn] = useState(false)
  const router = useRouter()
  async function handleLogin(formValues: any) {
    if (!isLoadingBtn) {
      setErrorMes(null)
      setIsLoadingBtn(true)
      try {
        const res = await axios.post(`${API_BASE_URL}/auth/login`, formValues)
        const data = res.data
        console.log(data)
        await storeUserInfo(data.token, data.user, router)
      } catch (err: any) {
        setIsLoadingBtn(false)
        console.log(err.response.data.message ?? 'Error Login')
        setErrorMes(err.response.data.message ?? 'Error Login')
      }
    }
  }

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
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
    <ScrollView contentContainerStyle={{ flexGrow: 1, flex: 1, backgroundColor: 'white' }}>
      <View className="flex-1">
        <View style={{ width: '100%', height: 300 }}>
          <Image source={logo} contentFit="contain" style={{ width: '100%', height: '100%' }} />
        </View>

        <View className="px-5 pt-10">
          <View className="mb-8">
            <Text style={{ color: '#721d59' }} className="text-4xl ">
              Welcome!
            </Text>
          </View>

          <View className="mt-10 gap-4">
            <InputField lable="Email Address" name="email" errorMes={errorMes} formik={formik} />
            <InputField lable="Password" name="password" errorMes={errorMes} formik={formik} />
          </View>

          <View className="mt-10 gap-8">
            {isLoadingBtn ? (
              <ActivityIndicator size={70} />
            ) : (
              <Button
                onPress={() => formik.handleSubmit()}
                style={{
                  backgroundColor: '#721d59',
                  height: 75,
                  borderRadius: 30,
                }}
                contentStyle={{
                  height: 75,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
                labelStyle={{ fontSize: 20, fontWeight: 'bold', color: 'white' }}>
                Login
              </Button>
            )}
            <View className="items-center">
              <HelperText
                style={{ fontSize: 20, color: '#e03c3c' }}
                type="error"
                visible={!!errorMes}>
                {errorMes}
              </HelperText>
            </View>

            <TouchableOpacity
              onPress={() => !isLoadingBtn && router.push('/SignUp')}
              className="items-center">
              <Text style={{ color: '#721d59' }} className={` w-[245px] text-xl`}>
                Not a member? Register now
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ScrollView>
  )
}
