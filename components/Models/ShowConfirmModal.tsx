import { View, Text, Modal, StyleSheet, BackHandler } from 'react-native'
import React, { memo, useEffect } from 'react'
import { ActivityIndicator, Button, HelperText, Icon } from 'react-native-paper'
import { CompanyFace } from 'Types/ItemList'
import {
  responsiveHeight as rh,
  responsiveWidth as rw,
  responsiveFontSize as rf,
} from 'react-native-responsive-dimensions'

interface props {
  showConfirmModal: boolean
  setShowConfirmModal: (payload: boolean) => void
  formik: any
  errorApi: string | null
  isLoadingRes: boolean
  width: number
  height: number
  currCompany: CompanyFace | null
  setErrorApi: any
}

function ShowConfirmModal_Modle({
  showConfirmModal,
  setShowConfirmModal,
  formik,
  errorApi,
  isLoadingRes,
  currCompany,
  setErrorApi,
}: props) {
  useEffect(() => {
    const backAction = () => {
      if (isLoadingRes) return true
      setShowConfirmModal(false)
      return false
    }

    const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction)
    return () => {
      backHandler.remove()
      // setErrorApi(null)
    }
  }, [isLoadingRes])

  return (
    <Modal
      visible={showConfirmModal}
      transparent
      animationType="fade"
      onRequestClose={() => !isLoadingRes && setShowConfirmModal(false)}>
      <View style={styles.centeredOverlay}>
        <View style={styles.confirmBox}>
          <Text style={styles.confirmTitle}>Confirm Submission</Text>

          {errorApi ? (
            <View style={styles.errorContainer}>
              <Icon color="#e03c3c" size={rf(8)} source={'information'} />
              <HelperText style={styles.helperText} visible={!!errorApi} type="error">
                {errorApi}
              </HelperText>
            </View>
          ) : (
            <View style={styles.detailsContainer}>
              <Text style={styles.textItem}>
                📦 Company Name: <Text style={styles.boldText}>{currCompany?.name}</Text>
              </Text>
              <Text style={styles.textItem}>
                📦 Company Code: <Text style={styles.boldText}>{currCompany?.code}</Text>
              </Text>
              <Text style={styles.textItem}>
                📝 Submission Type:{' '}
                <Text style={styles.boldText}>
                  {formik.values.submission_type.split('_').join(' ')}
                </Text>
              </Text>
              <Text style={styles.textItem}>
                🚚 Delivery Method:{' '}
                <Text style={styles.boldText}>
                  {formik.values.delivery_method.split('_').join(' ')}
                </Text>
              </Text>
              <Text style={styles.textItem}>
                🕒 State Time:{' '}
                <Text style={styles.boldText}>{formik.values.state_time.split('_').join(' ')}</Text>
              </Text>
              <Text style={styles.textItem}>
                💳 Cards Submitted:{' '}
                <Text style={styles.boldText}>{parseInt(formik.values.cards_submitted)}</Text>
              </Text>
            </View>
          )}

          {isLoadingRes ? (
            <View style={styles.loadingContainer}>
              <ActivityIndicator size={rf(6)} />
            </View>
          ) : (
            <View style={styles.actionsContainer}>
              <Button mode="contained" onPress={formik.handleSubmit} buttonColor="#4CAF50">
                {errorApi ? 'Try again' : 'Confirm'}
              </Button>
              <Button
                mode="outlined"
                onPress={() => {
                  setShowConfirmModal(false)
                  setErrorApi(null)
                }}
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
  centeredOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.8)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  confirmBox: {
    width: rw(85),
    backgroundColor: '#fff',
    padding: rw(5),
    borderRadius: rw(4),
    elevation: 5,
  },
  confirmTitle: {
    fontSize: rf(3),
    fontWeight: 'bold',
    marginBottom: rh(2),
    textAlign: 'center',
  },
  detailsContainer: {
    gap: rh(2.5),
    marginTop: rh(2),
  },
  textItem: {
    fontSize: rf(1.5),
  },
  boldText: {
    fontWeight: '300',
    fontSize: rf(1.7),
    textDecorationLine: 'underline',
  },
  errorContainer: {
    marginTop: rh(3),
    alignItems: 'center',
  },
  helperText: {
    fontSize: rf(1.8),
  },
  loadingContainer: {
    marginTop: rh(4),
    alignItems: 'center',
    justifyContent: 'center',
  },
  actionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: rh(4),
  },
})

export default memo(ShowConfirmModal_Modle)
