import { View, Text, Dimensions, useWindowDimensions } from 'react-native'
import React, { memo } from 'react'
import { Button } from 'react-native-paper'
import { Image } from 'expo-image'

interface props {
  isError: string
  GetData: any
}

function ErrorScreen({ isError, GetData }: props) {
  const { width, height } = useWindowDimensions()
  return (
    <View className="flex-1 items-center justify-center gap-24  ">
      <Image
        style={{ height: height * 0.3, width: width * 0.65 }}
        source={require('assets/noWif.png')}
      />
      <View className="items-center gap-10">
        <Text
          style={{
            fontSize: width * 0.042,
            color: 'black',
            textAlign: 'center',
            width: width * 0.6,
          }}>
          {isError}
        </Text>

        <Button
          style={{ width: width * 0.65, height: height * 0.08 }}
          contentStyle={{ height: height * 0.08, justifyContent: 'center' }}
          labelStyle={{ fontSize: width * 0.042, height: height * 0.03 }}
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
