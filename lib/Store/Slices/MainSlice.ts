import { createSlice } from '@reduxjs/toolkit'
import { MainSliceFace } from 'Types/Store/MainSliceFace'

interface ActionPayLoad {
  payload: {
    data: any
    period: string
  }
  type: string
}

const initialState: MainSliceFace = {
  allocated: 0,
  submitted: 0,
  acknowledgments_Current: [],
  acknowledgments_Daily: [],
  acknowledgments_Weekly: [],
  acknowledgments_Monthly: [],
}
const MainSlice = createSlice({
  name: 'MainSlice',
  initialState,
  reducers: {
    SearchAcknowledgments: (state, action) => {
      const keyword = action.payload.toLowerCase()
      const sourceList = state.acknowledgments_Current

      const filtered = sourceList.filter(
        (item: any) =>
          item.company.name.toLowerCase().includes(keyword) ||
          item.company.id.toLowerCase().includes(keyword)
      )

      state.acknowledgments_Current = filtered
    },
    SetAllocated: (state, action) => {
      state.allocated = action.payload
    },
    SetSubmitted: (state, action) => {
      state.submitted = action.payload
    },
    SetAcknowledgments_Current: (state, action) => {
      if (action.payload == 'daily') {
        state.acknowledgments_Current = state.acknowledgments_Daily
      } else if (action.payload == 'weekly') {
        state.acknowledgments_Current = state.acknowledgments_Weekly
      } else if (action.payload == 'monthly') {
        state.acknowledgments_Current = state.acknowledgments_Monthly
      }
    },
    SetAcknowledgments: (state, action: ActionPayLoad) => {
      if (action.payload.period == 'daily') {
        state.acknowledgments_Daily = action.payload.data
      } else if (action.payload.period == 'weekly') {
        state.acknowledgments_Weekly = action.payload.data
      } else if (action.payload.period == 'monthly') {
        state.acknowledgments_Monthly = action.payload.data
      }
      console.log(`loaded ${action.payload.period}`)
    },
  },
})

export const MainReducer = MainSlice.reducer
export const {
  SetAcknowledgments,
  SetAcknowledgments_Current,
  SetAllocated,
  SetSubmitted,
  SearchAcknowledgments,
} = MainSlice.actions
