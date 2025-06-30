import React, { useEffect } from 'react'
import ProtectRoutingProvider from './ProtectRouting'
import { SafeAreaView } from 'react-native-safe-area-context'
import TanStackReactQuerryProvider from './TanStackReactQuerry'
import UserInfoProvider from './UserInfo'

const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <TanStackReactQuerryProvider>
      <ProtectRoutingProvider>
        <UserInfoProvider>
          <SafeAreaView style={{ flex: 1 }}>{children}</SafeAreaView>
        </UserInfoProvider>
      </ProtectRoutingProvider>
    </TanStackReactQuerryProvider>
  )
}

export default React.memo(Providers)
