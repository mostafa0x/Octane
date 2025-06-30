import { changeIsLoadedUserData, ChangeLoadedData, fillUserInfo } from 'lib/Store/Slices/UserSlice'

import { Router } from 'expo-router'
import { ClearMainData } from 'lib/Store/Slices/MainSlice'
import { clearUserInfo } from './userSession'

export default async function handleLoutOut(dispatch: any, router: Router) {
  try {
    await clearUserInfo()
    dispatch(ClearMainData(null))
    dispatch(changeIsLoadedUserData(false))
    dispatch(ChangeLoadedData(false))
    dispatch(fillUserInfo({ userData: null, userToken: null }))
    // router.replace('/Auth')
  } catch (err: any) {
    console.log(err)
  }
}
