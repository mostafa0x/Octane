import { View, Text } from 'react-native'
import React, { createContext } from 'react'

export const MenuContext = createContext(null)

export default function MenuProvider({ children }: { children: React.ReactNode }) {
  return <MenuContext.Provider value={{}}>{children}</MenuContext.Provider>
}
