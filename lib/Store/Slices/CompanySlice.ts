import { createSlice } from '@reduxjs/toolkit'
import { CompanySliceFace } from 'Types/Store/CompanySliceFace'

type ActionFace = {
  type: string
  payload: string
}
const initialState: CompanySliceFace = {
  companys: [],
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
      state.companys.push(...action.payload)
    },
  },
})

export const CompanyReducer = CompanySlice.reducer
export const { SetCompanys, GetSerachCompany } = CompanySlice.actions
