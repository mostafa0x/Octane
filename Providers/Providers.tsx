import { View, Text } from 'react-native'
import React from 'react'
import ProtectRoutingProvider from './ProtectRouting'

export default function Providers({ children }: { children: React.ReactNode }) {
  return <ProtectRoutingProvider>{children}</ProtectRoutingProvider>
}
