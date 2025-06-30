import {
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  useWindowDimensions,
  Modal,
} from 'react-native'
import React, { useRef, useState } from 'react'
import * as DocumentPicker from 'expo-document-picker'
import axiosClient from 'lib/api/axiosClient'
import { Button, HelperText, Icon } from 'react-native-paper'
const backImg = require('../../../assets/backn.png')
import * as Animatable from 'react-native-animatable'
import { Image } from 'expo-image'
import { UpdateCompanys } from 'Services/Storage'
import { useDispatch } from 'react-redux'

export default function UploadCompanys() {
  const [uploading, setUploading] = useState(false)
  const [fileName, setFileName] = useState<string | null>(null)
  const { width, height } = useWindowDimensions()
  const [errorRes, setErrorRes] = useState<string | null>(null)
  const [succusRes, setSuccusRes] = useState<string | null>(null)
  const [fileRes, setFileRes] = useState<DocumentPicker.DocumentPickerResult>()
  const [confirmUpload, setConfirmUpload] = useState(false)
  const dispatch = useDispatch()

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
      console.log('Upload success:', response.data)
    } catch (err: any) {
      setErrorRes(err.response?.data?.message ?? 'Error Upload File!')
      throw err
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
        setFileRes(res)
        setConfirmUpload(true)
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
        }}>
        <View
          style={{
            justifyContent: 'center',
            marginTop: height * 0.01,
            marginBottom: height * 0.05,
            gap: 30,
          }}>
          <View style={{ padding: 10 }}>
            <Text
              style={{ fontWeight: 'bold', marginBottom: height * 0.008, fontSize: width * 0.042 }}>
              Supported file formats:
            </Text>
            {formats.current.map((item, index) => (
              <View
                key={index}
                style={{ flexDirection: 'row', marginBottom: height * 0.004, width: width }}>
                <Text style={{ fontSize: width * 0.032 }}>{'\u2022'} </Text>
                <Text style={{ fontSize: width * 0.034, width: '100%' }}>
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
              backgroundColor: '#0068FF',
              paddingVertical: height * 0.014,
              paddingHorizontal: width * 0.25,
              borderRadius: 10,
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <Icon source="file-upload-outline" color="white" size={24} />
            <Text style={{ color: 'white', fontSize: width * 0.036, marginLeft: width * 0.01 }}>
              {uploading ? 'Uploading...' : 'Upload Excel File'}
            </Text>
          </TouchableOpacity>

          {fileName && (
            <Text
              style={{
                marginTop: height * 0.02,
                color: '#333',
                fontSize: width * 0.028,
                textAlign: 'center',
              }}>
              Selected: {'  '}
              <Text style={{ fontWeight: 'bold', fontSize: width * 0.032 }}>{fileName}</Text>
            </Text>
          )}

          {uploading && (
            <ActivityIndicator style={{ marginTop: 20 }} size="large" color="#0068FF" />
          )}
          <View style={{ alignItems: 'center', marginTop: height * 0.02 }}>
            <HelperText
              style={{ fontSize: width * 0.042, textAlign: 'center' }}
              type="error"
              visible={!!errorRes}>
              {errorRes}
            </HelperText>
            <HelperText
              style={{ fontSize: width * 0.042, color: 'green', width: width, textAlign: 'center' }}
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
              width: width * 0.8,
              height: height * 0.35,
              backgroundColor: '#fff',
              padding: 20,
              borderRadius: 70,
              elevation: 5,
            }}>
            <View style={{ alignItems: 'center', marginTop: height * 0.01, gap: 15 }}>
              <Text
                style={{
                  padding: 25,
                  width: '100%',
                  textAlign: 'center',
                  fontWeight: '300',
                  fontSize: width * 0.032,
                }}>
                The uploaded file will update the existing companies' data. Please make sure all
                information is correct before proceeding,{' '}
                <Text
                  style={{
                    width: '100%',
                    textAlign: 'center',
                    fontWeight: 'bold',
                    color: 'orange',
                    fontSize: width * 0.032,
                  }}>
                  as the current data will be overwritten.
                </Text>
              </Text>
              <Text
                style={{
                  marginTop: height * 0.02,
                  color: '#333',
                  fontSize: width * 0.028,
                  textAlign: 'center',
                  width: width * 0.8,
                }}>
                Selected: {'  '}
                <Text style={{ color: 'red', fontWeight: 'bold', fontSize: width * 0.032 }}>
                  {fileName}
                </Text>
              </Text>
              <View
                style={{
                  gap: 20,
                  flexDirection: 'row',
                  marginTop: height * 0.03,
                }}>
                <Button
                  onPress={() => setConfirmUpload(false)}
                  buttonColor="#d2e6d4"
                  textColor="black"
                  contentStyle={{ height: height * 0.05 }}
                  style={{ width: width * 0.3, height: height * 0.05 }}>
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
                  contentStyle={{ height: height * 0.05 }}
                  style={{ width: width * 0.3, height: height * 0.05 }}>
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
