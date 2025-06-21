import { changeAuthLoading, ChangeLoadedData, fillUserInfo } from 'lib/Store/Slices/UserSlice'
import { clearUserInfo } from './Storage'
import { Router } from 'expo-router'
import { ClearMainData } from 'lib/Store/Slices/MainSlice'

export default async function handleLoutOut(dispatch: any, router: Router) {
  try {
    dispatch(changeAuthLoading(-2))
    await clearUserInfo()
    dispatch(ClearMainData(null))
    dispatch(fillUserInfo({ userData: null, userToken: null }))
    dispatch(ChangeLoadedData(false))
    router.replace('/Auth')
    dispatch(changeAuthLoading(0))
  } catch (err: any) {
    console.log(err)
  }
}
