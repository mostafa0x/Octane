import { View, TouchableOpacity, ActivityIndicator, Modal } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import { Avatar, Button, Icon, Portal, Snackbar, Text } from 'react-native-paper'
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
import dayjs from 'dayjs'
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter'
import { useUserInfoContext } from 'Providers/UserInfo'
import {
  responsiveHeight as rh,
  responsiveWidth as rw,
  responsiveFontSize as rf,
} from 'react-native-responsive-dimensions'
import { activeListType } from 'app'

const avatarIcon = require('../../../../assets/avatar.png')
const backImg = require('../../../../assets/backn.png')
dayjs.extend(isSameOrAfter)

export interface UserInfoFace {
  acknowledgments: acknowledgmentsFace[]
  allocated: number
  submitted: number
  status: 'active' | 'suspend'
}

const ErrorFC = ({ error, refetch }: { error: Error; refetch: any }) => {
  return (
    <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: rh(20), gap: rh(5) }}>
      <Text style={{ color: 'red', fontSize: rf(3) }}>{error.message}</Text>
      <Button onPress={refetch} buttonColor="#8d1c47" textColor="white">
        Try Again
      </Button>
    </View>
  )
}

export default function UserInfo() {
  const { userID, userName, userImage } = useLocalSearchParams()
  const [errorRes, setErrorRes] = useState<string | null>(null)
  const [isLoadingRes, setIsLoadingRes] = useState(false)
  const dispatch = useDispatch()
  const currUserID = isArray(userID) ? parseInt(userID[0]) : parseInt(userID)
  const [activeList, setActiveList] = useState<activeListType>('daily')
  const [currData, setCurrData] = useState<acknowledgmentsFace[]>([])
  const [loading, setLoading] = useState(true)

  const { setUserInfo, isCallSupspend, setIsCallSupspend, isLoadingApi, setIsLoadingApi } =
    useUserInfoContext()
  const { data, isLoading, isError, error, refetch }: UseQueryResult<UserInfoFace> =
    useGetUserInfo(currUserID)
  const [isMessageBar, setIsMessageBar] = useState<string | null>(null)

  useEffect(() => {
    if (data) {
      setCurrData(data.acknowledgments)
      setUserInfo(data)
      handleActive('daily')
    }
    return () => setCurrData([])
  }, [data])

  const handleActive = useCallback(
    (period: activeListType) => {
      setActiveList(period)
      if (!data?.acknowledgments) return
      const now = dayjs()
      let filteredData: acknowledgmentsFace[] = []
      switch (period) {
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
    setIsLoadingApi(true)
    setErrorRes(null)
    try {
      const res = await axiosClient.post(`/admin/users/suspend/${currUserID}`)
      await refetch()
      setIsMessageBar(res.data.message)
    } catch (err: any) {
      setErrorRes(err.response?.data?.message ?? err.message ?? 'Error Suspend User!')
      alert(err.response?.data?.message ?? err.message ?? 'Error Suspend User!')
    } finally {
      setIsLoadingRes(false)
      setIsLoadingApi(false)
    }
  }, [currUserID])

  useEffect(() => {
    if (isCallSupspend) {
      handleSuspendUser()
    }
    return () => setIsCallSupspend(false)
  }, [isCallSupspend])

  return (
    <Animatable.View animation="fadeIn" duration={100} style={{ flex: 1 }}>
      <View style={{ position: 'absolute', top: rh(10), width: '100%' }}>
        <Image style={{ width: '100%', height: rh(25) }} contentFit="fill" source={backImg} />
      </View>

      <View style={{ width: '100%', height: rh(15), zIndex: -1 }}>
        <Image source={backImg} contentFit="fill" style={{ width: '100%', height: '100%' }} />
      </View>

      <View
        style={{
          position: 'absolute',
          top: rh(6),
          left: rw(35),
          zIndex: 10,
          gap: rh(0.5),
        }}>
        <TouchableOpacity activeOpacity={0.8}>
          <Avatar.Image
            onLoadStart={() => loading && setLoading(true)}
            onLoadEnd={() => setLoading(false)}
            source={loading ? avatarIcon : userImage ? { uri: userImage } : avatarIcon}
            size={rw(30)}
          />
        </TouchableOpacity>
        <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
          <Text style={{ textAlign: 'center', fontSize: rf(2.1) }}>{userName}</Text>
          {isLoading ? (
            <ActivityIndicator size={rf(2)} />
          ) : isError ? null : data?.status === 'active' ? null : (
            <>
              <Text>{'  '}</Text>
              <Icon size={rf(3)} color="red" source={'block-helper'} />
            </>
          )}
        </View>
      </View>

      <View
        style={{
          flex: 1,
          borderTopLeftRadius: rw(10),
          borderTopRightRadius: rw(10),
          backgroundColor: 'white',
          paddingHorizontal: rw(5),
        }}>
        {isError ? (
          <ErrorFC refetch={refetch} error={error} />
        ) : isLoading ? (
          <View style={{ marginTop: rh(20) }}>
            <ActivityIndicator size={70} />
          </View>
        ) : (
          <View style={{ marginVertical: rh(10), gap: rh(0.5) }}>
            <NFCCardDashboard
              submitted={data?.submitted ?? 0}
              allocated={data?.allocated ?? 0}
              userID={currUserID}
              refetch={refetch}
            />
            <ListButtonHistory activeList={activeList} handleActive={handleActive} />
            <ListCard
              activeList={activeList}
              type="Dashboard"
              acknowledgments_Current={currData ?? []}
              allocated={data?.allocated ?? 0}
            />
          </View>
        )}
      </View>
      <Portal>
        <Snackbar
          visible={!!isMessageBar}
          onDismiss={() => setIsMessageBar(null)}
          action={{ label: 'done', onPress: () => setIsMessageBar(null) }}>
          <Text style={{ color: 'white', fontSize: rf(1.8) }}>{isMessageBar}</Text>
        </Snackbar>
      </Portal>

      <Modal
        animationType="fade"
        transparent
        visible={isLoadingApi}
        onDismiss={() => setIsLoadingApi === false}>
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
