import { View, useWindowDimensions, Keyboard, TouchableWithoutFeedback } from 'react-native'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import * as Animatable from 'react-native-animatable'
import { router } from 'expo-router'
import InputField from 'components/form/InputField'
import { useFormik } from 'formik'
import { UploadvalidationSchema } from 'lib/Vaildtions/UploadSchema'
import { Button, Searchbar } from 'react-native-paper'
import SegmentedBtn from 'components/SegmentedBtn'
import SerachCompanys from 'components/SerachCompanys'
import { useDispatch, useSelector } from 'react-redux'
import { StateFace } from 'Types/Store/StateFace'
import { GetSerachCompany } from 'lib/Store/Slices/CompanySlice'
import axiosClient from 'lib/api/axiosClient'
import { PushNewAcknowledgment } from 'lib/Store/Slices/MainSlice'
import ShowImageOptions from 'components/Models/showImageOptions'
import ShowConfirmModal from 'components/Models/ShowConfirmModal'
import UploadImage from 'components/form/UploadImage'
import { acknowledgmentsFace } from 'Types/Store/MainSliceFace'

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
    setErrorApi(null)
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

      const data: acknowledgmentsFace = response.data.acknowledgments[0]

      dispatch(PushNewAcknowledgment({ data: data }))

      router.push('/')
      console.log('Response:', data)
    } catch (err: any) {
      setErrorApi(err?.response?.data.message || err.message)
      setIsLoadingRes(false)
      console.log(err)
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
    formik.setFieldTouched('company_id', false)
  }, [])

  const [showImageOptions, setShowImageOptions] = useState(false)
  const [showConfirmModal, setShowConfirmModal] = useState(false)
  const [errorApi, setErrorApi] = useState<string | null>(null)
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
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

          <InputField
            lable={'cards submitted'}
            name={'cards_submitted'}
            formik={formik}
            errorMes={null}
          />
          {['submission_type', 'delivery_method', 'state_time'].map((item) => {
            return (
              <SegmentedBtn key={item} name={item} height={height} width={width} formik={formik} />
            )
          })}

          <View style={{ marginTop: height * 0.02 }}>
            <UploadImage
              formik={formik}
              width={width}
              height={height}
              setShowImageOptions={setShowImageOptions}
            />
            <View style={{ marginTop: height * 0 }}>
              <Button
                onPress={() => {
                  Keyboard.dismiss()
                  if (formik.isValid && formik.dirty && formik.values.image) {
                    return setShowConfirmModal(true)
                  }
                  formik.submitForm()
                }}
                textColor="white"
                buttonColor="#8d1c47">
                Submit
              </Button>
            </View>
            <ShowConfirmModal
              showConfirmModal={showConfirmModal}
              setShowConfirmModal={setShowConfirmModal}
              formik={formik}
              errorApi={errorApi}
              isLoadingRes={isLoadingRes}
              width={width}
              height={height}
            />
            <ShowImageOptions
              formik={formik}
              showImageOptions={showImageOptions}
              setShowImageOptions={setShowImageOptions}
            />
          </View>
        </View>
      </Animatable.View>
    </TouchableWithoutFeedback>
  )
}
