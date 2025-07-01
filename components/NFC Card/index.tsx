import { View, Text } from 'react-native'
import React, { memo, useRef } from 'react'
import * as Progress from 'react-native-progress'
import { Icon } from 'react-native-paper'
const nfcIcon = require('../../assets/nfc.png')

interface props {
  submitted: number
  allocated: number
  height: number
  width: number
}

function NfcCard({ submitted, allocated, height, width }: props) {
  const cardWidth = useRef(width * 0.9)
  const cardHeight = useRef(height * 0.18)
  const progressSize = useRef(Math.min(width, height) * 0.18)
  return (
    <View
      style={{
        height: cardHeight.current,
        width: cardWidth.current,
        flexDirection: 'row',
        borderRadius: 31,
        backgroundColor: '#8d1c47',
        padding: 20,
      }}>
      <View style={{ justifyContent: 'center', alignItems: 'center', flex: 1 }}>
        <Progress.Circle
          size={progressSize.current}
          progress={allocated > 0 ? submitted / allocated : 0}
          showsText={false}
          color="#0068FF"
          unfilledColor="#F1FFF3"
          borderWidth={0.5}
          thickness={4.25}
        />

        <View style={{ position: 'absolute', top: height * 0.012 }}>
          <Icon source={nfcIcon} color="white" size={progressSize.current} />
        </View>
        <Text
          style={{
            color: '#bdcdce',
            marginTop: height * 0.008,
            fontSize: width * 0.038,
            width: width * 0.3,
            textAlign: 'center',
          }}>
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
      <View style={{ flex: 1, justifyContent: 'space-between', paddingLeft: width * 0.05 }}>
        <View style={{ alignItems: 'center', flexDirection: 'row' }}>
          <Icon size={50} color="#bdcdce" source={nfcIcon} />
          <View style={{ alignItems: 'center', gap: 5 }}>
            <Text
              style={{
                color: '#bdcdce',
                width: width * 0.2,
                fontSize: width * 0.028,
                textAlign: 'center',
              }}>
              Allocated
            </Text>
            <Text
              style={{
                fontSize: width * 0.032,
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
            width: width * 0.3,
            height: height * 0.002,
            borderRadius: 50,
          }}></View>
        <View style={{ alignItems: 'center', flexDirection: 'row' }}>
          <Icon size={50} color="#5c9dff" source={nfcIcon} />
          <View style={{ alignItems: 'center', gap: 5 }}>
            <Text
              style={{
                color: '#bdcdce',
                width: width * 0.2,
                fontSize: width * 0.028,
                textAlign: 'center',
              }}>
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
