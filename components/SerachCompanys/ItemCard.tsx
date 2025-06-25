import { View, Text, TouchableOpacity } from 'react-native'
import React, { memo, useEffect, useState } from 'react'
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
function ItemCard_CS({ item, height, width, formik, SelectCompanyID, selectCompany }: props) {
  return (
    <View
      style={{ width: width * 0.95, padding: width * 0.02 }}
      className="flex-1 flex-row justify-between">
      <View style={{ width: '50%' }}>
        <Text style={{ fontSize: width * 0.038 }}>
          {item.name.split(' ').splice(0, 2).join(' ')}
        </Text>
      </View>
      <View style={{ width: '10%' }}>
        <Text>{item.code}</Text>
      </View>
      <TouchableOpacity style={{ width: '50%', marginLeft: width * 0.1 }}>
        <Button
          onPress={() => {
            if (selectCompany == item.id) {
              return SelectCompanyID(0, '')
            }
            SelectCompanyID(item.id, item.name)
          }}
          style={{ width: '40%' }}
          contentStyle={{ width: '100%' }}
          buttonColor={formik.values?.['company_id'] == item.id ? '#8d1c47' : 'green'}
          textColor="white">
          {formik.values.company_id == item.id ? 'cancel' : 'Select'}
        </Button>
      </TouchableOpacity>
    </View>
  )
}

export default memo(ItemCard_CS)
