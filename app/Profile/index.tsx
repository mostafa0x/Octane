import { View, Text, TouchableOpacity, useWindowDimensions, ScrollView } from 'react-native'
import { Avatar, Icon } from 'react-native-paper'
import * as Animatable from 'react-native-animatable'
import { Image } from 'expo-image'
import { useRouter } from 'expo-router'
import { useDispatch, useSelector } from 'react-redux'
import { StateFace } from 'Types/Store/StateFace'
import handleLoutOut from 'Services/handleLogOut'

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
      {/* الهيدر */}
      <View style={{ position: 'absolute', top: 0, left: 0, zIndex: 50, width: width }}>
        <TouchableOpacity
          onPress={() => router.back()}
          style={{ position: 'absolute', left: 10, top: 0, zIndex: 10 }}>
          <View style={{ marginTop: 8 }}>
            <Icon size={40} color="white" source="keyboard-backspace" />
          </View>
        </TouchableOpacity>
        <View style={{ position: 'absolute', left: 60, top: 10, zIndex: 10 }}>
          <Text style={{ color: '#F1FFF3', fontSize: 24, width: width }}>Profile</Text>
        </View>
        <View
          style={{
            height: 60,
            width: '100%',
            borderBottomLeftRadius: 30,
            borderBottomRightRadius: 30,
            backgroundColor: 'black',
            opacity: 0.4,
          }}
        />
      </View>

      {/* خلفية */}
      <View style={{ position: 'absolute', top: height * 0.2, width: '100%' }}>
        <Image
          style={{ width: '100%', height: height * 0.25 }}
          contentFit="fill"
          source={backImg}
        />
      </View>

      {/* الصورة العلوية */}
      <View style={{ width: '100%', height: height * 0.3 }}>
        <Image source={backImg} contentFit="fill" style={{ width: '100%', height: '100%' }} />
      </View>

      {/* الصورة الشخصية */}
      <View
        style={{
          position: 'absolute',
          top: height * 0.2,
          left: (width - avatarSize) / 2,
          zIndex: 10,
        }}>
        <TouchableOpacity activeOpacity={0.8}>
          <Avatar.Image
            source={{
              uri:
                userData?.avatar ||
                'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRkqE4v4MvZzIxhYbK1Lesgd_2stB50hahczw&s',
            }}
            size={avatarSize}
          />
        </TouchableOpacity>
      </View>

      {/* محتوى الصفحة */}
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
        {/* الاسم */}
        <View style={{ alignItems: 'center', marginBottom: 30 }}>
          <Text style={{ fontSize: 28, fontWeight: 'bold' }}>{userData?.name}</Text>
        </View>

        {/* المعلومات */}
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
            <Text style={{ fontSize: 16 }}>{userData?.email}</Text>
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
            <Text style={{ fontSize: 16 }}>Log Out</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </Animatable.View>
  )
}
