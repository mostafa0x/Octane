import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native'
import React, { memo, useCallback } from 'react'
import { Feather } from '@expo/vector-icons'
import { HelperText } from 'react-native-paper'
import { responsiveHeight as rh, responsiveWidth as rw } from 'react-native-responsive-dimensions'
import { RFValue } from 'react-native-responsive-fontsize'

interface Props {
  label: string
  name: string
  formik: any
  errorMes?: string | null
}

const InputField = memo(({ label, name, formik, errorMes }: Props) => {
  const [showPassword, setShowPassword] = React.useState(false)

  const isPassword = ['password', 'repassword'].includes(name)
  const isNumberField = ['cards_submitted'].includes(name)
  const isErrorEmail = errorMes === 'User already exists' && name === 'email'
  const hasError =
    errorMes && errorMes !== 'User already exists'
      ? errorMes
      : formik.touched?.[name] && !!formik.errors?.[name]
  const shouldShowError = formik.touched?.[name] && !!formik.errors?.[name]
  const hasSupspend = errorMes === 'Account suspended'

  const togglePasswordVisibility = useCallback(() => {
    setShowPassword((prev) => !prev)
  }, [])

  const styles = createStyles(hasError || isErrorEmail, hasSupspend)

  return (
    <View style={styles.container}>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Text style={styles.label}>{label}</Text>
        <HelperText style={styles.helperText} type="error" visible={!!shouldShowError}>
          {(shouldShowError || hasError) && '*'}
          {formik.errors?.[name]}
        </HelperText>
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          keyboardType={isNumberField ? 'numeric' : 'default'}
          onSubmitEditing={() => isPassword && formik.handleSubmit()}
          onChangeText={formik.handleChange(name)}
          onBlur={() => formik.handleBlur(name)}
          value={
            isNumberField ? parseInt(formik.values?.[name]) : formik.values?.[name]?.toString()
          }
          style={styles.input}
          placeholder={isNumberField ? '0' : label}
          secureTextEntry={isPassword && !showPassword}
          placeholderTextColor="#ACB5BB"
        />

        {isPassword && (
          <TouchableOpacity onPress={togglePasswordVisibility} style={styles.eyeIcon}>
            <Feather name={showPassword ? 'eye' : 'eye-off'} color="#ACB5BB" size={RFValue(20)} />
          </TouchableOpacity>
        )}
      </View>
    </View>
  )
})

const createStyles = (hasError: boolean, hasSupspend: boolean) =>
  StyleSheet.create({
    container: {
      marginBottom: rh(2),
    },
    label: {
      marginBottom: rh(0.5),
      fontSize: RFValue(14),
      color: '#6C7278',
      width: rw(40),
    },
    inputContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: rw(3),
      paddingVertical: rh(0.2),
      borderRadius: rw(3),
      borderWidth: 2,
      borderColor: !hasSupspend && hasError ? '#e03c3c' : '#EDF1F3',
      backgroundColor: '#FFFFFF',
    },
    input: {
      flex: 1,
      height: rh(6),
      fontSize: RFValue(14),
      color: 'black',
      paddingVertical: 0,
    },
    eyeIcon: {
      padding: rw(1.5),
      marginLeft: rw(2),
    },
    helperText: {
      fontSize: RFValue(10),
      width: rw(50),
      color: 'red',
      textAlign: 'right',
    },
  })

export default InputField
