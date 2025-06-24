import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import { CompanyFace } from 'Types/ItemList'
import { Button } from 'react-native-paper'

interface props {
  item: CompanyFace
  height: number
  width: number
  formik: any
  SelectCompanyID: any
  selectCompany: number
}
export default function ItemCard_CS({
  item,
  height,
  width,
  formik,
  SelectCompanyID,
  selectCompany,
}: props) {
  useEffect(() => {
    console.log(formik.values.company_id)

    return () => {}
  }, [formik.values.company_id])

  return (
    <View
      style={{ width: width * 0.95, padding: width * 0.02 }}
      className="flex-1 flex-row justify-between">
      <View style={{ width: '50%' }}>
        <Text style={{ fontSize: width * 0.042 }}>{item.name}</Text>
      </View>
      <View style={{ width: '10%' }}>
        <Text>{item.code}</Text>
      </View>
      <View style={{ width: '50%', marginLeft: width * 0.1 }}>
        <Button
          onPress={() => {
            if (selectCompany == item.id) {
              return SelectCompanyID(0, '')
            }
            SelectCompanyID(item.id, item.name)
          }}
          style={{ width: '40%' }}
          contentStyle={{ width: '100%' }}
          buttonColor={formik.values?.['company_id'] == item.id ? 'red' : 'green'}
          textColor="white">
          {formik.values.company_id == item.id ? 'Seleted' : 'Select'}
        </Button>
      </View>
    </View>
  )
}
