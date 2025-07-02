import {
  KeyboardAvoidingView,
  Platform,
  View,
  StyleSheet,
  Keyboard,
  TouchableWithoutFeedback,
} from 'react-native'
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
import { responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions'

export default function Home() {
  const backImg = useRef(require('../assets/backn.png'))
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

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.keyboardAvoidingView}>
      <View style={styles.animatableView}>
        <Image style={styles.backgroundImage} contentFit="fill" source={backImg.current} />

        <AppBar
          type="Home"
          sectionPadding={responsiveWidth(5)}
          router={router}
          userData={userData}
        />

        <View style={styles.imageContainer}>
          <Image source={backImg.current} contentFit="fill" style={styles.fullImage} />
        </View>

        <View style={styles.mainContainer}>
          <NfcCard submitted={submitted} allocated={allocated} />

          <ListButtonHistory activeList={activeList} handleActive={handleActive} />

          <View style={styles.searchContainer}>
            <Searchbar
              ref={searchBoxRef}
              placeholder="Search"
              value={searchQuery}
              onChangeText={handleSerach}
              onClearIconPress={() => handleActive(activeList)}
            />
          </View>

          <ListCard type="Home" acknowledgments_Current={acknowledgments_Current} />

          <View style={styles.swipeBtnContainer}>
            <SwipeBtn router={router} />
          </View>
        </View>
      </View>
    </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
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
    height: responsiveHeight(22),
  },
  fullImage: {
    width: '100%',
    height: '100%',
  },
  mainContainer: {
    flex: 1,
    alignItems: 'center',
    borderTopLeftRadius: responsiveWidth(25),
    borderTopRightRadius: responsiveWidth(25),
    backgroundColor: 'white',
    padding: responsiveWidth(5),
    paddingTop: responsiveHeight(4),
  },
  searchContainer: {
    marginTop: responsiveHeight(2),
    width: responsiveWidth(90),
  },
  swipeBtnContainer: {
    marginTop: responsiveHeight(0),
  },
})
