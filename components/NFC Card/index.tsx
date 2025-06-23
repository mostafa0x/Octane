import { View, Text } from 'react-native'
import React, { memo } from 'react'
import * as Progress from 'react-native-progress'
import { Icon } from 'react-native-paper'
const nfcIcon = require('../../assets/nfc.png')

interface props {
  submitted: number
  allocated: number
  cardWidth: number
  cardHeight: number
  progressSize: number
  height: number
  width: number
}

function NfcCard({
  submitted,
  allocated,
  cardWidth,
  cardHeight,
  progressSize,
  height,
  width,
}: props) {
  return (
    <View
      style={{
        height: cardHeight,
        width: cardWidth,
        flexDirection: 'row',
        borderRadius: 31,
        backgroundColor: '#8d1c47',
        padding: 20,
      }}>
      <View style={{ justifyContent: 'center', alignItems: 'center', flex: 1 }}>
        <Progress.Circle
          size={progressSize}
          progress={allocated > 0 ? submitted / allocated : 0}
          showsText={false}
          color="#0068FF"
          unfilledColor="#F1FFF3"
          borderWidth={0}
          thickness={4.25}
        />

        <View style={{ position: 'absolute', top: 12 }}>
          <Icon source={nfcIcon} color="white" size={progressSize} />
        </View>
        <Text style={{ color: '#bdcdce', marginTop: 8, fontSize: 18, width: width * 0.2 }}>
          NFC tracker
        </Text>
      </View>
      <View
        style={{
          backgroundColor: '#ffffff',
          width: width * 0.004,
          height: height * 0.15,
          borderRadius: 50,
        }}></View>
      <View style={{ flex: 1, justifyContent: 'space-between', paddingLeft: 50 }}>
        <View style={{ alignItems: 'center', flexDirection: 'row' }}>
          <Icon size={50} color="#bdcdce" source={nfcIcon} />
          <View style={{ alignItems: 'center', gap: 5 }}>
            <Text
              style={{ color: '#bdcdce', width: width * 0.2, fontSize: 15, textAlign: 'center' }}>
              Allocated
            </Text>
            <Text
              style={{ fontSize: 18, color: '#f7f7f7', fontWeight: 'bold', textAlign: 'center' }}>
              {allocated}
            </Text>
          </View>
        </View>
        <View
          style={{
            backgroundColor: '#ffffff',
            width: width * 0.3,
            height: height * 0.002,
            borderRadius: 50,
          }}></View>
        <View style={{ alignItems: 'center', flexDirection: 'row' }}>
          <Icon size={50} color="#5c9dff" source={nfcIcon} />
          <View style={{ alignItems: 'center', gap: 5 }}>
            <Text
              style={{ color: '#bdcdce', width: width * 0.2, fontSize: 15, textAlign: 'center' }}>
              Submitted
            </Text>
            <Text
              style={{ fontSize: 18, color: '#5c9dff', fontWeight: 'bold', textAlign: 'center' }}>
              +{submitted}
            </Text>
          </View>
        </View>
      </View>
    </View>
  )
}

export default memo(NfcCard)
