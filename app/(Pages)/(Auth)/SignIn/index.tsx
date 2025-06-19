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
import { useDispatch } from 'react-redux'
const logo = require('../../../../assets/mainLogo.png')

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
    <ScrollView
      contentContainerStyle={{
        backgroundColor: '#661534',
      }}
      style={{ flex: 1 }}
      keyboardShouldPersistTaps="handled">
      <View className="flex-1">
        <View style={{ width: '100%', height: 350 }}>
          <Image source={logo} contentFit="fill" style={{ width: '100%', height: '100%' }} />
        </View>
        <View className="h-full rounded-2xl bg-white  p-6 pb-[85px]">
          <View className="h-[60px] flex-row items-center justify-center space-x-2 rounded-[7px] border-2 border-[#F5F6F9] bg-[#F5F6F9] p-0.5">
            <Button
              mode="contained"
              buttonColor="white"
              style={{ flex: 1, borderRadius: 6 }}
              contentStyle={{
                height: 56,
                alignItems: 'center',
                justifyContent: 'center',
              }}
              labelStyle={{
                color: '#232447',
                fontSize: 14,
                textAlign: 'center',
              }}>
              Log In
            </Button>

            <Button
              onPress={() => router.push('/SignUp')}
              style={{ flex: 1, borderRadius: 6 }}
              contentStyle={{
                height: 56,
                alignItems: 'center',
                justifyContent: 'center',
              }}
              labelStyle={{
                color: '#7D7D91',
                fontSize: 14,
                textAlign: 'center',
              }}>
              Sign Up
            </Button>
          </View>
          <View className="mt-15">
            <View className="mt-10">
              <InputField lable={'Email'} name={'email'} formik={formik} errorMes={errorMes} />
              <InputField
                lable={'Password'}
                name={'password'}
                formik={formik}
                errorMes={errorMes}
              />
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
                <HelperText
                  style={{ fontSize: 20, color: '#e03c3c' }}
                  type="error"
                  visible={!!errorMes}>
                  {errorMes}
                </HelperText>
              </View>
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  )
}
