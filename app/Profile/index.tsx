import { View, TouchableOpacity, ScrollView, Linking } from 'react-native'
import {
  ActivityIndicator,
  Avatar,
  HelperText,
  Icon,
  Portal,
  Snackbar,
  Text,
} from 'react-native-paper'
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
import { UpdataUserInfo } from 'Services/Storage'
import { responsiveHeight as rh, responsiveWidth as rw } from 'react-native-responsive-dimensions'
import { RFValue } from 'react-native-responsive-fontsize'
import FontAwesome from '@expo/vector-icons/FontAwesome'
import SpinnerLoading from 'components/SpinnerLoading'

const avatarIcon = require('../../assets/avatar.png')
const backImg = require('../../assets/backn.png')

export default function Profile() {
  const { userData, userToken } = useSelector((state: StateFace) => state.UserReducer)
  const router = useRouter()
  const dispatch = useDispatch()
  const [showImageOptions, setShowImageOptions] = useState(false)
  const [isLoadingRes, setIsLoadingRes] = useState(false)
  const [errorRes, setErrorRes] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)
  const [isMessageBar, setIsMessageBar] = useState<string | null>(null)

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
      setIsMessageBar('The picture has been changed')
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

  return userToken ? (
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
          {loading && (
            <View style={{ position: 'absolute', zIndex: 1, top: rh(6), left: rw(12) }}>
              <ActivityIndicator size={80} color="#0077ff" />
            </View>
          )}
          <Avatar.Image
            style={{ backgroundColor: 'black' }}
            source={loading ? null : userData?.image ? { uri: userData?.image } : avatarIcon}
            size={avatarSize}
            onLoadStart={() => loading && setLoading(true)}
            onLoadEnd={() => setLoading(false)}
          />
        </TouchableOpacity>
      </View>

      <ScrollView
        contentContainerStyle={{ flexGrow: 1, paddingHorizontal: rw(6), paddingBottom: rh(12) }}
        style={{
          flex: 1,
          borderTopLeftRadius: rw(10),
          borderTopRightRadius: rw(10),
          backgroundColor: 'white',
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
                backgroundColor: '#000000',
              }}>
              <Icon size={RFValue(25)} color="white" source="email-outline" />
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
                backgroundColor: '#000000',
              }}>
              {isLoadingRes ? (
                <ActivityIndicator size={30} />
              ) : (
                <Icon size={RFValue(25)} color="white" source="image-edit-outline" />
              )}
            </View>
            <View style={{ flexDirection: 'row' }}>
              <Text style={{ fontSize: RFValue(14), width: rw(40), fontWeight: 'regular' }}>
                Change Picture
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
                  backgroundColor: '#000000',
                }}>
                <Icon size={RFValue(25)} color="white" source="monitor-dashboard" />
              </View>
              <Text style={{ fontSize: RFValue(14), width: '100%', fontWeight: 'regular' }}>
                Dashboard
              </Text>
            </TouchableOpacity>
          )}
          <TouchableOpacity
            onPress={() => Linking.openURL('https://wa.me/201157231451')}
            style={{ flexDirection: 'row', alignItems: 'center', gap: 16 }}>
            <View
              style={{
                height: rh(7),
                width: rh(7),
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: rw(5),
                backgroundColor: '#000000',
              }}>
              <FontAwesome name="whatsapp" size={RFValue(35)} color="white" />
            </View>
            <Text style={{ fontSize: RFValue(14), width: '100%', fontWeight: 'regular' }}>
              Contact us
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={callLogOut}
            style={{ flexDirection: 'row', alignItems: 'center', gap: 16, marginBottom: 30 }}>
            <View
              style={{
                height: rh(7),
                width: rh(7),
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: rw(5),
                backgroundColor: '#000000',
              }}>
              <Icon size={RFValue(30)} color="white" source="logout" />
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
      <Portal>
        <Snackbar
          visible={!!isMessageBar}
          onDismiss={() => setIsMessageBar(null)}
          action={{ label: 'done', onPress: () => setIsMessageBar(null) }}>
          <Text style={{ color: 'white' }}>{isMessageBar}</Text>
        </Snackbar>
      </Portal>
    </Animatable.View>
  ) : (
    <SpinnerLoading />
  )
}
