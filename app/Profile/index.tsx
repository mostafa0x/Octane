import { View, TouchableOpacity, ScrollView } from 'react-native'
import { ActivityIndicator, Avatar, Button, HelperText, Icon, Text } from 'react-native-paper'
import * as Animatable from 'react-native-animatable'
import { Image } from 'expo-image'
import { useRouter } from 'expo-router'
import { useDispatch, useSelector } from 'react-redux'
import { StateFace } from 'Types/Store/StateFace'
import handleLoutOut from 'Services/handleLogOut'
import AppBar from 'components/App Bar'
import { useEffect, useState } from 'react'
import ShowImageOptions from 'components/Models/showImageOptions'
import { useFormik } from 'formik'
import UploadAvatar from 'Services/UploadAvatar'
import { changeImageProfile } from 'lib/Store/Slices/UserSlice'
import { storeUserInfo, UpdataUserInfo } from 'Services/Storage'
import { responsiveHeight as rh, responsiveWidth as rw } from 'react-native-responsive-dimensions'
import { RFValue } from 'react-native-responsive-fontsize'
import { useThemeContext } from 'Providers/ThemeContext'

const avatarIcon = require('../../assets/avatar.png')
const backImg = require('../../assets/backn.png')

export default function Profile() {
  const { userData } = useSelector((state: StateFace) => state.UserReducer)
  const router = useRouter()
  const dispatch = useDispatch()
  const [showImageOptions, setShowImageOptions] = useState(false)
  const [isLoadingRes, setIsLoadingRes] = useState(false)
  const [errorRes, setErrorRes] = useState<string | null>(null)
  const { toggleTheme, themeMode } = useThemeContext()

  async function handleChangeAvatar(formValues: any) {
    if (isLoadingRes) return
    setIsLoadingRes(true)
    setErrorRes(null)
    try {
      const formData = new FormData()
      if (formValues.image) {
        const fileName = formValues.image.split('/').pop()
        const fileType = fileName?.split('.').pop()

        formData.append('image', {
          uri: formValues.image,
          name: fileName || `photo.${fileType}`,
          type: `image/${fileType}`,
        } as any)
      }

      if (userData) {
        const data = await UploadAvatar(formData)
        formik.values.image = ''
        dispatch(changeImageProfile(data.image))
        await UpdataUserInfo(userData, data.image)
      }
    } catch (err: any) {
      console.log(err)
      setErrorRes(err.response?.data?.message ?? 'Error Upload Image !')
      if (err.status == 403) {
        handleLoutOut(dispatch, router)
      }
      throw err
    } finally {
      setIsLoadingRes(false)
    }
  }

  const formik = useFormik({
    initialValues: { image: '' },
    onSubmit: handleChangeAvatar,
  })

  async function callLogOut() {
    await handleLoutOut(dispatch, router)
  }

  useEffect(() => {
    if (isLoadingRes) return
    if (formik.values.image !== '' && !isLoadingRes) {
      formik.handleSubmit()
    }
    return () => {}
  }, [formik.values])

  const avatarSize = rw(40)

  return (
    <Animatable.View animation="fadeIn" duration={200} easing="ease-in-out" style={{ flex: 1 }}>
      <AppBar type="Profile" router={router} userData={userData} />

      <View style={{ position: 'absolute', top: rh(20), width: '100%' }}>
        <Image style={{ width: '100%', height: rh(25) }} contentFit="fill" source={backImg} />
      </View>

      <View style={{ width: '100%', height: rh(20) }}>
        <Image source={backImg} contentFit="fill" style={{ width: '100%', height: '100%' }} />
      </View>

      <View style={{ position: 'absolute', top: rh(9), left: rw(30), zIndex: 10 }}>
        <TouchableOpacity onPress={() => setShowImageOptions(true)} activeOpacity={0.8}>
          <Avatar.Image
            source={userData?.image ? { uri: userData?.image } : avatarIcon}
            size={avatarSize}
          />
        </TouchableOpacity>
      </View>

      <ScrollView
        contentContainerStyle={{ flexGrow: 1, paddingHorizontal: rw(6), paddingBottom: rh(12) }}
        style={{
          flex: 1,
          borderTopLeftRadius: rw(25),
          borderTopRightRadius: rw(25),
          backgroundColor: themeMode === 'light' ? 'white' : '#080101',
          paddingTop: rh(10),
        }}>
        <View style={{ alignItems: 'center', marginBottom: rh(10) }}>
          <Text
            style={{
              fontSize: RFValue(22),
              fontWeight: 'bold',
              width: '100%',
              textAlign: 'center',
            }}>
            {userData?.name}
          </Text>
        </View>

        <View style={{ gap: rh(3) }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 16 }}>
            <View
              style={{
                height: rh(7),
                width: rh(7),
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: rw(5),
                backgroundColor: '#6DB6FE',
              }}>
              <Icon size={RFValue(30)} source="email-outline" />
            </View>
            <Text style={{ fontSize: RFValue(14), width: '100%', fontWeight: 'regular' }}>
              {userData?.email ?? 'loading email...'}
            </Text>
          </View>

          <TouchableOpacity
            onPress={() => setShowImageOptions(true)}
            style={{ flexDirection: 'row', alignItems: 'center', gap: 16 }}>
            <View
              style={{
                height: rh(7),
                width: rh(7),
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: rw(5),
                backgroundColor: '#6DB6FE',
              }}>
              {isLoadingRes ? (
                <ActivityIndicator size={30} />
              ) : (
                <Icon size={RFValue(30)} source="image-edit-outline" />
              )}
            </View>
            <View style={{ flexDirection: 'row' }}>
              <Text style={{ fontSize: RFValue(14), width: rw(40), fontWeight: 'regular' }}>
                Change Avatar
              </Text>
              <HelperText
                type="error"
                visible={!!errorRes}
                style={{ textAlign: 'right', writingDirection: 'rtl', width: rw(40) }}>
                {errorRes}
              </HelperText>
            </View>
          </TouchableOpacity>

          {userData?.role == 'admin' && (
            <TouchableOpacity
              onPress={() => router.push('/Dashboard')}
              style={{ flexDirection: 'row', alignItems: 'center', gap: 16 }}>
              <View
                style={{
                  height: rh(7),
                  width: rh(7),
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderRadius: rw(5),
                  backgroundColor: '#6DB6FE',
                }}>
                <Icon size={RFValue(30)} source="monitor-dashboard" />
              </View>
              <Text style={{ fontSize: RFValue(14), width: '100%', fontWeight: 'regular' }}>
                Dashboard
              </Text>
            </TouchableOpacity>
          )}

          <TouchableOpacity
            onPress={toggleTheme}
            style={{ flexDirection: 'row', alignItems: 'center', gap: 16 }}>
            <View
              style={{
                height: rh(7),
                width: rh(7),
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: rw(5),
                backgroundColor: '#eb9053',
              }}>
              <Icon size={RFValue(30)} source="theme-light-dark" />
            </View>
            <Text style={{ fontSize: RFValue(14), width: '100%', fontWeight: 'regular' }}>
              {themeMode == 'dark' ? 'Dark Mode' : 'lite Mode'}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={callLogOut}
            style={{ flexDirection: 'row', alignItems: 'center', gap: 16 }}>
            <View
              style={{
                height: rh(7),
                width: rh(7),
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: rw(5),
                backgroundColor: '#eb9053',
              }}>
              <Icon size={RFValue(30)} source="logout" />
            </View>
            <Text style={{ fontSize: RFValue(14), width: '100%', fontWeight: 'regular' }}>
              Log Out
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      <ShowImageOptions
        formik={formik}
        showImageOptions={showImageOptions}
        setShowImageOptions={setShowImageOptions}
      />
    </Animatable.View>
  )
}
