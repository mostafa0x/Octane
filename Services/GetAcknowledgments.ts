import { API_BASE_URL } from 'config'
import { Router } from 'expo-router'
import axiosClient from 'lib/api/axiosClient'
import { SetAcknowledgments } from 'lib/Store/Slices/MainSlice'
import handleLoutOut from './handleLogOut'

export const GetAcknowledgments = async (period: string, dispatch: any, router: Router) => {
  try {
    const res = await axiosClient.get(`${API_BASE_URL}/users/acknowledgments?period=${period}`)
    const data = res.data.acknowledgments
    dispatch(SetAcknowledgments({ period, data: data }))
  } catch (err: any) {
    if (err.status == 403) {
      handleLoutOut(dispatch, router)
    }
    throw err
  }
}
