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
  submitted: number
  allocated: number
}

export default function SwipeBtn({ router, submitted, allocated }: props) {
  const handleComplete = useCallback(() => {
    router.push('/Upload')
  }, [router])

  return (
    <View style={{ alignItems: 'center' }}>
      <SwipeButton
        height={rh(4)}
        borderRadius={rw(10)}
        width={rw(90)}
        goBackToStart={true}
        disabled={submitted >= allocated}
        circleBackgroundColor="#8d1c47"
        titleContainerStyle={{ backgroundColor: 'white' }}
        underlayStyle={{
          backgroundColor: '#c47b9f',
          width: rw(60),
        }}
        underlayTitleStyle={{ fontSize: rf(1.3), width: rw(50) }}
        underlayTitle="Swipe up to open"
        title={
          submitted >= allocated
            ? 'You do not have enough allocated !, contact the admin'
            : 'Swipe to upload acknowledgment'
        }
        titleStyle={{
          width: rw(80),
          fontSize: rf(1.3),
          color: 'black',
        }}
        onComplete={handleComplete}
        iconContainerStyle={{}}
        circleSize={rf(8)}
        Icon={<Icon color="#ffffff" size={rf(6)} source="arrow-right-thick" />}
      />
    </View>
  )
}
