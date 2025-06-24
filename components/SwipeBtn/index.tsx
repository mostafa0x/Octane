import { Router } from 'expo-router'
import React, { useCallback } from 'react'
import { View } from 'react-native'
import { SwipeButton } from 'react-native-expo-swipe-button'
import { Icon } from 'react-native-paper'

interface props {
  height: number
  width: number
  router: Router
}

export default function SwipeBtn({ height, width, router }: props) {
  const handleComplete = useCallback(() => {
    router.push('/Upload')
  }, [])

  return (
    <View style={{ alignItems: 'center' }}>
      <SwipeButton
        height={height * 0.05}
        width={width * 0.87}
        goBackToStart={true}
        circleBackgroundColor={'#8d1c47'}
        underlayStyle={{ backgroundColor: '#c47b9f' }}
        underlayTitle="Swipe up to open the page "
        titleStyle={{ width: width * 0.8, fontSize: width * 0.024 }}
        title="Swipe to upload acknowledgment"
        onComplete={handleComplete}
        iconContainerStyle={{}}
        Icon={<Icon color="#bdcdce" size={60} source="plus" />}
      />
    </View>
  )
}
