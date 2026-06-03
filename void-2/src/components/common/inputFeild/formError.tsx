'use client'
import type { ErrorType } from "@/util/hooks/zodValidation";

type Props = {
  errors?:string;
};

export default function FormError({errors}: Props) {
  if (!errors) return null;
  
  const message = errors;

  if(!message) return null;

  console.log(message);

  return <div className="font medium text-[red]/70">{message}</div>;
}