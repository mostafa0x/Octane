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
  setShowImageOptions: (payload: boolean) => void
}

function UploadImage({ formik, setShowImageOptions }: props) {
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
              height: rh(7),
              borderRadius: rw(2),
            }}
            source={{ uri: formik.values.image }}
          />
        </TouchableOpacity>
      ) : (
        <Animatable.View style={{ alignItems: 'center' }}>
          <Button
            buttonColor="#8d1c47"
            icon="image"
            mode="contained"
            style={{ width: rw(50), height: rh(5) }}
            contentStyle={{ height: rh(5) }}
            labelStyle={{
              fontSize: rf(1.7),
              textAlign: 'center',
              color: 'white',
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
    },
    helperText: {
      fontSize: rf(1.5),
      color: 'red',
      textAlign: 'center',
    },
  })

export default memo(UploadImage)
