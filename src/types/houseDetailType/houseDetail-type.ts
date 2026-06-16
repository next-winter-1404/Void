export interface houseDetailProps{
  houseDetail:{
    id:number,
   capacity:number,
   bathrooms:number,
   parking:number,
   rooms:number,
   photos:string[],
   price:number,
   discounted_price:number,
   tags:"apartment" | "villa" | "house";
   rate:number,
   caption:string,
   title?:string
   address?:string,
   sellerName?:string | undefined
   last_updated?:string
   favoriteId?:number
  }
}