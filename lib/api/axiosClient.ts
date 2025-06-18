import axios from 'axios'
import { API_BASE_URL } from '../../config'
import AsyncStorage from '@react-native-async-storage/async-storage'

const axiosClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
})

axiosClient.interceptors.request.use(
  async (config) => {
    const token = await AsyncStorage.getItem('@userToken')

    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }

    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

export default axiosClient
