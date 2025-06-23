import { useMenuContext } from 'Providers/MenuProvider'
import { Animated, TouchableOpacity, View, useWindowDimensions, ScrollView } from 'react-native'
import { Text, IconButton, Icon, Button, Searchbar } from 'react-native-paper'
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
  const { width, height } = useWindowDimensions()
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
    const nameLower = period.toLowerCase()
    setSearchQuery('')
    searchBoxRef.current?.blur()
    setActiveList(nameLower)
    if (animRef.current && animRef.current.fadeIn) animRef.current?.fadeIn(100)
    dispatch(SetAcknowledgments_Current(nameLower))
  }

  useEffect(() => {
    handleActive('daily')
  }, [])

  const cardWidth = width * 0.9
  const cardHeight = height * 0.18
  const progressSize = Math.min(width, height) * 0.18
  const searchHeight = height * 0.07
  const sectionPadding = width * 0.05

  return (
    <Animatable.View
      style={{ flex: 1, backgroundColor: 'black' }}
      animation="fadeIn"
      duration={200}
      easing="ease-in-out">
      <Image
        style={{ position: 'absolute', width: '100%', height: '100%' }}
        contentFit="fill"
        source={backImg}
      />

      {/* <View
        style={{
          position: 'absolute',
          top: height * 0.4,
          left: width * 0.6,
          zIndex: 50,
          height: 145,
          width: 2,
          backgroundColor: 'white',
          borderRadius: 16,
        }}
      />
      <View
        style={{
          position: 'absolute',
          top: height * 0.5,
          left: width * 0.65,
          zIndex: 50,
          height: 1,
          width: width * 0.4,
          backgroundColor: 'white',
          borderRadius: 16,
        }}
      /> */}

      <View style={{ position: 'absolute', top: 0, left: 0, zIndex: 50, width: '100%' }}>
        <TouchableOpacity
          onPress={() => router.push('/Profile')}
          style={{ position: 'absolute', left: 10, top: 0, zIndex: 10 }}>
          <Image
            style={{ width: 50, height: 50 }}
            contentFit="cover"
            source={require('../assets/LogowithoutTXT.png')}
          />
        </TouchableOpacity>
        <View style={{ position: 'absolute', left: 60, top: 10, zIndex: 10 }}>
          <Text style={{ color: '#F1FFF3', fontSize: 24 }}>Hi, Welcome Back {userData?.name}</Text>
        </View>
        <View
          style={{
            height: 60,
            width: '100%',
            borderBottomLeftRadius: 30,
            borderBottomRightRadius: 30,
            backgroundColor: 'black',
            opacity: 0.4,
          }}
        />
        <View style={{ marginTop: 10, gap: 8, padding: sectionPadding }}>
          <Text style={{ color: '#EEEEEE', fontSize: 26, fontWeight: 'bold' }}>Made for You</Text>
          <Text style={{ color: '#EEEEEE', fontSize: 18 }}>
            Get Things Done Efficiently and Accurately
          </Text>
        </View>
      </View>

      <View style={{ height: height * 0.3 }}>
        <Image source={backImg} contentFit="fill" style={{ width: '100%', height: '100%' }} />
      </View>

      <View
        style={{
          flex: 1,
          alignItems: 'center',
          borderTopLeftRadius: 70,
          borderTopRightRadius: 70,
          backgroundColor: 'white',
          padding: sectionPadding,
        }}>
        <View
          style={{
            height: cardHeight,
            width: cardWidth,
            flexDirection: 'row',
            borderRadius: 31,
            backgroundColor: '#8d1c47',
            padding: 20,
          }}>
          <View style={{ justifyContent: 'center', alignItems: 'center', flex: 1 }}>
            <Progress.Circle
              size={progressSize}
              progress={allocated > 0 ? submitted / allocated : 0}
              showsText={false}
              color="#0068FF"
              unfilledColor="#F1FFF3"
              borderWidth={0}
              thickness={4.25}
            />

            <View style={{ position: 'absolute', top: 12 }}>
              <Icon source={nfcIcon} color="white" size={progressSize} />
            </View>
            <Text style={{ color: '#bdcdce', marginTop: 8, fontSize: 18 }}>NFC tracker</Text>
          </View>
          <View
            style={{
              backgroundColor: '#ffffff',
              width: width * 0.004,
              height: height * 0.15,
              borderRadius: 50,
            }}></View>
          <View style={{ flex: 1, justifyContent: 'space-between', paddingLeft: 40 }}>
            <View style={{ alignItems: 'center', flexDirection: 'row' }}>
              <Icon size={50} color="#bdcdce" source={nfcIcon} />
              <View style={{ alignItems: 'center' }}>
                <Text style={{ color: '#bdcdce', fontSize: 15 }}>Allocated</Text>
                <Text style={{ fontSize: 18, color: '#f7f7f7', fontWeight: 'bold' }}>
                  {allocated}
                </Text>
              </View>
            </View>
            <View
              style={{
                backgroundColor: '#ffffff',
                width: width * 0.3,
                height: height * 0.002,
                borderRadius: 50,
              }}></View>
            <View style={{ alignItems: 'center', flexDirection: 'row' }}>
              <Icon size={50} color="#5c9dff" source={nfcIcon} />
              <View style={{ alignItems: 'center' }}>
                <Text style={{ color: '#bdcdce', fontSize: 15 }}>Submitted</Text>
                <Text style={{ fontSize: 18, color: '#5c9dff', fontWeight: 'bold' }}>
                  +{submitted}
                </Text>
              </View>
            </View>
          </View>
        </View>

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

        <View style={{ marginTop: 20, width: cardWidth }}>
          <Searchbar
            ref={searchBoxRef}
            placeholder="Search"
            value={searchQuery}
            onChangeText={handleSerach}
          />
        </View>

        <Animatable.View
          ref={animRef}
          animation="fadeIn"
          easing="ease-in-out"
          style={{ height: height * 0.3, width: '100%', marginTop: 20 }}>
          <FlashList
            data={acknowledgments_Current}
            estimatedItemSize={70}
            keyExtractor={(item, index) => index.toString()}
            contentContainerStyle={{ paddingBottom: 20 }}
            renderItem={({ item }) => <ItemCard item={item} />}
            ListEmptyComponent={() => (
              <View style={{ marginTop: 50, alignItems: 'center' }}>
                <Text style={{ fontSize: 20, opacity: 0.7 }}>Empty</Text>
              </View>
            )}
          />
        </Animatable.View>
      </View>
    </Animatable.View>
  )
}
