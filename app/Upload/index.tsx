import {
  View,
  Text,
  useWindowDimensions,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Modal,
} from 'react-native'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import * as Animatable from 'react-native-animatable'
import AppBar from 'components/App Bar'
import { Href, Route, RouteInputParams } from 'expo-router'
import { NavigationOptions } from 'expo-router/build/global-state/routing'
import InputField from 'components/form/InputField'
import { useFormik } from 'formik'
import { UploadvalidationSchema } from 'lib/Vaildtions/UploadSchema'
import {
  ActivityIndicator,
  Button,
  HelperText,
  Portal,
  Searchbar,
  SegmentedButtons,
  Tooltip,
} from 'react-native-paper'
import SegmentedBtn from 'components/SegmentedBtn'
import SerachCompanys from 'components/SerachCompanys'
import { useDispatch, useSelector } from 'react-redux'
import { StateFace } from 'Types/Store/StateFace'
import { GetSerachCompany } from 'lib/Store/Slices/CompanySlice'
import * as ImagePicker from 'expo-image-picker'
import axiosClient from 'lib/api/axiosClient'
import { Image } from 'expo-image'

export default function Upload() {
  const { width, height } = useWindowDimensions()
  const { currentcompanys } = useSelector((state: StateFace) => state.CompanyReducer)
  const [selectCompany, setSelectCompany] = useState(0)
  const [isLoadingRes, setIsLoadingRes] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const searchBoxRef = useRef<React.ComponentRef<typeof Searchbar>>(null)
  const handleUpload = async (formValues: any) => {
    if (isLoadingRes) return
    setIsLoadingRes(true)
    try {
      const formData = new FormData()

      formData.append('company_id', formValues.company_id)
      formData.append('cards_submitted', formValues.cards_submitted)
      formData.append('submission_type', formValues.submission_type)
      formData.append('delivery_method', formValues.delivery_method)
      formData.append('state_time', formValues.state_time)

      if (formValues.image) {
        const fileName = formValues.image.split('/').pop()
        const fileType = fileName?.split('.').pop()

        formData.append('image', {
          uri: formValues.image,
          name: fileName || `photo.${fileType}`,
          type: `image/${fileType}`,
        } as any)
      }

      const response = await axiosClient.post(`/users/acknowledgments`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })

      const data = response.data
      console.log('Response:', data)
    } catch (err: any) {
      console.error('❌ Upload failed:', err?.response?.data || err.message)
      setIsLoadingRes(false)
    }
  }

  const dispatch = useDispatch()
  const formik = useFormik({
    initialValues: {
      company_id: 0,
      cards_submitted: 0,
      submission_type: '',
      delivery_method: '',
      image: '',
      state_time: '',
    },
    validationSchema: UploadvalidationSchema,
    onSubmit: handleUpload,
  })

  const SelectCompanyID = useCallback((id: number, name: string) => {
    setSelectCompany(id)
    formik.setFieldValue('company_id', id)
    handleSerach(name)
  }, [])

  const handleSerach = useCallback((text: string) => {
    setSearchQuery(text)
    dispatch(GetSerachCompany(text))
  }, [])

  const handleClear = useCallback(() => {
    if (searchBoxRef.current) {
      searchBoxRef.current?.blur()
      setSearchQuery('')
    }
  }, [])

  useEffect(() => {
    handleSerach('')
    formik.setFieldTouched('image', false)
  }, [])

  const [showImageOptions, setShowImageOptions] = useState(false)
  const [showConfirmModal, setShowConfirmModal] = useState(false)
  const [errorApi, setErrorApi] = useState<string | null>(null)
  const handleImagePick = async (type: 'camera' | 'gallery') => {
    let result

    if (type === 'camera') {
      result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        quality: 0.9,
      })
    } else {
      result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        quality: 0.7,
      })
    }

    if (!result.canceled) {
      const uri = result.assets[0].uri
      formik.setFieldValue('image', uri)
      console.log('Selected Image URI:', uri)
    }

    setShowImageOptions(false)
  }

  return (
    <Animatable.View
      animation="fadeIn"
      duration={200}
      easing="ease-in-out"
      style={{ flex: 1, backgroundColor: 'black' }}>
      <View style={{ width: '100%', height: height * 0.1 }}></View>

      <View
        style={{
          flex: 1,
          borderTopLeftRadius: 50,
          borderTopRightRadius: 50,
          backgroundColor: 'white',
          paddingTop: height * 0.02,
          paddingHorizontal: height * 0.036,
        }}>
        <View style={{ marginTop: 20, width: width * 0.9 }}>
          <Searchbar
            ref={searchBoxRef}
            placeholder="Search"
            value={searchQuery}
            onChangeText={handleSerach}
            onClearIconPress={() => handleClear()}
          />
        </View>
        <SerachCompanys
          height={height}
          width={width}
          currentcompanys={currentcompanys}
          formik={formik}
          SelectCompanyID={SelectCompanyID}
          selectCompany={selectCompany}
        />
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
        <View style={{ marginTop: height * 0.02 }}>
          {formik.values.image !== '' ? (
            <TouchableOpacity onPress={() => setShowImageOptions(true)} className="items-center">
              <Image
                contentFit="contain"
                style={{ width: width * 0.5, height: height * 0.1 }}
                source={{ uri: formik.values.image }}
              />
            </TouchableOpacity>
          ) : (
            <Animatable.View animation="pulse" iterationCount="infinite" duration={1600}>
              <Button
                buttonColor="#8d1c47"
                icon="image"
                mode="contained"
                onPress={() => setShowImageOptions(true)}>
                Upload Image
              </Button>
            </Animatable.View>
          )}

          <HelperText type="error" visible={formik.touched.image && !!formik.errors.image}>
            {formik.errors.image}
          </HelperText>
          <View style={{ marginTop: height * 0 }}>
            <Button
              onPress={() => {
                if (formik.isValid && formik.dirty && formik.values.image) {
                  setShowConfirmModal(true)
                }
              }}
              textColor="white"
              buttonColor="#8d1c47">
              Submit
            </Button>
          </View>
          <Modal
            visible={showConfirmModal}
            transparent
            animationType="fade"
            onRequestClose={() => setShowConfirmModal(false)}>
            <View style={styles.centeredOverlay}>
              <View style={styles.confirmBox}>
                <Text style={styles.confirmTitle}>Confirm Submission</Text>
                {/* 
                {formik.values.image ? (
                  <View style={{ alignItems: 'center', marginVertical: 10 }}>
                    <Animatable.Image
                      animation="fadeIn"
                      duration={500}
                      source={{ uri: formik.values.image }}
                      style={{ width: 120, height: 120, borderRadius: 8 }}
                      resizeMode="cover"
                    />
                  </View>
                ) : null} */}
                <View style={{ gap: 24, marginTop: 40 }}>
                  <Text>📦 Company ID: {formik.values.company_id}</Text>
                  <Text>📝 Submission Type: {formik.values.submission_type}</Text>
                  <Text>🚚 Delivery Method: {formik.values.delivery_method}</Text>
                  <Text>🕒 State Time: {formik.values.state_time}</Text>
                  <Text>💳 Cards Submitted: {formik.values.cards_submitted}</Text>
                </View>

                <View
                  style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 50 }}>
                  {isLoadingRes ? (
                    <View className=" items-center justify-center">
                      <ActivityIndicator size={50} />
                    </View>
                  ) : (
                    <Button
                      mode="contained"
                      onPress={() => {
                        //  setShowConfirmModal(false)
                        // formik.handleSubmit()
                      }}
                      buttonColor="#4CAF50">
                      Confirm
                    </Button>
                  )}
                  {isLoadingRes ? null : (
                    <Button
                      mode="outlined"
                      onPress={() => setShowConfirmModal(false)}
                      textColor="#f44336">
                      Cancel
                    </Button>
                  )}
                  <HelperText visible={errorApi} type="error"></HelperText>
                </View>
              </View>
            </View>
          </Modal>

          <Modal
            visible={showImageOptions}
            transparent
            animationType="slide"
            onRequestClose={() => setShowImageOptions(false)}>
            <TouchableOpacity
              activeOpacity={1}
              onPressOut={() => setShowImageOptions(false)}
              style={styles.modalOverlay}>
              <View style={styles.modalContainer}>
                <Text style={styles.modalTitle}>Select Image Source</Text>

                <TouchableOpacity
                  style={styles.optionBtn}
                  onPress={() => handleImagePick('camera')}>
                  <Text style={styles.optionText}>📷 From Camera</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.optionBtn}
                  onPress={() => handleImagePick('gallery')}>
                  <Text style={styles.optionText}>🖼️ From Gallery</Text>
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
          </Modal>
        </View>
      </View>
    </Animatable.View>
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
  centeredOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  confirmBox: {
    width: '85%',

    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 15,
    elevation: 5,
  },
  confirmTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
})
