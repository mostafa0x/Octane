import { View, Text, TouchableOpacity } from 'react-native'
import React, { memo, useRef } from 'react'
import { Image } from 'expo-image'
import { Router } from 'expo-router'
import { userDataFace } from 'Types/Store/UserSliceFace'
import { Icon } from 'react-native-paper'

interface props {
  sectionPadding?: number
  router: Router
  userData?: userDataFace | null
  width: number
  height: number
  type?: string
  label?: string
}

const HomeContent = React.memo(({ router, userData, width, height }: props) => {
  return (
    <>
      <TouchableOpacity
        onPress={() => router.push('/Profile')}
        style={{ position: 'absolute', left: 10, top: height * 0.002, zIndex: 10 }}>
        <Image
          style={{ width: width * 0.08, height: height * 0.064 }}
          contentFit="cover"
          source={require('../../assets/LogowithoutTXT.png')}
        />
      </TouchableOpacity>
      <View style={{ position: 'absolute', left: 60, top: 10, zIndex: 10 }}>
        <Text
          style={{
            color: '#F1FFF3',
            fontWeight: 'bold',
            fontSize: width * 0.042,
            width: width * 1,
          }}>
          Hi
        </Text>
        <Text
          style={{
            color: '#F1FFF3',
            fontWeight: 'regular',
            fontSize: width * 0.032,
            width: width * 1,
          }}>
          Welcome Back {userData?.name}
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
const DashboardContent = React.memo(({ router, width, label }: props) => {
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
        <Text style={{ color: '#F1FFF3', fontSize: 24, width: width }}>
          {label ? label : 'Dashboard'}
        </Text>
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

function AppBar({ type, sectionPadding, router, userData, width, label, height }: props) {
  const heightBar = useRef(height * 0.05)
  return (
    <View style={{ position: 'absolute', top: 0, left: 0, zIndex: 50, width: '100%' }}>
      <View
        style={{
          height: type === 'Home' ? height * 0.07 : height * 0.05,
          width: '100%',
          borderBottomLeftRadius: 30,
          borderBottomRightRadius: 30,
          backgroundColor: 'black',
          opacity: 0.4,
        }}
      />
      {type === 'Home' && (
        <HomeContent router={router} height={height} width={width} userData={userData} />
      )}
      {type === 'Profile' && <ProfileContent router={router} height={height} width={width} />}
      {type === 'Dashboard' && (
        <DashboardContent router={router} height={height} width={width} label={label} />
      )}
      {type === 'Upload' && <UploadContent router={router} height={height} width={width} />}
      {type == 'Home' && (
        <View style={{ marginTop: height * 0.002, gap: 8, padding: sectionPadding }}>
          <Text style={{ color: '#EEEEEE', fontSize: width * 0.062, fontWeight: 'bold' }}>
            Made for You
          </Text>
          <Text style={{ color: '#EEEEEE', fontSize: width * 0.032, fontWeight: 'regular' }}>
            Get Things Done Efficiently and Accurately
          </Text>
        </View>
      )}
    </View>
  )
}

export default memo(AppBar)
