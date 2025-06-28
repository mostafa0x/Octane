import { View, Text, TouchableOpacity, ActivityIndicator, useWindowDimensions } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { Avatar, Button, HelperText, Icon, SegmentedButtons } from 'react-native-paper'
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
import ListCard from 'components/List/ListCard'
const avatarIcon = require('../../../../assets/avatar.png')

interface UserInfoFace {
  acknowledgments: acknowledgmentsFace[]
  allocated: number
  submitted: number
  status: 'active' | 'suspend'
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
  const currUserID = isArray(userID) ? parseInt(userID[0]) : parseInt(userID)

  const { data, isLoading, isError, error, refetch }: UseQueryResult<UserInfoFace> = useGetUserInfo(
    isArray(userID) ? parseInt(userID[0]) : parseInt(userID)
  )

  useEffect(() => {
    if (data) {
      console.log(data)
    }
  }, [data])

  return (
    <Animatable.View animation="fadeIn" duration={100} style={{ flex: 1 }}>
      <View style={{ position: 'absolute', top: height * 0.1, width: '100%' }}>
        <Image
          style={{ width: '100%', height: height * 0.25 }}
          contentFit="fill"
          source={backImg}
        />
      </View>

      <View style={{ width: '100%', height: height * 0.15, zIndex: -1 }}>
        <Image source={backImg} contentFit="fill" style={{ width: '100%', height: '100%' }} />
      </View>
      <View
        style={{
          position: 'absolute',
          top: height * 0.06,
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
          <View style={{ marginTop: height * 0.2 }}>
            <ActivityIndicator size={70} />
          </View>
        ) : (
          <View style={{ marginVertical: height * 0.1, gap: 20 }}>
            <NFCCardDashboard
              submitted={data?.submitted ?? 0}
              allocated={data?.allocated ?? 0}
              height={height}
              width={width}
              userID={currUserID}
              refetch={refetch}
            />
            {/* عندي مشكله ان التايب بتاع الداتا مش هوا هوا  فلازم خالد يرجع نفس الداتا بنفس الشكل او اغير التايب واريح دماغي */}
            <ListCard
              acknowledgments_Current={data?.acknowledgments ?? []}
              height={width}
              width={height}
            />
            <View style={{ gap: 10, alignItems: 'center' }}>
              <Button
                textColor="black"
                buttonColor={data?.status == 'active' ? 'red' : 'green'}
                style={{ width: width * 0.3, height: height * 0.05 }}
                contentStyle={{ height: height * 0.05 }}
                labelStyle={{ fontSize: width * 0.042 }}>
                Suspend
              </Button>
            </View>
          </View>
        )}
      </View>
    </Animatable.View>
  )
}
