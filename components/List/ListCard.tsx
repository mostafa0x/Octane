import { View, Text } from 'react-native'
import React, { useEffect, useRef } from 'react'
import * as Animatable from 'react-native-animatable'
import { FlashList } from '@shopify/flash-list'
import ItemCard from './ItemCard'
import { acknowledgmentsFace } from 'Types/Store/MainSliceFace'
type AnimatableView = Animatable.View

interface props {
  acknowledgments_Current: acknowledgmentsFace[]
  height: number
  width: number
}

export default function ListCard({ acknowledgments_Current, height, width }: props) {
  const animRef = useRef<AnimatableView>(null)

  useEffect(() => {
    if (animRef.current && animRef.current.fadeIn) animRef.current?.fadeIn(100)
    return () => {}
  }, [acknowledgments_Current])

  return (
    <Animatable.View
      ref={animRef}
      animation="fadeIn"
      easing="ease-in-out"
      style={{ height: height * 0.3, width: '100%', marginTop: 20 }}>
      <FlashList
        data={acknowledgments_Current}
        estimatedItemSize={70}
        keyExtractor={(item, index) => index.toString()}
        contentContainerStyle={{ paddingBottom: 20 }}
        renderItem={({ item }) => <ItemCard item={item} />}
        ListEmptyComponent={() => (
          <View style={{ marginTop: 50, alignItems: 'center' }}>
            <Text
              style={{ fontSize: width * 0.072, opacity: 0.7, width: width, textAlign: 'center' }}>
              Empty
            </Text>
          </View>
        )}
      />
    </Animatable.View>
  )
}
