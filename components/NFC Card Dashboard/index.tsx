import { View, Text, TouchableOpacity, Modal, TextInput } from 'react-native'
import React, { memo, useRef, useState } from 'react'
import * as Progress from 'react-native-progress'
import { ActivityIndicator, Button, HelperText, Icon } from 'react-native-paper'
import axiosClient from 'lib/api/axiosClient'
const nfcIcon = require('../../assets/nfc.png')

interface props {
  submitted: number
  allocated: number
  height: number
  width: number
  userID: number
  refetch: any
}

function NfcCardDashboard({ submitted, allocated, height, width, userID, refetch }: props) {
  const cardWidth = useRef(width * 0.9)
  const cardHeight = useRef(height * 0.18)
  const progressSize = useRef(Math.min(width, height) * 0.18)
  const [valueNum, setValueNum] = useState<any>(0)
  const [isShowModel, setIsShowModel] = useState(false)
  const [isLoadingRes, setIsLoadingRes] = useState(false)
  const [errorRes, setErrorRes] = useState<string | null>(null)

  async function handleAddAllocate() {
    console.log(valueNum)

    if (isLoadingRes) return
    if (!valueNum || valueNum <= 0) {
      return setErrorRes('Should be more Than 0')
    }
    setIsLoadingRes(true)
    setErrorRes(null)
    try {
      console.log(userID)

      const res = await axiosClient.post(`/admin/users/allocate/${userID}`, {
        allocated: parseInt(valueNum),
      })
      await refetch()
      const data = res.data
      setIsShowModel(false)
      setValueNum(0)
      console.log(data.message)
    } catch (err: any) {
      setErrorRes(err.response?.data?.message ?? err.message ?? 'Error upload!')
      console.log(err)

      throw err
    } finally {
      setIsLoadingRes(false)
    }
  }

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
          borderWidth={0.5}
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
      <Modal
        animationType="fade"
        transparent
        visible={isShowModel}
        onRequestClose={() => setIsShowModel(false)}>
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
              height: height * 0.35,
              backgroundColor: '#fff',
              padding: 20,
              borderRadius: 70,
              elevation: 5,
            }}>
            <View style={{ alignItems: 'center', marginTop: height * 0.01, gap: 15 }}>
              <Text
                style={{
                  width: width * 0.5,
                  textAlign: 'center',
                  fontWeight: 'bold',
                  fontSize: width * 0.052,
                }}>
                Add Allocate
              </Text>
              <TextInput
                onChangeText={(text: any) => setValueNum(text)}
                value={valueNum}
                style={{
                  borderWidth: 2,
                  borderRadius: 30,
                  width: width * 0.5,
                  height: height * 0.07,
                  padding: 20,
                  textAlign: 'center',
                  fontSize: width * 0.052,
                }}
                keyboardType="numeric"
                autoFocus={true}
              />
              {isLoadingRes ? (
                <View style={{ marginTop: height * 0.05 }}>
                  <ActivityIndicator size={50} />
                </View>
              ) : (
                <>
                  <Button
                    onPress={() => handleAddAllocate()}
                    buttonColor="#8d1c47"
                    textColor="white"
                    contentStyle={{ height: height * 0.05 }}
                    style={{ width: width * 0.4, height: height * 0.05 }}>
                    Submit
                  </Button>
                  <Button
                    onPress={() => setIsShowModel(false)}
                    buttonColor="#d2e6d4"
                    textColor="black"
                    contentStyle={{ height: height * 0.05 }}
                    style={{ width: width * 0.4, height: height * 0.05 }}>
                    cancel
                  </Button>
                  <HelperText style={{ fontSize: width * 0.032 }} type="error" visible={!!errorRes}>
                    {errorRes}
                  </HelperText>
                </>
              )}
            </View>
          </View>
        </View>
      </Modal>
    </View>
  )
}

export default memo(NfcCardDashboard)
