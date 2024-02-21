export type MapItemSuggestion = Readonly<{
    addressZH: string
    nameZH: string
    x: number
    y: number
    nameEN: string
    addressEN: string
  }>
  
  export type MapNearBySuggestion = Readonly<{
    address?: string
    additionalInfoValue?: string[]
    name?: string
    x: number
    y: number
    additionalInfoKey?: string[]
  }>