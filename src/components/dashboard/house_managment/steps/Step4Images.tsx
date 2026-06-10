"use client";

import { useActionState, useEffect, useRef, useState } from "react";
import { step4Action } from "@/util/service/addAndEditHouseAction/action";
import type { BaseStepProps } from "@/types/dashboard/houseManagmentType/type";
import SubmitBt from "@/components/common/SubmitBt";

import TitleCaption from "./compsOfStep/titleCaptionComp";

interface Step4ImagesProps extends BaseStepProps {
  images: { file: File | null; preview: string }[]
  setImages: React.Dispatch<React.SetStateAction<{ file: File | null; preview: string }[]>>
}

export default function Step4Images({accumulatedData,onStepDone,onBack,images,setImages}: Step4ImagesProps) {
  const [state, formAction,pending] = useActionState(step4Action, null);

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
  if (state?.ok && state?.data) {
    const newFiles     = images.filter((img) => img.file !== null).map((img) => img.file as File);
    const existingUrls = images.filter((img) => img.file === null).map((img) => img.preview);

    onStepDone({
      ...state.data,
      photos: newFiles,
      existingPhotos: existingUrls,
    });
  }
}, [state, onStepDone]);

// Replace form action with manual submit to inject files
const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();
  const fd = new FormData(e.currentTarget);

  // Remove any stale file inputs, re-append from state
  images.forEach((img) => {
    if (img.file) fd.append("photos", img.file);
  });

  formAction(fd);
};

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  const files = Array.from(e.target.files || [])
  const newImages = files.map((file) => ({
    file,                              // real File
    preview: URL.createObjectURL(file),
  }))
  setImages((prev) => [...prev, ...newImages])
}

  const removeImage = (index: number) => {
    setImages((prev) =>
      prev.filter((_, i) => i !== index)
    );
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="mt-5 flex flex-col items-center"
    >
      <div className="w-full">
        <span className="pr-4 text-[#888888] font-medium text-[14px]">آدرس ملک</span>
       <div className="font-semibold text-[20px] max-lg:text-[15px] pr-4">
        <span className="text-[#8CFF45] font-bold text-[22px] max-lg:text-[17px]"> یک تصویر بهتر از هزار کلمه.</span>
            <span> با قرار دادن عکس شانس دیده شدن ملک‌تان را ۵ برابر کنید</span> 
           
            </div>
       </div>
     <div className="flex flex-row items-center w-full justify-center gap-5 my-5 mb-10"> 
      <input
        type="hidden"
        name="_prev"
        value={JSON.stringify(accumulatedData)}
      />

      <input
        ref={inputRef}
        type="file"
        name="photos"
        multiple
        // accept="image/*"
        className="hidden"
        onChange={handleChange}
      />

      <div className="flex flex-wrap gap-4 max-lg:flex-col p-4 w-[60%] justify-center ">

         <div
        onClick={() => inputRef.current?.click()}
        className="flex cursor-pointer h-40 min-w-[200px]  items-center justify-center rounded-3xl border-2 border-dashed border-gray-300"
      >
        افزودن تصاویر
      </div>

        {images.map((image, index) => (
          <div
            key={index}
            className="relative overflow-hidden rounded-2xl"
          >
            <img
              src={image.preview}
              alt=""
              className="h-40 w-[200px] object-cover rounded-[16px] border-2 border-gray-300 "
            />

            <button
              type="button"
              onClick={() => removeImage(index)}
              className="absolute right-2 top-2 rounded-full bg-[white] shadow-md px-2 py-1 "
            >
              ✕
            </button>
          </div>
        ))}
      </div>
      </div>
      
   <div className="w-full flex flex-row max-lg:order-3 justify-end">
               <div className="w-[30%] max-lg:w-[70%] flex flex-row items-center  gap-2">
                <button onClick={onBack} type="button" className={` py-3 w-full rounded-[16px] border-1 border-gray-300 font-medium text-center`}>
                      مرحله قبل
                    </button>
                 <SubmitBt btColor="green" subLabel="مرحله بعد >"/>
               </div>
             </div>
      
    </form>
  );
}