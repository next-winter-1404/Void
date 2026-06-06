import type { ErrorType } from "@/util/hooks/zodValidation"
export interface InputProps {
    name: string,
    InputValueDefault?:string,
    type: "password" | "text" | "email",
    id?:string,
    placeHolder:string,
    icon?:string
    label:string
    email?:string
    setEmail?:React.Dispatch<React.SetStateAction<any>> 
    errors?:string
    
}

export interface OtpInputProps {
  length?: number;
  onComplete?: (code: string) => void;
}