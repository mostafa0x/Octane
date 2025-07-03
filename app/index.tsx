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
import { usePathname, useRouter } from 'expo-router'
import NfcCard from 'components/NFC Card'
import ListButtonHistory from 'components/List Button History'
import * as Animatable from 'react-native-animatable'
import ListCard from 'components/List/ListCard'
import AppBar from 'components/App Bar'
import SwipeBtn from 'components/SwipeBtn'
import { responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions'
import { useThemeContext } from 'Providers/ThemeContext'

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
  const pathName = usePathname()
  const { toggleTheme, themeMode }: { toggleTheme: () => void; themeMode: 'light' | 'dark' } =
    useThemeContext()

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
    handleSerach('')
  }, [pathName, themeMode])

  return (
    <View style={styles.animatableView}>
      <Image style={styles.backgroundImage} contentFit="fill" source={backImg.current} />

      <AppBar type="Home" sectionPadding={responsiveWidth(5)} router={router} userData={userData} />

      <View style={styles.imageContainer}>
        <Image source={backImg.current} contentFit="fill" style={styles.fullImage} />
      </View>

      <View
        style={{
          flex: 1,
          alignItems: 'center',
          borderTopLeftRadius: responsiveWidth(25),
          borderTopRightRadius: responsiveWidth(25),

          padding: responsiveWidth(5),
          paddingTop: responsiveHeight(4),
          backgroundColor: themeMode == 'dark' ? 'black' : 'white',
        }}>
        <NfcCard themeMode={themeMode} submitted={submitted} allocated={allocated} />

        <ListButtonHistory
          themeMode={themeMode}
          activeList={activeList}
          handleActive={handleActive}
        />

        <View style={styles.searchContainer}>
          <Searchbar
            ref={searchBoxRef}
            placeholder="Search"
            placeholderTextColor={'gray'}
            style={{ backgroundColor: themeMode == 'dark' ? '#111111' : '#f1f1f1' }}
            value={searchQuery}
            onChangeText={handleSerach}
            onClearIconPress={() => handleActive(activeList)}
          />
        </View>

        <ListCard
          themeMode={themeMode}
          type="Home"
          acknowledgments_Current={acknowledgments_Current}
        />

        <View style={styles.swipeBtnContainer}>
          <SwipeBtn themeMode={themeMode} router={router} />
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
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
  mainContainer: {},
  searchContainer: {
    marginTop: responsiveHeight(0.5),
    width: responsiveWidth(90),
  },
  swipeBtnContainer: {
    marginTop: responsiveHeight(2),
    marginBottom: responsiveHeight(0),
  },
})
