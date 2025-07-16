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
  submitted?: number
}

function ListCard({
  acknowledgments_Current,
  type,
  emptyTXT,
  activeList = 'daily',
  allocated = 0,
  submitted = 0,
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
    if ((acknowledgments_Current.length <= 0 && !allocated) || !submitted) return 0

    ScrollToTop()
    return submitted / allocated
  }, [activeList, allocated, acknowledgments_Current])

  const MaxCard = useMemo(() => {
    if (acknowledgments_Current.length <= 0) return 0
    ScrollToTop()
    const avg = acknowledgments_Current.reduce((prev, current) =>
      prev.cards_submitted >= current.cards_submitted ? prev : current
    )
    return avg.cards_submitted
  }, [acknowledgments_Current])
  const totalSubmitted = useMemo(() => {
    if (acknowledgments_Current.length <= 0) return 0

    let count = 0
    const total = acknowledgments_Current.forEach((item) => (count += item.cards_submitted))
    return count
  }, [acknowledgments_Current])

  const lowerNfc = useMemo(() => {
    if (acknowledgments_Current.length <= 0) return 0
    const count = acknowledgments_Current.reduce((perv, current) =>
      perv.cards_submitted <= current.cards_submitted ? perv : current
    )
    return count.cards_submitted
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
        paddingHorizontal: type === 'Reports' ? rw(1) : rw(0),
      }}>
      <FlashList
        data={acknowledgments_Current}
        ref={listRef}
        estimatedItemSize={70}
        keyExtractor={(item, index) => index.toString()}
        contentContainerStyle={{
          paddingBottom: type === 'Home' ? rh(7) : type === 'Reports' ? rh(3) : rh(17),
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
            footerList &&
            acknowledgments_Current.length > 0 && (
              <View
                style={{
                  marginTop: type === 'Home' ? rh(5) : type === 'Reports' ? rh(5) : rh(14),
                  paddingLeft: rw(4),
                  paddingRight: rw(1),
                  gap: rh(2),
                }}>
                <Text style={{ fontWeight: '300', fontSize: rf(1.7) }}>
                  <Text style={{ fontWeight: 'bold', fontSize: rf(2) }}>
                    {type === 'Reports'
                      ? 'Report'
                      : activeList.charAt(0).toLocaleUpperCase() + activeList.slice(1)}
                  </Text>{' '}
                  statistics
                </Text>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}>
                  <Text style={{ fontWeight: 'regular', fontSize: rf(1.6) }}>
                    Number of Companies
                  </Text>
                  <Text
                    style={{
                      paddingRight: rw(2),
                      width: rw(15),
                      fontWeight: '300',
                      fontSize: rf(2),
                      textAlign: 'right',
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
                  <Text style={{ fontWeight: 'regular', fontSize: rf(1.6) }}>
                    Total of Cards Submitted raised
                  </Text>
                  <Text
                    style={{
                      paddingRight: rw(2),
                      width: rw(15),
                      fontWeight: '300',
                      fontSize: rf(2),
                      textAlign: 'right',
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
                  <Text style={{ fontWeight: '300', fontSize: rf(1.6) }}>
                    Highest Cards Submitted raised
                  </Text>
                  <Text
                    style={{
                      paddingRight: rw(2),
                      width: rw(15),
                      fontWeight: 'regular',
                      fontSize: rf(2),
                      textAlign: 'right',
                    }}>
                    {MaxCard}
                  </Text>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}>
                  <Text style={{ fontWeight: '300', fontSize: rf(1.6) }}>
                    Lowest Cards Submitted raised
                  </Text>
                  <Text
                    style={{
                      paddingRight: rw(2),
                      width: rw(15),
                      fontWeight: 'regular',
                      fontSize: rf(2),
                      textAlign: 'right',
                    }}>
                    {lowerNfc}
                  </Text>
                </View>
                {/* {type !== 'Reports' && (
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                    }}>
                    <Text style={{ fontWeight: '300', fontSize: rf(1.4) }}>
                      The raised percentage is finished
                    </Text>
                    <View style={{ alignItems: 'center', paddingRight: rw(0) }}>
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
                )} */}
              </View>
            )
          )
        }}
      />
    </Animatable.View>
  )
}

export default memo(ListCard)
