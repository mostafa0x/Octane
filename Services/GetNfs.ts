import { API_BASE_URL } from 'config'
import axiosClient from 'lib/api/axiosClient'
import { SetAllocated, SetSubmitted } from 'lib/Store/Slices/MainSlice'

interface dataFace {
  allocated: number
  submitted: number
}
export const GetNfcs = async (dispatch: any) => {
  try {
    const res = await axiosClient.get(`${API_BASE_URL}/users/nfcs`)
    const data: dataFace = res.data
    console.log('loaded info')

    dispatch(SetAllocated(data.allocated))
    dispatch(SetSubmitted(data.submitted))
  } catch (err: any) {
    throw err
  }
}
