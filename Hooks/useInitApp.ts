import { ChangeLoadedData } from 'lib/Store/Slices/UserSlice'
import { useDispatch } from 'react-redux'
import { GetAcknowledgments } from 'Services/GetAcknowledgments'
import { GetNfcs } from 'Services/GetNfs'

export const useInitApp = () => {
  const dispatch = useDispatch()

  const init = async () => {
    await Promise.all([
      GetNfcs(dispatch),
      GetAcknowledgments('monthly', dispatch),
      GetAcknowledgments('weekly', dispatch),
      GetAcknowledgments('daily', dispatch),
    ])
    console.log('loaded data ✅')
    dispatch(ChangeLoadedData(true))
  }

  return { init }
}
