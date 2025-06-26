import { View, Text, TouchableOpacity, useWindowDimensions, ScrollView } from 'react-native'
import { ActivityIndicator, Avatar, Icon } from 'react-native-paper'
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
const avatarIcon = require('../../assets/avatar.png')
const backImg = require('../../assets/backn.png')

export default function Profile() {
  const { width, height } = useWindowDimensions()
  const { userData } = useSelector((state: StateFace) => state.UserReducer)
  const router = useRouter()
  const dispatch = useDispatch()
  const [showImageOptions, setShowImageOptions] = useState(false)
  const [isLoadingRes, setIsLoadingRes] = useState(false)
  const [errorRes, setErrorRes] = useState<string | null>(null)
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
        dispatch(changeImageProfile(data.image))
        await UpdataUserInfo(userData, data.image)
      }
    } catch (err: any) {
      console.log(err)
      setErrorRes(err.response?.data?.message ?? 'Error Upload Image !')
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
              userData?.image
                ? {
                    uri: userData?.image,
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
            onPress={() => setShowImageOptions(true)}
            style={{ flexDirection: 'row', alignItems: 'center', gap: 16 }}>
            <View
              style={{
                height: 60,
                width: 60,
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 22,
                backgroundColor: '#6DB6FE',
              }}>
              {isLoadingRes ? (
                <ActivityIndicator size={30} />
              ) : (
                <Icon size={40} source="image-edit-outline" />
              )}
            </View>
            <Text style={{ fontSize: 16, width: width }}>Change Avatar</Text>
          </TouchableOpacity>
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
      <ShowImageOptions
        formik={formik}
        showImageOptions={showImageOptions}
        setShowImageOptions={setShowImageOptions}
      />
    </Animatable.View>
  )
}
