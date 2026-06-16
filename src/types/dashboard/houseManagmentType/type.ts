export type WizardMode = "add" | "edit";

// export type category =("apartment" | "villa" | "house" | "land" | "commercial")[];

type categories =("apartment" | "villa" | "house" | "land" | "commercial")[];

// Step1 houseBaseInfo
export interface Step1Data {
  title: string;
  price: string;
  capacity:number
  transaction_type:"rental" | "mortgage" | "reservation" |"direct_purchase"; // deal type rental or direcet_purchase or ...     
  categories:string[]; //buildingType commercial or residential or can be apartmoent or else
  propertyType?: string;
  category?:string   // this one == categories but for choosing apartment and ..
  //propertyType === categories in mean just give categories in api 
  caption: string;
  
}

// Step2 HouseAddress
export interface Step2Data {
  address: string;
  lat?: number | null;
  lng?: number | null;
  location:{lat:number , lng:number}[]
}

export type yardType = "Private yard" | "Shared yard" | "Backyard" | "No yard";

// Step3 houseFeatures
export interface Step3Data {
  rooms: number;
  bathrooms: number;
  yard_type: yardType; 
  parking: number;   
  tags: string[];   
}

//Step4 houseImage
export interface Step4Data {
  photos: File[];
   existingPhotos?: string[];
}

// lastStep
export type AccumulatedData = Partial<
  Step1Data & Step2Data & Step3Data & Step4Data
>;


export interface StepActionState<T = AccumulatedData> {
  ok: boolean;
  data: T | null;
  errors: Record<string, string>;
}


export interface BaseStepProps {
  accumulatedData: AccumulatedData;
  onStepDone: (stepData: AccumulatedData) => void;
  onBack: () => void;
}

export type StepName =
  | "basic-info"
  | "address"
  | "amenities"
  | "images"
  | "review";
 
export const STEP_ORDER: StepName[] = [
  "basic-info",
  "address",
  "amenities",
  "images",
  "review",
];
 

export const STEP_LABELS: Record<StepName, string> = {
  "basic-info": "مشخصات اولیه",
  "address":    "آدرس",
  "amenities":  "امکانات",
  "images":     "تصاویر ملک",
  "review":     "تایید نهایی",
};


export interface HouseFormProps {
  mode: WizardMode;
  initialData?: AccumulatedData;
  houseId?: string;
}

export type step5Props = Partial<
  BaseStepProps & HouseFormProps
>;