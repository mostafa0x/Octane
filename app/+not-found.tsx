// app/[...not-found].tsx
import { Image } from 'expo-image'
import { useRouter } from 'expo-router'
import { StyleSheet, Text, View } from 'react-native'
import { Button } from 'react-native-paper'
import {
  responsiveHeight as rh,
  responsiveWidth as rw,
  responsiveFontSize as rf,
} from 'react-native-responsive-dimensions'

export default function NotFoundScreen() {
  const router = useRouter()

  return (
    <View style={styles.container}>
      <Image
        contentFit="cover"
        style={styles.image}
        source={require('assets/LogowithoutTXT.png')}
      />
      <Text style={styles.text}>Not Found Page</Text>
      <Button
        style={styles.button}
        contentStyle={styles.buttonContent}
        labelStyle={styles.buttonLabel}
        buttonColor="#8d1c47"
        textColor="white"
        onPress={() => router.replace('/')}>
        Back to Home
      </Button>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff', // لو عندك bgColor class، غيّرها هنا حسب ما تحب
    justifyContent: 'center',
    alignItems: 'center',
    gap: rh(5),
  },
  image: {
    width: rw(65),
    height: rw(65),
  },
  text: {
    fontSize: rf(3.2),
    textAlign: 'center',
    width: '100%',
  },
  button: {
    width: rw(50),
    height: rh(7),
  },
  buttonContent: {
    height: rh(7),
  },
  buttonLabel: {
    fontSize: rf(2.5),
  },
})
