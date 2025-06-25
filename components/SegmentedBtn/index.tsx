import { View, Text, Keyboard } from 'react-native'
import React, { memo, useEffect, useRef, useState } from 'react'
import { HelperText, SegmentedButtons } from 'react-native-paper'

export interface btnArray {
  name: string
}

interface props {
  name: string
  width: number
  height: number
  formik: any
}

function SegmentedBtn({ name, width, height, formik }: props) {
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
      <Text style={{ fontSize: width * 0.028, marginBottom: height * 0.008, color: '#6C7278' }}>
        {name.split('_').join(' ')}
      </Text>
      <SegmentedButtons
        value={formik.values?.[name]}
        onValueChange={(val) => {
          Keyboard.dismiss()
          if (!formik.touched[name]) {
            formik.setFieldTouched(name, true)
          }
          formik.setFieldValue(name, val)
        }}
        style={{ height: height * 0.035 }}
        buttons={currentBtns.map((btn) => ({
          value: btn.name,
          label: btn.name.split('_').join(' '),
          icon: formik.values?.[name] == btn.name ? 'check-bold' : '',
          checkedColor: 'green',
          uncheckedColor: 'red',

          labelStyle: {
            textAlignVertical: 'center',
            height: height * 0.017,
            fontSize: width * 0.025,

            color: 'black',
          },
        }))}
      />
      <HelperText
        style={{ fontSize: width * 0.03, color: 'red' }}
        type="error"
        visible={formik.touched?.[name] && !!formik.errors?.[name]}>
        {formik.errors?.[name]}
      </HelperText>
    </View>
  )
}

export default memo(SegmentedBtn)
