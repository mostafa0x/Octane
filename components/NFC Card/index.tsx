import { View } from 'react-native'
import React, { memo } from 'react'
import * as Progress from 'react-native-progress'
import { Icon, Text } from 'react-native-paper'
import { responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions'
import { RFValue } from 'react-native-responsive-fontsize'

const nfcIcon = require('../../assets/nfc.png')

interface props {
  submitted: number
  allocated: number
  themeMode: string
}

function NfcCard({ submitted, allocated, themeMode }: props) {
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
        backgroundColor: themeMode === 'dark' ? '#000000' : '#8d1c47',
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

        <View style={{ position: 'absolute', top: responsiveHeight(-0.05) }}>
          <Icon source={nfcIcon} color="white" size={progressSize} />
        </View>

        <Text
          style={{
            color: '#bdcdce',
            marginTop: responsiveHeight(2),
            fontSize: RFValue(14),
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
          <Icon size={RFValue(40)} color="#bdcdce" source={nfcIcon} />
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
    </View>
  )
}

export default memo(NfcCard)
