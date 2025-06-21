import { useMenuContext } from 'Providers/MenuProvider'
import { TouchableOpacity, View } from 'react-native'
import { Text, IconButton, Icon, Button, Searchbar } from 'react-native-paper'
import * as Animatable from 'react-native-animatable'
import * as Progress from 'react-native-progress'
import { Image } from 'expo-image'
import { useState } from 'react'
import { FlashList } from '@shopify/flash-list'
import ItemCard from 'components/List/ItemCard'
import { useDispatch, useSelector } from 'react-redux'
import { StateFace } from 'Types/Store/StateFace'
import { SearchAcknowledgments, SetAcknowledgments_Current } from 'lib/Store/Slices/MainSlice'
const backImg = require('../assets/backn.png')
const nfcIcon = require('../assets/nfc.png')

export default function Home() {
  const { acknowledgments_Current, allocated, submitted } = useSelector(
    (state: StateFace) => state.MainReducer
  )
  const [searchQuery, setSearchQuery] = useState('')

  const dispatch = useDispatch()
  const { openDrawer } = useMenuContext()
  const [activeList, setActiveList] = useState('daily')

  function handleSerach(text: string) {
    setSearchQuery(text)
    dispatch(SearchAcknowledgments(text))
  }

  function handleActive(period: string) {
    const nameLower = period.toLocaleLowerCase()
    setActiveList(nameLower)
    dispatch(SetAcknowledgments_Current(nameLower))
  }

  return (
    <Animatable.View
      className=" flex-1 bg-black"
      animation="fadeIn"
      duration={800}
      easing="ease-in-out">
      <View className="absolute left-[0] top-[200px] " style={{ width: '100%' }}>
        <Image style={{ width: '100%', height: 200 }} contentFit="fill" source={backImg} />
      </View>
      {/* Lines */}
      <View className=" absolute left-[233] top-[350] z-50 h-[145px] w-[2px]  rounded-2xl bg-white"></View>
      <View className=" absolute left-[258] top-[425] z-50 h-0.5 w-[161] rounded-2xl bg-white"></View>
      {/* Info */}
      <View className=" absolute left-[0px] top-[0px] z-50"></View>
      {/*Body */}
      <View style={{ height: 300 }}>
        <Image source={backImg} contentFit="fill" style={{ width: '100%', height: '100%' }} />
      </View>
      {/* Card */}
      <View className="h-full items-center rounded-t-[70px] bg-white px-[36px]  py-[28px] pb-[85px]">
        <View className="h-[200px] w-[400px] flex-row  rounded-[31px] bg-[#00D09E] px-[36px] py-[28px]">
          <View></View>
          <View className=" justify-center">
            <View className=" ml-4 mt-2 items-center ">
              <Progress.Circle
                size={100}
                progress={allocated > 0 ? submitted / allocated : 0}
                showsText={false}
                color="#0068FF"
                unfilledColor="#F1FFF3"
                borderWidth={0}
                thickness={3.25}
              />
              <View className=" absolute left-[3] top-[2]">
                <Icon source={nfcIcon} size={100} />
              </View>
              <Text className="mt-2 text-xl text-[#093030]">NFC tracker</Text>
            </View>
          </View>
          <View className=" ml-[50px] flex-col justify-between">
            <View className=" flex-row items-center gap-3">
              <Icon size={60} source={nfcIcon} />
              <View className=" flex-col items-center">
                <Text className="text-[15px]  text-[#052224]">Allocated</Text>
                <Text
                  style={{
                    fontSize: 18,
                    color: '#052224',
                    fontWeight: 'bold',
                  }}>
                  {allocated}
                </Text>
              </View>
            </View>
            <View className=" flex-row items-center gap-3">
              <Icon size={60} color="#0068FF" source={nfcIcon} />
              <View className=" flex-col items-center">
                <Text className="text-[15px]  text-[#052224]">Submitted</Text>
                <Text style={{ fontSize: 18, color: '#0068FF', fontWeight: 'bold' }}>
                  +{submitted}
                </Text>
              </View>
            </View>
          </View>
        </View>
        {/* SearchBox */}
        <View className="mt-[46px] h-[90px] w-[400px] flex-row items-center justify-center gap-[20px] rounded-[22px] bg-[#DFF7E2] px-[12.5px] py-[5px]">
          <TouchableOpacity onPress={() => handleActive('daily')}>
            <Button
              contentStyle={{
                height: 70,
                justifyContent: 'center',
                alignItems: 'center',
              }}
              buttonColor={activeList == 'daily' ? '#00D09E' : '#DFF7E2'}
              labelStyle={{
                fontSize: 15,
                color: '#052224',
                textAlign: 'center',
              }}
              style={{ width: 110, height: 70, borderRadius: 25 }}>
              Daily
            </Button>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => handleActive('weekly')}>
            <Button
              contentStyle={{
                height: 70,
                justifyContent: 'center',
                alignItems: 'center',
              }}
              buttonColor={activeList == 'weekly' ? '#00D09E' : '#DFF7E2'}
              labelStyle={{
                fontSize: 15,
                color: '#052224',
                textAlign: 'center',
              }}
              style={{ width: 110, height: 70, borderRadius: 25 }}>
              Weekly
            </Button>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleActive('monthly')}>
            <Button
              contentStyle={{
                height: 70,
                justifyContent: 'center',
                alignItems: 'center',
              }}
              buttonColor={activeList == 'monthly' ? '#00D09E' : '#DFF7E2'}
              labelStyle={{
                fontSize: 15,
                color: '#052224',
                textAlign: 'center',
              }}
              style={{ width: 110, height: 70, borderRadius: 25 }}>
              Monthly
            </Button>
          </TouchableOpacity>
        </View>
        <Searchbar placeholder="Search" onChangeText={handleSerach} value={searchQuery} />
        {/* List */}
        <View style={{ height: 320, width: '100%' }}>
          <FlashList
            data={acknowledgments_Current}
            estimatedItemSize={70}
            keyExtractor={(item, index) => index.toString()}
            contentContainerStyle={{ paddingBottom: 20 }}
            renderItem={({ item }) => <ItemCard item={item} />}
            ListEmptyComponent={() => (
              <View className="mt-32 items-center justify-center">
                <Text className="text-2xl opacity-70">Empty</Text>
              </View>
            )}
          />
        </View>
      </View>
    </Animatable.View>
  )
}
