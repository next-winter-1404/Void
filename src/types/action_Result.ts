
export interface Response{
   success?:boolean,
   status?:number | string,
   data?:any ,
   message?:string,
   errors?:any
}

export type action_result = Response;