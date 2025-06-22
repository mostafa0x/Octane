// app/[...not-found].tsx
import { Image } from 'expo-image'
import { useRouter } from 'expo-router'
import { StyleSheet, Text, View } from 'react-native'
import { Button } from 'react-native-paper'

export default function NotFoundScreen() {
  const router = useRouter()

  return (
    <View style={{ gap: 50 }} className="bgColor flex-1 items-center justify-center ">
      <Image
        contentFit="cover"
        style={{ height: 325, width: 325 }}
        source={require('assets/LogowithoutTXT.png')}
      />
      <Text style={{ fontSize: 28, width: '100%', textAlign: 'center' }}>Not Found Page</Text>
      <Button
        style={{ width: 200, height: 60 }}
        contentStyle={{ height: 60 }}
        labelStyle={{ fontSize: 20 }}
        buttonColor="#8d1c47"
        textColor="white"
        onPress={() => router.replace('/')}>
        Back to Home
      </Button>
    </View>
  )
}
