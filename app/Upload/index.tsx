import { View, Keyboard, KeyboardAvoidingView, Platform, StyleSheet } from 'react-native'
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import * as Animatable from 'react-native-animatable'
import { router } from 'expo-router'
import InputField from 'components/form/InputField'
import { useFormik } from 'formik'
import { UploadvalidationSchema } from 'lib/Vaildtions/UploadSchema'
import { Button, HelperText, Searchbar, Text } from 'react-native-paper'
import SegmentedBtn from 'components/SegmentedBtn'
import { useDispatch, useSelector } from 'react-redux'
import { StateFace } from 'Types/Store/StateFace'
import { GetSerachCompany } from 'lib/Store/Slices/CompanySlice'
import axiosClient from 'lib/api/axiosClient'
import { PushNewAcknowledgment } from 'lib/Store/Slices/MainSlice'
import ShowImageOptions from 'components/Models/showImageOptions'
import ShowConfirmModal from 'components/Models/ShowConfirmModal'
import UploadImage from 'components/form/UploadImage'
import { acknowledgmentsFace } from 'Types/Store/MainSliceFace'
import { Image } from 'expo-image'
import AppBar from 'components/App Bar'
import { debounce } from 'lodash'
import { CompanyFace } from 'Types/ItemList'
import SearchCompanyModal from 'components/Models/SearchCompanyModal'
import {
  responsiveHeight as rh,
  responsiveWidth as rw,
  responsiveFontSize as rf,
} from 'react-native-responsive-dimensions'
import { useThemeContext } from 'Providers/ThemeContext'

