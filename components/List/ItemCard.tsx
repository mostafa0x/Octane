import React, { useMemo, useRef, useState } from 'react'
import { TouchableOpacity, View, StyleSheet } from 'react-native'
import { Text, Avatar, Icon, ActivityIndicator } from 'react-native-paper'
import { acknowledgmentsFace } from 'Types/Store/MainSliceFace'

interface Props {
  item: acknowledgmentsFace
  width: number
}

const ItemCard = ({ item, width }: Props) => {
  const [visible, setIsVisible] = useState(false)

  const fontSize = useMemo(() => {
    if (item.delivery_method.length <= 15) return width * 0.028
    if (item.delivery_method.length <= 20) return width * 0.024
    return width * 0.024
  }, [item.delivery_method, width])

  const avatarSize = useRef(width * 0.12)
  const imgs = useMemo(() => [{ uri: item.image }], [item.image])
  return (
    <View style={[styles.container, { padding: width * 0.035 }]}>
      <TouchableOpacity onPress={() => setIsVisible(true)}>
        <Avatar.Image size={avatarSize.current} source={imgs} />
      </TouchableOpacity>

      <View style={[styles.companyInfo, { width: width * 0.25 }]}>
        <Text style={[styles.companyName, { fontSize: width * 0.032 }]}>{item.company.name}</Text>
        <Text style={[styles.companyCode, { fontSize: width * 0.03 }]}>{item.company.code}</Text>
      </View>

      <View style={styles.separator} />
      <View style={[styles.cardsBox, { width: width * 0.09 }]}>
        <Text style={{ fontSize: width * 0.03 }}>{item.cards_submitted}</Text>
      </View>

      <View style={styles.separator} />
      <View style={[styles.detailsBox, { flex: 1 }]}>
        <Text style={[styles.deliveryMethod, { fontSize }]}>{item.delivery_method}</Text>
        <Text style={[styles.stateTime, { fontSize: width * 0.03 }]}>{item.state_time}</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: '#E5E7EB',
  },
  companyInfo: {
    marginLeft: 12,
    gap: 4,
  },
  companyName: {
    fontWeight: 'bold',
    color: '#052224',
  },
  companyCode: {
    color: '#0068FF',
  },
  separator: {
    height: 40,
    width: 1,
    backgroundColor: '#00D09E',
    marginHorizontal: 10,
  },
  cardsBox: {
    alignItems: 'center',
  },
  detailsBox: {
    gap: 4,
  },
  deliveryMethod: {
    fontWeight: 'bold',
    color: '#052224',
  },
  stateTime: {
    color: '#0068FF',
  },
})

export default React.memo(ItemCard)
