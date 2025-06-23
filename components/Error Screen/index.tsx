import { View, Text } from 'react-native'
import React, { memo } from 'react'
import { Button } from 'react-native-paper'
import { Image } from 'expo-image'

interface props {
  isError: string
  GetData: any
}

function ErrorScreen({ isError, GetData }: props) {
  return (
    <View className="flex-1 items-center justify-center gap-24  ">
      <Image style={{ height: 250, width: 250 }} source={require('assets/noWif.png')} />
      <View className="items-center gap-10">
        <Text style={{ fontSize: 26, color: 'black', textAlign: 'center', width: '100%' }}>
          {isError}
        </Text>

        <Button
          style={{ width: 250, height: 60 }}
          contentStyle={{ height: 60 }}
          labelStyle={{ fontSize: 20 }}
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
