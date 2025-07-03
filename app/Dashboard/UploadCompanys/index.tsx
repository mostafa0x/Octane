import { View, TouchableOpacity, ActivityIndicator, Modal } from 'react-native'
import React, { useRef, useState } from 'react'
import * as DocumentPicker from 'expo-document-picker'
import axiosClient from 'lib/api/axiosClient'
import { Button, HelperText, Icon, Text } from 'react-native-paper'
import {
  responsiveHeight as rh,
  responsiveWidth as rw,
  responsiveFontSize as rf,
} from 'react-native-responsive-dimensions'
import { Image } from 'expo-image'
import * as Animatable from 'react-native-animatable'
import { UpdateCompanys } from 'Services/Storage'
import { useDispatch } from 'react-redux'
import { useThemeContext } from 'Providers/ThemeContext'

const backImg = require('../../../assets/backn.png')

export default function UploadCompanys() {
  const [uploading, setUploading] = useState(false)
  const [fileName, setFileName] = useState<string | null>(null)
  const [errorRes, setErrorRes] = useState<string | null>(null)
  const [succusRes, setSuccusRes] = useState<string | null>(null)
  const [fileRes, setFileRes] = useState<DocumentPicker.DocumentPickerResult>()
  const [confirmUpload, setConfirmUpload] = useState(false)
  const dispatch = useDispatch()
  const { themeMode } = useThemeContext()
  const formats = useRef([
    { ext: '.csv', desc: 'Comma-Separated Values' },
    { ext: '.xls', desc: 'Microsoft Excel 97-2003' },
    { ext: '.xlsx', desc: 'Microsoft Excel' },
    { ext: '.ods', desc: 'OpenDocument Spreadsheet' },
  ])

  const uploadExcelFile = async (file: DocumentPicker.DocumentPickerResult) => {
    if (uploading) return
    setErrorRes(null)
    setSuccusRes(null)
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
      setSuccusRes(response.data.message)
      await UpdateCompanys(dispatch)
    } catch (err: any) {
      setErrorRes(err.response?.data?.message ?? 'Error Upload File!')
      throw err
    } finally {
      setUploading(false)
    }
  }

  const pickExcelFile = async () => {
    setErrorRes(null)
    setSuccusRes(null)
    setFileName('')

    try {
      const res = await DocumentPicker.getDocumentAsync({
        type: '*/*',
        copyToCacheDirectory: true,
        multiple: false,
      })
      if (!res.canceled && res.assets?.length) {
        const name = res.assets[0].name.toLowerCase()

        const allowedExts = ['.csv', '.xls', '.xlsx', '.ods']

        if (!allowedExts.some((ext) => name.endsWith(ext))) {
          setErrorRes(
            '❌ Unsupported file type. Only the following formats are allowed: .csv, .xls, .xlsx, .ods'
          )
          return
        }
        setFileName(name)
        setFileRes(res)
        setConfirmUpload(true)
      }
    } catch (error) {
      console.error('Error picking file:', error)
    }
  }

  return (
    <Animatable.View animation="fadeIn" duration={100} style={{ flex: 1 }}>
      <View style={{ position: 'absolute', top: rh(20), width: '100%' }}>
        <Image style={{ width: '100%', height: rh(25) }} contentFit="fill" source={backImg} />
      </View>

      <View style={{ width: '100%', height: rh(30), zIndex: -1 }}>
        <Image source={backImg} contentFit="fill" style={{ width: '100%', height: '100%' }} />
      </View>

      <View
        style={{
          flex: 1,
          borderTopLeftRadius: 100,
          borderTopRightRadius: 100,
          backgroundColor: themeMode == 'dark' ? 'black' : 'white',
          padding: rw(5),
        }}>
        <View style={{ justifyContent: 'center', marginTop: rh(1), marginBottom: rh(5), gap: 30 }}>
          <View style={{ padding: rw(8) }}>
            <Text style={{ fontWeight: 'bold', marginBottom: rh(0.8), fontSize: rf(2.2) }}>
              Supported file formats:
            </Text>
            {formats.current.map((item, index) => (
              <View
                key={index}
                style={{ flexDirection: 'row', marginBottom: rh(0.4), width: '100%' }}>
                <Text style={{ fontSize: rf(1.8) }}>{'\u2022'} </Text>
                <Text style={{ fontSize: rf(1.9), width: '100%', fontWeight: 'regular' }}>
                  {item.ext} ({item.desc})
                </Text>
              </View>
            ))}
          </View>
        </View>

        <View style={{ justifyContent: 'center' }}>
          <TouchableOpacity
            onPress={pickExcelFile}
            disabled={uploading}
            style={{
              backgroundColor: '#8d1c47',
              paddingVertical: rh(1.4),
              paddingHorizontal: rw(25),
              borderRadius: 10,
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <Icon source="file-upload-outline" color="white" size={rf(3)} />
            <Text style={{ color: 'white', fontSize: rf(2), textAlign: 'center' }}>
              {uploading ? 'Uploading...' : 'Upload Excel File'}
            </Text>
          </TouchableOpacity>

          {fileName && (
            <Text
              style={{
                marginTop: rh(2),
                color: '#333',
                fontSize: rf(1.5),
                textAlign: 'center',
              }}>
              Selected: {'  '}
              <Text style={{ fontWeight: 'bold', fontSize: rf(1.4) }}>{fileName}</Text>
            </Text>
          )}

          {uploading && (
            <ActivityIndicator style={{ marginTop: rh(2) }} size="large" color="#0068FF" />
          )}

          <View style={{ alignItems: 'center', marginTop: rh(2) }}>
            <HelperText
              style={{
                fontSize: (errorRes?.length ?? 0) >= 35 ? rf(1.4) : rf(2.5),
                fontWeight: 'regular',
                textAlign: 'center',
              }}
              type="error"
              visible={!!errorRes}>
              {errorRes}
            </HelperText>
            <HelperText
              style={{ fontSize: rf(2.2), color: 'green', width: '100%', textAlign: 'center' }}
              type="info"
              visible={!!succusRes}>
              {succusRes}
            </HelperText>
          </View>
        </View>
      </View>

      <Modal
        animationType="fade"
        transparent
        visible={confirmUpload}
        onRequestClose={() => setConfirmUpload(false)}>
        <View
          style={{
            flex: 1,
            backgroundColor: 'rgba(0,0,0,0.8)',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <View
            style={{
              width: rw(80),
              height: rh(35),
              backgroundColor: '#fff',
              padding: rw(5),
              borderRadius: 70,
              elevation: 5,
            }}>
            <View style={{ alignItems: 'center', marginTop: rh(1), gap: 15 }}>
              <Text
                style={{
                  padding: rw(5),
                  width: '100%',
                  textAlign: 'center',
                  fontWeight: '300',
                  color: 'black',
                  fontSize: rf(1.5),
                }}>
                The uploaded file will update the existing companies' data. Please make sure all
                information is correct before proceeding,{' '}
                <Text style={{ fontWeight: 'bold', color: 'orange', fontSize: rf(1.5) }}>
                  as the current data will be overwritten.
                </Text>
              </Text>
              <Text
                style={{
                  marginTop: rh(2),
                  color: '#333',
                  fontSize: rf(1.4),
                  textAlign: 'center',
                  width: '100%',
                }}>
                Selected: {'  '}
                <Text style={{ color: 'red', fontWeight: 'bold', fontSize: rf(1.4) }}>
                  {fileName}
                </Text>
              </Text>
              <View style={{ gap: 20, flexDirection: 'row', marginTop: rh(3) }}>
                <Button
                  onPress={() => setConfirmUpload(false)}
                  buttonColor="#d2e6d4"
                  textColor="black"
                  contentStyle={{ height: rh(5) }}
                  style={{ width: rw(30), height: rh(5) }}>
                  cancel
                </Button>
                <Button
                  onPress={() => {
                    if (!fileRes) return
                    uploadExcelFile(fileRes)
                    setConfirmUpload(false)
                  }}
                  buttonColor="#8d1c47"
                  textColor="white"
                  contentStyle={{ height: rh(5) }}
                  style={{ width: rw(30), height: rh(5) }}>
                  confirm
                </Button>
              </View>
            </View>
          </View>
        </View>
      </Modal>
    </Animatable.View>
  )
}
