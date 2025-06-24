import { View, Text, TouchableOpacity, useWindowDimensions, ScrollView } from 'react-native'
import { Avatar, Icon } from 'react-native-paper'
import * as Animatable from 'react-native-animatable'
import { Image } from 'expo-image'
import { useRouter } from 'expo-router'
import { useDispatch, useSelector } from 'react-redux'
import { StateFace } from 'Types/Store/StateFace'
import handleLoutOut from 'Services/handleLogOut'
import AppBar from 'components/App Bar'
const avatarIcon = require('../../assets/avatar.png')
const backImg = require('../../assets/backn.png')

export default function Profile() {
  const { width, height } = useWindowDimensions()
  const { userData } = useSelector((state: StateFace) => state.UserReducer)
  const router = useRouter()
  const dispatch = useDispatch()

  async function callLogOut() {
    await handleLoutOut(dispatch, router)
  }

  const avatarSize = width * 0.4

  return (
    <Animatable.View animation="fadeIn" duration={200} easing="ease-in-out" style={{ flex: 1 }}>
      <AppBar type="Profile" router={router} userData={userData} width={width} />
      <View style={{ position: 'absolute', top: height * 0.2, width: '100%' }}>
        <Image
          style={{ width: '100%', height: height * 0.25 }}
          contentFit="fill"
          source={backImg}
        />
      </View>

      <View style={{ width: '100%', height: height * 0.3 }}>
        <Image source={backImg} contentFit="fill" style={{ width: '100%', height: '100%' }} />
      </View>

      <View
        style={{
          position: 'absolute',
          top: height * 0.2,
          left: (width - avatarSize) / 2,
          zIndex: 10,
        }}>
        <TouchableOpacity activeOpacity={0.8}>
          <Avatar.Image
            source={
              userData?.avatar
                ? {
                    uri: userData?.avatar,
                  }
                : avatarIcon
            }
            size={avatarSize}
          />
        </TouchableOpacity>
      </View>

      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          paddingHorizontal: 24,
          paddingBottom: 100,
        }}
        style={{
          flex: 1,
          borderTopLeftRadius: 50,
          borderTopRightRadius: 50,
          backgroundColor: 'white',
          paddingTop: height * 0.12,
        }}>
        <View style={{ alignItems: 'center', marginBottom: 50 }}>
          <Text style={{ fontSize: 28, fontWeight: 'bold', width: width, textAlign: 'center' }}>
            {userData?.name}
          </Text>
        </View>

        <View style={{ gap: 30 }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 16 }}>
            <View
              style={{
                height: 60,
                width: 60,
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 22,
                backgroundColor: '#6DB6FE',
              }}>
              <Icon size={40} source="email-outline" />
            </View>
            <Text style={{ fontSize: 16, width: width }}>
              {userData?.email ?? 'loading email...'}
            </Text>
          </View>

          <TouchableOpacity
            onPress={callLogOut}
            style={{ flexDirection: 'row', alignItems: 'center', gap: 16 }}>
            <View
              style={{
                height: 60,
                width: 60,
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 22,
                backgroundColor: '#eb9053',
              }}>
              <Icon size={40} source="logout" />
            </View>
            <Text style={{ fontSize: 16, width: width }}>Log Out</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </Animatable.View>
  )
}
