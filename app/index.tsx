import { useMenuContext } from 'Providers/MenuProvider'
import { Animated, TouchableOpacity, View } from 'react-native'
import { Text, IconButton, Icon, Button, Searchbar, SearchbarProps } from 'react-native-paper'
import * as Animatable from 'react-native-animatable'
import * as Progress from 'react-native-progress'
import { Image } from 'expo-image'
import { useEffect, useRef, useState } from 'react'
import { FlashList } from '@shopify/flash-list'
import ItemCard from 'components/List/ItemCard'
import { useDispatch, useSelector } from 'react-redux'
import { StateFace } from 'Types/Store/StateFace'
import { SearchAcknowledgments, SetAcknowledgments_Current } from 'lib/Store/Slices/MainSlice'
import { useRouter } from 'expo-router'
type AnimatableView = Animatable.View

const backImg = require('../assets/backn.png')
const nfcIcon = require('../assets/nfc.png')

export default function Home() {
  const { acknowledgments_Current, allocated, submitted } = useSelector(
    (state: StateFace) => state.MainReducer
  )
  const { userData } = useSelector((state: StateFace) => state.UserReducer)

  const [searchQuery, setSearchQuery] = useState('')
  const dispatch = useDispatch()
  const { openDrawer } = useMenuContext()
  const [activeList, setActiveList] = useState('daily')
  const searchBoxRef = useRef<React.ComponentRef<typeof Searchbar>>(null)
  const animRef = useRef<AnimatableView>(null)
  const router = useRouter()
  function handleSerach(text: string) {
    setSearchQuery(text)
    dispatch(SearchAcknowledgments({ keyword: text, period: activeList }))
  }

  function handleActive(period: string) {
    const nameLower = period.toLocaleLowerCase()
    setSearchQuery('')
    searchBoxRef.current && searchBoxRef.current?.blur()
    setActiveList(nameLower)
    if (animRef.current && animRef.current.fadeIn) {
      animRef.current.fadeIn(100)
    }

    dispatch(SetAcknowledgments_Current(nameLower))
  }
  useEffect(() => {
    handleActive('daily')
    return () => {}
  }, [])

  return (
    <Animatable.View
      className=" flex-1 bg-black"
      animation="fadeIn"
      duration={200}
      easing="ease-in-out">
      <View className="absolute left-[0] top-[0px] " style={{ width: '100%', height: '100%' }}>
        <Image style={{ width: '100%', height: '100%' }} contentFit="fill" source={backImg} />
      </View>
      {/* Lines */}
      <View className=" absolute left-[233] top-[350] z-50 h-[145px] w-[2px]  rounded-2xl bg-white"></View>
      <View className=" absolute left-[258] top-[425] z-50 h-0.5 w-[161] rounded-2xl bg-white"></View>
      {/* Info */}
      <View className=" absolute left-[0px] top-[0px] z-50 w-full">
        <TouchableOpacity
          onPress={() => router.push('/Profile')}
          className=" absolute left-[10px] top-0 z-10">
          <Image
            style={{ width: 50, height: 50 }}
            contentFit="cover"
            source={require('../assets/LogowithoutTXT.png')}
          />
        </TouchableOpacity>
        <View className=" absolute left-[60px] top-[10px] z-10">
          <Text style={{ color: '#F1FFF3', fontSize: 24 }}>
            Hi, Welcome Back
            <Text style={{ color: '#F1FFF3', fontSize: 24 }}> {userData?.name}</Text>
          </Text>
        </View>
        <View className="h-[60px] w-full rounded-b-3xl bg-black opacity-40"></View>
        <View className="mt-10 gap-2 p-10">
          <Text style={{ color: '#EEEEEE', fontSize: 26, fontWeight: 'bold' }}>Made for You</Text>
          <Text style={{ color: '#EEEEEE', fontSize: 18, marginLeft: 15 }}>
            Get Things Done Efficiently and Accurately
          </Text>
        </View>
      </View>

      {/*App Bar */}

      {/*Body */}
      <View style={{ height: 300 }}>
        <Image source={backImg} contentFit="fill" style={{ width: '100%', height: '100%' }} />
      </View>
      {/* Card */}
      <View className="h-full items-center rounded-t-[70px] bg-white px-[36px]  py-[28px] pb-[85px]">
        <View className="h-[200px] w-[400px] flex-row  rounded-[31px] bg-[#8d1c47] px-[36px] py-[28px]">
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
              <View className=" absolute left-[1.7] top-[2]">
                <Icon source={nfcIcon} color="white" size={100} />
              </View>
              <Text style={{ color: '#bdcdce' }} className="mt-2 text-xl ">
                NFC tracker
              </Text>
            </View>
          </View>
          <View className=" ml-[50px] flex-col justify-between">
            <View className=" flex-row items-center gap-3">
              <Icon size={60} color="#bdcdce" source={nfcIcon} />
              <View className=" flex-col items-center">
                <Text style={{ color: '#bdcdce' }} className="text-[15px]  ">
                  Allocated
                </Text>
                <Text
                  style={{
                    fontSize: 18,
                    color: '#f7f7f7',
                    fontWeight: 'bold',
                  }}>
                  {allocated}
                </Text>
              </View>
            </View>
            <View className=" flex-row items-center gap-3">
              <Icon size={60} color="#5c9dff" source={nfcIcon} />
              <View className=" flex-col items-center">
                <Text style={{ color: '#bdcdce' }} className="text-[15px] ">
                  Submitted
                </Text>
                <Text style={{ fontSize: 18, color: '#5c9dff', fontWeight: 'bold' }}>
                  +{submitted}
                </Text>
              </View>
            </View>
          </View>
        </View>
        {/* SearchBox */}
        <View className="mt-[46px] h-[90px] w-[400px] flex-row items-center justify-center gap-[20px] rounded-[22px] bg-[#c47b9f] px-[12.5px] py-[5px]">
          <TouchableOpacity onPress={() => handleActive('daily')}>
            <Button
              contentStyle={{
                height: 70,
                justifyContent: 'center',
                alignItems: 'center',
              }}
              buttonColor={activeList == 'daily' ? '#8d1c47' : '#c47b9f'}
              labelStyle={{
                fontSize: 15,
                color: activeList == 'daily' ? '#eff1f1' : '#052224',
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
              buttonColor={activeList == 'weekly' ? '#8d1c47' : '#c47b9f'}
              labelStyle={{
                fontSize: 15,
                color: activeList == 'weekly' ? '#eff1f1' : '#052224',
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
              buttonColor={activeList == 'monthly' ? '#8d1c47' : '#c47b9f'}
              labelStyle={{
                fontSize: 15,
                color: activeList == 'monthly' ? '#eff1f1' : '#052224',
                textAlign: 'center',
              }}
              style={{ width: 110, height: 70, borderRadius: 25 }}>
              Monthly
            </Button>
          </TouchableOpacity>
        </View>
        <View className="m-4  w-[400px]">
          <Searchbar
            ref={searchBoxRef}
            placeholder="Search"
            value={searchQuery}
            onChangeText={handleSerach}
          />
        </View>
        {/* List */}
        <Animatable.View
          ref={animRef}
          animation="fadeIn"
          easing="ease-in-out"
          style={{ height: 250, width: '100%' }}>
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
        </Animatable.View>
      </View>
    </Animatable.View>
  )
}
