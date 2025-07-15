import { View, StyleSheet } from 'react-native'
import React, { memo, useCallback, useEffect, useState } from 'react'
import * as Progress from 'react-native-progress'
import { Icon, Text } from 'react-native-paper'
import { responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions'
import { RFValue } from 'react-native-responsive-fontsize'
import { useFocusEffect } from 'expo-router'
import { BounceIn } from 'react-native-reanimated'

const nfcIcon = require('../../assets/nfc.png')

interface props {
  submitted: number
  allocated: number
}

function NfcCard({ submitted, allocated }: props) {
  const cardWidth = responsiveWidth(90)
  const cardHeight = responsiveHeight(18)
  const progressSize = responsiveWidth(14)
  const [progressValuse, setProgressValuse] = useState(0)

  useFocusEffect(
    useCallback(() => {
      const time = setTimeout(() => {
        setProgressValuse(submitted / allocated)
      }, 500)
      return () => {
        clearTimeout(time)
        setProgressValuse(0)
      }
    }, [])
  )

  return (
    <View
      style={{
        height: cardHeight,
        width: cardWidth,
        flexDirection: 'row',
        borderRadius: responsiveWidth(7.5),
        backgroundColor: '#8d1c47',
        padding: responsiveWidth(5),
      }}>
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          flex: 1,
          gap: responsiveHeight(2),
        }}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: responsiveHeight(1),
          }}>
          <Text
            style={{
              color: '#ffffff',
              fontSize: RFValue(18),
              textAlign: 'center',
            }}>
            {allocated - submitted}{' '}
          </Text>
          <Icon size={RFValue(15)} color="white" source={'nfc'} />
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: responsiveHeight(0),
            gap: responsiveWidth(5),
          }}>
          <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
            <Text
              style={{
                color: '#bdcdce',
                fontSize: RFValue(14),
                textAlign: 'center',
              }}>
              remaining{' '}
            </Text>
          </View>
        </View>
      </View>

      <View
        style={{
          backgroundColor: '#ffffff',
          width: responsiveWidth(0.4),
          height: responsiveHeight(12),
          borderRadius: 50,
        }}></View>

      <View
        style={{
          flex: 1,
          justifyContent: 'space-between',
          paddingLeft: responsiveWidth(5),
          marginBottom: responsiveHeight(0.5),
        }}>
        <View style={{ alignItems: 'center', flexDirection: 'row' }}>
          <Icon size={RFValue(40)} color="#bdcdce" source={nfcIcon} />
          <View style={{ alignItems: 'center', gap: responsiveHeight(0.5) }}>
            <Text
              style={{
                color: '#bdcdce',
                width: responsiveWidth(20),
                fontSize: RFValue(10),
                textAlign: 'center',
              }}>
              Allocated
            </Text>
            <Text
              style={{
                fontSize: RFValue(18),
                color: '#f7f7f7',
                fontWeight: 'bold',
                textAlign: 'center',
              }}>
              {allocated}
            </Text>
          </View>
        </View>

        <View
          style={{
            marginLeft: responsiveWidth(2),
            backgroundColor: '#ffffff',
            width: responsiveWidth(33),
            height: responsiveHeight(0.2),
            borderRadius: 50,
          }}></View>

        <View style={{ alignItems: 'center', flexDirection: 'row' }}>
          <Icon size={RFValue(40)} color="#5c9dff" source={nfcIcon} />
          <View style={{ alignItems: 'center', gap: responsiveHeight(0.5) }}>
            <Text
              style={{
                color: '#bdcdce',
                width: responsiveWidth(20),
                fontSize: RFValue(10),
                textAlign: 'center',
              }}>
              Submitted
            </Text>
            <Text
              style={{
                fontSize: RFValue(18),
                color: '#5c9dff',
                fontWeight: 'bold',
                textAlign: 'center',
              }}>
              +{submitted}
            </Text>
          </View>
        </View>
      </View>
      <View style={{ position: 'absolute', top: responsiveHeight(15), left: responsiveWidth(0) }}>
        <View
          style={{
            position: 'absolute',
            top: responsiveHeight(0),
            left: responsiveWidth(30),
            zIndex: 1,
          }}>
          <Text
            style={{
              color: '#6c7879',
              fontSize: RFValue(14),
              width: responsiveWidth(30),
              textAlign: 'center',
            }}>
            {((submitted / allocated) * 100).toFixed(2) + '%'}
          </Text>
        </View>
        <Progress.Bar
          animationConfig={{ BounceIn: 5 }}
          animationType="timing"
          progress={progressValuse}
          borderColor="#8d1c47"
          borderWidth={1}
          color="white"
          height={cardHeight / 6}
          width={cardWidth - responsiveWidth(0.5)}
          unfilledColor="#8d1c47"
          style={{
            borderRadius: responsiveWidth(0.1),
            borderBottomLeftRadius: responsiveWidth(7.5),
            borderBottomRightRadius: responsiveWidth(7.5),
          }}
        />
      </View>
    </View>
  )
}
const styles = StyleSheet.create({
  iconOverlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
  },
  label: {
    color: '#bdcdce',
    marginTop: responsiveHeight(2),
    fontSize: RFValue(14),
    width: responsiveWidth(30),
    textAlign: 'center',
  },
})

export default memo(NfcCard)
