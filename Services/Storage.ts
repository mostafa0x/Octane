// src/services/storage.ts
import AsyncStorage from '@react-native-async-storage/async-storage'
import { Router } from 'expo-router'
import axiosClient from 'lib/api/axiosClient'
import { SetCompanys } from 'lib/Store/Slices/CompanySlice'
import {
  changeImageProfile,
  changeIsLoadedUserData,
  fillUserInfo,
} from 'lib/Store/Slices/UserSlice'
import { CompanyFace } from 'Types/ItemList'
import { userDataFace } from 'Types/Store/UserSliceFace'
import handleLoutOut from './handleLogOut'

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
export const UpdataUserInfo = async (userData: userDataFace, newImage: string) => {
  try {
    const updatedUser = { ...userData, image: newImage }
    await AsyncStorage.setItem('@userData', JSON.stringify(updatedUser))
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

export const GetCompanys = async (dispatch: any, router: Router) => {
  try {
    const companys = await AsyncStorage.getItem('@companys')
    if (!companys) {
      const res = await axiosClient.get('/admin/companies')
      dispatch(SetCompanys(res.data.companies))
      const date = Date.now()
      const data = {
        data: res.data.companies,
        time: date,
      }
      await AsyncStorage.setItem('@companys', await JSON.stringify(data))
      console.log('done set copmanys')
      return
    }
    const companysJSON: { data: CompanyFace; time: string } = await JSON.parse(companys)
    const storedTime = parseInt(companysJSON.time)
    const now = Date.now()
    const expirdTime = 7 * 24 * 60 * 60 * 1000
    if (now - storedTime >= expirdTime) {
      await AsyncStorage.removeItem('@companys')
      GetCompanys(dispatch, router)
      console.log('Should Upate')
    } else {
      dispatch(SetCompanys(companysJSON.data))
      console.log('found')
    }
  } catch (err: any) {
    console.log(err)
    if (err.status == 403) {
      handleLoutOut(dispatch, router)
    }
    throw err
  }
}

export const UpdateCompanys = async (dispatch: any) => {
  try {
    const res = await axiosClient.get('/admin/companies')
    await AsyncStorage.removeItem('@companys')
    dispatch(SetCompanys(res.data.companies))
    const date = Date.now()
    const data = {
      data: res.data.companies,
      time: date,
    }
    await AsyncStorage.setItem('@companys', await JSON.stringify(data))
    console.log('done set copmanys')
    return
  } catch (err: any) {
    console.log(err)

    throw err
  }
}
