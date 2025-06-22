import { View, Text } from 'react-native'
import React, { memo } from 'react'
import { Button } from 'react-native-paper'

interface props {
  isError: string
  GetData: any
}

function ErrorScreen({ isError, GetData }: props) {
  return (
    <View className="flex-1 items-center justify-center gap-10">
      <Text style={{ fontSize: 26, color: 'red', textAlign: 'center', width: '100%' }}>
        {isError}
      </Text>
      <Button mode="contained" onPress={GetData}>
        Try Again
      </Button>
    </View>
  )
}

export default memo(ErrorScreen)
