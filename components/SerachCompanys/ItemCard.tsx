import { View, Text } from 'react-native'
import React from 'react'
import { CompanyFace } from 'Types/ItemList'
import { Button } from 'react-native-paper'

interface props {
  item: CompanyFace
  height: number
  width: number
}
export default function ItemCard_CS({ item, height, width }: props) {
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
          style={{ width: '40%' }}
          contentStyle={{ width: '100%' }}
          buttonColor="green"
          textColor="white">
          Select{' '}
        </Button>
      </View>
    </View>
  )
}
