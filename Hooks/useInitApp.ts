import { useRouter } from 'expo-router'
import { ChangeLoadedData } from 'lib/Store/Slices/UserSlice'
import { useDispatch } from 'react-redux'
import { GetAcknowledgments } from 'Services/GetAcknowledgments'
import { GetNfcs } from 'Services/GetNfs'
import { GetCompanys } from 'Services/Storage'

export const useInitApp = () => {
  const dispatch = useDispatch()
  const router = useRouter()

  const init = async () => {
    await Promise.all([
      GetNfcs(dispatch, router),
      GetAcknowledgments('monthly', dispatch, router),
      GetAcknowledgments('weekly', dispatch, router),
      GetAcknowledgments('daily', dispatch, router),
    ])
    console.log('loaded data ✅')
    await GetCompanys(dispatch, router)
    dispatch(ChangeLoadedData(true))
  }

  return { init }
}
