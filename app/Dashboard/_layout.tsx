import { View, Text, useWindowDimensions } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Stack, usePathname, useRouter } from 'expo-router'
import AppBar from 'components/App Bar'
import FooterDashboard from 'components/FooterDashboard'

export default function LayoutDashboard() {
  const { width, height } = useWindowDimensions()
  const router = useRouter()
  const pathName = usePathname()
  const [label, setLabel] = useState('Dashboard')

  useEffect(() => {
    if (pathName == '/Dashboard') {
      setLabel('Dashboard')
    } else if (pathName === '/Dashboard/UploadCompanys') {
      setLabel('Upload Companys')
    } else if (pathName === '/Dashboard/Reports') {
      setLabel('Reports')
    } else if (pathName.startsWith('/Dashboard/UserInfo/')) {
      setLabel('User information')
    }

    return () => {}
  }, [pathName])

  return (
    <View style={{ flex: 1, backgroundColor: 'white' }}>
      <AppBar type="Dashboard" label={label} router={router} width={width} height={height} />

      <Stack screenOptions={{ headerShown: false, animation: 'fade' }} />
      <FooterDashboard pathName={pathName} height={height} router={router} />
    </View>
  )
}
