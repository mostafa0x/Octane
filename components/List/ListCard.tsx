import { View } from 'react-native'
import { Text } from 'react-native-paper'

import React, { memo, useEffect, useMemo, useRef, useState } from 'react'
import * as Animatable from 'react-native-animatable'
import { FlashList, MasonryFlashListRef } from '@shopify/flash-list'
import ItemCard from './ItemCard'
import { acknowledgmentsFace } from 'Types/Store/MainSliceFace'
import {
  responsiveHeight as rh,
  responsiveWidth as rw,
  responsiveFontSize as rf,
} from 'react-native-responsive-dimensions'
import * as Progress from 'react-native-progress'
import { activeListType } from 'app'

type AnimatableView = Animatable.View

interface props {
  acknowledgments_Current: acknowledgmentsFace[]
  type: string
  emptyTXT?: string
  activeList?: activeListType
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
  const listRef = useRef<React.ComponentRef<typeof FlashList<acknowledgmentsFace>>>(null)
  const [footerList, setFooterList] = useState(false)
  useEffect(() => {
    if (animRef.current?.fadeIn) animRef.current.fadeIn(100)
  }, [acknowledgments_Current])

  function ScrollToTop() {
    if (!listRef.current) return
    setFooterList(false)
    listRef.current.scrollToOffset({ offset: 0, animated: false })
    const timeID = setTimeout(() => {
      setFooterList(true)
      clearTimeout(timeID)
    }, 100)
  }

  const analayz = useMemo(() => {
    if (acknowledgments_Current.length <= 0) return

    ScrollToTop()
    if (activeList == 'daily') {
      return (acknowledgments_Current.length / allocated) * 100
    } else if (activeList == 'weekly') {
      return (acknowledgments_Current.length / allocated) * 100
    } else if (activeList == 'monthly') {
      return (acknowledgments_Current.length / allocated) * 100
    }
    return 0
  }, [activeList, allocated, acknowledgments_Current])

  const MaxCard = useMemo(() => {
    if (acknowledgments_Current.length <= 0) return
    ScrollToTop()
    const avg = acknowledgments_Current.reduce((prev, current) =>
      prev.cards_submitted >= current.cards_submitted ? prev : current
    )
    return avg
  }, [acknowledgments_Current])
  const totalSubmitted = useMemo(() => {
    if (acknowledgments_Current.length <= 0) return

    let count = 0
    const total = acknowledgments_Current.forEach((item) => (count += item.cards_submitted))
    return count
  }, [acknowledgments_Current])
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
        ref={listRef}
        estimatedItemSize={70}
        keyExtractor={(item, index) => index.toString()}
        contentContainerStyle={{
          paddingBottom: type === 'Home' ? rh(5) : type === 'Reports' ? rh(10) : rh(5),
        }}
        renderItem={({ item }: { item: acknowledgmentsFace }) => <ItemCard item={item} />}
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
            footerList && (
              <View
                style={{
                  marginTop: rh(5),
                  paddingLeft: rw(4),
                  paddingRight: rw(1),
                  gap: rh(2),
                }}>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}>
                  <Text style={{ fontWeight: '300', fontSize: rf(1.4) }}>
                    Number of NFC raised this {activeList}
                  </Text>
                  <Text
                    style={{
                      paddingRight: rw(2),
                      width: rw(9),
                      fontWeight: '300',
                      fontSize: rf(1.3),
                    }}>
                    {acknowledgments_Current.length}
                  </Text>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}>
                  <Text style={{ fontWeight: '300', fontSize: rf(1.4) }}>
                    Total of NFC raised this {activeList}
                  </Text>
                  <Text
                    style={{
                      paddingRight: rw(2),
                      width: rw(9),
                      fontWeight: '300',
                      fontSize: rf(1.3),
                    }}>
                    {totalSubmitted}
                  </Text>
                </View>

                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}>
                  <Text style={{ fontWeight: '300', fontSize: rf(1.4) }}>
                    Highest NFC raised in {activeList}
                  </Text>
                  <Text
                    style={{
                      paddingRight: rw(2),
                      width: rw(9),
                      fontWeight: '300',
                      fontSize: rf(1.3),
                    }}>
                    {MaxCard?.cards_submitted ?? 0}
                  </Text>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}>
                  <Text style={{ fontWeight: '300', fontSize: rf(1.4) }}>
                    The raised percentage is finished in {activeList}
                  </Text>
                  <View style={{ alignItems: 'center', paddingRight: rw(2) }}>
                    <Text
                      style={{
                        fontWeight: '300',
                        fontSize: rf(1.3),
                      }}>
                      {((analayz ?? 0) * 100).toFixed(1)}
                    </Text>
                    <Progress.Pie progress={analayz} />
                  </View>
                </View>
              </View>
            )
          )
        }}
      />
    </Animatable.View>
  )
}

export default memo(ListCard)
