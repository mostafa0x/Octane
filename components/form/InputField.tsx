import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native'
import React, { memo, useCallback, useEffect, useMemo, useRef } from 'react'
import { Feather } from '@expo/vector-icons'
import { HelperText, Tooltip } from 'react-native-paper'
import { responsiveHeight as rh, responsiveWidth as rw } from 'react-native-responsive-dimensions'
import { RFValue } from 'react-native-responsive-fontsize'

interface Props {
  label: string
  name: string
  formik: any
  errorMes?: string | null
  allocated?: number
  submitted?: number
}

const InputField = memo(
  ({ label, name, formik, errorMes, allocated = 0, submitted = 0 }: Props) => {
    const totalCards = useMemo(() => {
      const value = ++allocated - (++submitted + parseInt(formik.values?.[name]))

      if (isNaN(value)) {
        return allocated - submitted
      } else {
        return value < 0 ? 0 : value
      }
    }, [formik.values, allocated, submitted])
    const [showPassword, setShowPassword] = React.useState(false)
    const isPassword = ['password', 'repassword'].includes(name)
    const isNumberField = ['cards_submitted'].includes(name)
    const isCardsSubmitted = ['cards_submitted'].includes(name)
    const isErrorEmail =
      (errorMes == 'User already exists' ||
        errorMes == 'Email must be in the form @octane-tech.io') &&
      name === 'email'
    const hasError =
      errorMes && isErrorEmail ? errorMes : formik.touched?.[name] && !!formik.errors?.[name]
    const shouldShowError = formik.touched?.[name] && !!formik.errors?.[name]
    const hasSupspend = errorMes === 'Account suspended'
    const togglePasswordVisibility = useCallback(() => {
      setShowPassword((prev) => !prev)
    }, [])
    const inputRef = useRef<React.ComponentRef<typeof TextInput>>(null)
    const styles = createStyles(hasError || isErrorEmail, hasSupspend)
    useEffect(() => {
      if (!isCardsSubmitted) return
      if (totalCards <= 0) {
        formik.setFieldValue(name, (allocated - submitted).toString())
        return
      }

      return () => {}
    }, [formik.values, totalCards])
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
            ref={inputRef}
            keyboardType={isNumberField ? 'numeric' : 'default'}
            onSubmitEditing={() => isPassword && formik.handleSubmit()}
            onChangeText={formik.handleChange(name)}
            onBlur={() => formik.handleBlur(name)}
            value={isNumberField ? formik.values?.[name] : formik.values?.[name]?.toString()}
            style={styles.input}
            placeholder={isNumberField ? '0' : label}
            secureTextEntry={isPassword && !showPassword}
            placeholderTextColor="#ACB5BB"
          />
          {isCardsSubmitted && (
            <Tooltip enterTouchDelay={0} leaveTouchDelay={2500} title="remaining allocated">
              <TouchableOpacity style={styles.eyeIcon}>
                <Text style={styles.labelNFC}>
                  {totalCards}/{allocated - submitted}
                </Text>
              </TouchableOpacity>
            </Tooltip>
          )}
          {isPassword && (
            <TouchableOpacity onPress={togglePasswordVisibility} style={styles.eyeIcon}>
              <Feather name={showPassword ? 'eye' : 'eye-off'} color="#ACB5BB" size={RFValue(20)} />
            </TouchableOpacity>
          )}
        </View>
      </View>
    )
  }
)

const createStyles = (hasError: boolean, hasSupspend: boolean) =>
  StyleSheet.create({
    container: {
      marginBottom: rh(2),
    },
    label: {
      marginBottom: rh(0.5),
      fontSize: RFValue(14),
      color: '#6C7278',
      width: rw(30),
    },
    labelNFC: {
      fontSize: RFValue(12),
      color: '#6C7278',
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
      fontSize: RFValue(12),
      color: 'black',
      paddingVertical: 0,
    },
    eyeIcon: {
      padding: rw(1.5),
      marginLeft: rw(2),
    },
    helperText: {
      flexWrap: 'wrap',
      fontSize: RFValue(10),
      width: rw(83),
      color: 'red',
      textAlign: 'right',
      paddingRight: rw(25),
    },
  })

export default InputField
