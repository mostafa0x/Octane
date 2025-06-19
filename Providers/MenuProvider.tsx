import {
  View,
  Text,
  Dimensions,
  Animated,
  TouchableOpacity,
  PanResponder,
  StyleSheet,
} from 'react-native'
import React, { createContext, useCallback, useContext, useRef, useState } from 'react'
import { Drawer } from 'react-native-paper'

export const MenuContext = createContext({
  openDrawer: () => {},
  closeDrawer: () => {},
})

const screenWidth = Dimensions.get('window').width
const drawerWidth = screenWidth * 0.65
export const useMenuContext = () => useContext(MenuContext)

export default function MenuProvider({ children }: { children: React.ReactNode }) {
  const translateX = useRef(new Animated.Value(-drawerWidth)).current
  const [active, setActive] = useState('home')
  const [isOpen, setIsOpen] = useState(false)

  const openDrawer = useCallback(() => {
    setIsOpen(true)
    Animated.timing(translateX, {
      toValue: 0,
      duration: 250,
      useNativeDriver: true,
    }).start()
  }, [translateX])

  const closeDrawer = useCallback(() => {
    Animated.timing(translateX, {
      toValue: -drawerWidth,
      duration: 250,
      useNativeDriver: true,
    }).start(() => setIsOpen(false))
  }, [drawerWidth, translateX])

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: (_, gestureState) => {
        return gestureState.dx > 15 && gestureState.moveX < 30
      },
      onPanResponderMove: (_, gestureState) => {
        if (gestureState.dx > 0 && gestureState.dx <= drawerWidth) {
          translateX.setValue(-drawerWidth + gestureState.dx)
        }
      },
      onPanResponderRelease: (_, gestureState) => {
        if (gestureState.dx > drawerWidth / 3) {
          openDrawer()
        } else {
          closeDrawer()
        }
      },
    })
  ).current

  return (
    <MenuContext.Provider value={{ openDrawer, closeDrawer }}>
      <View style={{ flex: 1 }} {...panResponder.panHandlers}>
        {children}

        {isOpen && <TouchableOpacity onPress={closeDrawer} style={StyleSheet.absoluteFillObject} />}

        <Animated.View
          style={[
            styles.drawer,
            {
              transform: [{ translateX }],
            },
          ]}>
          <View>
            <Drawer.Section title="User">
              <Drawer.Item
                label="Home"
                active={active === 'home'}
                onPress={() => {
                  setActive('home')
                  closeDrawer()
                }}
              />
              <Drawer.Item
                label="Log out"
                active={active === 'profile'}
                onPress={() => {
                  setActive('Log out')
                  closeDrawer()
                }}
              />
            </Drawer.Section>
          </View>
        </Animated.View>
      </View>
    </MenuContext.Provider>
  )
}

const styles = StyleSheet.create({
  drawer: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    width: drawerWidth,
    backgroundColor: 'white',
    paddingTop: 50,
    paddingHorizontal: 10,
    zIndex: 100,
  },
})
