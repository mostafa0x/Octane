import { View, Text } from 'react-native'
import { Stack } from 'expo-router'
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context'
import { PaperProvider } from 'react-native-paper'
import '../global.css'
import { Provider } from 'react-redux'
import { Store } from 'lib/Store'
import ProtectRoutingProvider from 'Providers/ProtectRouting'
import Providers from 'Providers/Providers'
export default function RootLayout() {
  return (
    <Provider store={Store}>
      <PaperProvider>
        <SafeAreaProvider>
          <Providers>
            <SafeAreaView style={{ flex: 1 }}>
              <Stack screenOptions={{ headerShown: false, animation: 'fade' }} />
            </SafeAreaView>
          </Providers>
        </SafeAreaProvider>
      </PaperProvider>
    </Provider>
  )
}
