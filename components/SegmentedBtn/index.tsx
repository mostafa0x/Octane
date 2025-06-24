import { View, Text } from 'react-native'
import React, { memo, useEffect, useState } from 'react'
import { HelperText, SegmentedButtons } from 'react-native-paper'

export interface btnArray {
  name: string
  icon: string
}

interface props {
  name: string
  lable: string
  width: number
  height: number
  formik: any
}

function SegmentedBtn({ name, lable, width, height, formik }: props) {
  const [currentBtns, setCurrentBtns] = useState<btnArray[]>([])
  const cards_submittedBtns: btnArray[] = [
    { name: 'hi', icon: 'play' },
    { name: 'see', icon: 'play' },
  ]

  useEffect(() => {
    if (name === 'submission_type') setCurrentBtns(cards_submittedBtns)
  }, [])

  return (
    <View>
      <Text style={{ fontSize: width * 0.042, marginBottom: height * 0.008 }}>{lable}</Text>
      <SegmentedButtons
        value={formik.values?.[name]}
        onValueChange={formik.handleChange(name)}
        style={{ height: height * 0.05 }}
        buttons={currentBtns.map((btn) => ({
          value: btn.name,
          label: btn.name,
          icon: formik.values?.[name] == btn.name ? 'check-bold' : '',
          checkedColor: 'green',
          uncheckedColor: 'red',

          labelStyle: {
            textAlignVertical: 'center',
            height: height * 0.03,
            fontSize: width * 0.046,

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
