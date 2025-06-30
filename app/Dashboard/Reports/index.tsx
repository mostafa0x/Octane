import {
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  useWindowDimensions,
  Modal,
} from 'react-native'
import { Button, HelperText, Icon } from 'react-native-paper'
const backImg = require('../../../assets/backn.png')
import * as Animatable from 'react-native-animatable'
import { Image } from 'expo-image'
import { useDispatch } from 'react-redux'
import { useEffect, useState } from 'react'
import DateTimePickerModal from 'react-native-modal-datetime-picker'
import ListCard from 'components/List/ListCard'
import { acknowledgmentsFace } from 'Types/Store/MainSliceFace'

export default function Reposts() {
  const { width, height } = useWindowDimensions()
  const dispatch = useDispatch()
  const [fromDate, setFromDate] = useState<Date | null>(null)
  const [toDate, setToDate] = useState<Date | null>(null)
  const [isFromVisible, setFromVisible] = useState(false)
  const [isToVisible, setToVisible] = useState(false)
  const [currData, setCurrData] = useState<acknowledgmentsFace[]>([])
  const [emptyTXT, setEmptyTXT] = useState('')

  const formatDate = (date: Date) => date.toISOString().split('T')[0]

  useEffect(() => {
    if (!fromDate || !toDate) {
      setEmptyTXT('select frist')
    }
  }, [toDate, fromDate])
  return (
    <Animatable.View animation="fadeIn" duration={100} style={{ flex: 1 }}>
      <View style={{ position: 'absolute', top: 0, width: '100%' }}>
        <Image
          style={{ width: '100%', height: height * 0.25 }}
          contentFit="fill"
          source={backImg}
        />
      </View>

      <View style={{ width: '100%', height: height * 0.15, zIndex: -1 }}>
        <Image source={backImg} contentFit="fill" style={{ width: '100%', height: '100%' }} />
      </View>
      <View
        style={{
          flex: 1,
          borderTopLeftRadius: 100,
          borderTopRightRadius: 100,
          backgroundColor: 'white',
          padding: 20,
        }}>
        <View
          style={{
            marginTop: height * 0.01,
            marginBottom: height * 0.05,
            gap: 30,
          }}>
          <View style={{ padding: 10 }}>
            <Text
              style={{ fontWeight: 'bold', marginBottom: height * 0.008, fontSize: width * 0.042 }}>
              View Report :
            </Text>
            <View
              style={{ flexDirection: 'row', justifyContent: 'space-around', width: width * 0.9 }}>
              <Button mode="outlined" onPress={() => setFromVisible(true)}>
                {fromDate ? `From: ${formatDate(fromDate)}` : 'Select From Date'}
              </Button>

              <Button mode="outlined" onPress={() => setToVisible(true)}>
                {toDate ? `To: ${formatDate(toDate)}` : 'Select To Date'}
              </Button>
            </View>
            <View
              style={{
                marginTop: height * 0.01,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Button
                style={{ width: width * 0.4 }}
                mode="contained"
                onPress={() => setToVisible(true)}>
                Show
              </Button>
            </View>
            <View>
              <ListCard
                type="Reports"
                acknowledgments_Current={currData ?? []}
                height={width}
                width={height}
                emptyTXT={emptyTXT}
              />
            </View>
            <DateTimePickerModal
              isVisible={isFromVisible}
              mode="date"
              onConfirm={(date) => {
                setFromDate(date)
                setFromVisible(false)
              }}
              onCancel={() => setFromVisible(false)}
            />
            <DateTimePickerModal
              isVisible={isToVisible}
              mode="date"
              onConfirm={(date) => {
                setToDate(date)
                setToVisible(false)
              }}
              onCancel={() => setToVisible(false)}
            />
          </View>
        </View>
        <View style={{ justifyContent: 'center' }}></View>
      </View>
    </Animatable.View>
  )
}
