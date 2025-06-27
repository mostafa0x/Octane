import { View, Text, useWindowDimensions } from 'react-native'
import React from 'react'
import { Stack, useRouter } from 'expo-router'
import AppBar from 'components/App Bar'

export default function LayoutDashboard() {
  const { width, height } = useWindowDimensions()
  const router = useRouter()
  return (
    <View style={{ flex: 1, height: 10 }}>
      <AppBar type="Dashboard" label={'Dashboard'} router={router} width={width} />

      <Stack screenOptions={{ headerShown: false, animation: 'fade' }} />
    </View>
  )
}
