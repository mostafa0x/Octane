import { View, Text, Dimensions, useWindowDimensions } from 'react-native'
import React, { memo } from 'react'
import { Button } from 'react-native-paper'
import { Image } from 'expo-image'
import {
  responsiveHeight as rh,
  responsiveWidth as rw,
  responsiveFontSize as rf,
} from 'react-native-responsive-dimensions'

interface props {
  isError: string
  GetData: any
}

function ErrorScreen({ isError, GetData }: props) {
  return (
    <View className="flex-1 items-center justify-center gap-24  ">
      <Image style={{ height: rh(40), width: rw(80) }} source={require('assets/noWif.png')} />
      <View className="items-center gap-10">
        <Text
          style={{
            fontSize: rf(2),
            color: 'black',
            textAlign: 'center',
            width: rw(100),
          }}>
          {isError}
        </Text>

        <Button
          style={{ width: rw(60), height: rh(6) }}
          contentStyle={{ height: '100%', justifyContent: 'center' }}
          labelStyle={{
            fontSize: rw(6),
            textAlignVertical: 'center',
            height: '100%',
          }}
          buttonColor="#8d1c47"
          textColor="white"
          onPress={GetData}>
          Try Again
        </Button>
      </View>
    </View>
  )
}

export default memo(ErrorScreen)
