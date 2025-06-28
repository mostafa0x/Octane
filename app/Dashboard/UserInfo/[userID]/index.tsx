import { View, Text, TouchableOpacity, ActivityIndicator, useWindowDimensions } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { Avatar, HelperText, Icon, SegmentedButtons } from 'react-native-paper'
const backImg = require('../../../../assets/backn.png')
import * as Animatable from 'react-native-animatable'
import { Image } from 'expo-image'
import { useDispatch } from 'react-redux'
import { useLocalSearchParams } from 'expo-router'
import useGetUserInfo from 'Hooks/useGetUserInfo'
import { isArray } from 'lodash'
import { acknowledgmentsFace } from 'Types/Store/MainSliceFace'
import { UseQueryResult } from '@tanstack/react-query'
import NFCCardDashboard from 'components/NFC Card Dashboard'
const avatarIcon = require('../../../../assets/avatar.png')

interface UserInfoFace {
  acknowledgments: acknowledgmentsFace[]
  allocated: number
  submitted: number
}

const ErrorFC = ({ error }: { error: Error }) => {
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
  const [value, setValue] = React.useState('')

  const { data, isLoading, isError, error }: UseQueryResult<UserInfoFace> = useGetUserInfo(
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
          top: height * 0.1,
          left: (width - width * 0.3) / 2,
          zIndex: 10,
          gap: 10,
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
            size={width * 0.3}
          />
        </TouchableOpacity>
        <Text style={{ textAlign: 'center', fontSize: width * 0.046 }}>{userName} </Text>
      </View>
      <View
        style={{
          flex: 1,
          borderTopLeftRadius: 100,
          borderTopRightRadius: 100,
          backgroundColor: 'white',
          paddingHorizontal: width * 0.05,
        }}>
        {isError ? (
          <ErrorFC error={error} />
        ) : isLoading ? (
          <ActivityIndicator size={70} />
        ) : (
          <View style={{ marginVertical: height * 0.1, gap: 20 }}>
            <View style={{ gap: 10 }}>
              <Text>status player {userID} </Text>
              <SegmentedButtons
                value={value}
                onValueChange={setValue}
                buttons={[
                  {
                    value: 'walk',
                    label: 'Activy',
                    checkedColor: 'green',
                  },
                  {
                    value: 'train',
                    label: 'supsend',
                    checkedColor: 'green',
                  },
                ]}
              />
            </View>

            <NFCCardDashboard
              submitted={data?.submitted ?? 0}
              allocated={data?.allocated ?? 0}
              height={height}
              width={width}
            />
          </View>
        )}
      </View>
    </Animatable.View>
  )
}
