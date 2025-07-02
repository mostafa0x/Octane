import axiosClient from 'lib/api/axiosClient'

const UploadAvatar = async (stateForms: any) => {
  try {
    const res = await axiosClient.post(`/users/profile/image`, stateForms, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    const data = res.data
    return data
  } catch (err: any) {
    console.log(err)
    throw err
  }
}

export default UploadAvatar
