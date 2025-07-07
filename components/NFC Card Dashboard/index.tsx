import { View, Text, TouchableOpacity, Modal, TextInput, StyleSheet } from 'react-native'
import React, { memo, useState } from 'react'
import * as Progress from 'react-native-progress'
import { ActivityIndicator, Button, HelperText, Icon } from 'react-native-paper'
import axiosClient from 'lib/api/axiosClient'
import {
  responsiveHeight as rh,
  responsiveWidth as rw,
  responsiveFontSize as rf,
} from 'react-native-responsive-dimensions'
import { SetAllocated } from 'lib/Store/Slices/MainSlice'
import { useDispatch, useSelector } from 'react-redux'
import { StateFace } from 'Types/Store/StateFace'

const nfcIcon = require('../../assets/nfc.png')

interface props {
  submitted: number
  allocated: number
  userID: number
  refetch: any
  themeMode: string
}

function NfcCardDashboard({ submitted, allocated, userID, refetch, themeMode }: props) {
  const progressSize = rw(18)
  const { userData } = useSelector((state: StateFace) => state.UserReducer)
  const [valueNum, setValueNum] = useState<any>(0)
  const [isShowModel, setIsShowModel] = useState(false)
  const [isLoadingRes, setIsLoadingRes] = useState(false)
  const [errorRes, setErrorRes] = useState<string | null>(null)
  const dispatch = useDispatch()
  async function handleAddAllocate() {
    if (isLoadingRes) return
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
      setIsShowModel(false)
      setValueNum(0)
    } catch (err: any) {
      setErrorRes(err.response?.data?.message ?? err.message ?? 'Error upload!')
    } finally {
      setIsLoadingRes(false)
    }
  }

  return (
    <View
      style={{
        flexDirection: 'row',
        borderRadius: rf(2),
        backgroundColor: themeMode == 'dark' ? 'black' : '#8d1c47',
        padding: rw(5),
        width: rw(90),
        height: rh(18),
      }}>
      <TouchableOpacity onPress={() => setIsShowModel(true)} style={styles.leftSection}>
        <View style={{ position: 'relative', width: progressSize, height: progressSize }}>
          <Progress.Circle
            size={progressSize}
            progress={allocated > 0 ? submitted / allocated : 0}
            showsText={false}
            color="#0068FF"
            unfilledColor="#ffffff"
            borderWidth={0.5}
            thickness={progressSize * 0.07}
          />

          <View
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: progressSize,
              height: progressSize,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Icon source={nfcIcon} color="white" size={progressSize * 0.9} />
          </View>
        </View>

        <Text style={styles.addText}>Add Allocated</Text>
      </TouchableOpacity>

      <View style={styles.separator}></View>

      <View style={styles.rightSection}>
        <View style={styles.infoRow}>
          <Icon size={rf(6)} color="#bdcdce" source={nfcIcon} />
          <View style={styles.infoTextBox}>
            <Text style={styles.labelText}>Allocated</Text>
            <Text style={[styles.valueText, { color: '#f7f7f7' }]}>{allocated}</Text>
          </View>
        </View>

        <View style={styles.subSeparator}></View>

        <View style={styles.infoRow}>
          <Icon size={rf(6)} color="#5c9dff" source={nfcIcon} />
          <View style={styles.infoTextBox}>
            <Text style={styles.labelText}>Submitted</Text>
            <Text style={[styles.valueText, { color: '#5c9dff' }]}>+{submitted}</Text>
          </View>
        </View>
      </View>

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
              />
              {isLoadingRes ? (
                <ActivityIndicator size={50} />
              ) : (
                <>
                  <Button
                    onPress={handleAddAllocate}
                    buttonColor="#8d1c47"
                    textColor="white"
                    style={styles.modalButton}>
                    Submit
                  </Button>
                  <Button
                    onPress={() => setIsShowModel(false)}
                    buttonColor="#d2e6d4"
                    textColor="black"
                    style={styles.modalButton}>
                    cancel
                  </Button>
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
    height: rh(14),
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
    gap: rh(0.5),
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
    width: rw(80),
    height: rh(35),
    backgroundColor: '#fff',
    padding: rw(5),
    borderRadius: rf(4),
    elevation: 5,
  },
  modalContent: {
    alignItems: 'center',
    marginTop: rh(1),
    gap: rh(1.5),
  },
  modalTitle: {
    width: rw(50),
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: rf(2.6),
  },
  inputField: {
    borderWidth: 2,
    borderRadius: rf(3),
    width: rw(50),
    height: rh(6),
    textAlign: 'center',
    fontSize: rf(2),
  },
  modalButton: {
    width: rw(40),
    height: rh(5),
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
