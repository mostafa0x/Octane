import { View, Text, TouchableOpacity, ActivityIndicator, useWindowDimensions } from 'react-native'
import React, { useRef, useState } from 'react'
import * as DocumentPicker from 'expo-document-picker'
import axiosClient from 'lib/api/axiosClient'
import { HelperText, Icon } from 'react-native-paper'
const backImg = require('../../../../assets/backn.png')
import * as Animatable from 'react-native-animatable'
import { Image } from 'expo-image'
import { useDispatch } from 'react-redux'
import { useLocalSearchParams } from 'expo-router'

export default function UserInfo() {
  const { width, height } = useWindowDimensions()
  const { userID } = useLocalSearchParams()
  const [errorRes, setErrorRes] = useState<string | null>(null)
  const [succusRes, setSuccusRes] = useState<string | null>(null)
  const dispatch = useDispatch()

  return (
    <Animatable.View animation="fadeIn" duration={100} style={{ flex: 1 }}>
      <View style={{ position: 'absolute', top: height * 0.2, width: '100%' }}>
        <Image
          style={{ width: '100%', height: height * 0.25 }}
          contentFit="fill"
          source={backImg}
        />
      </View>

      <View style={{ width: '100%', height: height * 0.3, zIndex: -1 }}>
        <Image source={backImg} contentFit="fill" style={{ width: '100%', height: '100%' }} />
      </View>
      <View
        style={{
          flex: 1,
          borderTopLeftRadius: 100,
          borderTopRightRadius: 100,
          backgroundColor: 'white',
          padding: 50,
        }}>
        <Text>USerINFO {userID} </Text>
      </View>
    </Animatable.View>
  )
}
