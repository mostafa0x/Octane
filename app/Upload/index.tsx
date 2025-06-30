import {
  View,
  useWindowDimensions,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
} from 'react-native'
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import * as Animatable from 'react-native-animatable'
import { router } from 'expo-router'
import InputField from 'components/form/InputField'
import { useFormik } from 'formik'
import { UploadvalidationSchema } from 'lib/Vaildtions/UploadSchema'
import { Button, HelperText, Searchbar } from 'react-native-paper'
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

export default function Upload() {
  const backImg = useRef(require('../../assets/backn.png'))
  const { width, height } = useWindowDimensions()
  const { currentcompanys } = useSelector((state: StateFace) => state.CompanyReducer)
  const [selectCompany, setSelectCompany] = useState(0)
  const [isLoadingRes, setIsLoadingRes] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [showImageOptions, setShowImageOptions] = useState(false)
  const [showConfirmModal, setShowConfirmModal] = useState(false)
  const [errorApi, setErrorApi] = useState<string | null>(null)
  const [isShowSerachCompany, setIsShowSerachCompany] = useState(false)
  const [currCompany, setCurrCompnay] = useState<CompanyFace | null>(null)
  const searchBoxRef = useRef<React.ComponentRef<typeof Searchbar>>(null)
  const dispatch = useDispatch()

  const styles = createStyles(width, height)

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
      //  handleSerach(name)
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

  const getFontSize = useMemo(() => {
    if (searchQuery.length <= 30) return width * 0.032
    if (searchQuery.length <= 40) return width * 0.028
    return width * 0.026
  }, [searchQuery, width])

  useEffect(() => {
    const findCompany = currentcompanys.find((item) => item.id == formik.values.company_id)
    findCompany && setCurrCompnay(findCompany)
    return () => {}
  }, [formik.values])

  const segmentedButtons = useMemo(() => {
    return ['submission_type', 'delivery_method', 'state_time'].map((item) => (
      <SegmentedBtn key={item} name={item} height={height} width={width} formik={formik} />
    ))
  }, [formik, height, width])

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.keyboardAvoidingView}>
      <Animatable.View
        animation="fadeIn"
        duration={200}
        easing="ease-in-out"
        style={styles.animatableView}>
        <View style={styles.appBarContainer}>
          <AppBar height={height} type="Upload" router={router} width={width} />
        </View>

        <Image style={styles.backgroundImage} contentFit="fill" source={backImg.current} />

        <View style={styles.mainContainer}>
          <View style={{ justifyContent: 'center', alignItems: 'center' }}>
            <Button
              style={{ width: width * 0.5 }}
              buttonColor="#8d1c47"
              textColor="white"
              onPress={() => setIsShowSerachCompany(true)}>
              Select Company
            </Button>
            {currCompany && (
              <Text
                style={{
                  width: width * 0.8,
                  textAlign: 'center',
                  marginTop: height * 0.03,
                  fontWeight: '400',
                }}>
                Selected :
                <Text
                  style={{
                    width: '100%',
                    textAlign: 'center',
                    fontWeight: 'bold',
                    fontSize: width * 0.032,
                  }}>
                  {' '}
                  {currCompany?.name} ({currCompany?.code})
                </Text>
              </Text>
            )}
          </View>
          <HelperText
            style={{ fontSize: width * 0.028, color: 'red' }}
            type="error"
            visible={formik.touched.company_id && !!formik.errors.company_id}>
            {formik.errors.company_id}
          </HelperText>
          <InputField
            label={'cards submitted'}
            name={'cards_submitted'}
            formik={formik}
            errorMes={null}
          />
          {segmentedButtons}

          <View style={styles.uploadSection}>
            <UploadImage
              formik={formik}
              width={width}
              height={height}
              setShowImageOptions={setShowImageOptions}
            />

            <View style={styles.buttonContainer}>
              <Button
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

            <ShowConfirmModal
              currCompany={currCompany}
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
        <SearchCompanyModal
          isShowSerachCompany={isShowSerachCompany}
          setIsShowSerachCompany={setIsShowSerachCompany}
          searchBoxRef={searchBoxRef}
          searchQuery={searchQuery}
          handleSerach={handleSerach}
          handleClear={handleClear}
          height={height}
          width={width}
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

const createStyles = (width: number, height: number) =>
  StyleSheet.create({
    keyboardAvoidingView: {
      flex: 1,
    },
    animatableView: {
      flex: 1,
      backgroundColor: 'black',
    },
    appBarContainer: {
      width: '100%',
      height: height * 0.12,
    },
    backgroundImage: {
      position: 'absolute',
      width: '100%',
      height: '30%',
    },
    mainContainer: {
      flex: 1,
      borderTopLeftRadius: 50,
      borderTopRightRadius: 50,
      backgroundColor: 'white',
      paddingHorizontal: width * 0.05,
      paddingVertical: height * 0.05,
    },
    searchContainer: {
      marginTop: 20,
      width: '100%',
    },
    uploadSection: {
      marginTop: height * 0.02,
    },
    buttonContainer: {
      marginTop: 0,
    },
  })
