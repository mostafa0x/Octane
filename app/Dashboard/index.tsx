import { View, Text, TouchableOpacity, useWindowDimensions, ScrollView } from 'react-native'
import { ActivityIndicator, Avatar, HelperText, Icon } from 'react-native-paper'
import * as Animatable from 'react-native-animatable'
import { Image } from 'expo-image'
import { useRouter } from 'expo-router'
import { useDispatch, useSelector } from 'react-redux'
import { StateFace } from 'Types/Store/StateFace'
import handleLoutOut from 'Services/handleLogOut'
import AppBar from 'components/App Bar'
import { useEffect, useRef, useState } from 'react'
import ShowImageOptions from 'components/Models/showImageOptions'
import { useFormik } from 'formik'
import UploadAvatar from 'Services/UploadAvatar'
import { changeImageProfile } from 'lib/Store/Slices/UserSlice'
import { storeUserInfo, UpdataUserInfo } from 'Services/Storage'
const avatarIcon = require('../../assets/avatar.png')
const backImg = require('../../assets/backn.png')

interface BoxArrayFace {
  lable: string
  icon: string
}

export default function Dashboard() {
  const { width, height } = useWindowDimensions()
  const { userData } = useSelector((state: StateFace) => state.UserReducer)
  const router = useRouter()
  const dispatch = useDispatch()
  const boxsArr = useRef<BoxArrayFace[]>([
    { lable: 'User', icon: 'account' },
    { lable: 'User', icon: 'play' },
  ])

  const avatarSize = width * 0.4

  return (
    <Animatable.View animation="fadeIn" duration={200} easing="ease-in-out" style={{ flex: 1 }}>
      <AppBar type="Dashboard" router={router} userData={userData} width={width} />
      <View style={{ position: 'absolute', top: height * 0.2, width: '100%' }}>
        <Image
          style={{ width: '100%', height: height * 0.25 }}
          contentFit="fill"
          source={backImg}
        />
      </View>

      <View style={{ width: '100%', height: height * 0.2 }}>
        <Image source={backImg} contentFit="fill" style={{ width: '100%', height: '100%' }} />
      </View>

      <View
        style={{
          position: 'absolute',
          top: height * 0.2,
          left: (width - avatarSize) / 2,
          zIndex: 10,
        }}></View>

      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          paddingHorizontal: 24,
          paddingBottom: 100,
        }}
        style={{
          flex: 1,
          borderTopLeftRadius: 100,
          borderTopRightRadius: 100,
          backgroundColor: 'white',
          paddingTop: height * 0.12,
        }}>
        <View
          style={{
            flexDirection: 'row',
            flexWrap: 'wrap',
            justifyContent: boxsArr.current.length > 1 ? 'space-around' : 'flex-start',
            gap: 20,
            paddingHorizontal: 10,
          }}>
          {boxsArr.current.map((item, index) => (
            <TouchableOpacity
              key={index}
              style={{
                width: width * 0.25,
                marginBottom: 20,
                alignItems: 'center',
              }}>
              <View
                style={{
                  borderWidth: 0.5,
                  backgroundColor: '#6DB6FE',
                  borderRadius: 20,
                  width: '100%',
                  height: height * 0.11,
                  aspectRatio: 1,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <Icon size={70} color="white" source={item.icon} />
              </View>
              <Text
                style={{
                  fontSize: width * 0.038,
                  color: 'black',
                  textAlign: 'center',
                  marginTop: 8,
                }}>
                {item.lable}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </Animatable.View>
  )
}
