import { useQuery } from '@tanstack/react-query'
import axiosClient from 'lib/api/axiosClient'

export default function useGetUserInfo(userID: number) {
  const handleGetUserInfo = async () => {
    try {
      const res = await axiosClient.get(`/admin/users/acknowledgments/${userID}`)
      return res.data
    } catch (err: any) {
      console.error(err)
      throw err
    }
  }

  const UserInfo = useQuery({
    queryKey: ['userInfo', userID],
    queryFn: handleGetUserInfo,
    enabled: !!userID,
  })

  return UserInfo
}
