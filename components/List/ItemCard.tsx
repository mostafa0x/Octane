import React, { useMemo, useRef, useState } from 'react'
import { TouchableOpacity, View, StyleSheet } from 'react-native'
import { Text, Avatar, Icon } from 'react-native-paper'
import { acknowledgmentsFace } from 'Types/Store/MainSliceFace'
import {
  responsiveWidth as rw,
  responsiveHeight as rh,
  responsiveFontSize as rf,
} from 'react-native-responsive-dimensions'
import ImageView from 'react-native-image-viewing'

interface Props {
  item: acknowledgmentsFace
  themeMode: string
}

const ItemCard = ({ item, themeMode }: Props) => {
  const [visible, setIsVisible] = useState(false)
  const avatarSize = useRef(rw(12))
  const Images = useRef([
    require('../../assets/car1.jpg'),
    require('../../assets/car2.jpg'),
    require('../../assets/car3.jpg'),
    require('../../assets/car4.jpg'),
  ])
  const indexImg = useRef(Images.current[Math.floor(Math.random() * Images.current.length)])

  return (
    <>
      <View style={[styles.container, { paddingHorizontal: rw(1), paddingVertical: rw(2.7) }]}>
        <TouchableOpacity onPress={() => setIsVisible(true)}>
          <Avatar.Image size={avatarSize.current} source={indexImg.current} />
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
            size={rf(3)}
            source={item.state_time == 'on_Time' ? 'clock-check-outline' : 'clock-remove-outline'}
          />
        </View>
      </View>
      <ImageView
        images={[{ uri: item.image }]}
        imageIndex={0}
        visible={visible}
        onRequestClose={() => setIsVisible(false)}
      />
    </>
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
    marginLeft: rw(1),
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
    width: rw(0.4),
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
