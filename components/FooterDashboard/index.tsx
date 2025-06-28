import { View, Text, TouchableOpacity } from 'react-native'
import React, { memo } from 'react'
import { Icon } from 'react-native-paper'
import { Router } from 'expo-router'

interface props {
  pathName: string
  height: number
  router: Router
}
function FooterDashboard({ pathName, height, router }: props) {
  return (
    <View
      style={{
        marginTop: height * 0.002,
        height: height * 0.08,
        backgroundColor: '#c47b9f',
        borderTopRightRadius: 50,
        borderTopLeftRadius: 50,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        gap: 60,
      }}>
      <TouchableOpacity
        style={
          pathName == '/Dashboard' && {
            borderRadius: 25,
            padding: 5,
            backgroundColor: '#11962e',
          }
        }
        onPress={() => pathName !== '/Dashboard' && router.push('/Dashboard')}>
        <Icon size={50} source={'home'} />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => pathName !== '/Dashboard/Reports' && router.push('/Dashboard/Reports')}
        style={
          pathName == '/Dashboard/Reports' && {
            borderRadius: 25,
            padding: 5,
            backgroundColor: '#11962e',
          }
        }>
        <Icon size={50} source={'tab-search'} />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() =>
          pathName !== '/Dashboard/UploadCompanys' && router.push('/Dashboard/UploadCompanys')
        }
        style={
          pathName == '/Dashboard/UploadCompanys' && {
            borderRadius: 25,
            padding: 5,
            backgroundColor: '#11962e',
          }
        }>
        <Icon size={50} source={'developer-board'} />
      </TouchableOpacity>
    </View>
  )
}

export default memo(FooterDashboard)
