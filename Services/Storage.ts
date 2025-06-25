// src/services/storage.ts
import AsyncStorage from '@react-native-async-storage/async-storage'
import { Router } from 'expo-router'
import axiosClient from 'lib/api/axiosClient'
import { changeIsLoadedUserData, fillUserInfo } from 'lib/Store/Slices/UserSlice'
import { userDataFace } from 'Types/Store/UserSliceFace'

export const storeUserInfo = async (
  userToken: string,
  userData: userDataFace,
  router: Router,
  dispatch: any
) => {
  try {
    await AsyncStorage.multiSet([
      ['@userData', JSON.stringify(userData)],
      ['@userToken', userToken],
    ])
    dispatch(fillUserInfo({ userToken, userData }))
    dispatch(changeIsLoadedUserData(true))
  } catch (error) {
    console.error('Error saving user info:', error)
  }
}

export const getUserInfo = async (dispatch: any) => {
  try {
    const store = await AsyncStorage.multiGet(['@userToken', '@userData'])
    const [userToken, userDataRaw] = store.map((item) => item[1])
    const userData = userDataRaw ? await JSON.parse(userDataRaw) : null
    dispatch(fillUserInfo({ userToken: userToken ?? '', userData }))
    dispatch(changeIsLoadedUserData(true))
  } catch (error) {
    console.error('Error reading user info:', error)
    return null
  }
}

export const clearUserInfo = async () => {
  try {
    await AsyncStorage.multiRemove(['@userToken', '@userData'])
    return true
  } catch (error) {
    console.error('Error clearing user info:', error)
    throw `Error clearing user info:, ${error}`
  }
}

export const GetCompanys = async () => {
  try {
    const companys = await AsyncStorage.getItem('@companys')
    if (!companys) {
      const res = await axiosClient.get('/admin/companies')
      const date = Date.now()
      const data = {
        data: res.data,
        time: date,
      }
      await AsyncStorage.setItem('@companys', JSON.stringify(data))
      console.log('done set copmanys')
      return
    }
    console.log('found')
  } catch (err: any) {
    console.log(err)

    throw err
  }
}
