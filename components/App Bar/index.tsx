import { View, Text, TouchableOpacity } from 'react-native'
import React, { memo } from 'react'
import { Image } from 'expo-image'
import { Router } from 'expo-router'
import { userDataFace } from 'Types/Store/UserSliceFace'
import { Icon } from 'react-native-paper'

interface props {
  sectionPadding?: number
  router: Router
  userData?: userDataFace | null
  width: number
  type?: string
}

const HomeContent = React.memo(({ router, userData, width }: props) => {
  return (
    <>
      <TouchableOpacity
        onPress={() => router.push('/Profile')}
        style={{ position: 'absolute', left: 10, top: 0, zIndex: 10 }}>
        <Image
          style={{ width: 50, height: 50 }}
          contentFit="cover"
          source={require('../../assets/LogowithoutTXT.png')}
        />
      </TouchableOpacity>
      <View style={{ position: 'absolute', left: 60, top: 10, zIndex: 10 }}>
        <Text style={{ color: '#F1FFF3', fontSize: width * 0.042, width: width * 1 }}>
          Hi, Welcome Back {userData?.name}
        </Text>
      </View>
    </>
  )
})

const ProfileContent = React.memo(({ router, width }: props) => {
  return (
    <>
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
    </>
  )
})
const UploadContent = React.memo(({ router, width }: props) => {
  return (
    <>
      <TouchableOpacity
        onPress={() => router.back()}
        style={{ position: 'absolute', left: 10, top: 0, zIndex: 10 }}>
        <View style={{ marginTop: 8 }}>
          <Icon size={40} color="white" source="keyboard-backspace" />
        </View>
      </TouchableOpacity>
      <View style={{ position: 'absolute', left: 60, top: 10, zIndex: 10 }}>
        <Text style={{ color: '#F1FFF3', fontSize: 24, width: width * 1 }}>
          Upload acknowledgments
        </Text>
      </View>
    </>
  )
})

function AppBar({ type, sectionPadding, router, userData, width }: props) {
  return (
    <View style={{ position: 'absolute', top: 0, left: 0, zIndex: 50, width: '100%' }}>
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
      {type === 'Home' && <HomeContent router={router} width={width} userData={userData} />}
      {type === 'Profile' && <ProfileContent router={router} width={width} />}
      {type === 'Upload' && <UploadContent router={router} width={width} />}
      {type == 'Home' && (
        <View style={{ marginTop: 40, gap: 8, padding: sectionPadding }}>
          <Text style={{ color: '#EEEEEE', fontSize: 26, fontWeight: 'bold' }}>Made for You</Text>
          <Text style={{ color: '#EEEEEE', fontSize: 18 }}>
            Get Things Done Efficiently and Accurately
          </Text>
        </View>
      )}
    </View>
  )
}

export default memo(AppBar)
