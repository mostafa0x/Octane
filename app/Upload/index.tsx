import { View, Text, useWindowDimensions, ScrollView } from 'react-native'
import React from 'react'
import * as Animatable from 'react-native-animatable'
import AppBar from 'components/App Bar'
import { Href, Route, RouteInputParams } from 'expo-router'
import { NavigationOptions } from 'expo-router/build/global-state/routing'
import InputField from 'components/form/InputField'
import { useFormik } from 'formik'
import { UploadvalidationSchema } from 'lib/Vaildtions/UploadSchema'
import { HelperText, SegmentedButtons, Tooltip } from 'react-native-paper'
import SegmentedBtn from 'components/SegmentedBtn'

export default function Upload() {
  const { width, height } = useWindowDimensions()
  const [value, setValue] = React.useState('')

  async function handleUpload(formValues: any) {}

  const formik = useFormik({
    initialValues: {
      submission_type: '',
      delivery_method: '',
      image: '',
      state_time: '',
    },
    validationSchema: UploadvalidationSchema,
    onSubmit: handleUpload,
  })

  return (
    <Animatable.View
      animation="fadeIn"
      duration={200}
      easing="ease-in-out"
      style={{ flex: 1, backgroundColor: 'black' }}>
      <View style={{ width: '100%', height: height * 0.2 }}></View>

      <View
        style={{
          flex: 1,
          borderTopLeftRadius: 50,
          borderTopRightRadius: 50,
          backgroundColor: 'white',
          paddingTop: height * 0.1,
          paddingHorizontal: height * 0.036,
        }}>
        <SegmentedBtn
          name={'submission_type'}
          lable={'submission type'}
          height={height}
          width={width}
          formik={formik}
        />
        <SegmentedBtn
          name={'delivery_method'}
          lable={'delivery method'}
          height={height}
          width={width}
          formik={formik}
        />
        <SegmentedBtn
          name={'state_time'}
          lable={'state time'}
          height={height}
          width={width}
          formik={formik}
        />

        <InputField
          lable={'cards submitted'}
          name={'cards_submitted'}
          formik={formik}
          errorMes={null}
        />
      </View>
    </Animatable.View>
  )
}
