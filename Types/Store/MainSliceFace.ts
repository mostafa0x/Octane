import { CompanyFace } from 'Types/ItemList'

export interface MainSliceFace {
  allocated: number
  submitted: number
  acknowledgments_Current: acknowledgmentsFace[]
  acknowledgments_Daily: acknowledgmentsFace[]
  acknowledgments_Weekly: acknowledgmentsFace[]
  acknowledgments_Monthly: acknowledgmentsFace[]
}

export interface acknowledgmentsFace {
  submission_date: string
  company: CompanyFace
  cards_submitted: number
  submission_type: string
  delivery_method: string
  image: string
  state_time: string
}
