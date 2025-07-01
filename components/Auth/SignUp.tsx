import {
  View,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native'
import { useCallback, useState } from 'react'
import InputField from 'components/form/InputField'
import { ActivityIndicator, Button, HelperText } from 'react-native-paper'
import { useFormik } from 'formik'
import axios from 'axios'
import { storeUserInfo } from 'Services/Storage'
import { useFocusEffect, useRouter } from 'expo-router'
import { API_BASE_URL } from 'config'
import { useDispatch } from 'react-redux'
import { SignUpvalidationSchema } from 'lib/Vaildtions/SignupSchema'
import * as Animatable from 'react-native-animatable'
import { moderateScale, scale, verticalScale } from 'react-native-size-matters'

export default function SignUp({ setIsLoadingRes }: any) {
  const [errorMes, setErrorMes] = useState<string | null>(null)
  const [isLoadingBtn, setIsLoadingBtn] = useState(false)
  const router = useRouter()
  const dispatch = useDispatch()

  async function handleSignUp(formValues: any) {
    if (!isLoadingBtn) {
      setErrorMes(null)
      setIsLoadingRes(true)
      setIsLoadingBtn(true)
      try {
        const res = await axios.post(`${API_BASE_URL}/auth/signup`, formValues)
        const data = res.data
        await storeUserInfo(data.token, data.user, router, dispatch)
      } catch (err: any) {
        setIsLoadingBtn(false)
        setErrorMes(err.response?.data?.message ?? 'Error Sign up')
      } finally {
        setIsLoadingRes(false)
      }
    }
  }

  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      password: '',
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
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <Animatable.View
          style={styles.inner}
          animation="fadeIn"
          duration={400}
          easing="ease-in-out">
          <View style={styles.form}>
            <InputField label="Username" name="name" formik={formik} errorMes={errorMes} />
            <InputField label="Email" name="email" formik={formik} errorMes={errorMes} />
            <InputField label="Password" name="password" formik={formik} errorMes={errorMes} />
          </View>

          <View style={styles.buttonWrapper}>
            {isLoadingBtn ? (
              <ActivityIndicator size={verticalScale(30)} />
            ) : (
              <Button
                onPress={() => formik.handleSubmit()}
                style={styles.button}
                contentStyle={styles.buttonContent}
                labelStyle={styles.buttonLabel}
                textColor="#FFFFFF"
                buttonColor="#8d1c47">
                Sign Up
              </Button>
            )}
          </View>

          {errorMes && (
            <View style={styles.errorWrapper}>
              <HelperText style={styles.errorText} type="error" visible={!!errorMes}>
                {errorMes}
              </HelperText>
            </View>
          )}
        </Animatable.View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: scale(12),
  },
  inner: {
    marginTop: verticalScale(20),
    justifyContent: 'center',
  },
  form: {
    marginBottom: verticalScale(5),
  },
  buttonWrapper: {
    alignItems: 'center',
    marginTop: verticalScale(2),
  },
  button: {
    borderRadius: moderateScale(20),
    height: verticalScale(45),
    width: scale(180),
    justifyContent: 'center',
  },
  buttonContent: {
    height: verticalScale(50),
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonLabel: {
    fontSize: moderateScale(15),
    textAlignVertical: 'center',
  },
  errorWrapper: {
    marginTop: verticalScale(20),
    alignItems: 'center',
  },
  errorText: {
    fontSize: moderateScale(14),
    color: '#e03c3c',
  },
})
