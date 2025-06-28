import { View, Text, TouchableOpacity, Modal, TextInput } from 'react-native'
import React, { memo, useRef, useState } from 'react'
import * as Progress from 'react-native-progress'
import { Button, Icon } from 'react-native-paper'
const nfcIcon = require('../../assets/nfc.png')

interface props {
  submitted: number
  allocated: number
  height: number
  width: number
}

function NfcCardDashboard({ submitted, allocated, height, width }: props) {
  const cardWidth = useRef(width * 0.9)
  const cardHeight = useRef(height * 0.18)
  const progressSize = useRef(Math.min(width, height) * 0.18)
  const [isShowModel, setIsShowModel] = useState(false)

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
      <TouchableOpacity
        onPress={() => setIsShowModel(true)}
        style={{ justifyContent: 'center', alignItems: 'center', flex: 1 }}>
        <Progress.Circle
          size={progressSize.current}
          progress={allocated > 0 ? submitted / allocated : 0}
          showsText={false}
          color="#0068FF"
          unfilledColor="#F1FFF3"
          borderWidth={0}
          thickness={4.25}
        />

        <View style={{ position: 'absolute', top: 12 }}>
          <Icon source={nfcIcon} color="white" size={progressSize.current} />
        </View>
        <Text
          style={{
            color: '#bdcdce',
            marginTop: 8,
            fontSize: 18,
            width: width * 0.4,
            textAlign: 'center',
          }}>
          Add Allocated
        </Text>
      </TouchableOpacity>
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
      <Modal transparent visible={isShowModel} onRequestClose={() => setIsShowModel(false)}>
        <View
          style={{
            flex: 1,
            backgroundColor: 'rgba(0,0,0,0.5)',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <View
            style={{
              width: width * 0.8,
              height: height * 0.4,
              backgroundColor: '#fff',
              padding: 20,
              borderRadius: 100,
              elevation: 5,
            }}>
            <View style={{ alignItems: 'center', marginTop: height * 0.06, gap: 20 }}>
              <Text
                style={{
                  width: width * 0.5,
                  textAlign: 'center',
                  fontWeight: 'bold',
                  fontSize: width * 0.042,
                }}>
                Add Allocate
              </Text>
              <TextInput
                placeholder="number "
                style={{
                  borderWidth: 2,
                  borderRadius: 30,
                  width: width * 0.5,
                  height: height * 0.07,
                  padding: 30,
                  textAlign: 'center',
                }}
                keyboardType="numeric"
              />
              <Button
                buttonColor="#00D09E"
                textColor="black"
                contentStyle={{ height: height * 0.05 }}
                style={{ width: width * 0.4, height: height * 0.05 }}>
                Submit
              </Button>
              <Button
                buttonColor="#e6f8e8"
                textColor="black"
                contentStyle={{ height: height * 0.05 }}
                style={{ width: width * 0.4, height: height * 0.05 }}>
                cancel
              </Button>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  )
}

export default memo(NfcCardDashboard)
