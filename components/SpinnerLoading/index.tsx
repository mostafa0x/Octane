import { View } from 'react-native'
import React, { memo } from 'react'
import { Image } from 'expo-image'
import { useWindowDimensions } from 'react-native'

function SpinnerLoading() {
  const { width, height } = useWindowDimensions()
  const imageSize = Math.min(width, height) * 0.5

  return (
    <View className="flex-1 items-center justify-center bg-white">
      <Image
        contentFit="contain"
        style={{ width: imageSize, height: imageSize }}
        source={require('assets/loadingLogo.gif')}
      />
    </View>
  )
}

export default memo(SpinnerLoading)
