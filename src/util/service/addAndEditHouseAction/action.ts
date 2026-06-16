'use server'

import type { StepActionState, AccumulatedData } from "@/types/dashboard/houseManagmentType/type";


async function addHouse(_body: AccumulatedData): Promise<void> {}
async function editHouse(_id: string, _body: AccumulatedData): Promise<void> {}

import  {Api} from "@/util/service/api"
import { handleAsyncAction } from "../api/handleAsync";
import { action_result } from "@/types/action_Result";

function parsePrev(formData: FormData): AccumulatedData {
  const raw = formData.get("_prev");
  if (!raw || typeof raw !== "string") return {};
  try {
    return JSON.parse(raw) as AccumulatedData;
  } catch {
    return {};
  }
}

function getString(formData: FormData, key: string): string {
  const val = formData.get(key);
  return typeof val === "string" ? val.trim() : "";
}

function getNumber(formData: FormData, key: string): number {
  return Number(getString(formData, key)) || 0;
}


type transaction_type = "rental" | "mortgage" | "reservation" |"direct_purchase"; // deal type rental or direcet_purchase or ...     
type categories = "apartment" | "villa" | "house" | "land" | "commercial"; //buildingType commercial or residential or can be apartment or else

export async function step1Action(
  _prevState: any,
  formData: FormData
): Promise<StepActionState> {
  const prev    = parsePrev(formData);
  const title   = getString(formData, "title");
  const price   = getString(formData, "price");
  const capacity= getNumber(formData, "capacity");
  const transaction_type = formData.get("transaction_type") as transaction_type;
  const category= getString(formData,"category") ;
  const propertyType= getString(formData,"propertyType");
  const caption = getString(formData, "caption");
  
   const categories = [category,propertyType]

  return {
    ok: true,
    errors: {},
    data: {
      ...prev,
      title,
      price,
      capacity,
      transaction_type,
      categories,
      caption,
    },
  };
}


export async function step2Action(
  _prevState: any,
  formData: FormData
): Promise<StepActionState> {
  const prev = parsePrev(formData);
  const address = getString(formData, "address");
  const lat  = getNumber(formData, "lat");
  const lng  = getNumber(formData, "lng");
   
   const location = [{lat:lat,lng:lng}];
  
  return {
    ok: true,
    errors: {},
    data: {
      ...prev,
      address,
      location
    },
  };
}

type yardType = "Private yard" | "Shared yard" | "Backyard" | "No yard";

export async function step3Action(
  _prevState: any,
  formData: FormData
): Promise<StepActionState> {
  const prev   = parsePrev(formData);
  const rooms   = getNumber(formData, "rooms");
  const bathrooms = getNumber(formData, "bathrooms");
  const parking   = getNumber(formData,"parking");
  const yard_type = formData.get("yard_type") as yardType ;
  
  let tags: string[] = [];
  try {
    tags = JSON.parse(getString(formData, "tags") || "[]");
  } catch {
    tags = [];
  }


  return {
    ok: true,
    errors: {},
    data: {
      ...prev,
      rooms,
      bathrooms,
      parking,
      yard_type,
      tags,
    },
  };
}


export async function step4Action(
  _prevState:any,
  formData: FormData
): Promise<StepActionState> {
  const prev           = parsePrev(formData);
  // const mainImageIndex = getNumber(formData, "mainImageIndex");
  // const imageCount     = getNumber(formData, "imageCount");
  const photos = formData.getAll("photos") as File[];
  
  return {
    ok: true,
    errors: {},
    data: {
      ...prev,
      photos
      // mainImageIndex,
    },
  };
}


export async function submitAction(
  _prevState: any,
  formData: FormData
): Promise<any> {
  const mode    = getString(formData, "mode");      
  const houseId = getString(formData, "houseId");   

  
   let body: AccumulatedData
  try {
    body = JSON.parse(getString(formData, "_data"))
  } catch {
    return {success:false,data:{}}
  }

  const payload = new FormData()

  // Step 1 
  payload.append("title",            body.title ?? "")
  payload.append("price",            body.price ?? "")
  payload.append("capacity",         String(body.capacity ?? 0))
  payload.append("transaction_type", body.transaction_type ?? "")
  payload.append("caption",          body.caption ?? "")

  // categories 
  ;(body.categories ?? []).forEach((c) => payload.append("categories[]", c))

  // Step 2 
  payload.append("address", body.address ?? "")
  payload.append("lat",     String(body.lat ?? ""))
  payload.append("lng",     String(body.lng ?? ""))

  // Step 3
  payload.append("rooms",     String(body.rooms ?? 0))
  payload.append("bathrooms", String(body.bathrooms ?? 0))
  payload.append("parking",   String(body.parking ?? 0))
  payload.append("yard_type", body.yard_type ?? "")
  ;(body.tags ?? []).forEach((t) => payload.append("tags[]", t))

  // step4
  ;(body.photos ?? []).forEach((file) => {
    if (file instanceof File) payload.append("photos", file)
  })

  ;(body.existingPhotos ?? []).forEach((url) => {
    payload.append("existing_photos", url)
  })

  const api = await Api();

  if(mode === "add"){
     const responseA = await handleAsyncAction(api.HouseManageApi.AddHouse(body));
     return responseA;
     
    //  if(responseA?.success) {
    //     const photoResponse = await handleAsyncAction(api.HouseManageApi.uploadPhotoHouse(responseA?.data.id,body?.photos))
    //  }
      
  }else{
       const response = await handleAsyncAction(api.HouseManageApi.EditHouse(Number(houseId),body))
        
       return response;
     }
 
}


export  async function removeAction( _prevState: any,formData:FormData):Promise<any> {

  const id = getNumber(formData,"id");
  // console.log(id);

  const api = await Api();
  const remove = await handleAsyncAction(api.HouseManageApi.removeHouse(id));

  return remove;


}