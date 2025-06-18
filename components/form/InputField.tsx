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
    <>
      <Text className="text-xl text-[#721d59]">{lable}</Text>
      <View
        className="flex-row items-center rounded-3xl px-4 py-2"
        style={{
          borderWidth: 2,
          borderColor: isError ? '#e03c3c' : '#721d59',
        }}>
        <TextInput
          onSubmitEditing={() => isPassword && formik.handleSubmit()}
          onChangeText={formik.handleChange(name)}
          onBlur={formik.handleBlur(name)}
          value={formik.values?.[name]}
          style={{ flex: 1, height: 50 }}
          placeholder={lable}
          secureTextEntry={isPassword && !showPassword}
        />
        {isPassword && (
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
            <Feather name={showPassword ? 'eye' : 'eye-off'} size={24} color="white" />
          </TouchableOpacity>
        )}
      </View>
      <HelperText style={{ fontSize: 16, color: 'red' }} type="error" visible={isError}>
        {formik.errors?.[name]}
      </HelperText>
    </>
  )
}
export default memo(InputField)
