import { changeAuthLoading, fillUserInfo } from 'lib/Store/Slices/UserSlice'
import { clearUserInfo } from './Storage'
import { Router } from 'expo-router'

export default async function handleLoutOut(dispath: any, router: Router) {
  try {
    dispath(changeAuthLoading(-2))
    await clearUserInfo()
    dispath(fillUserInfo({ userData: null, userToken: null }))
    router.replace('/SignIn')
    dispath(changeAuthLoading(0))
  } catch (err: any) {
    console.log(err)
  }
}
