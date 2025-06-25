import { View, Text, Modal, StyleSheet } from 'react-native'
import React, { memo } from 'react'
import { ActivityIndicator, Button, HelperText } from 'react-native-paper'

interface props {
  showConfirmModal: boolean
  setShowConfirmModal: (payload: boolean) => void
  formik: any
  errorApi: string | null
  isLoadingRes: boolean
}

function ShowConfirmModal_Modle({
  showConfirmModal,
  setShowConfirmModal,
  formik,
  errorApi,
  isLoadingRes,
}: props) {
  return (
    <Modal
      visible={showConfirmModal}
      transparent
      animationType="fade"
      onRequestClose={() => setShowConfirmModal(false)}>
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
          <View style={{ gap: 24, marginTop: 40 }}>
            <Text>📦 Company ID: {formik.values.company_id}</Text>
            <Text>📝 Submission Type: {formik.values.submission_type}</Text>
            <Text>🚚 Delivery Method: {formik.values.delivery_method}</Text>
            <Text>🕒 State Time: {formik.values.state_time}</Text>
            <Text>💳 Cards Submitted: {formik.values.cards_submitted}</Text>
          </View>

          <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 50 }}>
            {isLoadingRes ? (
              <View className=" items-center justify-center">
                <ActivityIndicator size={50} />
              </View>
            ) : (
              <Button
                mode="contained"
                onPress={() => {
                  //  setShowConfirmModal(false)
                  formik.handleSubmit()
                }}
                buttonColor="#4CAF50">
                Confirm
              </Button>
            )}
            <HelperText visible={!!errorApi} type="error">
              {errorApi}
            </HelperText>
            {isLoadingRes ? null : (
              <Button
                mode="outlined"
                onPress={() => setShowConfirmModal(false)}
                textColor="#f44336">
                Cancel
              </Button>
            )}
          </View>
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
