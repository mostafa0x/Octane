import { I18nManager } from 'react-native'
if (I18nManager.isRTL) {
  I18nManager.allowRTL(false)
  I18nManager.forceRTL(false)
}
import { Stack } from 'expo-router'
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context'
import { PaperProvider } from 'react-native-paper'
import '../global.css'
import { Provider } from 'react-redux'
import { Store } from 'lib/Store'
import Providers from 'Providers/Providers'
import { ThemeProvider, useThemeContext } from 'Providers/ThemeContext'
import 'react-native-gesture-handler'

function AppWithTheme() {
  const { paperTheme } = useThemeContext()

  return (
    <PaperProvider theme={paperTheme}>
      <SafeAreaProvider>
        <Providers>
          <Stack screenOptions={{ headerShown: false, animation: 'fade' }} />
        </Providers>
      </SafeAreaProvider>
    </PaperProvider>
  )
}

export default function RootLayout() {
  return (
    <Provider store={Store}>
      <ThemeProvider>
        <AppWithTheme />
      </ThemeProvider>
    </Provider>
  )
}
