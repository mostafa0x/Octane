import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import React, { memo, useCallback } from 'react'
import { CompanyFace } from 'Types/ItemList'
import { Button } from 'react-native-paper'
import { responsiveWidth as rw, responsiveHeight as rh } from 'react-native-responsive-dimensions'
import { RFValue } from 'react-native-responsive-fontsize'

interface Props {
  item: CompanyFace
  formik: any
  SelectCompanyID: (id: number, name: string) => void
  selectCompany: number
  setIsShowSerachCompany: any
}

const ItemCard_CS = memo(
  ({ item, formik, SelectCompanyID, selectCompany, setIsShowSerachCompany }: Props) => {
    const isSelected = formik.values?.company_id === item.id

    const handlePress = useCallback(() => {
      if (selectCompany === item.id) {
        SelectCompanyID(0, '')
      } else {
        SelectCompanyID(item.id, item.name)
        setIsShowSerachCompany(false)
      }
    }, [item.id, item.name, selectCompany, SelectCompanyID])

    return (
      <View style={styles.container}>
        <View style={styles.nameContainer}>
          <Text
            style={{
              fontSize: RFValue(10),
              fontWeight: '500',
              color: '#333',
            }}>
            {item.name}
          </Text>
        </View>

        <View style={styles.codeContainer}>
          <Text
            style={{
              fontSize: RFValue(10),
              width: '100%',
              textAlign: 'center',
              color: '#333',
              fontWeight: '300',
            }}>
            {item.code}
          </Text>
        </View>

        <TouchableOpacity style={styles.buttonContainer}>
          <Button
            onPress={handlePress}
            style={[
              styles.button,
              {
                backgroundColor: isSelected ? '#b86482' : '#8d1c47',
              },
            ]}
            contentStyle={styles.buttonContent}
            textColor="white"
            compact
            labelStyle={{
              fontSize: RFValue(10),
              textAlign: 'center',
              textAlignVertical: 'center',
              includeFontPadding: false,
            }}
            mode="contained">
            {isSelected ? 'Cancel' : 'Select'}
          </Button>
        </TouchableOpacity>
      </View>
    )
  }
)

const styles = StyleSheet.create({
  container: {
    width: rw(100),
    paddingVertical: rh(1),
    paddingHorizontal: rw(3),
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  nameContainer: {
    width: rw(38),
  },

  codeContainer: {
    width: rw(20),
    alignItems: 'center',
  },
  codeText: {
    fontSize: RFValue(13),
    width: '100%',
    textAlign: 'center',
    color: '#555',
  },
  buttonContainer: {
    width: rw(20),
    alignItems: 'flex-end',
  },
  button: {
    borderRadius: rw(2),
    width: rw(20),
  },
  buttonContent: {
    height: rh(4.5),
  },
})

export default ItemCard_CS
