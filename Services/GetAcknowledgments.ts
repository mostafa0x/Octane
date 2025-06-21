import { API_BASE_URL } from 'config'
import axiosClient from 'lib/api/axiosClient'
import { SetAcknowledgments } from 'lib/Store/Slices/MainSlice'

export const GetAcknowledgments = async (period: string, dispatch: any) => {
  try {
    const res = await axiosClient.get(`${API_BASE_URL}/users/acknowledgments?period=${period}`)
    const data = res.data.acknowledgments
    dispatch(SetAcknowledgments({ period, data: data }))
  } catch (err: any) {
    //   console.log(err)
    throw err
  }
}
