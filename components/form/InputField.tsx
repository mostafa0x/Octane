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
  const isPassword = ['password', 'repassword'].includes(name)
  const isError: boolean =
    errorMes !== 'User already exists' && errorMes
      ? errorMes
      : formik.touched?.[name] && !!formik.errors?.[name]
  const isErrorEmail = errorMes == 'User already exists' && name == 'email'

  // useEffect(() => {
  //   return () => {}
  // }, [formik.handleChange('email')])

  return (
    <>
      <Text className="mb-2 text-[16px] text-[#6C7278]">{lable}</Text>
      <View
        className="flex-row items-center  px-4 py-2"
        style={{
          borderRadius: 10,
          borderWidth: 2,
          borderColor: isError || isErrorEmail ? '#e03c3c' : '#EDF1F3',
        }}>
        <TextInput
          onSubmitEditing={() => isPassword && formik.handleSubmit()}
          onChangeText={formik.handleChange(name)}
          onBlur={formik.handleBlur(name)}
          value={formik.values?.[name]}
          style={{ flex: 1, height: 50, fontSize: 14 }}
          placeholder={lable}
          secureTextEntry={isPassword && !showPassword}
        />
        {isPassword && (
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
            <Feather name={showPassword ? 'eye' : 'eye-off'} color={'#ACB5BB'} size={20} />
          </TouchableOpacity>
        )}
      </View>
      <HelperText style={{ fontSize: 14, color: 'red' }} type="error" visible={isError}>
        {formik.errors?.[name]}
      </HelperText>
    </>
  )
}
export default memo(InputField)
