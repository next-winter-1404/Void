
export type HouseCard = {
  id: string
  title: string
  location: string


  isDicounted:boolean
  oldPrice?: number
  discountPrice?:number
  discountPercent?:number

  image: string
  
  showBeds:boolean
  beds?: number

  showBath:boolean
  baths?: number
  
  showParking:boolean
  parking?: number

  showYard?:boolean
  yard?:string

  showPeople:boolean
  people?:number

  
}
