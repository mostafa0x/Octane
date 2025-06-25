import { ChangeLoadedData } from 'lib/Store/Slices/UserSlice'
import { useDispatch } from 'react-redux'
import { GetAcknowledgments } from 'Services/GetAcknowledgments'
import { GetNfcs } from 'Services/GetNfs'
import { GetCompanys } from 'Services/Storage'

export const useInitApp = () => {
  const dispatch = useDispatch()

  const init = async () => {
    await Promise.all([
      GetNfcs(dispatch),
      GetAcknowledgments('monthly', dispatch),
      GetAcknowledgments('weekly', dispatch),
      GetAcknowledgments('daily', dispatch),
    ])
    await console.log('loaded data ✅')
    await GetCompanys(dispatch)
    dispatch(ChangeLoadedData(true))
  }

  return { init }
}
