// src/services/storage.ts
import AsyncStorage from '@react-native-async-storage/async-storage'
import { Router } from 'expo-router'
import axiosClient from 'lib/api/axiosClient'
import { SetCompanys } from 'lib/Store/Slices/CompanySlice'
import { changeIsLoadedUserData, fillUserInfo } from 'lib/Store/Slices/UserSlice'
import { CompanyFace } from 'Types/ItemList'
import { userDataFace } from 'Types/Store/UserSliceFace'
import handleLoutOut from './handleLogOut'
import SetCompaniesToStorage from './SetCompaniesToStorage'

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

export const GetCompanys = async (dispatch: any, router: Router) => {
  try {
    const companys = await AsyncStorage.getItem('@companys')

    if (!companys) {
      const res = await axiosClient.get('/admin/companies')
      SetCompaniesToStorage(dispatch, res)
      console.log('not found')
      return
    }
    const companysJSON: { data: CompanyFace[]; etag: string } = await JSON.parse(companys)
    const checkRes = await axiosClient.get('/admin/companies', {
      headers: { 'If-None-Match': companysJSON.etag },
      validateStatus: (status) => (status >= 200 && status < 300) || status === 304,
    })
    if (checkRes.status == 304) {
      dispatch(SetCompanys(companysJSON.data))
      console.log('found')
    } else {
      SetCompaniesToStorage(dispatch, checkRes)
      console.log('update')
    }
  } catch (err: any) {
    console.log(err)
    if (err.status == 403 || err.status == 401) {
      handleLoutOut(dispatch, router)
    }
    throw err
  }
}

export const UpdateCompanys = async (dispatch: any) => {
  try {
    const res = await axiosClient.get('/admin/companies')
    await AsyncStorage.removeItem('@companys')
    SetCompaniesToStorage(dispatch, res)
    return
  } catch (err: any) {
    console.log(err)
    throw err
  }
}
