"use client";

import { useState } from "react";
import DatePicker, { DateObject } from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";

interface InputDateProps {
    label:string,
    name:string,
}

export default function CustomDateInput({name,label}:InputDateProps) {
  const [checkIn, setCheckIn] = useState<DateObject | null>(null);

  const IsoFormat = checkIn?.toDate().toISOString(); 

  return (
    <div className="w-[50%]">
      <label style={{ marginBottom: 6, display: "block" }}>{label}</label>

      <DatePicker
        value={checkIn}
        onChange={(date) => setCheckIn(date as DateObject)}
        calendar={persian}
        locale={persian_fa}
        format="YYYY/MM/DD"
        style={{
          display: "none",
          width : "100%"
        }}
        render={(value, openCalendar) => {
          return (
            <div
              onClick={openCalendar}
              style={{
               width: 250,
                height: 50,
                borderRadius: 16,
                border: "1px solid #d3d3d3",
                display: "flex",
                alignItems: "center",
                textIndent:"40px",
                fontSize: 16,
                cursor: "pointer",
               
              }}
            >
              {value || "تاریخ را وارد کنید"}
            </div>

            
          );
        }}
      />

      <input name={name} id={name} type="hidden" value={IsoFormat ? IsoFormat.toString() : ""} />
    </div>
  );
}
