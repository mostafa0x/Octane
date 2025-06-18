import { View, Text } from 'react-native'
import { Stack } from 'expo-router'
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context'
import { PaperProvider } from 'react-native-paper'
import '../global.css'
import { Provider } from 'react-redux'
import { Store } from 'lib/Store'
export default function RootLayout() {
  return (
    <Provider store={Store}>
      <SafeAreaProvider>
        <PaperProvider>
          <SafeAreaView style={{ flex: 1 }}>
            <Stack screenOptions={{ headerShown: false }} />
          </SafeAreaView>
        </PaperProvider>
      </SafeAreaProvider>
    </Provider>
  )
}
