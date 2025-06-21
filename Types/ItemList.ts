export interface ItemListFace {
  company: CompanyFace
  cards_submitted: number
  submission_type: string
  delivery_method: string
  image: string
}

export interface CompanyFace {
  id: number
  code: number
  name: string
}
