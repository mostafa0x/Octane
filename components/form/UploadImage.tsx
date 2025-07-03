import { View, Text, TouchableOpacity, Keyboard, StyleSheet } from 'react-native'
import React, { memo } from 'react'
import * as Animatable from 'react-native-animatable'
import { Image } from 'expo-image'
import { Button, HelperText } from 'react-native-paper'
import {
  responsiveHeight as rh,
  responsiveWidth as rw,
  responsiveFontSize as rf,
} from 'react-native-responsive-dimensions'

interface props {
  formik: any
  themeMode: string
  setShowImageOptions: (payload: boolean) => void
}

function UploadImage({ formik, setShowImageOptions, themeMode }: props) {
  const styles = createStyles()

  return (
    <>
      {formik.values.image !== '' ? (
        <TouchableOpacity
          onPress={() => setShowImageOptions(true)}
          style={styles.imagePreviewContainer}>
          <Image
            contentFit="contain"
            style={{
              width: rw(50),
              height: rh(10),
              borderRadius: rw(2),
            }}
            source={{ uri: formik.values.image }}
          />
        </TouchableOpacity>
      ) : (
        <Animatable.View>
          <Button
            buttonColor="#8d1c47"
            icon="image"
            mode="contained"
            contentStyle={{ height: rh(4) }}
            labelStyle={{
              fontSize: rf(1.7),
              height: rf(2),
              color: themeMode == 'dark' ? 'white' : 'white',
            }}
            onPress={() => {
              Keyboard.dismiss()
              setShowImageOptions(true)
            }}>
            Upload Image
          </Button>
        </Animatable.View>
      )}

      <HelperText
        type="error"
        visible={formik.touched.image && !!formik.errors.image}
        style={styles.helperText}>
        {formik.errors.image}
      </HelperText>
    </>
  )
}

const createStyles = () =>
  StyleSheet.create({
    imagePreviewContainer: {
      alignItems: 'center',
      borderRadius: rw(4),
      borderWidth: 2,
      borderColor: '#D1D5DB',
      padding: rw(1),
    },
    helperText: {
      fontSize: rf(1.5),
      color: 'red',
      textAlign: 'center',
    },
  })

export default memo(UploadImage)
