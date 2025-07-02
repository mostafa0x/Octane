import { useQuery } from '@tanstack/react-query'
import axiosClient from 'lib/api/axiosClient'
import { StringToNumber } from 'lodash'
import React from 'react'

export default function useReports(from: Date | null, to: Date | null) {
  const formatDate = (date: Date) => date.toISOString().split('T')[0]
  const fromDate = from && formatDate(from)
  const toDate = to && formatDate(to)

  async function GetReports() {
    if (!fromDate && !toDate) {
      throw 'Select the Date Frist !'
    }
    try {
      const res = await axiosClient.get(`/admin/reports?start=${fromDate}&end=${toDate}`)
      const data = res.data
      return data
    } catch (err: any) {
      throw err
    }
  }
  const reportsQuery = useQuery({
    queryKey: ['Reports', from && to],
    queryFn: GetReports,
    enabled: !!from && !!to,
    refetchOnWindowFocus: true,
    refetchInterval: 60000,
  })
  return reportsQuery
}
