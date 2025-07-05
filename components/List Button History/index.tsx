import { View } from 'react-native'
import React, { memo } from 'react'
import { Button } from 'react-native-paper'
import {
  responsiveHeight as rh,
  responsiveWidth as rw,
  responsiveFontSize as rf,
} from 'react-native-responsive-dimensions'

interface props {
  activeList: string
  handleActive: (period: string) => void
  themeMode: string
}

function ListButtonHistory({ activeList, handleActive, themeMode }: props) {
  const height = rh(7)
  const width = rw(90)
  const buttonWidth = width / 3 - 10
  const buttonHeight = height * 0.8

  return (
    <View
      style={{
        marginTop: rh(2),
        height,
        width,
        borderRadius: rw(4),
        backgroundColor: themeMode == 'dark' ? '#000000' : '#9e0e56',
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
      }}>
      {['daily', 'weekly', 'monthly'].map((item) => (
        <Button
          key={item}
          onPress={() => handleActive(item)}
          mode={activeList === item ? 'contained' : 'text'}
          style={{ width: buttonWidth, height: buttonHeight, borderRadius: rw(25) }}
          labelStyle={{
            fontSize: rf(1.7),
            color: activeList === item ? '#eff1f1' : themeMode == 'dark' ? '#ffffff' : 'white',
          }}
          buttonColor={activeList === item ? '#8d1c47' : '#9e0e56'}
          contentStyle={{
            justifyContent: 'center',
            height: buttonHeight,
          }}>
          {item.charAt(0).toUpperCase() + item.slice(1)}
        </Button>
      ))}
    </View>
  )
}

export default memo(ListButtonHistory)
