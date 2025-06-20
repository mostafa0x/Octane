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
import { SignUpvalidationSchema } from 'lib/Vaildtions/SignupSchema'
import * as Animatable from 'react-native-animatable'

const logo = require('../../assets/mainLogo.png')
const backImg = require('../../assets/backn.png')

export default function SignUp() {
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
        console.log(data)
        await storeUserInfo(data.token, data.user, router, dispatch)
      } catch (err: any) {
        setIsLoadingBtn(false)
        console.log(err.response.data.message ?? 'Error Sign up')
        setErrorMes(err.response.data.message ?? 'Error Sign up')
      }
    }
  }

  const formik = useFormik({
    initialValues: {
      name: 'adam',
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
    <Animatable.View className="z-50 flex-1" animation="fadeIn" duration={600} easing="ease-in-out">
      <View className="mt-10">
        <InputField lable={'Username'} name={'name'} formik={formik} errorMes={errorMes} />
        <InputField lable={'Email'} name={'email'} formik={formik} errorMes={errorMes} />
        <InputField lable={'Password'} name={'password'} formik={formik} errorMes={errorMes} />
      </View>
      <View className="mt-[10px]">
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
            Sign Up
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
