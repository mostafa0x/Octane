import AsyncStorage from '@react-native-async-storage/async-storage'
import { AxiosResponse } from 'axios'
import { SetCompanys } from 'lib/Store/Slices/CompanySlice'

export default async function SetCompaniesToStorage(dispatch: any, res: AxiosResponse) {
  dispatch(SetCompanys(res.data.companies))
  const data = {
    data: res.data.companies,
    etag: res.data.etag,
  }
  await AsyncStorage.setItem('@companys', JSON.stringify(data))
}
