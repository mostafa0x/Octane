import { TouchableOpacity, View, useWindowDimensions } from 'react-native'
import { Text, Searchbar } from 'react-native-paper'
import { Image } from 'expo-image'
import { useCallback, useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { StateFace } from 'Types/Store/StateFace'
import { SearchAcknowledgments, SetAcknowledgments_Current } from 'lib/Store/Slices/MainSlice'
import { Href, Route, RouteInputParams, useRouter } from 'expo-router'
import NfcCard from 'components/NFC Card'
import ListButtonHistory from 'components/List Button History'
import * as Animatable from 'react-native-animatable'
import ListCard from 'components/List/ListCard'
import AppBar from 'components/App Bar'
import { NavigationOptions } from 'expo-router/build/global-state/routing'
import SwipeBtn from 'components/SwipeBtn'

const backImg = require('../assets/backn.png')

export default function Home() {
  const { width, height } = useWindowDimensions()
  const { acknowledgments_Current, allocated, submitted } = useSelector(
    (state: StateFace) => state.MainReducer
  )
  const { userData } = useSelector((state: StateFace) => state.UserReducer)
  const [searchQuery, setSearchQuery] = useState('')
  const dispatch = useDispatch()
  const [activeList, setActiveList] = useState('daily')
  const searchBoxRef = useRef<React.ComponentRef<typeof Searchbar>>(null)
  const router = useRouter()

  const handleSerach = useCallback((text: string) => {
    setSearchQuery(text)
    dispatch(SearchAcknowledgments({ keyword: text, period: activeList }))
  }, [])

  const handleActive = useCallback((period: string) => {
    const nameLower = period.toLowerCase()
    setSearchQuery('')
    searchBoxRef.current?.blur()
    setActiveList(nameLower)
    dispatch(SetAcknowledgments_Current(nameLower))
  }, [])

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

      <AppBar sectionPadding={sectionPadding} router={router} userData={userData} width={width} />
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
        <NfcCard
          submitted={submitted}
          allocated={allocated}
          cardWidth={cardWidth}
          cardHeight={cardHeight}
          progressSize={progressSize}
          height={height}
          width={width}
        />
        <ListButtonHistory
          activeList={activeList}
          searchHeight={searchHeight}
          cardWidth={cardWidth}
          handleActive={handleActive}
        />

        <View style={{ marginTop: 20, width: cardWidth }}>
          <Searchbar
            ref={searchBoxRef}
            placeholder="Search"
            value={searchQuery}
            onChangeText={handleSerach}
            onClearIconPress={() => handleActive(activeList)}
          />
        </View>
        <ListCard acknowledgments_Current={acknowledgments_Current} height={height} width={width} />
        <SwipeBtn width={width} height={height} router={router} />
      </View>
    </Animatable.View>
  )
}
