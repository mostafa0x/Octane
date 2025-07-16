import { View } from 'react-native'
import { Text } from 'react-native-paper'

import React, { memo, useEffect, useMemo, useRef } from 'react'
import * as Animatable from 'react-native-animatable'
import { FlashList } from '@shopify/flash-list'
import ItemCard from './ItemCard'
import { acknowledgmentsFace } from 'Types/Store/MainSliceFace'
import {
  responsiveHeight as rh,
  responsiveWidth as rw,
  responsiveFontSize as rf,
} from 'react-native-responsive-dimensions'
import * as Progress from 'react-native-progress'

type AnimatableView = Animatable.View

interface props {
  acknowledgments_Current: acknowledgmentsFace[]
  type: string
  emptyTXT?: string
  activeList?: 'daily' | 'weekly' | 'monthly'
  allocated?: number
}

function ListCard({
  acknowledgments_Current,
  type,
  emptyTXT,
  activeList = 'daily',
  allocated = 0,
}: props) {
  const animRef = useRef<AnimatableView>(null)

  useEffect(() => {
    if (animRef.current?.fadeIn) animRef.current.fadeIn(100)
  }, [acknowledgments_Current])

  const analayz = useMemo(() => {
    if (activeList == 'daily') {
      return (acknowledgments_Current.length / allocated) * 100
    } else if (activeList == 'weekly') {
      return (acknowledgments_Current.length / allocated) * 100
    } else if (activeList == 'monthly') {
      return (acknowledgments_Current.length / allocated) * 100
    }
    return 0
  }, [activeList])
  return (
    <Animatable.View
      ref={animRef}
      animation="fadeIn"
      easing="ease-in-out"
      style={{
        height: type === 'Home' ? rh(30) : type === 'Reports' ? rh(65) : rh(40),
        width: '100%',
        marginTop: 0,
        paddingHorizontal: type === 'Reports' ? rw(2) : rw(0),
      }}>
      <FlashList
        data={acknowledgments_Current}
        estimatedItemSize={70}
        keyExtractor={(item, index) => index.toString()}
        contentContainerStyle={{
          paddingBottom: type === 'Home' ? rh(5) : type === 'Reports' ? rh(10) : rh(5),
        }}
        renderItem={({ item }) => <ItemCard item={item} />}
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
        ListFooterComponent={() => {
          return (
            <View
              style={{
                marginTop: rh(1),
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                paddingLeft: rw(4),
              }}>
              <Text>Status of {activeList}</Text>
              <View style={{ alignItems: 'center' }}>
                <Text>{(analayz * 100).toFixed(1)}</Text>
                <Progress.Pie progress={analayz} />
              </View>
            </View>
          )
        }}
      />
    </Animatable.View>
  )
}

export default memo(ListCard)
