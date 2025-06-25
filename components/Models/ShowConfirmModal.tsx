import { View, Text, Modal, StyleSheet, BackHandler } from 'react-native'
import React, { memo, useEffect } from 'react'
import { ActivityIndicator, Button, HelperText, Icon } from 'react-native-paper'

interface props {
  showConfirmModal: boolean
  setShowConfirmModal: (payload: boolean) => void
  formik: any
  errorApi: string | null
  isLoadingRes: boolean
  width: number
  height: number
}

function ShowConfirmModal_Modle({
  showConfirmModal,
  setShowConfirmModal,
  formik,
  errorApi,
  isLoadingRes,
  width,
  height,
}: props) {
  useEffect(() => {
    const backAction = () => {
      if (isLoadingRes) {
        return true
      }
      return false
    }
    const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction)
    return () => backHandler.remove()
  }, [isLoadingRes])

  useEffect(() => {
    const date = new Date()
    console.log(date.getTime())

    return () => {}
  }, [])

  return (
    <Modal
      visible={showConfirmModal}
      transparent
      animationType="fade"
      onRequestClose={() => !isLoadingRes && setShowConfirmModal(false)}>
      <View style={styles.centeredOverlay}>
        <View style={styles.confirmBox}>
          <Text style={styles.confirmTitle}>Confirm Submission</Text>
          {/* 
                {formik.values.image ? (
                  <View style={{ alignItems: 'center', marginVertical: 10 }}>
                    <Animatable.Image
                      animation="fadeIn"
                      duration={500}
                      source={{ uri: formik.values.image }}
                      style={{ width: 120, height: 120, borderRadius: 8 }}
                      resizeMode="cover"
                    />
                  </View>
                ) : null} */}
          {errorApi ? (
            <View style={{ marginTop: height * 0.04 }} className=" items-center">
              <Icon color="#e03c3c" size={100} source={'information'} />
              <HelperText style={{ fontSize: width * 0.042 }} visible={!!errorApi} type="error">
                {errorApi}
              </HelperText>
            </View>
          ) : (
            <View style={{ gap: 24, marginTop: height * 0.04 }}>
              <Text>
                📦 Company ID:{'  '}
                <Text
                  style={{
                    fontSize: width * 0.044,
                    fontWeight: 'bold',
                  }}>
                  {formik.values.company_id}
                </Text>
              </Text>
              <Text>
                📝 Submission Type:{'  '}
                <Text
                  style={{
                    fontSize: width * 0.044,
                    fontWeight: 'bold',
                  }}>
                  {formik.values.submission_type.split('_').join(' ')}
                </Text>
              </Text>
              <Text>
                🚚 Delivery Method:{'  '}
                <Text
                  style={{
                    fontSize: width * 0.044,
                    fontWeight: 'bold',
                  }}>
                  {formik.values.delivery_method.split('_').join(' ')}
                </Text>
              </Text>
              <Text>
                🕒 State Time:{'  '}
                <Text
                  style={{
                    fontSize: width * 0.044,
                    fontWeight: 'bold',
                  }}>
                  {formik.values.state_time.split('_').join(' ')}
                </Text>
              </Text>
              <Text>
                💳 Cards Submitted:{'  '}
                <Text
                  style={{
                    fontSize: width * 0.044,
                    fontWeight: 'bold',
                  }}>
                  {formik.values.cards_submitted}
                </Text>
              </Text>
            </View>
          )}

          {isLoadingRes ? (
            <View style={{ marginTop: height * 0.05 }} className=" items-center justify-center">
              <ActivityIndicator size={50} />
            </View>
          ) : (
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginTop: height * 0.05,
              }}>
              <Button
                mode="contained"
                onPress={() => {
                  //  setShowConfirmModal(false)
                  formik.handleSubmit()
                }}
                buttonColor="#4CAF50">
                {errorApi ? 'Try again' : 'Confirm'}
              </Button>
              <Button
                mode="outlined"
                onPress={() => setShowConfirmModal(false)}
                textColor="#f44336">
                Cancel
              </Button>
            </View>
          )}
        </View>
      </View>
    </Modal>
  )
}

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end',
  },
  modalContainer: {
    backgroundColor: 'white',
    padding: 20,
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 15,
  },
  optionBtn: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    backgroundColor: '#f2f2f2',
    borderRadius: 10,
    marginBottom: 10,
  },
  optionText: {
    fontSize: 16,
    textAlign: 'center',
  },
  centeredOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  confirmBox: {
    width: '85%',

    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 15,
    elevation: 5,
  },
  confirmTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
})

export default memo(ShowConfirmModal_Modle)
