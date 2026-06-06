"use client";

import { useRef, useState, useActionState, useEffect } from "react";
import Image from "next/image";
import { Camera, XCircle } from "lucide-react";


interface AvatarUploadProps {
  initialAvatar: string;
  uploadAction: (prevState: unknown, formData: FormData) => Promise<{ avatarUrl?: string; error?: string }>;
}

export default function AvatarUpload({ initialAvatar, uploadAction }: AvatarUploadProps) {
  const [avatar, setAvatar] = useState(initialAvatar);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const uploadFormRef = useRef<HTMLFormElement>(null);
  const hiddenFileRef = useRef<HTMLInputElement>(null);

  const [uploadState, uploadDispatch, isPending] = useActionState(uploadAction, null);

  console.log(uploadState);

  useEffect(() => {
    if (uploadState?.avatarUrl) setAvatar(uploadState.avatarUrl);
  }, [uploadState]);

  
  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    if (!e.target.files?.[0]) return;
    setAvatar(URL.createObjectURL(e.target.files[0]));
    uploadFormRef.current?.requestSubmit();
  }

 
  async function handleDelete() {
      return "";
  }



  return (
    <div className="w-[200px]  h-[200px] max-lg:w-full flex items-center justify-center relative">

      <Image
        width={150}
        height={150}
        className={[
          "rounded-full shadow-md bg-[gray]/20 object-cover transition-opacity duration-200",
          isPending ? "opacity-40" : "opacity-100",
        ].join(" ")}
        alt="profileAvatar"
        src={""}
      />

      {isPending && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-7 h-7 border-2 border-gray-400 border-t-transparent rounded-full animate-spin" />
        </div>
      )}

      
      <form ref={uploadFormRef} action={uploadDispatch} className="hidden">
       
        <input
          ref={fileInputRef}
          type="file"
          name="avatar"
          accept="image/*"
          onChange={handleFileChange}
        />
        
        <input
          ref={hiddenFileRef}
          type="file"
          name="avatar"
          accept="image/*"
        />
      </form>

     
      <button
        type="button"
        disabled={isPending}
        onClick={() => fileInputRef.current?.click()}
        aria-label="تغییر تصویر"
        className="absolute top-6 right-0 w-10 h-10 rounded-full bg-green-400 hover:bg-green-500
                   flex items-center justify-center shadow-md transition-colors disabled:opacity-50"
      >
        <Camera size={20} className="text-black" />
      </button>

      
      <button
        type="button"
        disabled={isPending}
        onClick={handleDelete}
        aria-label="حذف تصویر"
        className="absolute bottom-6 right-0 w-10 h-10 rounded-full bg-red-400 hover:bg-red-500
                   flex items-center justify-center shadow-md transition-colors disabled:opacity-50"
      >
        <XCircle size={20} className="text-black" />
      </button>

    </div>
  );
}