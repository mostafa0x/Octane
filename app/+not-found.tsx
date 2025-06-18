// app/[...not-found].tsx
import { useRouter } from 'expo-router';
import { Image, StyleSheet, Text, Button, View } from 'react-native';

export default function NotFoundScreen() {
  const router = useRouter();

  return (
    <View className="flex-1 justify-center">
      <Text className="text-center text-6xl">Not Found Page</Text>
      <View className="ml-[160px] mt-56 w-52">
        <Button title="Back to Home" onPress={() => router.replace('/')} />
      </View>
    </View>
  );
}
