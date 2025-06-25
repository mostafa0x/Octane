import { View, Text, TouchableOpacity, StyleSheet, Modal } from 'react-native'
import React, { memo, useState } from 'react'
import * as ImagePicker from 'expo-image-picker'

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
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        quality: 0.5,
      })
    } else {
      result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        quality: 0.5,
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
    padding: 20,
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 15,
  },
  optionBtn: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    backgroundColor: '#f2f2f2',
    borderRadius: 10,
    marginBottom: 10,
  },
  optionText: {
    fontSize: 16,
    textAlign: 'center',
  },
})

export default memo(ShowImageOptions_Model)
