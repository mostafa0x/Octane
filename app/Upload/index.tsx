import { View, Text, useWindowDimensions, ScrollView } from 'react-native'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import * as Animatable from 'react-native-animatable'
import AppBar from 'components/App Bar'
import { Href, Route, RouteInputParams } from 'expo-router'
import { NavigationOptions } from 'expo-router/build/global-state/routing'
import InputField from 'components/form/InputField'
import { useFormik } from 'formik'
import { UploadvalidationSchema } from 'lib/Vaildtions/UploadSchema'
import { HelperText, Searchbar, SegmentedButtons, Tooltip } from 'react-native-paper'
import SegmentedBtn from 'components/SegmentedBtn'
import SerachCompanys from 'components/SerachCompanys'
import { useDispatch, useSelector } from 'react-redux'
import { StateFace } from 'Types/Store/StateFace'
import { GetSerachCompany } from 'lib/Store/Slices/CompanySlice'

export default function Upload() {
  const { width, height } = useWindowDimensions()
  const { currentcompanys } = useSelector((state: StateFace) => state.CompanyReducer)

  const [searchQuery, setSearchQuery] = useState('')
  const searchBoxRef = useRef<React.ComponentRef<typeof Searchbar>>(null)
  async function handleUpload(formValues: any) {}
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
  }, [])

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
          paddingTop: height * 0.1,
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
        <SerachCompanys height={height} width={width} currentcompanys={currentcompanys} />
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
      </View>
    </Animatable.View>
  )
}
