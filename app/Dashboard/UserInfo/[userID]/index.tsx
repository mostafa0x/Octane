import { View, Text, TouchableOpacity, ActivityIndicator, useWindowDimensions } from 'react-native'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { Avatar, Button, HelperText, Icon, SegmentedButtons } from 'react-native-paper'
const backImg = require('../../../../assets/backn.png')
import * as Animatable from 'react-native-animatable'
import { Image } from 'expo-image'
import { useDispatch } from 'react-redux'
import { useLocalSearchParams } from 'expo-router'
import useGetUserInfo from 'Hooks/useGetUserInfo'
import { isArray, set } from 'lodash'
import { acknowledgmentsFace } from 'Types/Store/MainSliceFace'
import { UseQueryResult } from '@tanstack/react-query'
import NFCCardDashboard from 'components/NFC Card Dashboard'
import ListCard from 'components/List/ListCard'
import axiosClient from 'lib/api/axiosClient'
import ListButtonHistory from 'components/List Button History'
const avatarIcon = require('../../../../assets/avatar.png')
import dayjs from 'dayjs'
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter'
dayjs.extend(isSameOrAfter)

interface UserInfoFace {
  acknowledgments: acknowledgmentsFace[]
  allocated: number
  submitted: number
  status: 'active' | 'suspend'
}

const ErrorFC = ({ error }: { error: Error }) => {
  return (
    <View style={{ justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{ color: 'red' }}>{error.message}</Text>
    </View>
  )
}

export default function UserInfo() {
  const { width, height } = useWindowDimensions()
  const { userID, userName, userImage } = useLocalSearchParams()
  const [errorRes, setErrorRes] = useState<string | null>(null)
  const [isLoadingRes, setIsLoadingRes] = useState(false)
  const [succusRes, setSuccusRes] = useState<string | null>(null)
  const dispatch = useDispatch()
  const [value, setValue] = React.useState('')
  const currUserID = isArray(userID) ? parseInt(userID[0]) : parseInt(userID)
  const [activeList, setActiveList] = useState('daily')
  const [currData, setCurrData] = useState<acknowledgmentsFace[]>([])
  const { data, isLoading, isError, error, refetch }: UseQueryResult<UserInfoFace> = useGetUserInfo(
    isArray(userID) ? parseInt(userID[0]) : parseInt(userID)
  )

  useEffect(() => {
    if (data) {
      setCurrData(data.acknowledgments)
      handleActive('daily')
    }

    return () => {
      setCurrData([])
    }
  }, [data])

  const handleActive = useCallback(
    (period: string) => {
      const nameLower = period.toLowerCase()
      setActiveList(nameLower)

      if (!data?.acknowledgments) return

      const now = dayjs()
      let filteredData: acknowledgmentsFace[] = []

      switch (nameLower) {
        case 'daily':
          filteredData = data.acknowledgments.filter((item) =>
            dayjs(item.submission_date).isSame(now, 'day')
          )
          break

        case 'weekly':
          filteredData = data.acknowledgments.filter((item) =>
            dayjs(item.submission_date).isSame(now, 'week')
          )
          break

        case 'monthly':
          filteredData = data.acknowledgments.filter((item) =>
            dayjs(item.submission_date).isSame(now, 'month')
          )
          break

        default:
          filteredData = data.acknowledgments
      }

      setCurrData(filteredData)
    },
    [data?.acknowledgments]
  )

  const handleSuspendUser = useCallback(async () => {
    if (isLoadingRes) return
    setIsLoadingRes(true)
    setErrorRes(null)
    try {
      const res = await axiosClient.post(`/admin/users/suspend/${currUserID}`)
      await refetch()
      console.log(res.data)
    } catch (err: any) {
      setErrorRes(err.response?.data?.message ?? err.message ?? 'Error Suspend User!')
      throw err
    } finally {
      setIsLoadingRes(false)
    }
  }, [currUserID])

  return (
    <Animatable.View animation="fadeIn" duration={100} style={{ flex: 1 }}>
      <View style={{ position: 'absolute', top: height * 0.1, width: '100%' }}>
        <Image
          style={{ width: '100%', height: height * 0.25 }}
          contentFit="fill"
          source={backImg}
        />
      </View>
      {data && (
        <View
          style={{
            gap: 10,
            alignItems: 'center',
            position: 'absolute',
            top: height * 0.18,
            left: width * 0.55,
            zIndex: 10,
          }}>
          <Button
            loading={isLoadingRes}
            onPress={() => {
              if (data?.status == 'active') {
                handleSuspendUser()
              }
            }}
            textColor="black"
            buttonColor={data?.status == 'active' ? 'red' : '#12c51b'}
            style={{
              width: width * 0.2,
              height: height * 0.05,
              borderRadius: 100,
              marginLeft: width * 0.1,
            }}
            contentStyle={{ height: height * 0.05 }}
            labelStyle={{ fontSize: width * 0.028 }}>
            {data?.status == 'active' ? 'Suspend ' : 'Active User'}
          </Button>
        </View>
      )}
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
        <Text style={{ textAlign: 'center', fontSize: width * 0.046 }}>{userName}</Text>
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
            <ListButtonHistory
              activeList={activeList}
              searchHeight={height * 0.07}
              cardWidth={width * 0.9}
              handleActive={handleActive}
            />

            <ListCard
              type="Dashboard"
              acknowledgments_Current={currData ?? []}
              height={width}
              width={height}
            />
          </View>
        )}
      </View>
    </Animatable.View>
  )
}
