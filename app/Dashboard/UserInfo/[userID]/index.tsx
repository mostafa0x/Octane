import {
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  useWindowDimensions,
  Modal,
} from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import { Avatar, Button, Icon } from 'react-native-paper'
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
import axiosClient from 'lib/api/axiosClient'
import ListButtonHistory from 'components/List Button History'
const avatarIcon = require('../../../../assets/avatar.png')
import dayjs from 'dayjs'
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter'
import { useUserInfoContext } from 'Providers/UserInfo'
dayjs.extend(isSameOrAfter)

export interface UserInfoFace {
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
  const dispatch = useDispatch()
  const currUserID = isArray(userID) ? parseInt(userID[0]) : parseInt(userID)
  const [activeList, setActiveList] = useState('daily')
  const [currData, setCurrData] = useState<acknowledgmentsFace[]>([])
  const { setUserInfo, isCallSupspend, setIsCallSupspend } = useUserInfoContext()
  const { data, isLoading, isError, error, refetch }: UseQueryResult<UserInfoFace> = useGetUserInfo(
    isArray(userID) ? parseInt(userID[0]) : parseInt(userID)
  )

  useEffect(() => {
    if (data) {
      setCurrData(data.acknowledgments)
      setUserInfo(data)
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
    setIsCallSupspend(false)
    setIsLoadingRes(true)
    setErrorRes(null)
    try {
      const res = await axiosClient.post(`/admin/users/suspend/${currUserID}`)
      await refetch()
      alert(res.data.message)
      console.log(res.data)
    } catch (err: any) {
      setErrorRes(err.response?.data?.message ?? err.message ?? 'Error Suspend User!')
      alert(err.response?.data?.message ?? err.message ?? 'Error Suspend User!')
      throw err
    } finally {
      setIsLoadingRes(false)
    }
  }, [currUserID])

  useEffect(() => {
    if (isCallSupspend) {
      handleSuspendUser()
    }
    return () => {
      setIsCallSupspend(false)
    }
  }, [isCallSupspend])

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
          gap: 5,
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
        <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
          <Text style={{ textAlign: 'center', fontSize: width * 0.046 }}>{userName}</Text>

          {data?.status === 'active' ? null : (
            <Icon size={30} color="red" source={'block-helper'} />
          )}
        </View>
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
      <Modal
        animationType="fade"
        transparent
        visible={isLoadingRes}
        onDismiss={() => isLoadingRes === false}>
        <View
          style={{
            flex: 1,
            backgroundColor: 'rgba(0,0,0,0.7)',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <ActivityIndicator size={120} />
        </View>
      </Modal>
    </Animatable.View>
  )
}
