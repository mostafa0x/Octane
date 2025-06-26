import { View, Text, StyleSheet } from 'react-native'
import React, { memo } from 'react'
import { Button } from 'react-native-paper'

interface props {
  activeList: string
  searchHeight: number
  cardWidth: number
  handleActive: (period: string) => void
}

function ListButtonHistory({ activeList, searchHeight, cardWidth, handleActive }: props) {
  return (
    <View
      style={{
        marginTop: 20,
        height: searchHeight,
        width: cardWidth,
        borderRadius: 22,
        backgroundColor: '#c47b9f',
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
      }}>
      {['daily', 'weekly', 'monthly'].map((item) => (
        <Button
          key={item}
          onPress={() => handleActive(item)}
          mode={activeList === item ? 'contained' : 'text'}
          style={{ width: cardWidth / 3 - 10, height: searchHeight * 0.8, borderRadius: 25 }}
          labelStyle={{
            fontSize: 15,

            color: activeList === item ? '#eff1f1' : '#052224',
          }}
          buttonColor={activeList === item ? '#8d1c47' : '#c47b9f'}
          contentStyle={{
            justifyContent: 'center',
            height: searchHeight * 0.8,
          }}>
          {item.charAt(0).toUpperCase() + item.slice(1)}
        </Button>
      ))}
    </View>
  )
}

export default memo(ListButtonHistory)
