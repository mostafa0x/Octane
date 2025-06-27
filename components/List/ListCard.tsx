import { View, Text } from 'react-native'
import React, { memo, useEffect, useRef } from 'react'
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

function ListCard({ acknowledgments_Current, height, width }: props) {
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
      style={{
        height: height * 0.3,
        width: '100%',
        marginTop: height * 0.0,
      }}>
      <FlashList
        data={acknowledgments_Current}
        estimatedItemSize={70}
        keyExtractor={(item, index) => index.toString()}
        contentContainerStyle={{ paddingBottom: 20 }}
        renderItem={({ item }) => <ItemCard item={item} width={width} />}
        ListEmptyComponent={() => (
          <View style={{ marginTop: 50, alignItems: 'center' }}>
            <Text
              style={{
                fontSize: width * 0.062,
                opacity: 0.7,
                width: width * 0.7,
                textAlign: 'center',
                fontWeight: '300',
              }}>
              There are no acknowledgments yet.
            </Text>
          </View>
        )}
      />
    </Animatable.View>
  )
}

export default memo(ListCard)
