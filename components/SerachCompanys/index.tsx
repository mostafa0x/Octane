import { View, Text } from 'react-native'
import React, { memo, useEffect, useRef } from 'react'
import * as Animatable from 'react-native-animatable'
import { FlashList } from '@shopify/flash-list'
import { CompanyFace } from 'Types/ItemList'
import ItemCard_CS from './ItemCard'
type AnimatableView = Animatable.View

interface props {
  height: number
  width: number
  currentcompanys: CompanyFace[]
}

function SerachCompanys({ height, width, currentcompanys }: props) {
  const animRef = useRef<AnimatableView>(null)

  return (
    <Animatable.View
      ref={animRef}
      animation="fadeIn"
      easing="ease-in-out"
      style={{ height: height * 0.24, width: '100%', marginTop: 20 }}>
      <FlashList
        data={currentcompanys}
        estimatedItemSize={70}
        keyExtractor={(item, index) => index.toString()}
        contentContainerStyle={{ paddingBottom: 20 }}
        renderItem={({ item }) => <ItemCard_CS item={item} height={height} width={width} />}
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

export default memo(SerachCompanys)
