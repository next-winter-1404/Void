export interface filterParams{
   sort:"last_updated" | "price" | "area" | "created_at" //sorting in filter
   order:"ASC" | "DESC" //ASC:min to max & DESC: max to min
   propertyType:"apartment" | "villa" | "land" | "commercial" // categories in filter
   location:string



}