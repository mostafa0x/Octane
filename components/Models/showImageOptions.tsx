import { View, Text, TouchableOpacity, StyleSheet, Modal } from 'react-native'
import React, { memo } from 'react'
import * as ImagePicker from 'expo-image-picker'
import {
  responsiveHeight as rh,
  responsiveWidth as rw,
  responsiveFontSize as rf,
} from 'react-native-responsive-dimensions'

interface props {
  formik: any
  showImageOptions: boolean
  setShowImageOptions: (payload: boolean) => void
}

function ShowImageOptions_Model({ formik, showImageOptions, setShowImageOptions }: props) {
  const handleImagePick = async (type: 'camera' | 'gallery') => {
    let result

    if (type === 'camera') {
      result = await ImagePicker.launchCameraAsync({
        mediaTypes: ['images'],
        allowsEditing: true,
        quality: 0.5,
        aspect: [4, 3],
      })
    } else {
      result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ['images'],
        allowsEditing: true,
        quality: 0.5,
        aspect: [4, 3],
      })
    }

    if (!result.canceled) {
      const uri = result.assets[0].uri
      formik.setFieldValue('image', uri)
    }

    setShowImageOptions(false)
  }

  return (
    <Modal
      visible={showImageOptions}
      transparent
      animationType="fade"
      onRequestClose={() => setShowImageOptions(false)}>
      <TouchableOpacity
        activeOpacity={1}
        onPressOut={() => setShowImageOptions(false)}
        style={styles.modalOverlay}>
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>Select Image Source</Text>

          <TouchableOpacity style={styles.optionBtn} onPress={() => handleImagePick('camera')}>
            <Text style={styles.optionText}>📷 From Camera</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.optionBtn} onPress={() => handleImagePick('gallery')}>
            <Text style={styles.optionText}>🖼️ From Gallery</Text>
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    </Modal>
  )
}

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end',
  },
  modalContainer: {
    backgroundColor: 'white',
    padding: rw(5),
    borderTopRightRadius: rw(5),
    borderTopLeftRadius: rw(5),
  },
  modalTitle: {
    fontSize: rf(2.2),
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: rh(2),
  },
  optionBtn: {
    paddingVertical: rh(2),
    paddingHorizontal: rw(5),
    backgroundColor: '#f2f2f2',
    borderRadius: rw(3),
    marginBottom: rh(1.5),
  },
  optionText: {
    fontSize: rf(2),
    textAlign: 'center',
  },
})

export default memo(ShowImageOptions_Model)
