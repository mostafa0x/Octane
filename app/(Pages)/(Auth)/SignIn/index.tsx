import { View, Text, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { Image } from 'expo-image'
import InputField from 'components/form/InputField'
import { ActivityIndicator, Button, HelperText } from 'react-native-paper'
import { useFormik } from 'formik'
import { LoginSchema } from 'lib/Vaildtions/SignInValid'
import axios from 'axios'
const logo = require('../../../../assets/logo.png')

export default function SignIn() {
  const [errorMes, setErrorMes] = useState<string | null>(null)
  const [isLoadingBtn, setIsLoadingBtn] = useState(false)

  async function handleLogin(formValues: any) {
    if (!isLoadingBtn) {
      setErrorMes(null)
      setIsLoadingBtn(true)
      try {
        const res = await axios.post('https://octane-nine.vercel.app/api/auth/login', formValues)
        console.log(res.data)
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

  return (
    <View className="flex-1 justify-between">
      <View className="flex-2 mb-[90px] items-center p-10 pt-20">
        <Image source={logo} contentFit="contain" style={{ width: 200, height: 125 }} />
      </View>

      <View className="flex-1 bg-white px-5 pt-16">
        <View className="mb-8">
          <Text className="text-4xl text-[#562b6a]">Welcome!</Text>
        </View>

        <View className="gap-10">
          <InputField lable="Email Address" name="email" formik={formik} />
          <InputField lable="Password" name="password" formik={formik} />
        </View>

        <View className="mt-10 gap-12">
          {isLoadingBtn ? (
            <ActivityIndicator size={50} />
          ) : (
            <Button
              onPress={() => formik.handleSubmit()}
              style={{ backgroundColor: '#562b6a', height: 75, borderRadius: 30 }}
              contentStyle={{ height: 75, alignItems: 'center', justifyContent: 'center' }}
              labelStyle={{ fontSize: 20, fontWeight: 'bold' }}
              textColor="white">
              Login
            </Button>
          )}
          <View className="items-center">
            <HelperText style={{ fontSize: 20 }} type="error" visible={!!errorMes}>
              {errorMes}
            </HelperText>
          </View>

          <TouchableOpacity className="items-center">
            <Text className="w-[245px] text-xl text-[#562b6a]">Not a member? Register now</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  )
}
