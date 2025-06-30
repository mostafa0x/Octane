import { useQuery } from '@tanstack/react-query'
import axiosClient from 'lib/api/axiosClient'
import { StringToNumber } from 'lodash'
import React from 'react'

export default function useReports(from: Date | null, to: Date | null) {
  async function GetReports() {
    try {
      const res = await axiosClient.get(`/admin/reports?start=${from}&end=${to}`)
      const data = res.data
      console.log(data)
      return data
    } catch (err: any) {
      throw err
    }
  }
  const reportsQuery = useQuery({
    queryKey: ['Reports', from && to],
    queryFn: GetReports,
    enabled: !!from && !!to,
  })
  return reportsQuery
}
