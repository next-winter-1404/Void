'use client'
import { useState, useRef, useEffect, Dispatch, SetStateAction, useActionState } from "react";
import { redirect, useRouter } from "next/navigation";
import { Api } from "@/util/service/api";

import {removeAction} from "@/util/service/addAndEditHouseAction/action";

interface propss {
  id:number
  open:boolean;
  setOpen:Dispatch<SetStateAction<boolean>>
}

export default function DropdownMenu({id,open,setOpen}:propss) {
 
  const [state,formAction,pending] = useActionState(removeAction,null);

  useEffect(()=>{
    console.log(state);
    if(state?.success){
        setTimeout(()=>window.location.reload(),2000);
    }
  },[state])

  return(
    <form action={formAction}
      className="absolute left-0 top-8 min-w-[140px] bg-white border border-zinc-200 rounded-xl shadow-md z-50 overflow-hidden"
      dir="rtl"
    >
      <input name="id" type="hidden" value={id}/>
      <button
        type="button"
        onClick={() => setOpen(false)}
        className="flex items-center justify-between w-full px-4 py-2.5 text-sm text-green-700 hover:bg-zinc-50 border-b border-zinc-100"
      >
        <span>فعال کردن</span>
        <span className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center text-xs">✓</span>
      </button>

      <button
        type="button"
        onClick={() => { redirect(`/dashboard/house_editPage/${id}?step=basic-info`); }}
        className="flex items-center justify-between w-full px-4 py-2.5 text-sm text-zinc-700 hover:bg-zinc-50 border-b border-zinc-100"
      >
        <span>ویرایش</span>
        <span className="w-5 h-5 rounded-full bg-zinc-100 flex items-center justify-center text-xs">✎</span>
      </button>

      <button
        type="submit"
        // onClick={() =>setOpen(false)}
        className="flex items-center justify-between w-full px-4 py-2.5 text-sm text-red-600 hover:bg-zinc-50"
      >
        <span>حذف</span>
        <span className="w-5 h-5 rounded-full bg-red-100 flex items-center justify-center text-xs">✕</span>
      </button>
    </form>
  );
}