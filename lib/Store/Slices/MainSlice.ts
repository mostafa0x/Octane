import { createSlice } from '@reduxjs/toolkit'
import { acknowledgmentsFace, MainSliceFace } from 'Types/Store/MainSliceFace'

interface ActionPayLoad {
  payload: {
    data: any
    period: string
  }
  type: string
}
interface SerachpayloadFace {
  payload: {
    keyword: string
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
    PushNewAcknowledgment: (state, action) => {
      state.acknowledgments_Current = [action.payload, ...state.acknowledgments_Current]
      state.acknowledgments_Daily = [action.payload, ...state.acknowledgments_Daily]
      state.acknowledgments_Weekly = [action.payload, ...state.acknowledgments_Weekly]
      state.acknowledgments_Monthly = [action.payload, ...state.acknowledgments_Monthly]
    },
    SearchAcknowledgments: (state, action: SerachpayloadFace) => {
      const keyword = action.payload.keyword.toLowerCase()
      const GetsourceList = () => {
        if (action.payload.period == 'daily') {
          return state.acknowledgments_Daily
        } else if (action.payload.period == 'weekly') {
          return state.acknowledgments_Weekly
        } else if (action.payload.period == 'monthly') {
          return state.acknowledgments_Monthly
        }
        return state.acknowledgments_Daily
      }
      const sourceList = GetsourceList()

      const filtered = sourceList.filter((item: acknowledgmentsFace) => {
        return (
          item.company.name.toLowerCase().includes(keyword) ||
          item.company.code.toString().includes(keyword)
        )
      })
      //  console.log(filtered)

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
    },
    ClearMainData: (state, action) => {
      state.allocated = 0
      state.submitted = 0
      state.acknowledgments_Current = []
      state.acknowledgments_Daily = []
      state.acknowledgments_Monthly = []
      state.acknowledgments_Weekly = []
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
  ClearMainData,
  PushNewAcknowledgment,
} = MainSlice.actions
