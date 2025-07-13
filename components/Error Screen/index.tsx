import { View, Text, Dimensions, useWindowDimensions } from 'react-native'
import React, { memo } from 'react'
import { Button } from 'react-native-paper'
import { Image } from 'expo-image'
import {
  responsiveHeight as rh,
  responsiveWidth as rw,
  responsiveFontSize as rf,
} from 'react-native-responsive-dimensions'
import handleLoutOut from 'Services/handleLogOut'
import { useRouter } from 'expo-router'
import { useDispatch } from 'react-redux'

interface props {
  isError: string
  GetData: any
  statusCode: number
}

function ErrorScreen({ isError, GetData, statusCode }: props) {
  const authError = statusCode == 403 || statusCode == 402
  const router = useRouter()
  const dispatch = useDispatch()
  return (
    <View className="flex-1 items-center justify-center gap-24  ">
      {!authError && (
        <Image style={{ height: rh(40), width: rw(80) }} source={require('assets/noWif.png')} />
      )}

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
          style={{ width: rw(40), height: rh(6) }}
          contentStyle={{ height: '100%', justifyContent: 'center' }}
          labelStyle={{
            fontSize: rw(4),
            textAlignVertical: 'center',
            height: '100%',
          }}
          buttonColor="#8d1c47"
          textColor="white"
          onPress={() => (!authError ? GetData() : handleLoutOut(dispatch, router))}>
          {authError ? 'Login Again' : 'Try Again'}
        </Button>
      </View>
    </View>
  )
}

export default memo(ErrorScreen)
