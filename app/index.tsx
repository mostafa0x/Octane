import { useMenuContext } from 'Providers/MenuProvider'
import { View } from 'react-native'
import { Text, IconButton } from 'react-native-paper'

export default function Home() {
  const { openDrawer } = useMenuContext()

  return (
    <View style={{ flex: 1 }}>
      <IconButton size={30} icon="menu" onPress={openDrawer} />

      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text variant="titleLarge">Home Screen</Text>
      </View>
    </View>
  )
}
