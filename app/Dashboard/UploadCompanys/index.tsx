import { View, Text, TouchableOpacity, ActivityIndicator } from 'react-native'
import React, { useState } from 'react'
import * as DocumentPicker from 'expo-document-picker'
import axiosClient from 'lib/api/axiosClient'
import { Icon } from 'react-native-paper'

export default function UploadCompanys() {
  const [uploading, setUploading] = useState(false)
  const [fileName, setFileName] = useState<string | null>(null)

  const uploadExcelFile = async (file: DocumentPicker.DocumentPickerResult) => {
    setUploading(true)
    const formData = new FormData()

    const uriParts = file.assets?.[0].name.split('.')
    const fileType = uriParts?.[uriParts.length - 1]

    formData.append('file', {
      uri: file.assets?.[0].uri,
      name: file.assets?.[0].name,
      type: `application/vnd.openxmlformats-officedocument.spreadsheetml.sheet`,
    } as any)

    try {
      const response = await axiosClient.put('/admin/companies', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      console.log('Upload success:', response.data)
    } catch (err) {
      console.error('Upload error:', err)
    } finally {
      setUploading(false)
    }
  }

  const pickExcelFile = async () => {
    try {
      const res = await DocumentPicker.getDocumentAsync({
        type: [
          'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
          'application/vnd.ms-excel',
        ],
        copyToCacheDirectory: true,
        multiple: false,
      })

      if (!res.canceled && res.assets?.length) {
        const name = res.assets[0].name
        setFileName(name)
        uploadExcelFile(res)
      }
    } catch (error) {
      console.error('Error picking file:', error)
    }
  }

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 }}>
      <TouchableOpacity
        onPress={pickExcelFile}
        disabled={uploading}
        style={{
          backgroundColor: '#0068FF',
          paddingVertical: 14,
          paddingHorizontal: 25,
          borderRadius: 10,
          flexDirection: 'row',
          alignItems: 'center',
        }}>
        <Icon source="file-upload-outline" color="white" size={24} />
        <Text style={{ color: 'white', fontSize: 16, marginLeft: 10 }}>
          {uploading ? 'Uploading...' : 'Upload Excel File'}
        </Text>
      </TouchableOpacity>

      {fileName && (
        <Text style={{ marginTop: 20, color: '#333', fontSize: 14 }}>
          Selected: <Text style={{ fontWeight: 'bold' }}>{fileName}</Text>
        </Text>
      )}

      {uploading && <ActivityIndicator style={{ marginTop: 20 }} size="large" color="#0068FF" />}
    </View>
  )
}
