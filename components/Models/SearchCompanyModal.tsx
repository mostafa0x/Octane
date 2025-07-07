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
  handleClear: () => void
  handleSerach: (query: string) => void
  currentcompanys: any[]
  SelectCompanyID: any
  selectCompany: any
  getFontSize: number
  themeMode: string
}

function SearchCompany_Modal({
  isShowSerachCompany,
  setIsShowSerachCompany,
  searchBoxRef,
  searchQuery,
  formik,
  handleClear,
  handleSerach,
  currentcompanys,
  SelectCompanyID,
  selectCompany,
  getFontSize,
  themeMode,
}: SearchCompanyModalProps) {
  return (
    <Modal
      animationType="slide"
      visible={isShowSerachCompany}
      onDismiss={() => setIsShowSerachCompany(false)}
      transparent>
      <View style={styles.overlay}>
        <View
          style={{
            width: rw(100),
            height: rh(68),
            padding: rw(3),
            borderRadius: rw(4),
            backgroundColor: themeMode == 'dark' ? 'black' : 'white',
          }}>
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
            themeMode={themeMode}
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
