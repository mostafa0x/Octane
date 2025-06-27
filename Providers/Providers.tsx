import React, { useEffect } from 'react'
import ProtectRoutingProvider from './ProtectRouting'
import { SafeAreaView } from 'react-native-safe-area-context'
import TanStackReactQuerryProvider from './TanStackReactQuerry'

const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <TanStackReactQuerryProvider>
      <ProtectRoutingProvider>
        <SafeAreaView style={{ flex: 1 }}>{children}</SafeAreaView>
      </ProtectRoutingProvider>
    </TanStackReactQuerryProvider>
  )
}

export default React.memo(Providers)
