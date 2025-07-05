import { View, Text, TouchableOpacity } from 'react-native'
import React, { memo } from 'react'
import { Icon } from 'react-native-paper'
import { Router } from 'expo-router'
import { useThemeContext } from 'Providers/ThemeContext'

interface props {
  pathName: string
  height: number
  router: Router
}
function FooterDashboard({ pathName, height, router }: props) {
  const { themeMode } = useThemeContext()

  return (
    <View
      style={{
        marginTop: height * 0.002,
        height: height * 0.08,
        backgroundColor: themeMode == 'dark' ? '#ffffff' : '#ffffff',
        borderTopRightRadius: 50,
        borderTopLeftRadius: 50,
        justifyContent: 'space-evenly',
        alignItems: 'center',
        flexDirection: 'row',
        borderTopWidth: 3.5,
        borderColor: 'gray',
        gap: 20,
      }}>
      <TouchableOpacity
        style={
          pathName == '/Dashboard' && {
            borderRadius: 25,
            padding: 5,
            backgroundColor: themeMode == 'dark' ? 'black' : '#000000',
          }
        }
        onPress={() => pathName !== '/Dashboard' && router.replace('/Dashboard')}>
        <Icon
          size={50}
          color={pathName == '/Dashboard' ? 'white' : 'black'}
          source={'account-outline'}
        />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => pathName !== '/Dashboard/Reports' && router.replace('/Dashboard/Reports')}
        style={
          pathName == '/Dashboard/Reports' && {
            borderRadius: 25,
            padding: 5,
            backgroundColor: themeMode == 'dark' ? 'black' : '#000000',
          }
        }>
        <Icon
          size={50}
          color={pathName == '/Dashboard/Reports' ? 'white' : 'black'}
          source={'file-find-outline'}
        />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() =>
          pathName !== '/Dashboard/UploadCompanys' && router.replace('/Dashboard/UploadCompanys')
        }
        style={
          pathName == '/Dashboard/UploadCompanys' && {
            borderRadius: 25,
            padding: 5,
            backgroundColor: themeMode == 'dark' ? 'black' : '#000000',
          }
        }>
        <Icon
          size={50}
          color={pathName == '/Dashboard/UploadCompanys' ? 'white' : 'black'}
          source={'file-upload-outline'}
        />
      </TouchableOpacity>
    </View>
  )
}

export default memo(FooterDashboard)
