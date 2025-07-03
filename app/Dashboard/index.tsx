import { View, Text, TouchableOpacity, ScrollView } from 'react-native'
import { ActivityIndicator } from 'react-native-paper'
import * as Animatable from 'react-native-animatable'
import { Image } from 'expo-image'
import { useRouter } from 'expo-router'
import { useDispatch, useSelector } from 'react-redux'
import { StateFace } from 'Types/Store/StateFace'
import { useEffect, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import axiosClient from 'lib/api/axiosClient'
import { UsersFace } from 'Types/Store/DashboardSliceFace'
import {
  responsiveHeight as rh,
  responsiveWidth as rw,
  responsiveFontSize as rf,
} from 'react-native-responsive-dimensions'

const avatarIcon = require('../../assets/avatar.png')
const backImg = require('../../assets/backn.png')

export default function Dashboard() {
  const { userData } = useSelector((state: StateFace) => state.UserReducer)
  const router = useRouter()

  async function handleGetUsers() {
    try {
      const res = await axiosClient.get('/admin/users/')
      return res.data.users
    } catch (err: any) {
      console.log(err)
      throw err
    }
  }

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['users'],
    queryFn: handleGetUsers,
    staleTime: 30000,
  })

  return (
    <Animatable.View animation="fadeIn" duration={100} style={{ flex: 1 }}>
      <View style={{ position: 'absolute', top: rh(20), width: '100%' }}>
        <Image style={{ width: '100%', height: rh(25) }} contentFit="fill" source={backImg} />
      </View>
      <View style={{ width: '100%', height: rh(20), zIndex: -1 }}>
        <Image source={backImg} contentFit="fill" style={{ width: '100%', height: '100%' }} />
      </View>

      <View
        style={{
          flex: 1,
          borderTopLeftRadius: 100,
          borderTopRightRadius: 100,
          backgroundColor: 'white',
          paddingTop: rh(5),
        }}>
        <ScrollView contentContainerStyle={{ flexGrow: 1, paddingBottom: rh(10) }}>
          {isLoading || isFetching ? (
            <View style={{ alignItems: 'center', justifyContent: 'center' }}>
              <ActivityIndicator color="blue" size={80} />
            </View>
          ) : (
            <View
              style={{
                flexDirection: 'row',
                flexWrap: 'wrap',
                justifyContent: 'flex-start',
                paddingHorizontal: rw(5),
              }}>
              {data?.map((user: UsersFace, index: number) =>
                user.id === userData?.id ? null : (
                  <TouchableOpacity
                    onPress={() =>
                      router.push({
                        pathname: `/Dashboard/UserInfo/${user.id}`,
                        params: { userName: user.name, userImage: user.image },
                      })
                    }
                    key={index}
                    style={{
                      width: rw(30), // ✅ 3 عناصر في كل صف
                      alignItems: 'center',
                      marginBottom: rh(3),
                    }}>
                    <Image
                      style={{
                        borderWidth: 0.5,
                        backgroundColor: '#8d1c47',
                        borderRadius: 20,
                        width: rw(25),
                        height: rw(25),
                      }}
                      contentFit="cover"
                      source={user?.image ? { uri: user.image } : avatarIcon}
                    />
                    <Text
                      style={{
                        fontSize: rf(1.8),
                        color: 'black',
                        textAlign: 'center',
                        marginTop: rh(1),
                        width: '100%',
                      }}>
                      {user.name}
                    </Text>
                  </TouchableOpacity>
                )
              )}
            </View>
          )}
        </ScrollView>
      </View>
    </Animatable.View>
  )
}
