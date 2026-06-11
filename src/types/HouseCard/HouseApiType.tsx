export interface HousesApiType {
    id:number,
    title?:string,
    address?:string,
    photos?:string,
    rate?:string,
    discounted_price?:string,
    price:number,
    tags?:string,
    last_updated?:string,
    capacity?:number,
    location?:string
    categories?:string,
    bathrooms?:number,
    parking?:number,
    room?:number,
    yard_type?:null,
    num_comments?:number,
    discount_id?:null,
    transaction_type?:"mortgage" | "rental" | "reservation" | "direct purchase",
    sellerId?:number,
    sellerName?:string,
    caption?:string,
    bookings?:number,
    favoriteId?:null,
    isFavorite?:boolean

}
