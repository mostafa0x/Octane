import { useQuery } from '@tanstack/react-query'
import axiosClient from 'lib/api/axiosClient'

export default function useGetUserInfo(userID: number) {
  const handleGetUserInfo = async () => {
    try {
      const res = await axiosClient.get(`/admin/users/acknowledgments/${userID}`)
      return res.data
    } catch (err: any) {
      throw err
    }
  }

  const UserInfo = useQuery({
    queryKey: ['userInfo', userID],
    queryFn: handleGetUserInfo,
    enabled: !!userID,
    staleTime: 30000,
  })

  return UserInfo
}
