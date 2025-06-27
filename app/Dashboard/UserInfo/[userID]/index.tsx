import { View, Text, TouchableOpacity, ActivityIndicator, useWindowDimensions } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import * as DocumentPicker from 'expo-document-picker'
import axiosClient from 'lib/api/axiosClient'
import { Avatar, HelperText, Icon } from 'react-native-paper'
const backImg = require('../../../../assets/backn.png')
import * as Animatable from 'react-native-animatable'
import { Image } from 'expo-image'
import { useDispatch } from 'react-redux'
import { useLocalSearchParams } from 'expo-router'
import useGetUserInfo from 'Hooks/useGetUserInfo'
import { isArray } from 'lodash'
const avatarIcon = require('../../../../assets/avatar.png')

const ErrorFC = ({ error }: any) => {
  return (
    <View>
      <Text style={{ color: 'red' }}>{error.message}</Text>
    </View>
  )
}

export default function UserInfo() {
  const { width, height } = useWindowDimensions()
  const { userID, userName, userImage } = useLocalSearchParams()
  const [errorRes, setErrorRes] = useState<string | null>(null)
  const [succusRes, setSuccusRes] = useState<string | null>(null)
  const dispatch = useDispatch()
  const { data, isLoading, isError, error } = useGetUserInfo(
    isArray(userID) ? parseInt(userID[0]) : parseInt(userID)
  )

  useEffect(() => {
    if (data) {
      console.log(data)
    }
  }, [data])

  return (
    <Animatable.View animation="fadeIn" duration={100} style={{ flex: 1 }}>
      <View style={{ position: 'absolute', top: height * 0.2, width: '100%' }}>
        <Image
          style={{ width: '100%', height: height * 0.25 }}
          contentFit="fill"
          source={backImg}
        />
      </View>

      <View style={{ width: '100%', height: height * 0.2, zIndex: -1 }}>
        <Image source={backImg} contentFit="fill" style={{ width: '100%', height: '100%' }} />
      </View>
      <View
        style={{
          position: 'absolute',
          top: height * 0.09,
          left: (width - width * 0.4) / 2,
          zIndex: 10,
        }}>
        <TouchableOpacity activeOpacity={0.8}>
          <Avatar.Image
            source={
              userImage
                ? {
                    uri: userImage,
                  }
                : avatarIcon
            }
            size={width * 0.4}
          />
        </TouchableOpacity>
      </View>
      <View
        style={{
          flex: 1,
          borderTopLeftRadius: 100,
          borderTopRightRadius: 100,
          backgroundColor: 'white',
          padding: 50,
        }}>
        {isError ? (
          <ErrorFC error={error} />
        ) : isLoading ? (
          <ActivityIndicator size={70} />
        ) : (
          <View>
            <Text>USerINFO {userID} </Text>
          </View>
        )}
      </View>
    </Animatable.View>
  )
}
