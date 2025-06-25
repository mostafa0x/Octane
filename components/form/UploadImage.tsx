import { View, Text, TouchableOpacity, Keyboard } from 'react-native'
import React, { memo } from 'react'
import * as Animatable from 'react-native-animatable'
import { Image } from 'expo-image'
import { Button, HelperText } from 'react-native-paper'

interface props {
  formik: any
  width: number
  height: number
  setShowImageOptions: (payload: boolean) => void
}

function UploadImage({ formik, width, height, setShowImageOptions }: props) {
  return (
    <>
      {formik.values.image !== '' ? (
        <TouchableOpacity
          onPress={() => setShowImageOptions(true)}
          className="items-center rounded-2xl border-2 border-gray-200">
          <Image
            contentFit="contain"
            style={{ width: width * 0.5, height: height * 0.1 }}
            source={{ uri: formik.values.image }}
          />
        </TouchableOpacity>
      ) : (
        <Animatable.View>
          <Button
            buttonColor="#8d1c47"
            icon="image"
            mode="contained"
            onPress={() => {
              Keyboard.dismiss()
              setShowImageOptions(true)
            }}>
            Upload Image
          </Button>
        </Animatable.View>
      )}

      <HelperText type="error" visible={formik.touched.image && !!formik.errors.image}>
        {formik.errors.image}
      </HelperText>
    </>
  )
}

export default memo(UploadImage)
