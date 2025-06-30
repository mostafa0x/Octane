import { View, Text, Modal, StyleSheet } from 'react-native'
import React, { memo } from 'react'
import { Button, Searchbar } from 'react-native-paper'
import SerachCompanys from 'components/SerachCompanys'

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
  const styles = createStyles(width, height)

  return (
    <Modal
      animationType="slide"
      visible={isShowSerachCompany}
      onDismiss={() => setIsShowSerachCompany(false)}
      transparent>
      <View
        style={{
          flex: 1,
          backgroundColor: 'rgba(0,0,0,0.7)',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <View
          style={{
            backgroundColor: 'white',
            width: '90%',
            height: height * 0.7,
            padding: 20,
            borderRadius: 20,
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
            height={height}
            width={width}
            currentcompanys={currentcompanys}
            formik={formik}
            SelectCompanyID={SelectCompanyID}
            selectCompany={selectCompany}
          />
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-around',
              marginTop: height * 0.02,
            }}>
            <Button
              onPress={() => setIsShowSerachCompany(false)}
              contentStyle={{ width: width * 0.3, height: height * 0.05 }}
              labelStyle={{ fontSize: width * 0.042 }}
              textColor="white"
              buttonColor="#b86482">
              cancel
            </Button>
          </View>
        </View>
      </View>
    </Modal>
  )
}

const createStyles = (width: number, height: number) =>
  StyleSheet.create({
    keyboardAvoidingView: {
      flex: 1,
    },
    animatableView: {
      flex: 1,
      backgroundColor: 'black',
    },
    appBarContainer: {
      width: '100%',
      height: height * 0.12,
    },
    backgroundImage: {
      position: 'absolute',
      width: '100%',
      height: '30%',
    },
    mainContainer: {
      flex: 1,
      borderTopLeftRadius: 50,
      borderTopRightRadius: 50,
      backgroundColor: 'white',
      paddingHorizontal: width * 0.05,
      paddingVertical: height * 0.05,
    },
    searchContainer: {
      marginTop: 20,
      width: '100%',
    },
    uploadSection: {
      marginTop: height * 0.02,
    },
    buttonContainer: {
      marginTop: 0,
    },
  })

export default memo(SearchCompany_Modal)
