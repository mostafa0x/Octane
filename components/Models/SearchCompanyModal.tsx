import { View, Modal, StyleSheet } from 'react-native'
import React, { memo } from 'react'
import { Button, Searchbar } from 'react-native-paper'
import SerachCompanys from 'components/SerachCompanys'
import {
  responsiveHeight as rh,
  responsiveWidth as rw,
  responsiveFontSize as rf,
} from 'react-native-responsive-dimensions'

interface SearchCompanyModalProps {
  isShowSerachCompany: boolean
  setIsShowSerachCompany: (show: boolean) => void
  searchBoxRef: React.RefObject<any>
  searchQuery: string
  formik: any
  height: number
  width: number
  handleClear: () => void
  handleSerach: (query: string) => void
  currentcompanys: any[]
  SelectCompanyID: any
  selectCompany: any
  getFontSize: number
}

function SearchCompany_Modal({
  isShowSerachCompany,
  setIsShowSerachCompany,
  searchBoxRef,
  searchQuery,
  formik,
  height,
  width,
  handleClear,
  handleSerach,
  currentcompanys,
  SelectCompanyID,
  selectCompany,
  getFontSize,
}: SearchCompanyModalProps) {
  return (
    <Modal
      animationType="slide"
      visible={isShowSerachCompany}
      onDismiss={() => setIsShowSerachCompany(false)}
      transparent>
      <View style={styles.overlay}>
        <View style={styles.modalContainer}>
          <View style={styles.searchContainer}>
            <Searchbar
              ref={searchBoxRef}
              placeholder="Search"
              inputStyle={{ fontSize: getFontSize }}
              value={searchQuery}
              onChangeText={handleSerach}
              onClearIconPress={handleClear}
            />
          </View>

          <SerachCompanys
            height={height}
            width={width}
            currentcompanys={currentcompanys}
            formik={formik}
            SelectCompanyID={SelectCompanyID}
            selectCompany={selectCompany}
            setIsShowSerachCompany={setIsShowSerachCompany}
          />

          <View style={styles.buttonWrapper}>
            <Button
              onPress={() => setIsShowSerachCompany(false)}
              contentStyle={styles.buttonContent}
              labelStyle={styles.buttonLabel}
              textColor="white"
              buttonColor="#b86482">
              Cancel
            </Button>
          </View>
        </View>
      </View>
    </Modal>
  )
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.7)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    backgroundColor: 'white',
    width: rw(90),
    height: rh(72),
    padding: rw(3),
    borderRadius: rw(4),
  },
  searchContainer: {
    marginTop: rh(1),
    width: '100%',
  },
  buttonWrapper: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: rh(2),
  },
  buttonContent: {
    width: rw(35),
    height: rh(5),
  },
  buttonLabel: {
    fontSize: rf(1.8),
  },
})

export default memo(SearchCompany_Modal)
