import { View } from 'react-native'
import { Text } from 'react-native-paper'

import React, { memo, useEffect, useRef } from 'react'
import * as Animatable from 'react-native-animatable'
import { FlashList } from '@shopify/flash-list'
import ItemCard from './ItemCard'
import { acknowledgmentsFace } from 'Types/Store/MainSliceFace'
import {
  responsiveHeight as rh,
  responsiveWidth as rw,
  responsiveFontSize as rf,
} from 'react-native-responsive-dimensions'

type AnimatableView = Animatable.View

interface props {
  acknowledgments_Current: acknowledgmentsFace[]
  type: string
  emptyTXT?: string
  themeMode: string
}

function ListCard({ acknowledgments_Current, type, emptyTXT, themeMode }: props) {
  const animRef = useRef<AnimatableView>(null)

  useEffect(() => {
    if (animRef.current?.fadeIn) animRef.current.fadeIn(100)
  }, [acknowledgments_Current])

  return (
    <Animatable.View
      ref={animRef}
      animation="fadeIn"
      easing="ease-in-out"
      style={{
        height: type === 'Home' ? rh(30) : rh(40),
        width: '100%',
        marginTop: 0,
      }}>
      <FlashList
        data={acknowledgments_Current}
        estimatedItemSize={70}
        keyExtractor={(item, index) => index.toString()}
        contentContainerStyle={{ paddingBottom: type === 'Home' ? rh(5) : rh(5) }}
        renderItem={({ item }) => <ItemCard themeMode={themeMode} item={item} />}
        ListEmptyComponent={() => (
          <View
            style={{
              marginTop: type === 'Reports' ? rh(20) : rh(5),
              alignItems: 'center',
            }}>
            <Text
              style={{
                fontSize: type === 'Home' ? rf(2) : rf(2.5),
                opacity: 0.7,
                width: rw(50),
                textAlign: 'center',
                fontWeight: '300',
              }}>
              {type === 'Reports' ? emptyTXT : 'There are no acknowledgments yet.'}
            </Text>
          </View>
        )}
      />
    </Animatable.View>
  )
}

export default memo(ListCard)
