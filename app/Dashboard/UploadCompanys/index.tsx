import { View, Text, TouchableOpacity, ActivityIndicator, useWindowDimensions } from 'react-native'
import React, { useState } from 'react'
import * as DocumentPicker from 'expo-document-picker'
import axiosClient from 'lib/api/axiosClient'
import { Icon } from 'react-native-paper'
const backImg = require('../../../assets/backn.png')
import * as Animatable from 'react-native-animatable'
import { Image } from 'expo-image'
import AppBar from 'components/App Bar'
import { useRouter } from 'expo-router'

export default function UploadCompanys() {
  const [uploading, setUploading] = useState(false)
  const [fileName, setFileName] = useState<string | null>(null)
  const { width, height } = useWindowDimensions()
  const router = useRouter()
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
          'text/csv', // .csv
          'application/vnd.ms-excel', // .xls
          'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', // .xlsx
          'application/vnd.oasis.opendocument.spreadsheet', // .ods
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
    <Animatable.View animation="fadeIn" duration={100} style={{ flex: 1 }}>
      <View style={{ position: 'absolute', top: height * 0.2, width: '100%' }}>
        <Image
          style={{ width: '100%', height: height * 0.25 }}
          contentFit="fill"
          source={backImg}
        />
      </View>

      <View style={{ width: '100%', height: height * 0.3, zIndex: -1 }}>
        <Image source={backImg} contentFit="fill" style={{ width: '100%', height: '100%' }} />
      </View>
      <View
        style={{
          flex: 1,
          borderTopLeftRadius: 100,
          borderTopRightRadius: 100,
          backgroundColor: 'white',
          padding: 50,
          justifyContent: 'center',
        }}>
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
    </Animatable.View>
  )
}
