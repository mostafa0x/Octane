import { View, Text, TouchableOpacity } from 'react-native'
import React, { memo, useEffect, useRef, useState } from 'react'
import { Image } from 'expo-image'
import { Router, useLocalSearchParams } from 'expo-router'
import { userDataFace } from 'Types/Store/UserSliceFace'
import { Divider, Icon, Menu } from 'react-native-paper'
import { useUserInfoContext } from 'Providers/UserInfo'
import { responsiveHeight as rh, responsiveWidth as rw } from 'react-native-responsive-dimensions'
import { RFValue } from 'react-native-responsive-fontsize'
import axiosClient from 'lib/api/axiosClient'
import * as FileSystem from 'expo-file-system'
import * as Sharing from 'expo-sharing'
import { Buffer } from 'buffer'

interface props {
  sectionPadding?: number
  router: Router
  userData?: userDataFace | null
  userID?: number
  type?: string
  label?: string
}

const HomeContent = React.memo(({ router, userData }: props) => {
  return (
    <>
      <TouchableOpacity
        onPress={() => router.push('/Profile')}
        style={{ position: 'absolute', left: rw(3), top: rh(0.2), zIndex: 10 }}>
        <Image
          style={{ width: rw(8), height: rh(6.4) }}
          contentFit="cover"
          source={require('../../assets/LogowithoutTXT.png')}
        />
      </TouchableOpacity>
      <View style={{ position: 'absolute', left: rw(13), top: rh(1), zIndex: 10 }}>
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
        style={{ position: 'absolute', left: rw(3), top: rh(1), zIndex: 10 }}>
        <View style={{ marginTop: 8 }}>
          <Icon size={RFValue(28)} color="white" source="keyboard-backspace" />
        </View>
      </TouchableOpacity>
      <View style={{ position: 'absolute', left: rw(13), top: rh(2), zIndex: 10 }}>
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
  const { userInfo, setIsCallSupspend, userId, userRole, isLoadingApi, setIsLoadingApi } =
    useUserInfoContext()

  const downloadExcelFile = async () => {
    if (!userId) return alert('User ID is not available.')
    if (isLoadingApi) return alert('Please wait, another operation is in progress.')
    setIsLoadingApi(true)

    try {
      const downloadUrl = `/admin/report/export/user/${userId}`

      const response = await axiosClient.get(downloadUrl, {
        responseType: 'arraybuffer',
      })
      const fileUri = `${FileSystem.documentDirectory}user_${userId}_report.xlsx`

      await FileSystem.writeAsStringAsync(fileUri, Buffer.from(response.data).toString('base64'), {
        encoding: FileSystem.EncodingType.Base64,
      })

      if (await Sharing.isAvailableAsync()) {
        await Sharing.shareAsync(fileUri)
      } else {
        alert('The file has been saved, but it cannot be shared on this device.')
      }
    } catch (error) {
      console.log(error)

      alert('Failed to download the report. Please try again.')
    } finally {
      setIsLoadingApi(false)
    }
  }
  return (
    <>
      <TouchableOpacity
        onPress={() => router.back()}
        style={{ position: 'absolute', left: rw(3), top: rh(1), zIndex: 10 }}>
        <View style={{ marginTop: 8 }}>
          <Icon size={RFValue(28)} color="white" source="keyboard-backspace" />
        </View>
      </TouchableOpacity>
      <View style={{ position: 'absolute', left: rw(13), top: rh(2), zIndex: 10 }}>
        <Text style={{ color: '#F1FFF3', fontSize: RFValue(18), fontWeight: 'bold' }}>
          {label ?? 'Dashboard'}
        </Text>
      </View>
      {label === 'User information' && (
        <TouchableOpacity style={{ position: 'absolute', left: rw(88), top: rh(2), zIndex: 10 }}>
          <Menu
            visible={visible}
            onDismiss={() => setVisible(false)}
            style={{ marginTop: rh(4.3), width: rw(28) }}
            contentStyle={{ backgroundColor: 'white', gap: 5 }}
            anchor={
              <TouchableOpacity onPress={() => setVisible(true)}>
                <Icon color="white" size={RFValue(24)} source={'menu'} />
              </TouchableOpacity>
            }>
            {userRole === 'user' && (
              <Menu.Item
                style={{ width: rw(12), height: rh(5) }}
                titleStyle={{ color: 'black', fontSize: RFValue(12) }}
                leadingIcon={() => (
                  <Icon
                    source={
                      userInfo?.status === 'active' ? 'block-helper' : 'shield-account-outline'
                    }
                    size={RFValue(16)}
                    color="black"
                  />
                )}
                onPress={() => {
                  setIsCallSupspend(true)
                  setVisible(false)
                }}
                title={userInfo?.status === 'active' ? 'Suspend' : 'Active'}
              />
            )}
            {userRole === 'user' && <Divider />}
            <Menu.Item
              style={{ width: rw(12), height: rh(5) }}
              titleStyle={{ color: 'black', fontSize: RFValue(12) }}
              leadingIcon={() => <Icon source={'download'} size={RFValue(16)} color="black" />}
              onPress={() => {
                downloadExcelFile()
              }}
              title={'Export'}
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
        style={{ position: 'absolute', left: rw(3), top: rh(1), zIndex: 10 }}>
        <View style={{ marginTop: 8 }}>
          <Icon size={RFValue(28)} color="white" source="keyboard-backspace" />
        </View>
      </TouchableOpacity>
      <View style={{ position: 'absolute', left: rw(12), top: rh(2), zIndex: 10 }}>
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
          height: rh(7),
          width: '100%',
          borderBottomLeftRadius: 30,
          borderBottomRightRadius: 30,
          backgroundColor: 'black',
          opacity: 0.3,
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
      {label === 'Upload Companys' && (
        <View style={{ marginTop: rh(5), marginLeft: rw(5), gap: 8, padding: sectionPadding }}>
          <Text style={{ color: '#EEEEEE', fontSize: RFValue(20), fontWeight: 'bold' }}>
            Upload company sheet
          </Text>
          <Text style={{ color: '#EEEEEE', fontSize: RFValue(14), fontWeight: '300' }}>
            We handle the rest
          </Text>
        </View>
      )}
    </View>
  )
}

export default memo(AppBar)
