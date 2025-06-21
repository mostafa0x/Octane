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
import handleLoutOut from 'Services/handleLogOut'
import { useDispatch } from 'react-redux'
import { useRouter } from 'expo-router'

export const MenuContext = createContext({
  openDrawer: () => {},
  closeDrawer: () => {},
})

const screenWidth = Dimensions.get('window').width
const drawerWidth = screenWidth * 0.7
export const useMenuContext = () => useContext(MenuContext)

export default function MenuProvider({ children }: { children: React.ReactNode }) {
  const translateX = useRef(new Animated.Value(-drawerWidth)).current
  const [active, setActive] = useState('home')
  const [isOpen, setIsOpen] = useState(false)
  const dispatch = useDispatch()
  const router = useRouter()
  async function callLogOut() {
    await handleLoutOut(dispatch, router)
  }

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
      toValue: -drawerWidth - 100,
      duration: 250,
      useNativeDriver: true,
    }).start(() => setIsOpen(false))
  }, [drawerWidth, translateX])

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: (_, gestureState) => {
        return gestureState.dx > 15 && gestureState.moveX < 40
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
            <Drawer.Section title="Profile">
              <Text style={{ marginLeft: 26, marginVertical: 20 }}>email@gmail.com</Text>
              <Drawer.Item
                label="upload Photo"
                active={active === 'home'}
                onPress={() => {
                  setActive('home')
                  closeDrawer()
                }}
              />

              <Drawer.Item
                label="Log out"
                active={active === 'logout'}
                onPress={() => {
                  callLogOut()
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
