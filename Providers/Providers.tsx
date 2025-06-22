import React, { useEffect } from 'react'
import ProtectRoutingProvider from './ProtectRouting'
import { SafeAreaView } from 'react-native-safe-area-context'

const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <ProtectRoutingProvider>
      <SafeAreaView style={{ flex: 1 }}>{children}</SafeAreaView>
    </ProtectRoutingProvider>
  )
}

export default React.memo(Providers)
