import { View, Text, TouchableOpacity, useWindowDimensions, ScrollView } from 'react-native'
import { ActivityIndicator, Avatar, HelperText, Icon } from 'react-native-paper'
import * as Animatable from 'react-native-animatable'
import { Image } from 'expo-image'
import { Href, Route, RouteInputParams, usePathname, useRouter } from 'expo-router'
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
import axiosClient from 'lib/api/axiosClient'
import { GetUsers } from 'lib/Store/Slices/DashboardSlice'
import FooterDashboard from 'components/FooterDashboard'
import { NavigationOptions } from 'expo-router/build/global-state/routing'
const avatarIcon = require('../../assets/avatar.png')
const backImg = require('../../assets/backn.png')

export default function Dashboard() {
  const { width, height } = useWindowDimensions()
  const { userData } = useSelector((state: StateFace) => state.UserReducer)
  const { users } = useSelector((state: StateFace) => state.DashboardReducer)
  const pathName = usePathname()
  const router = useRouter()
  const dispatch = useDispatch()
  const [isLoadingPage, setIsLoadingPage] = useState(true)

  useEffect(() => {
    async function handleGetUsers() {
      try {
        const res = await axiosClient.get('/admin/users/')
        const data = res.data.users
        dispatch(GetUsers(data))
        setIsLoadingPage(false)
      } catch (err: any) {
        console.log(err)

        throw err
      }
    }
    handleGetUsers()

    return () => {}
  }, [])

  return (
    <Animatable.View animation="fadeIn" duration={100} style={{ flex: 1 }}>
      <View style={{ position: 'absolute', top: height * 0.2, width: '100%' }}>
        <Image
          style={{ width: '100%', height: height * 0.25 }}
          contentFit="fill"
          source={backImg}
        />
      </View>

      <View style={{ width: '100%', height: height * 0.2, zIndex: -1 }}>
        <Image source={backImg} contentFit="fill" style={{ width: '100%', height: '100%' }} />
      </View>
      <View
        style={{
          flex: 1,
          borderTopLeftRadius: 100,
          borderTopRightRadius: 100,
          backgroundColor: 'white',
          paddingTop: height * 0.05,
        }}>
        <ScrollView
          contentContainerStyle={{
            flexGrow: 1,
            paddingHorizontal: 24,
            paddingBottom: 100,
          }}>
          {isLoadingPage ? (
            <ActivityIndicator size={80} />
          ) : (
            <View
              style={{
                flexDirection: 'row',
                flexWrap: 'wrap',
                justifyContent: users.length > 1 ? 'space-between' : 'flex-start',
                gap: 23,
                paddingHorizontal: 10,
              }}>
              {users.map((user, index) =>
                user.id == userData?.id ? null : (
                  <TouchableOpacity
                    onPress={() =>
                      router.push({
                        pathname: `/Dashboard/UserInfo/${user.id}`,
                        params: { userName: user.name, userImage: user.image },
                      })
                    }
                    key={index}
                    style={{
                      width: width * 0.25,
                      marginBottom: 20,
                      alignItems: 'center',
                    }}>
                    <Image
                      style={{
                        borderWidth: 0.5,
                        backgroundColor: '#8d1c47',
                        borderRadius: 20,
                        width: '100%',
                        height: height * 0.11,
                        aspectRatio: 1,
                        alignItems: 'center',
                        justifyContent: 'space-around',
                      }}
                      contentFit="cover"
                      source={user?.image ? { uri: user.image } : avatarIcon}
                    />
                    <Text
                      style={{
                        fontSize: width * 0.038,
                        color: 'black',
                        textAlign: 'center',
                        marginTop: height * 0.008,
                        width: '100%',
                      }}>
                      {user.name}
                    </Text>
                  </TouchableOpacity>
                )
              )}
            </View>
          )}
        </ScrollView>
      </View>
    </Animatable.View>
  )
}
