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
import useReports from 'Hooks/useReports'
import axiosClient from 'lib/api/axiosClient'
import * as FileSystem from 'expo-file-system'
import * as Sharing from 'expo-sharing'
import { Buffer } from 'buffer'

export default function Reposts() {
  const { width, height } = useWindowDimensions()
  const dispatch = useDispatch()
  const [fromDate, setFromDate] = useState<Date | null>(null)
  const [toDate, setToDate] = useState<Date | null>(null)
  const [isFromVisible, setFromVisible] = useState(false)
  const [isToVisible, setToVisible] = useState(false)
  const [currData, setCurrData] = useState<acknowledgmentsFace[]>([])
  const [emptyTXT, setEmptyTXT] = useState('')
  const { data, isLoading, isError, error, refetch, isFetching } = useReports(fromDate, toDate)
  const [isLoadingRes, setIsLoadingRes] = useState(false)
  const [isErrorRes, setIsErrorRes] = useState<string | null>(null)

  const formatDate = (date: Date) => date.toISOString().split('T')[0]

  async function handleExportReports() {
    if (isLoadingRes || !fromDate || !toDate) return

    setIsErrorRes(null)
    setIsLoadingRes(true)

    try {
      const res = await axiosClient.get(
        `/admin/report/export?start=${formatDate(fromDate)}&end=${formatDate(toDate)}`,
        {
          responseType: 'arraybuffer',
        }
      )

      const fileUri =
        FileSystem.documentDirectory +
        `Report From ${formatDate(fromDate)} To ${formatDate(toDate)}.xlsx`
      const base64Data = Buffer.from(res.data).toString('base64')

      await FileSystem.writeAsStringAsync(fileUri, base64Data, {
        encoding: FileSystem.EncodingType.Base64,
      })

      if (await Sharing.isAvailableAsync()) {
        await Sharing.shareAsync(fileUri)
      } else {
        alert('Sharing is not available on this device.')
      }
    } catch (err: any) {
      setIsErrorRes(err.response?.data?.message ?? err.message ?? 'Error Export')
      console.error('Export error:', err)
    } finally {
      setIsLoadingRes(false)
    }
  }
  useEffect(() => {
    if (data) {
      setCurrData(data.acknowledgments)
    }
    return () => {
      setCurrData([])
    }
  }, [data])

  useEffect(() => {
    if (!fromDate || !toDate) {
      return setEmptyTXT('Specify the time period')
    } else if (!data) {
      return setEmptyTXT('A problem occurred')
    } else if (data && data?.acknowledgments?.length <= 0) {
      return setEmptyTXT('There are no results from this period.')
    }
  }, [toDate, fromDate, data])
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
            <View
              style={{ flexDirection: 'row', justifyContent: 'space-around', width: width * 0.9 }}>
              <Button
                labelStyle={{ fontSize: width * 0.038, fontWeight: 'bold' }}
                mode="outlined"
                onPress={() => setFromVisible(true)}>
                {fromDate ? `From: ${formatDate(fromDate)}` : 'Select From Date'}
              </Button>

              <Button
                labelStyle={{ fontSize: width * 0.038, fontWeight: 'bold' }}
                mode="outlined"
                onPress={() => setToVisible(true)}>
                {toDate ? `To: ${formatDate(toDate)}` : 'Select To Date'}
              </Button>
            </View>
            <View
              style={{
                marginTop: height * 0.03,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              {toDate && fromDate && (
                <Button
                  loading={isLoading || isFetching}
                  buttonColor="#8d1c47"
                  style={{ width: width * 0.4 }}
                  mode="contained"
                  onPress={() => toDate && fromDate && refetch()}>
                  {isLoading ? 'Loading...' : 'Search'}
                </Button>
              )}
            </View>
            {isError ? (
              <View
                style={{ alignItems: 'center', justifyContent: 'center', marginTop: height * 0.1 }}>
                <Text>{error.message}</Text>
              </View>
            ) : isLoading ? (
              <View
                style={{ alignItems: 'center', justifyContent: 'center', marginTop: height * 0.1 }}>
                <ActivityIndicator size={100} />
              </View>
            ) : (
              <View
                style={{
                  marginTop: height * 0.02,
                  borderWidth: data ? 1 : 0,
                  borderRadius: 20,
                  padding: 10,
                  paddingVertical: 0,
                  borderColor: 'grey',
                }}>
                <ListCard
                  type="Reports"
                  acknowledgments_Current={currData ?? []}
                  height={width}
                  width={height}
                  emptyTXT={emptyTXT}
                />
              </View>
            )}
            {data?.acknowledgments?.length > 0 && (
              <View style={{ alignItems: 'center', marginTop: height * 0.02 }}>
                <Button
                  onPress={() => handleExportReports()}
                  style={{ width: width * 0.4 }}
                  loading={isLoadingRes}
                  disabled={isLoading}
                  textColor="white"
                  buttonColor="#a33307">
                  {isLoadingRes ? 'Exporting...' : 'Export'}
                </Button>
              </View>
            )}

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
