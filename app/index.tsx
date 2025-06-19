import React, { useCallback, useRef, useState } from 'react'
import {
  Animated,
  Dimensions,
  PanResponder,
  TouchableOpacity,
  View,
  StyleSheet,
} from 'react-native'
import { Drawer, Text, IconButton, Divider } from 'react-native-paper'

const screenWidth = Dimensions.get('window').width
const drawerWidth = screenWidth * 0.5

export default function Home() {
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
    <View style={{ flex: 1 }} {...panResponder.panHandlers}>
      <IconButton icon="menu" onPress={openDrawer} />

      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text variant="titleLarge">Home Screen</Text>
      </View>

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
