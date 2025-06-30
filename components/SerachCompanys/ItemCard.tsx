import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import React, { memo, useCallback } from 'react'
import { CompanyFace } from 'Types/ItemList'
import { Button } from 'react-native-paper'

interface Props {
  item: CompanyFace
  height: number
  width: number
  formik: any
  SelectCompanyID: (id: number, name: string) => void
  selectCompany: number
}

const ItemCard_CS = memo(({ item, width, formik, SelectCompanyID, selectCompany }: Props) => {
  const styles = createStyles(width)
  const isSelected = formik.values?.company_id === item.id

  const handlePress = useCallback(() => {
    if (selectCompany === item.id) {
      SelectCompanyID(0, '')
    } else {
      SelectCompanyID(item.id, item.name)
    }
  }, [item.id, item.name, selectCompany, SelectCompanyID])

  const shortName = item.name

  return (
    <View style={styles.container}>
      <View style={styles.nameContainer}>
        <Text style={styles.nameText}>{shortName}</Text>
      </View>

      <View style={styles.codeContainer}>
        <Text style={styles.codeText}>{item.code}</Text>
      </View>

      <TouchableOpacity style={styles.buttonContainer}>
        <Button
          onPress={handlePress}
          style={styles.button}
          contentStyle={styles.buttonContent}
          buttonColor={isSelected ? '#b86482' : '#8d1c47'}
          textColor="white"
          compact
          mode="contained">
          {isSelected ? 'Cancel' : 'Select'}
        </Button>
      </TouchableOpacity>
    </View>
  )
})

const createStyles = (width: number) =>
  StyleSheet.create({
    container: {
      width: width * 0.9,

      padding: width * 0.02,
      height: '100%',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      borderBottomWidth: 1,
      borderBottomColor: 'gray',
    },
    nameContainer: {
      width: '40%',
    },
    nameText: {
      fontSize: width * 0.032,
      fontWeight: '500',
    },
    codeContainer: {
      width: '30%',
      alignItems: 'center',
    },
    codeText: {
      fontSize: width * 0.035,
    },
    buttonContainer: {
      width: '30%',
      marginLeft: width * 0.05,
    },
    button: {
      width: '50%',
      borderRadius: 6,
    },
    buttonContent: {
      height: 36,
    },
  })

export default ItemCard_CS
