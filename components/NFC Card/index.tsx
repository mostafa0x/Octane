import { View, Text } from 'react-native'
import React, { memo } from 'react'
import * as Progress from 'react-native-progress'
import { Icon } from 'react-native-paper'
import { responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions'
import { RFValue } from 'react-native-responsive-fontsize'

const nfcIcon = require('../../assets/nfc.png')

interface props {
  submitted: number
  allocated: number
}

function NfcCard({ submitted, allocated }: props) {
  const cardWidth = responsiveWidth(90)
  const cardHeight = responsiveHeight(18)
  const progressSize = responsiveWidth(18)

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
      <View style={{ justifyContent: 'center', alignItems: 'center', flex: 1 }}>
        <Progress.Circle
          size={progressSize}
          progress={allocated > 0 ? submitted / allocated : 0}
          showsText={false}
          color="#0068FF"
          unfilledColor="#F1FFF3"
          borderWidth={0.5}
          thickness={4.25}
        />

        <View style={{ position: 'absolute', top: responsiveHeight(1.2) }}>
          <Icon source={nfcIcon} color="white" size={progressSize} />
        </View>

        <Text
          style={{
            color: '#bdcdce',
            marginTop: responsiveHeight(0.8),
            fontSize: RFValue(11),
            width: responsiveWidth(30),
            textAlign: 'center',
          }}>
          NFC tracker
        </Text>
      </View>

      <View
        style={{
          backgroundColor: '#ffffff',
          width: responsiveWidth(0.4),
          height: responsiveHeight(15),
          borderRadius: 50,
        }}></View>

      <View style={{ flex: 1, justifyContent: 'space-between', paddingLeft: responsiveWidth(5) }}>
        <View style={{ alignItems: 'center', flexDirection: 'row' }}>
          <Icon size={RFValue(26)} color="#bdcdce" source={nfcIcon} />
          <View style={{ alignItems: 'center', gap: 5 }}>
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
                fontSize: RFValue(12),
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
            backgroundColor: '#ffffff',
            width: responsiveWidth(30),
            height: responsiveHeight(0.2),
            borderRadius: 50,
          }}></View>

        <View style={{ alignItems: 'center', flexDirection: 'row' }}>
          <Icon size={RFValue(26)} color="#5c9dff" source={nfcIcon} />
          <View style={{ alignItems: 'center', gap: 5 }}>
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
                fontSize: RFValue(14),
                color: '#5c9dff',
                fontWeight: 'bold',
                textAlign: 'center',
              }}>
              +{submitted}
            </Text>
          </View>
        </View>
      </View>
    </View>
  )
}

export default memo(NfcCard)
