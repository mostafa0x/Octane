import React, { useMemo, useRef, useState } from 'react'
import { TouchableOpacity, View, StyleSheet } from 'react-native'
import { Text, Avatar, Icon } from 'react-native-paper'
import { acknowledgmentsFace } from 'Types/Store/MainSliceFace'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import {
  responsiveWidth as rw,
  responsiveHeight as rh,
  responsiveFontSize as rf,
} from 'react-native-responsive-dimensions'

dayjs.extend(relativeTime)

interface Props {
  item: acknowledgmentsFace
  themeMode: string
}

const ItemCard = ({ item, themeMode }: Props) => {
  const [visible, setIsVisible] = useState(false)
  const timeAgo = dayjs(item.submission_date).fromNow()

  const avatarSize = useRef(rw(12))
  const imgs = useMemo(() => [{ uri: item.image }], [item.image])

  return (
    <View style={[styles.container, { padding: rw(3.5) }]}>
      <TouchableOpacity onPress={() => setIsVisible(true)}>
        <Avatar.Image size={avatarSize.current} source={imgs} />
      </TouchableOpacity>

      <View style={[styles.companyInfo, { width: rw(20) }]}>
        <Text
          style={[
            styles.companyName,
            { fontSize: rf(1.5), color: themeMode == 'dark' ? 'white' : '#052224' },
          ]}>
          {item.company.name}
        </Text>
        <Text style={[styles.companyCode, { fontSize: rf(1.2) }]}>{item.company.code}</Text>
      </View>

      <View style={styles.separator} />
      <View style={(styles.cardsBox, { width: rw(8) })}>
        <Text
          style={{
            fontSize: rf(1.6),
            color: themeMode == 'dark' ? '#f7f7f7' : '#295ce9',
            textAlign: 'center',
          }}>
          {item.cards_submitted}
        </Text>
      </View>

      <View style={styles.separator} />
      <View style={styles.detailsBox}>
        <Text
          style={[
            styles.deliveryMethod,
            {
              fontSize: rf(1.4),
              fontWeight: 'regular',
              color: themeMode == 'dark' ? '#fafafa' : '#052224',
            },
          ]}>
          {item.submission_type}
        </Text>
        <Text
          style={[
            {
              fontSize: rf(1.4),
              fontWeight: 'regular',
              color: themeMode == 'dark' ? '#0068FF' : '#0068FF',
            },
          ]}>
          {item.delivery_method}
        </Text>
      </View>
      <View style={{ marginLeft: rw(0) }}>
        <Icon
          size={30}
          source={item.state_time == 'on_Time' ? 'clock-check-outline' : 'clock-remove-outline'}
        />
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
    flexWrap: 'wrap',
  },
  companyInfo: {
    marginLeft: rw(3),
    gap: 4,
    flexShrink: 1,
  },
  companyName: {
    fontWeight: 'bold',
  },
  companyCode: {
    color: '#0068FF',
  },
  separator: {
    height: rh(5),
    width: 1,
    backgroundColor: '#00D09E',
    marginHorizontal: rw(2),
  },
  cardsBox: {
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: rw(3),
  },
  detailsBox: {
    gap: 4,
    flexShrink: 1,
    flex: 1,
  },
  deliveryMethod: {
    fontWeight: 'bold',
    color: '#052224',
  },
})

export default React.memo(ItemCard)
