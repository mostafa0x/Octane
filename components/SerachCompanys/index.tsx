import { View, Text, StyleSheet } from 'react-native'
import React, { memo, useRef } from 'react'
import * as Animatable from 'react-native-animatable'
import { FlashList } from '@shopify/flash-list'
import { CompanyFace } from 'Types/ItemList'
import ItemCard_CS from './ItemCard'
import { HelperText, Searchbar } from 'react-native-paper'

type AnimatableView = Animatable.View

interface Props {
  height: number
  width: number
  currentcompanys: CompanyFace[]
  formik: any
  selectCompany: number
  SelectCompanyID: (id: number, name: string) => void
  setIsShowSerachCompany: any
}

const SerachCompanys = ({
  height,
  width,
  currentcompanys,
  formik,
  selectCompany,
  SelectCompanyID,
  setIsShowSerachCompany,
}: Props) => {
  const animRef = useRef<AnimatableView>(null)
  const styles = createStyles(height, width)

  return (
    <Animatable.View
      ref={animRef}
      animation="fadeIn"
      duration={200}
      easing="ease-in-out"
      style={styles.container}>
      <FlashList
        data={currentcompanys}
        extraData={selectCompany}
        estimatedItemSize={80}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.listContent}
        renderItem={({ item }) => (
          <ItemCard_CS
            item={item}
            height={height}
            width={width}
            formik={formik}
            SelectCompanyID={SelectCompanyID}
            selectCompany={selectCompany}
            setIsShowSerachCompany={setIsShowSerachCompany}
          />
        )}
        ListEmptyComponent={() => (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>no company with this name or code.</Text>
          </View>
        )}
      />
    </Animatable.View>
  )
}

const createStyles = (height: number, width: number) =>
  StyleSheet.create({
    container: {
      height: height * 0.5,
      width: '100%',
      padding: 2,
      borderRadius: 10,
    },
    listContent: {
      paddingBottom: 0,
    },
    emptyContainer: {
      marginTop: 50,
      alignItems: 'center',
    },
    emptyText: {
      fontSize: width * 0.032,
      opacity: 0.7,
      width: '100%',
      textAlign: 'center',
    },
  })

export default memo(SerachCompanys)
