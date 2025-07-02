import { View, StyleSheet } from 'react-native'
import React, { memo } from 'react'
import { Image } from 'expo-image'
import { responsiveHeight as rh, responsiveWidth as rw } from 'react-native-responsive-dimensions'

function SpinnerLoading() {
  return (
    <View style={styles.container}>
      <Image contentFit="contain" style={styles.image} source={require('assets/loadingLogo.gif')} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: rw(50),
    height: rw(50),
  },
})

export default memo(SpinnerLoading)
