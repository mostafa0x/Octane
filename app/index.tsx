import { View, StyleSheet } from 'react-native'
import { Searchbar } from 'react-native-paper'
import { Image } from 'expo-image'
import { useCallback, useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { StateFace } from 'Types/Store/StateFace'
import { SearchAcknowledgments, SetAcknowledgments_Current } from 'lib/Store/Slices/MainSlice'
import { usePathname, useRouter } from 'expo-router'
import NfcCard from 'components/NFC Card'
import ListButtonHistory from 'components/List Button History'
import ListCard from 'components/List/ListCard'
import AppBar from 'components/App Bar'
import SwipeBtn from 'components/SwipeBtn'
import { responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions'

export type activeListType = 'daily' | 'weekly' | 'monthly'

export default function Home() {
  const backImg = useRef(require('../assets/backn.png'))
  const { acknowledgments_Current, allocated, submitted } = useSelector(
    (state: StateFace) => state.MainReducer
  )
  const { userData } = useSelector((state: StateFace) => state.UserReducer)
  const dispatch = useDispatch()
  const [activeList, setActiveList] = useState<activeListType>('daily')
  const [searchQuery, setSearchQuery] = useState('')
  const searchBoxRef = useRef<React.ComponentRef<typeof Searchbar>>(null)
  const router = useRouter()
  const pathName = usePathname()

  const handleSerach = useCallback(
    (text: string) => {
      setSearchQuery(text)
      dispatch(SearchAcknowledgments({ keyword: text, period: activeList }))
    },
    [activeList, dispatch]
  )

  const handleActive = useCallback(
    (period: activeListType) => {
      setSearchQuery('')
      searchBoxRef.current?.blur()
      setActiveList(period)
      dispatch(SetAcknowledgments_Current(period))
    },
    [dispatch]
  )

  useEffect(() => {
    handleActive('daily')
    handleSerach('')
  }, [pathName])

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
          borderTopLeftRadius: responsiveWidth(10),
          borderTopRightRadius: responsiveWidth(10),
          padding: responsiveWidth(5),
          paddingTop: responsiveHeight(4),
          backgroundColor: 'white',
        }}>
        <NfcCard submitted={submitted} allocated={allocated} />

        <ListButtonHistory activeList={activeList} handleActive={handleActive} />

        <View style={styles.searchContainer}>
          <Searchbar
            ref={searchBoxRef}
            placeholder="Search"
            placeholderTextColor={'gray'}
            style={{ backgroundColor: '#f1f1f1' }}
            value={searchQuery}
            onChangeText={handleSerach}
            onClearIconPress={() => handleActive(activeList)}
          />
        </View>

        <ListCard
          activeList={activeList || 'daily'}
          type="Home"
          acknowledgments_Current={acknowledgments_Current}
        />

        <View style={styles.swipeBtnContainer}>
          <SwipeBtn allocated={allocated} submitted={submitted} router={router} />
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
    marginTop: responsiveHeight(0.8),
    marginBottom: responsiveHeight(0),
  },
})
