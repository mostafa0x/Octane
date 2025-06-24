import React, { useCallback } from 'react'
import { View } from 'react-native'
import { SwipeButton } from 'react-native-expo-swipe-button'
import { Icon } from 'react-native-paper'

interface props {
  height: number
  width: number
}

export default function SwipeBtn({ height, width }: props) {
  const handleComplete = useCallback(() => {
    console.log('hi')
  }, [])

  return (
    <View style={{ alignItems: 'center' }}>
      <SwipeButton
        height={height * 0.05}
        width={width * 0.8}
        goBackToStart={true}
        circleBackgroundColor={'#8d1c47'}
        underlayStyle={{ backgroundColor: '#c47b9f' }}
        underlayTitle="page will open "
        titleStyle={{ width: width * 0.8 }}
        title="Swipe to Add cards"
        onComplete={handleComplete}
        iconContainerStyle={{}}
        Icon={<Icon color="#bdcdce" size={60} source="plus" />}
      />
    </View>
  )
}
