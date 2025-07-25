import { View, Text, TouchableOpacity, Modal, TextInput, StyleSheet, Keyboard } from 'react-native'
import React, { memo, useState } from 'react'
import * as Progress from 'react-native-progress'
import { ActivityIndicator, Button, HelperText, Icon, Portal, Snackbar } from 'react-native-paper'
import axiosClient from 'lib/api/axiosClient'
import {
  responsiveHeight as rh,
  responsiveWidth as rw,
  responsiveFontSize as rf,
} from 'react-native-responsive-dimensions'

import { SetAllocated } from 'lib/Store/Slices/MainSlice'
import { useDispatch, useSelector } from 'react-redux'
import { StateFace } from 'Types/Store/StateFace'
import { useUserInfoContext } from 'Providers/UserInfo'

const nfcIcon = require('../../assets/nfc.png')

interface props {
  submitted: number
  allocated: number
  userID: number
  refetch: any
}

function NfcCardDashboard({ submitted, allocated, userID, refetch }: props) {
  const cardWidth = rw(90)
  const cardHeight = rh(18)
  const progressSize = rw(18)
  const { userData } = useSelector((state: StateFace) => state.UserReducer)
  const [valueNum, setValueNum] = useState<any>(0)
  const [isLoadingRes, setIsLoadingRes] = useState(false)
  const [errorRes, setErrorRes] = useState<string | null>(null)
  const [isMessageBar, setIsMessageBar] = useState<string | null>(null)
  const { isShowModel, setIsShowModel } = useUserInfoContext()

  const dispatch = useDispatch()
  async function handleAddAllocate() {
    if (isLoadingRes) return
    Keyboard.dismiss()
    if (!valueNum || valueNum <= 0) {
      return setErrorRes('Should be more Than 0')
    }
    setIsLoadingRes(true)
    setErrorRes(null)
    try {
      const res = await axiosClient.post(`/admin/users/allocate/${userID}`, {
        allocated: parseInt(valueNum),
      })
      if (userID == userData?.id) {
        dispatch(SetAllocated(res.data.allocation.allocated + allocated))
      }
      await refetch()
      setIsMessageBar(res.data.message ?? 'NFCs allocated successfully')
      setIsShowModel(false)
      setValueNum(0)
    } catch (err: any) {
      setErrorRes(err.response?.data?.message ?? err.message ?? 'Error upload allocated!')
    } finally {
      setIsLoadingRes(false)
    }
  }

  return (
    <View
      style={{
        flexDirection: 'row',
        borderRadius: rf(2),
        backgroundColor: '#8d1c47',
        padding: rw(5),
        width: cardWidth,
        height: cardHeight,
      }}>
      {/* <TouchableOpacity onPress={() => setIsShowModel(true)} style={styles.leftSection}>
        <View style={{ position: 'relative', width: progressSize, height: progressSize }}>
          <Progress.Circle
            size={progressSize}
            progress={allocated > 0 ? submitted / allocated : 0}
            showsText={true}
            formatText={() => ((submitted / allocated) * 100).toFixed(2)}
            textStyle={{ color: 'white', fontSize: rf(2), fontWeight: 'bold' }}
            color="#0068FF"
            unfilledColor="#ffffff"
            borderWidth={0.5}
            thickness={progressSize * 0.07}
          />
        </View>

        <Text style={styles.addText}>Add Allocated</Text>
      </TouchableOpacity> */}
      <View style={{ position: 'absolute', top: rh(15), left: rw(0) }}>
        <View
          style={{
            position: 'absolute',
            top: rh(0),
            left: rw(30),
            zIndex: 1,
          }}>
          <Text
            style={{
              color: '#6c7879',
              fontSize: rf(2),
              width: rw(30),
              textAlign: 'center',
            }}>
            {(submitted / allocated) * 100 >= 1
              ? ((submitted / allocated) * 100).toFixed(2) + '%'
              : ''}
          </Text>
        </View>
        <Progress.Bar
          animationConfig={{ BounceIn: 5 }}
          animationType="timing"
          progress={submitted / allocated}
          borderColor="#8d1c47"
          borderWidth={1}
          color="white"
          height={cardHeight / 6}
          width={cardWidth - rw(0)}
          unfilledColor="#8d1c47"
          style={{
            borderRadius: rw(0.1),
            borderBottomLeftRadius: rw(2),
            borderBottomRightRadius: rw(2),
          }}
        />
      </View>
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          flex: 1,
          gap: rh(2),
        }}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: rh(1),
          }}>
          <Text
            style={{
              color: '#ffffff',
              fontSize: rf(2.2),
              textAlign: 'center',
            }}>
            {allocated - submitted}{' '}
          </Text>
          <Icon size={rf(3)} color="white" source={'nfc'} />
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: rh(0),
            gap: rw(5),
          }}>
          <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
            <Text
              style={{
                color: '#bdcdce',
                fontSize: rf(2),
                textAlign: 'center',
              }}>
              remaining.
            </Text>
          </View>
        </View>
      </View>

      <View style={styles.separator}></View>

      <View style={styles.rightSection}>
        <TouchableOpacity onPress={() => setIsShowModel(true)} style={styles.infoRow}>
          <Icon size={rf(6)} color="#bdcdce" source={nfcIcon} />
          <View style={styles.infoTextBox}>
            <Text style={styles.labelText}>Allocated</Text>
            <Text style={[styles.valueText, { color: '#f7f7f7' }]}>{allocated}</Text>
          </View>
        </TouchableOpacity>

        <View style={styles.subSeparator}></View>

        <View style={styles.infoRow}>
          <Icon size={rf(6)} color="#5c9dff" source={nfcIcon} />
          <View style={styles.infoTextBox}>
            <Text style={styles.labelText}>Submitted</Text>
            <Text style={[styles.valueText, { color: '#5c9dff' }]}>+{submitted}</Text>
          </View>
        </View>
      </View>
      <Portal>
        <Snackbar
          visible={!!isMessageBar}
          onDismiss={() => setIsMessageBar(null)}
          action={{ label: 'done', onPress: () => setIsMessageBar(null) }}>
          <Text style={{ color: 'white', fontSize: rf(1.8) }}>{isMessageBar}</Text>
        </Snackbar>
      </Portal>

      <Modal
        animationType="fade"
        transparent
        visible={isShowModel}
        onRequestClose={() => setIsShowModel(false)}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}> Allocate</Text>
              <TextInput
                onChangeText={(text: any) => setValueNum(text)}
                value={valueNum}
                style={styles.inputField}
                keyboardType="numeric"
                autoFocus={true}
                onSubmitEditing={handleAddAllocate}
              />
              {isLoadingRes ? (
                <View style={{ marginTop: rh(2) }}>
                  <ActivityIndicator size={50} />
                </View>
              ) : (
                <>
                  <View
                    style={{
                      flexDirection: 'row',
                      gap: rw(2),
                    }}>
                    <Button
                      onPress={() => {
                        setValueNum(0)
                        setErrorRes(null)
                        setIsShowModel(false)
                      }}
                      buttonColor="#d6d6d6"
                      textColor="black"
                      contentStyle={{
                        height: '100%',
                        justifyContent: 'center',
                      }}
                      labelStyle={{
                        fontSize: rf(1.6),
                        lineHeight: rf(2),
                        textAlign: 'center',
                      }}
                      style={{
                        width: rw(25),
                        height: rh(6),
                        borderRadius: rw(2),
                        marginHorizontal: rw(2),
                        justifyContent: 'center',
                      }}>
                      Cancel
                    </Button>

                    <Button
                      onPress={handleAddAllocate}
                      buttonColor="#000000"
                      textColor="white"
                      contentStyle={{
                        height: '100%',
                        justifyContent: 'center',
                      }}
                      labelStyle={{
                        fontSize: rf(1.6),
                        lineHeight: rf(2),
                        textAlign: 'center',
                      }}
                      style={{
                        width: rw(25),
                        height: rh(6),
                        borderRadius: rw(2),
                        marginHorizontal: rw(2),
                        justifyContent: 'center',
                      }}>
                      Submit
                    </Button>
                  </View>
                  <HelperText style={styles.errorText} type="error" visible={!!errorRes}>
                    {errorRes}
                  </HelperText>
                </>
              )}
            </View>
          </View>
        </View>
      </Modal>
    </View>
  )
}

