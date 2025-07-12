import { View, Text, TouchableOpacity } from 'react-native'
import React, { memo, useState } from 'react'
import {
  responsiveHeight as rh,
  responsiveWidth as rw,
  responsiveFontSize as rf,
} from 'react-native-responsive-dimensions'
import { Image } from 'expo-image'
import { Router } from 'expo-router'
import { userDataFace } from 'Types/Store/UserSliceFace'
import { UsersFace } from 'Types/Store/DashboardSliceFace'
import { ActivityIndicator } from 'react-native-paper'
const avatarIcon = require('../../assets/avatar.png')

interface props {
  setUserRole: any
  setUserId: any
  user: UsersFace
  router: Router
  userData: userDataFace | null
  index: number
}

function UsersList({ setUserRole, setUserId, user, router, userData, index }: props) {
  const [loading, setLoading] = useState(true)

  return (
    <TouchableOpacity
      onPress={() => {
        setUserRole(user.role)
        setUserId(user.id)
        router.push({
          pathname: `/Dashboard/UserInfo/${user.id}`,
          params: { userName: user.name, userImage: user.image },
        })
      }}
      key={index}
      style={{
        width: rw(30), // ✅ 3 عناصر في كل صف
        alignItems: 'center',
        marginBottom: rh(3),
      }}>
      <Image
        style={{
          borderWidth: 0.5,
          backgroundColor: '#8d1c47',
          borderRadius: 20,
          width: rw(25),
          height: rw(25),
        }}
        contentFit="cover"
        onLoadStart={() => loading && setLoading(true)}
        onLoadEnd={() => setLoading(false)}
        source={loading ? avatarIcon : user?.image ? { uri: user.image } : avatarIcon}
      />
      <Text
        style={{
          fontSize: rf(1.8),
          color: 'black',
          textAlign: 'center',
          marginTop: rh(1),
          width: '100%',
        }}>
        {user.name}
        {user.id === userData?.id ? ' (You)' : ''}
      </Text>
    </TouchableOpacity>
  )
}

export default memo(UsersList)
