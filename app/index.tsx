import { Image } from 'expo-image';
import { Link } from 'expo-router';
import { View, Text } from 'react-native';
import { Button } from 'react-native-paper';
export default function Home() {
  return (
    <View className="backgroundColor flex-1">
      <Text>Hi</Text>
      <Link href={'/SignIn'}>
        <Button>Sign In</Button>
      </Link>
    </View>
  );
}
