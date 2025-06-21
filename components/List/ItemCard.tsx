import React, { useEffect, useMemo, useState } from 'react'
import { TouchableOpacity, View } from 'react-native'
import { Text, Icon, Avatar } from 'react-native-paper'
import { acknowledgmentsFace } from 'Types/Store/MainSliceFace'
import ImageViewing from 'react-native-image-viewing'

interface Props {
  item: acknowledgmentsFace
}

const ItemCard = ({ item }: Props) => {
  const [visible, setIsVisible] = useState(false)
  const imgs: any = [{ uri: item.image }]
  const fontSize = useMemo(() => {
    if (item.delivery_method.length <= 15) return 15
    if (item.delivery_method.length <= 20) return 12
    return 10
  }, [item.delivery_method])

  return (
    <>
      <ImageViewing
        images={imgs}
        imageIndex={0}
        visible={visible}
        onRequestClose={() => setIsVisible(false)}
      />

      <View className="flex-row items-center gap-5 border-b border-gray-200 p-4">
        <TouchableOpacity onPress={() => setIsVisible(true)}>
          <Avatar.Image size={50} source={{ uri: item.image }} />
        </TouchableOpacity>
        <View className="gap-2">
          <Text style={{ fontSize: 18, width: 120, fontWeight: 'bold', color: '#052224' }}>
            {item.company.name.split(' ').splice(0, 2).join(' ')}
          </Text>
          <Text style={{ fontSize: 15, color: '#0068FF' }}>{item.company.code}</Text>
        </View>
        <View className="h-10 w-[1px] bg-[#00D09E]" />
        <Text>{item.cards_submitted}</Text>
        <View className="h-10 w-[1px] bg-[#00D09E]" />
        <View className="gap-2">
          <Text style={{ fontSize, fontWeight: 'bold', color: '#052224' }}>
            {item.delivery_method}
          </Text>
          <Text style={{ fontSize: 15, color: '#0068FF' }}>{item.state_time}</Text>
        </View>
      </View>
    </>
  )
}

export default React.memo(ItemCard)
