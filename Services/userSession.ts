import AsyncStorage from '@react-native-async-storage/async-storage'

export const clearUserInfo = async () => {
  try {
    await AsyncStorage.multiRemove(['@userToken', '@userData'])
    return true
  } catch (error) {
    console.error('Error clearing user info:', error)
    throw `Error clearing user info:, ${error}`
  }
}
