import React, { createContext, useContext, useEffect, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { MD3DarkTheme, MD3LightTheme } from 'react-native-paper'

type ThemeType = 'light' | 'dark'

const ThemeContext = createContext<{
  themeMode: ThemeType
  toggleTheme: () => void
  paperTheme: any
}>({
  themeMode: 'light',
  toggleTheme: () => {},
  paperTheme: MD3LightTheme,
})

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [themeMode, setThemeMode] = useState<ThemeType>('light')
  useEffect(() => {
    const loadTheme = async () => {
      const storedTheme = await AsyncStorage.getItem('app_theme')
      if (storedTheme === 'dark' || storedTheme === 'light') {
        storedTheme === 'dark' && (await AsyncStorage.setItem('app_theme', 'light'))
        setThemeMode('light')
      }
    }
    loadTheme()
  }, [])

  const toggleTheme = async () => {
    const newTheme = themeMode === 'dark' ? 'light' : 'dark'
    setThemeMode(newTheme)

    await AsyncStorage.setItem('app_theme', newTheme)
  }

  const paperTheme = themeMode === 'dark' ? MD3DarkTheme : MD3LightTheme

  return (
    <ThemeContext.Provider value={{ themeMode, toggleTheme, paperTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

export const useThemeContext = () => useContext(ThemeContext)
