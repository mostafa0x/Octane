import { KeyboardAvoidingView, Platform, View, useWindowDimensions, StyleSheet } from 'react-native'
import { Searchbar } from 'react-native-paper'
import { Image } from 'expo-image'
import { useCallback, useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { StateFace } from 'Types/Store/StateFace'
import { SearchAcknowledgments, SetAcknowledgments_Current } from 'lib/Store/Slices/MainSlice'
import { useRouter } from 'expo-router'
import NfcCard from 'components/NFC Card'
import ListButtonHistory from 'components/List Button History'
import * as Animatable from 'react-native-animatable'
import ListCard from 'components/List/ListCard'
import AppBar from 'components/App Bar'
import SwipeBtn from 'components/SwipeBtn'

export default function Home() {
  const backImg = useRef(require('../assets/backn.png'))
  const { width, height } = useWindowDimensions()
  const { acknowledgments_Current, allocated, submitted } = useSelector(
    (state: StateFace) => state.MainReducer
  )
  const { userData } = useSelector((state: StateFace) => state.UserReducer)
  const dispatch = useDispatch()
  const [activeList, setActiveList] = useState('daily')
  const [searchQuery, setSearchQuery] = useState('')
  const searchBoxRef = useRef<React.ComponentRef<typeof Searchbar>>(null)
  const router = useRouter()

  const handleSerach = useCallback(
    (text: string) => {
      setSearchQuery(text)
      dispatch(SearchAcknowledgments({ keyword: text, period: activeList }))
    },
    [activeList, dispatch]
  )

  const handleActive = useCallback(
    (period: string) => {
      const nameLower = period.toLowerCase()
      setSearchQuery('')
      searchBoxRef.current?.blur()
      setActiveList(nameLower)
      dispatch(SetAcknowledgments_Current(nameLower))
    },
    [dispatch]
  )

  useEffect(() => {
    handleActive('daily')
  }, [handleActive])

  const styles = Style(width, height)

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.keyboardAvoidingView}>
      <Animatable.View
        style={styles.animatableView}
        animation="fadeIn"
        duration={200}
        easing="ease-in-out">
        <Image style={styles.backgroundImage} contentFit="fill" source={backImg.current} />

        <AppBar
          type="Home"
          sectionPadding={width * 0.05}
          router={router}
          userData={userData}
          width={width}
          height={height}
        />

        <View style={styles.imageContainer}>
          <Image source={backImg.current} contentFit="fill" style={styles.fullImage} />
        </View>

        <View style={styles.mainContainer}>
          <NfcCard submitted={submitted} allocated={allocated} height={height} width={width} />

          <ListButtonHistory
            activeList={activeList}
            searchHeight={height * 0.07}
            cardWidth={width * 0.9}
            handleActive={handleActive}
          />

          <View style={styles.searchContainer}>
            <Searchbar
              ref={searchBoxRef}
              placeholder="Search"
              value={searchQuery}
              onChangeText={handleSerach}
              onClearIconPress={() => handleActive(activeList)}
            />
          </View>

          <ListCard
            acknowledgments_Current={acknowledgments_Current}
            height={height}
            width={width}
          />

          <View style={styles.swipeBtnContainer}>
            <SwipeBtn width={width} height={height} router={router} />
          </View>
        </View>
      </Animatable.View>
    </KeyboardAvoidingView>
  )
}

const Style = (width: number, height: number) =>
  StyleSheet.create({
    keyboardAvoidingView: {
      flex: 1,
    },
    animatableView: {
      flex: 1,
      backgroundColor: 'black',
    },
    backgroundImage: {
      position: 'absolute',
      width: '100%',
      height: '50%',
    },
    imageContainer: {
      height: height * 0.22,
    },
    fullImage: {
      width: '100%',
      height: '100%',
    },
    mainContainer: {
      flex: 1,
      alignItems: 'center',
      borderTopLeftRadius: 100,
      borderTopRightRadius: 100,
      backgroundColor: 'white',
      padding: width * 0.05,
      paddingTop: height * 0.04,
    },
    searchContainer: {
      marginTop: 20,
      width: width * 0.9,
    },
    swipeBtnContainer: {
      marginTop: height * 0.0,
    },
  })
