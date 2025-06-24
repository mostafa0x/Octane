import { createSlice } from '@reduxjs/toolkit'
import { CompanySliceFace } from 'Types/Store/CompanySliceFace'

type ActionFace = {
  type: string
  payload: string
}
const initialState: CompanySliceFace = {
  companys: [
    { id: 1, name: 'xxx', code: 1 },
    { id: 2, name: 'zzz', code: 2 },
    { id: 4, name: 'vvv', code: 16 },
    { id: 3, name: 'kkj', code: 264 },
    { id: 5, name: 'bb', code: 154 },
    { id: 5, name: 'yyy', code: 6652 },
    { id: 6, name: '77', code: 155 },
    { id: 7, name: '44e', code: 212 },
  ],
  currentcompanys: [],
}

const CompanySlice = createSlice({
  name: 'CompanySlice',
  initialState,
  reducers: {
    GetSerachCompany: (state, action: ActionFace) => {
      const companys = state.companys
      const keyword = action.payload.toLowerCase()
      const fillterd = companys.filter((item) => {
        return item.name.toLowerCase().includes(keyword) || item.code.toString().includes(keyword)
      })
      state.currentcompanys = fillterd
    },
    SetCompanys: (state, action) => {
      state.companys = action.payload
    },
  },
})

export const CompanyReducer = CompanySlice.reducer
export const { SetCompanys, GetSerachCompany } = CompanySlice.actions
