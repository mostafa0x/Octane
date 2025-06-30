import { API_BASE_URL } from 'config'
import { Router, useRouter } from 'expo-router'
import axiosClient from 'lib/api/axiosClient'
import { SetAllocated, SetSubmitted } from 'lib/Store/Slices/MainSlice'
import handleLoutOut from './handleLogOut'

interface dataFace {
  allocated: number
  submitted: number
}
export const GetNfcs = async (dispatch: any, router: Router) => {
  try {
    const res = await axiosClient.get(`${API_BASE_URL}/users/nfcs`)
    const data: dataFace = res.data
    dispatch(SetAllocated(data.allocated))
    dispatch(SetSubmitted(data.submitted))
  } catch (err: any) {
    if (err.status == 403) {
      handleLoutOut(dispatch, router)
    }
    throw err
  }
}
