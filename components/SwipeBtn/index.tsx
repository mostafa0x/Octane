import { Router } from 'expo-router'
import React, { useCallback } from 'react'
import { View } from 'react-native'
import { SwipeButton } from 'react-native-expo-swipe-button'
import { Icon } from 'react-native-paper'
import {
  responsiveHeight as rh,
  responsiveWidth as rw,
  responsiveFontSize as rf,
} from 'react-native-responsive-dimensions'

interface props {
  router: Router
  themeMode: string
}

export default function SwipeBtn({ router, themeMode }: props) {
  const handleComplete = useCallback(() => {
    router.push('/Upload')
  }, [router])

  return (
    <View style={{ alignItems: 'center' }}>
      <SwipeButton
        height={rh(4)}
        width={rw(87)}
        goBackToStart={true}
        circleBackgroundColor="#8d1c47"
        titleContainerStyle={{ backgroundColor: themeMode == 'dark' ? 'black' : 'white' }}
        underlayStyle={{ backgroundColor: themeMode == 'dark' ? 'white' : '#c47b9f' }}
        underlayTitleStyle={{ fontSize: rf(1.3), width: rw(80) }}
        underlayTitle="Swipe up to open"
        title="Swipe to upload acknowledgment"
        titleStyle={{
          width: rw(80),
          fontSize: rf(1.3),
          color: themeMode == 'dark' ? 'white' : 'black',
        }}
        onComplete={handleComplete}
        iconContainerStyle={{}}
        circleSize={rf(8)}
        Icon={<Icon color="#ffffff" size={rf(5)} source="arrow-right-thick" />}
      />
    </View>
  )
}
