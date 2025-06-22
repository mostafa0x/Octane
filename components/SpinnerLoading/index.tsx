import { View, Text } from 'react-native'
import React, { memo } from 'react'
import { Image } from 'expo-image'
import { ActivityIndicator } from 'react-native-paper'

function SpinnerLoading() {
  return (
    <View className="flex-1 items-center justify-center">
      <Image
        contentFit="cover"
        style={{ height: 525, width: 525 }}
        source={require('assets/loadingLogo.gif')}
      />
      <View className=" absolute left-[410px] top-[705px]">
        <ActivityIndicator size={20} />
      </View>
    </View>
  )
}

export default memo(SpinnerLoading)
