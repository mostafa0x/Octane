import { View, Text } from 'react-native'
import React, { memo, useEffect, useRef, useState } from 'react'
import * as Animatable from 'react-native-animatable'
import { FlashList } from '@shopify/flash-list'
import { CompanyFace } from 'Types/ItemList'
import ItemCard_CS from './ItemCard'
import { HelperText } from 'react-native-paper'
type AnimatableView = Animatable.View

interface props {
  height: number
  width: number
  currentcompanys: CompanyFace[]
  formik: any
  selectCompany: any
  SelectCompanyID: any
}

function SerachCompanys({
  height,
  width,
  currentcompanys,
  formik,
  selectCompany,
  SelectCompanyID,
}: props) {
  const animRef = useRef<AnimatableView>(null)

  return (
    <Animatable.View
      ref={animRef}
      animation="fadeIn"
      easing="ease-in-out"
      style={{
        height: selectCompany == 0 ? height * 0.188 : height * 0.08,
        width: '100%',
        marginTop: 20,
      }}>
      <FlashList
        data={currentcompanys}
        extraData={selectCompany}
        estimatedItemSize={70}
        keyExtractor={(item, index) => index.toString()}
        contentContainerStyle={{ paddingBottom: 0 }}
        renderItem={({ item }) => (
          <ItemCard_CS
            item={item}
            height={height}
            width={width}
            formik={formik}
            SelectCompanyID={SelectCompanyID}
            selectCompany={selectCompany}
          />
        )}
        ListEmptyComponent={() => (
          <View style={{ marginTop: 50, alignItems: 'center' }}>
            <Text
              style={{ fontSize: width * 0.032, opacity: 0.7, width: width, textAlign: 'center' }}>
              no company with this name or code.
            </Text>
          </View>
        )}
      />
      <HelperText
        style={{ fontSize: width * 0.028, color: 'red' }}
        type="error"
        visible={formik.touched.company_id && !!formik.errors.company_id}>
        {formik.errors.company_id}
      </HelperText>
    </Animatable.View>
  )
}

export default memo(SerachCompanys)