export default function Upload() {
  const backImg = useRef(require('../../assets/backn.png'))
  const { allocated, submitted } = useSelector((state: StateFace) => state.MainReducer)
  const { currentcompanys } = useSelector((state: StateFace) => state.CompanyReducer)
  const [selectCompany, setSelectCompany] = useState(0)
  const [isLoadingRes, setIsLoadingRes] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [showImageOptions, setShowImageOptions] = useState(false)
  const [showConfirmModal, setShowConfirmModal] = useState(false)
  const [errorApi, setErrorApi] = useState<string | null>(null)
  const [isShowSerachCompany, setIsShowSerachCompany] = useState(false)
  const [currCompany, setCurrCompnay] = useState<CompanyFace | null>(null)
  const [keyboardVisible, setKeyboardVisible] = useState(false)
  const searchBoxRef = useRef<React.ComponentRef<typeof Searchbar>>(null)
  const dispatch = useDispatch()
  const { themeMode } = useThemeContext()

  const handleUpload = async (formValues: any) => {
    if (+submitted + +formValues.cards_submitted > allocated) {
      return setErrorApi('cannot submit more than allocated cards')
    }
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

      setIsLoadingRes(false)
      router.push('/')
    } catch (err: any) {
      setErrorApi(err?.response?.data.message || err.message)
      setIsLoadingRes(false)
    }
  }

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

  const debouncedSearch = useCallback(
    debounce((text: string) => {
      dispatch(GetSerachCompany(text))
    }, 300),
    [dispatch]
  )

  const handleSerach = useCallback(
    (text: string) => {
      setSearchQuery(text)
      debouncedSearch(text)
    },
    [debouncedSearch]
  )

  const SelectCompanyID = useCallback(
    (id: number, name: string) => {
      setSelectCompany(id)
      formik.setFieldValue('company_id', id)
    },
    [formik, handleSerach]
  )

  const handleClear = useCallback(() => {
    searchBoxRef.current?.blur()
    setSearchQuery('')
    handleSerach('')
  }, [handleSerach])

  useEffect(() => {
    handleSerach('')
    formik.setFieldTouched('image', false)
    formik.setFieldTouched('company_id', false)
  }, [])

  useEffect(() => {
    const findCompany = currentcompanys.find((item) => item.id == formik.values.company_id)
    findCompany && setCurrCompnay(findCompany)
  }, [formik.values])

  useEffect(() => {
    const showSubscription = Keyboard.addListener('keyboardDidShow', () => {
      setKeyboardVisible(true)
    })
    const hideSubscription = Keyboard.addListener('keyboardDidHide', () => {
      setKeyboardVisible(false)
    })

    return () => {
      showSubscription.remove()
      hideSubscription.remove()
    }
  }, [])

  const getFontSize = useMemo(() => {
    if (searchQuery.length <= 30) return rf(3.2)
    if (searchQuery.length <= 40) return rf(2.8)
    return rf(2.6)
  }, [searchQuery])

  const segmentedButtons = useMemo(() => {
    return ['submission_type', 'delivery_method', 'state_time'].map((item) => (
      <SegmentedBtn themeMode={themeMode} key={item} name={item} formik={formik} />
    ))
  }, [formik])

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{ flex: 1 }}>
      <Animatable.View
        animation="fadeIn"
        duration={200}
        easing="ease-in-out"
        style={{ flex: 1, backgroundColor: 'black' }}>
        <View style={{ width: '100%', height: rh(12) }}>
          <AppBar type="Upload" router={router} />
        </View>

        <Image
          style={{ position: 'absolute', width: '100%', height: rh(30) }}
          contentFit="fill"
          source={backImg.current}
        />

        <View
          style={{
            flex: 1,
            borderTopLeftRadius: rw(10),
            borderTopRightRadius: rw(10),
            backgroundColor: 'white',
            paddingHorizontal: rw(5),
            paddingVertical: rh(5),
            justifyContent: 'space-between',
          }}>
          <View style={{ gap: rh(0.3) }}>
            {segmentedButtons}

            <InputField
              label={'card submitted'}
              name={'cards_submitted'}
              formik={formik}
              errorMes={null}
            />

            <View style={{ alignItems: 'center', gap: rh(0.3) }}>
              {currCompany && (
                <Text
                  style={{
                    width: rw(80),
                    textAlign: 'center',
                    fontWeight: '400',
                  }}>
                  Selected :
                  <Text
                    style={{
                      width: '100%',
                      textAlign: 'center',
                      fontWeight: 'bold',
                      fontSize: rf(1.4),
                    }}>
                    {' '}
                    {currCompany?.name} ({currCompany?.code})
                  </Text>
                </Text>
              )}
              <Button
                style={{ width: rw(50), height: rh(5) }}
                contentStyle={{ height: rh(5) }}
                labelStyle={{ fontSize: rf(1.7) }}
                buttonColor="#8d1c47"
                textColor="white"
                onPress={() => setIsShowSerachCompany(true)}>
                Select Company
              </Button>
              <HelperText
                style={{ fontSize: rw(2.8), color: 'red', textAlign: 'center' }}
                type="error"
                visible={formik.touched.company_id && !!formik.errors.company_id}>
                {'*'}
                {formik.errors.company_id}
              </HelperText>
              <UploadImage
                formik={formik}
                setShowImageOptions={setShowImageOptions}
                themeMode={themeMode}
              />
              <Button
                style={{ width: rw(50), height: rh(5) }}
                contentStyle={{ height: rh(5) }}
                labelStyle={{ fontWeight: 'bold', fontSize: rf(1.7) }}
                loading={isLoadingRes}
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
          </View>
        </View>

        <View style={{ alignItems: 'center' }}>
          <ShowConfirmModal
            currCompany={currCompany}
            showConfirmModal={showConfirmModal}
            setShowConfirmModal={setShowConfirmModal}
            formik={formik}
            errorApi={errorApi}
            isLoadingRes={isLoadingRes}
            setErrorApi={setErrorApi}
            width={rw(100)}
            height={rh(100)}
          />

          <ShowImageOptions
            formik={formik}
            showImageOptions={showImageOptions}
            setShowImageOptions={setShowImageOptions}
          />
        </View>

        <SearchCompanyModal
          themeMode={themeMode}
          isShowSerachCompany={isShowSerachCompany}
          setIsShowSerachCompany={setIsShowSerachCompany}
          searchBoxRef={searchBoxRef}
          searchQuery={searchQuery}
          handleSerach={handleSerach}
          handleClear={handleClear}
          currentcompanys={currentcompanys}
          formik={formik}
          SelectCompanyID={SelectCompanyID}
          selectCompany={selectCompany}
          getFontSize={getFontSize}
        />
      </Animatable.View>
    </KeyboardAvoidingView>
  )
}
