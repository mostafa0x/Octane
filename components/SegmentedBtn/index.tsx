import { View, Text, Keyboard, StyleSheet } from 'react-native'
import React, { memo, useEffect, useRef, useState } from 'react'
import { HelperText, SegmentedButtons } from 'react-native-paper'
import {
  responsiveHeight as rh,
  responsiveWidth as rw,
  responsiveFontSize as rf,
} from 'react-native-responsive-dimensions'

export interface btnArray {
  name: string
}

interface props {
  name: string
  formik: any
}

function SegmentedBtn({ name, formik }: props) {
  const [currentBtns, setCurrentBtns] = useState<btnArray[]>([])

  const cards_SubmittedBtns = useRef<btnArray[]>([
    { name: 'replacement' },
    { name: 'existing_customer' },
    { name: 'new_customer' },
  ])
  const delivery_MethodBtns = useRef<btnArray[]>([
    { name: 'office_receival' },
    { name: 'octane_employee' },
    { name: 'aramex' },
  ])
  const state_TimeBtns = useRef<btnArray[]>([{ name: 'on_Time' }, { name: 'Late' }])

  useEffect(() => {
    formik.setFieldTouched(name, false)
    if (name === 'submission_type') setCurrentBtns(cards_SubmittedBtns.current)
    else if (name === 'state_time') setCurrentBtns(state_TimeBtns.current)
    else if (name === 'delivery_method') setCurrentBtns(delivery_MethodBtns.current)
  }, [])

  return (
    <View>
      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
        <Text style={styles.label}>{name.split('_').join(' ')}</Text>
        <HelperText
          style={styles.helperText}
          type="error"
          visible={formik.touched?.[name] && !!formik.errors?.[name]}>
          {'*'}
          {formik.errors?.[name]}
        </HelperText>
      </View>

      <SegmentedButtons
        value={formik.values?.[name]}
        theme={{ colors: { primary: 'green' } }}
        onValueChange={(val) => {
          Keyboard.dismiss()
          if (!formik.touched[name]) {
            formik.setFieldTouched(name, true)
          }
          formik.setFieldValue(name, val)
        }}
        style={styles.segmentedContainer}
        buttons={currentBtns.map((btn) => ({
          value: btn.name,
          label: btn.name.split('_').join(' '),
          icon: formik.values?.[name] === btn.name ? 'check-bold' : '',
          checkedColor: 'green',
          uncheckedColor: 'red',
          style: {
            justifyContent: 'center',
            alignItems: 'center',
          },
          labelStyle: {
            color: 'black',
            textAlign: 'center',
            textAlignVertical: 'center',
            fontSize: formik.values?.[name] === btn.name ? rf(1.4) : rf(1.2),
            includeFontPadding: false,
          },
        }))}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  label: {
    fontSize: rf(1.8),
    marginBottom: rh(0.8),
    color: '#6C7278',
  },
  segmentedContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },

  helperText: {
    fontSize: rf(1.4),
    color: 'red',
    textAlign: 'right',
  },
})

export default memo(SegmentedBtn)
