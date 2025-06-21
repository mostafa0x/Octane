import { changeAuthLoading, fillUserInfo } from 'lib/Store/Slices/UserSlice'
import { clearUserInfo } from './Storage'
import { Router } from 'expo-router'
import { ClearMainData } from 'lib/Store/Slices/MainSlice'

export default async function handleLoutOut(dispath: any, router: Router) {
  try {
    dispath(changeAuthLoading(-2))
    await clearUserInfo()
    dispath(ClearMainData(null))
    dispath(fillUserInfo({ userData: null, userToken: null }))
    router.replace('/Auth')
    dispath(changeAuthLoading(0))
  } catch (err: any) {
    console.log(err)
  }
}
