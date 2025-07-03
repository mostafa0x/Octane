import { View, Text, TouchableOpacity } from 'react-native'
import React, { memo, useRef, useState } from 'react'
import { Image } from 'expo-image'
import { Router } from 'expo-router'
import { userDataFace } from 'Types/Store/UserSliceFace'
import { Icon, Menu } from 'react-native-paper'
import { useUserInfoContext } from 'Providers/UserInfo'
import { responsiveHeight as rh, responsiveWidth as rw } from 'react-native-responsive-dimensions'
import { RFValue } from 'react-native-responsive-fontsize'

interface props {
  sectionPadding?: number
  router: Router
  userData?: userDataFace | null

  type?: string
  label?: string
}

const HomeContent = React.memo(({ router, userData }: props) => {
  return (
    <>
      <TouchableOpacity
        onPress={() => router.push('/Profile')}
        style={{ position: 'absolute', left: rw(1), top: rh(0.2), zIndex: 10 }}>
        <Image
          style={{ width: rw(8), height: rh(6.4) }}
          contentFit="cover"
          source={require('../../assets/LogowithoutTXT.png')}
        />
      </TouchableOpacity>
      <View style={{ position: 'absolute', left: rw(10), top: rh(1), zIndex: 10 }}>
        <Text
          style={{
            color: '#F1FFF3',
            fontWeight: 'bold',
            fontSize: RFValue(14),
          }}>
          Hi
        </Text>
        <Text
          style={{
            color: '#F1FFF3',
            fontWeight: '300',
            fontSize: RFValue(12),
          }}>
          Welcome Back{' '}
          {userData?.name && userData.name.charAt(0).toUpperCase() + userData.name.slice(1)}
        </Text>
      </View>
    </>
  )
})

const ProfileContent = React.memo(({ router }: props) => {
  return (
    <>
      <TouchableOpacity
        onPress={() => router.back()}
        style={{ position: 'absolute', left: rw(3), top: 0, zIndex: 10 }}>
        <View style={{ marginTop: 8 }}>
          <Icon size={RFValue(28)} color="white" source="keyboard-backspace" />
        </View>
      </TouchableOpacity>
      <View style={{ position: 'absolute', left: rw(12), top: rh(1), zIndex: 10 }}>
        <Text
          style={{ color: '#F1FFF3', fontSize: RFValue(18), width: rw(100), fontWeight: 'bold' }}>
          Profile
        </Text>
      </View>
    </>
  )
})

const DashboardContent = React.memo(({ router, label }: props) => {
  const [visible, setVisible] = useState(false)
  const { userInfo, setIsCallSupspend } = useUserInfoContext()
  return (
    <>
      <TouchableOpacity
        onPress={() => router.back()}
        style={{ position: 'absolute', left: rw(3), top: 0, zIndex: 10 }}>
        <View style={{ marginTop: 8 }}>
          <Icon size={RFValue(28)} color="white" source="keyboard-backspace" />
        </View>
      </TouchableOpacity>
      <View style={{ position: 'absolute', left: rw(12), top: rh(1), zIndex: 10 }}>
        <Text style={{ color: '#F1FFF3', fontSize: RFValue(18), fontWeight: 'bold' }}>
          {label ?? 'Dashboard'}
        </Text>
      </View>
      {label === 'User information' && (
        <TouchableOpacity style={{ position: 'absolute', left: rw(88), top: rh(0.7), zIndex: 10 }}>
          <Menu
            visible={visible}
            onDismiss={() => setVisible(false)}
            style={{ marginTop: rh(4.3), width: rw(28) }}
            contentStyle={{ backgroundColor: 'white' }}
            anchor={
              <TouchableOpacity onPress={() => setVisible(true)}>
                <Icon color="white" size={RFValue(24)} source={'menu'} />
              </TouchableOpacity>
            }>
            <Menu.Item
              style={{ width: rw(12), height: rh(3) }}
              titleStyle={{ color: 'black', fontSize: RFValue(12) }}
              leadingIcon={() => (
                <Icon
                  source={userInfo?.status === 'active' ? 'block-helper' : 'shield-account-outline'}
                  size={RFValue(16)}
                  color="black"
                />
              )}
              onPress={() => {
                if (userInfo?.status === 'active') setIsCallSupspend(true)
                setVisible(false)
              }}
              title={userInfo?.status === 'active' ? 'block' : 'unblock'}
            />
          </Menu>
        </TouchableOpacity>
      )}
    </>
  )
})

const UploadContent = React.memo(({ router }: props) => {
  return (
    <>
      <TouchableOpacity
        onPress={() => router.back()}
        style={{ position: 'absolute', left: rw(3), top: 0, zIndex: 10 }}>
        <View style={{ marginTop: 8 }}>
          <Icon size={RFValue(28)} color="white" source="keyboard-backspace" />
        </View>
      </TouchableOpacity>
      <View style={{ position: 'absolute', left: rw(12), top: rh(1), zIndex: 10 }}>
        <Text
          style={{ color: '#F1FFF3', fontSize: RFValue(18), width: rw(100), fontWeight: 'bold' }}>
          Upload acknowledgments
        </Text>
      </View>
    </>
  )
})

function AppBar({ type, sectionPadding, router, userData, label }: props) {
  return (
    <View style={{ position: 'absolute', top: 0, left: 0, zIndex: 50, width: '100%' }}>
      <View
        style={{
          height: type === 'Home' ? rh(7) : rh(5),
          width: '100%',
          borderBottomLeftRadius: 30,
          borderBottomRightRadius: 30,
          backgroundColor: 'black',
          opacity: 0.4,
        }}
      />
      {type === 'Home' && <HomeContent router={router} userData={userData} />}
      {type === 'Profile' && <ProfileContent router={router} />}
      {type === 'Dashboard' && <DashboardContent router={router} label={label} />}
      {type === 'Upload' && <UploadContent router={router} />}
      {type === 'Home' && (
        <View style={{ marginTop: rh(0.2), gap: 8, padding: sectionPadding }}>
          <Text style={{ color: '#EEEEEE', fontSize: RFValue(20), fontWeight: 'bold' }}>
            Made for You
          </Text>
          <Text style={{ color: '#EEEEEE', fontSize: RFValue(14), fontWeight: '300' }}>
            Get Things Done Efficiently and Accurately
          </Text>
        </View>
      )}
    </View>
  )
}

export default memo(AppBar)