const styles = StyleSheet.create({
  leftSection: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  nfcIconContainer: {
    position: 'absolute',
    top: rh(0.5),
  },
  addText: {
    color: '#bdcdce',
    marginTop: rh(1),
    fontSize: rf(2),
    width: rw(40),
    textAlign: 'center',
  },
  separator: {
    backgroundColor: '#ffffff',
    width: rw(0.4),
    height: rh(12),
    borderRadius: 50,
  },
  rightSection: {
    flex: 1,
    justifyContent: 'space-between',
    paddingLeft: rw(8),
  },
  infoRow: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  infoTextBox: {
    alignItems: 'center',
    gap: rh(0.2),
    marginBottom: rh(1),
  },
  labelText: {
    color: '#bdcdce',
    width: rw(20),
    fontSize: rf(1.8),
    textAlign: 'center',
    fontWeight: 'regular',
  },
  valueText: {
    fontSize: rf(2.2),
    fontWeight: 'bold',
    textAlign: 'center',
  },
  subSeparator: {
    backgroundColor: '#ffffff',
    width: rw(35),
    height: rh(0.2),
    borderRadius: 50,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.8)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: rw(70),
    height: rh(25),
    backgroundColor: '#fff',
    borderRadius: rf(4),
    alignItems: 'center',
  },
  modalContent: {
    alignItems: 'center',
    marginTop: rh(1),
    gap: rh(2),
  },
  modalTitle: {
    width: rw(50),
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: rf(2.6),
  },
  inputField: {
    borderWidth: 2,
    borderRadius: rf(2),
    width: rw(50),
    height: rh(6),
    textAlign: 'center',
    fontSize: rf(2),
  },
  modalButton: {
    width: rw(30),
    height: rh(6),
    borderRadius: rw(2),
    marginHorizontal: rw(2),
    justifyContent: 'center',
  },
  errorText: {
    fontSize: rw(3.2),
    color: 'red',
  },
  iconOverlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
  },
  label: {
    color: '#bdcdce',
    marginTop: rh(2),
    fontSize: rf(14),
    width: rw(30),
    textAlign: 'center',
  },
})

export default memo(NfcCardDashboard)
