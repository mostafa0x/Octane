import { Stack } from 'expo-router'
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context'
import { PaperProvider } from 'react-native-paper'
import '../global.css'
import { Provider } from 'react-redux'
import { Store } from 'lib/Store'
import Providers from 'Providers/Providers'

export default function RootLayout() {
  return (
    <Provider store={Store}>
      <PaperProvider>
        <SafeAreaProvider>
          <Providers>
            <Stack screenOptions={{ headerShown: false, animation: 'fade' }} />
          </Providers>
        </SafeAreaProvider>
      </PaperProvider>
    </Provider>
  )
}
