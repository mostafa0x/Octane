import { View, Text, TextInput, Pressable, TouchableOpacity } from 'react-native'
import React, { memo, useEffect, useState } from 'react'
import { Feather } from '@expo/vector-icons'
import { HelperText } from 'react-native-paper'

interface props {
  lable: string
  name: string
  formik: any
  errorMes: string | null
}

function InputField({ lable, name, formik, errorMes }: props) {
  const [showPassword, setShowPassword] = useState(false)
  const isPassword = name === 'password'
  const isError: boolean = errorMes ? errorMes : formik.touched?.[name] && !!formik.errors?.[name]

  return (
    <View className="gap-4">
      <Text className="text-xl text-[#562b6a]">{lable}</Text>
      <View
        className={`flex-row items-center rounded-3xl border-2 ${isError ? 'border-[#c07615]' : 'border-[#562b6a]'}  px-4 py-2`}>
        <TextInput
          onSubmitEditing={() => isPassword && formik.handleSubmit()}
          onChangeText={formik.handleChange(name)}
          onBlur={formik.handleBlur(name)}
          value={formik.values?.[name]}
          style={{ flex: 1, height: 50 }}
          secureTextEntry={isPassword && !showPassword}
          placeholder={lable}
        />
        {isPassword && (
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
            <Feather name={showPassword ? 'eye' : 'eye-off'} size={30} color="gray" />
          </TouchableOpacity>
        )}
      </View>
      <HelperText style={{ fontSize: 16 }} type="error" visible={!!isError}>
        {formik.errors?.[name]}
      </HelperText>
    </View>
  )
}
export default memo(InputField)
