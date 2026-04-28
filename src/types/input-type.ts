
export interface InputProps {
    name: string,
    type: "password" | "text" | "email",
    id?:string,
    placeHolder:string,
    icon?:string
    label:string
    email?:string
    setEmail?:React.Dispatch<React.SetStateAction<string>> 
    errors?:string | null
    
}

export interface OtpInputProps {
  length?: number;
  onComplete?: (code: string) => void;
}