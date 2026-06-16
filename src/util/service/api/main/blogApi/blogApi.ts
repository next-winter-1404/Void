import { ReserveBody } from "@/types/reserveType/reserve-type";
import {ApiClient} from "@/util/service/api/apiClient";
import { availableMemory } from "process";

export const blogApi = (client:ApiClient)=> ({
   
  getBlog: (filters: Record<string, any>) => {
  const params = new URLSearchParams();
  Object.entries(filters).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== "") {
      if (Array.isArray(value)) {
        value.forEach(v => params.append(key, String(v)));
      } else {
        params.set(key, String(value));
      }
    }
  });

  const queryString = params.toString();
  const url = queryString ? `/api/blogs?${queryString}` : "/api/blogs";

  return client.get(url);
  },

  detailBlog:(id:number)=>client.get(`/api/blogs/${id}`),

  
})