import { View, Text, TouchableOpacity } from 'react-native'
import React, { memo } from 'react'
import { Image } from 'expo-image'
import { Router } from 'expo-router'
import { userDataFace } from 'Types/Store/UserSliceFace'

interface props {
  sectionPadding: number
  router: Router
  userData?: userDataFace | null
  width: number
}
function AppBar({ sectionPadding, router, userData, width }: props) {
  return (
    <View style={{ position: 'absolute', top: 0, left: 0, zIndex: 50, width: '100%' }}>
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
      <View style={{ marginTop: 40, gap: 8, padding: sectionPadding }}>
        <Text style={{ color: '#EEEEEE', fontSize: 26, fontWeight: 'bold' }}>Made for You</Text>
        <Text style={{ color: '#EEEEEE', fontSize: 18 }}>
          Get Things Done Efficiently and Accurately
        </Text>
      </View>
    </View>
  )
}

export default memo(AppBar)
