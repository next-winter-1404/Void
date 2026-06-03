"use client";

import { useEffect, useRef, useState, ClipboardEvent, KeyboardEvent, ChangeEvent } from "react";
import Image from "next/image"

//assets
import Timer from "@/assets/ico/auth/timer-ico.png"

//type
import type {OtpInputProps} from "@/types/input-type";

export default function OtpInput({ length = 6, onComplete }: OtpInputProps) {
  const [otp, setOtp] = useState<string[]>(Array(length).fill(""));
  const [timeLeft, setTimeLeft] = useState<number>(5);
  const inputsRef = useRef<HTMLInputElement[]>([]);


  useEffect(() => {
    if (timeLeft <= 0) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  
  useEffect(() => {
    if (otp.every((digit) => digit !== "")) {
      onComplete?.(otp.join(""));
    }
  }, [otp, onComplete]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>, index: number) => {
    const value = e.target.value;

    if (!/^\d?$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < length - 1) {
      inputsRef.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === "Backspace" && otp[index] === "" && index > 0) {
      inputsRef.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: ClipboardEvent<HTMLDivElement>) => {
    const pasted = e.clipboardData.getData("text").slice(0, length);

    if (!/^\d+$/.test(pasted)) return;

    const newOtp = pasted.split("").slice(0, length);
    setOtp([...newOtp, ...Array(length - newOtp.length).fill("")]);

    if (inputsRef.current[newOtp.length - 1]) {
      inputsRef.current[newOtp.length - 1].focus();
    }
  };

  const formatTime = (seconds: number): string => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s.toString().padStart(2, "0")}`;
  };



  return (
    <div className="flex flex-col items-center gap-4 w-full">
      <div dir="ltr" className="flex flex-row justify-between w-full" onPaste={handlePaste}>
        {otp.map((digit, index) => (
          <input
            required
            key={index}
            ref={(el) => {
              if (el) inputsRef.current[index] = el;
            }}
            type="text"
            maxLength={1}
            value={digit}
            onChange={(e) => handleChange(e, index)}
            onKeyDown={(e) => handleKeyDown(e, index)}
            className="w-[66px] max-md:w-[50px] h-[66px] max-md:h-[50px] text-center text-xl border-2 border-[#EAEAEA] outline-[black]/90 rounded-[16px]"
          />
        ))}
      </div>

      <div className="w-full flex justify-start">
      <div className=" bg-[#586CFF30] text-purple-700 px-4 py-2 rounded-full text-sm flex gap-2 font-medium items-center">
        {timeLeft !=0 && <Image alt='timer' src={Timer}/>}
        {timeLeft != 0 ? formatTime(timeLeft) : <button type="button" onClick={()=> window.location.reload()}>دریافت دوباره کد</button>}
      </div>
      </div>
    </div>
  );
}
