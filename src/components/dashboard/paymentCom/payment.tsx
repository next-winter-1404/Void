"use client";

import { useActionState, useEffect } from "react";
import { createPayment, PaymentFormState } from "@/util/service/payAction/action";
import { redirect } from "next/navigation";
import toast_errorHandling from "@/util/hooks/errorHandling";

const initialState: PaymentFormState = {
  status: "idle",
  message: "",
};

function FieldError({ message }: { message?: string }) {
  if (!message) return null;
  return (
    <p className="mt-1.5 text-xs text-red-500 flex items-center gap-1" role="alert">
      <svg className="w-3.5 h-3.5 shrink-0" fill="currentColor" viewBox="0 0 20 20">
        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
      </svg>
      {message}
    </p>
  );
}

function InputField({
  label,
  name,
  type = "text",
  placeholder,
  error,
  suffix,
  readOnly,
  defaultValue,
}: {
  label: string;
  name: string;
  type?: string;
  placeholder?: string;
  error?: string;
  suffix?: string;
  readOnly?: boolean;
  defaultValue?: string | number;
}) {
  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={name} className="text-sm font-medium text-slate-700">
        {label}
      </label>
      <div className="relative">
        <input
          id={name}
          name={name}
          type={type}
          defaultValue={defaultValue}
          placeholder={placeholder}
          readOnly={readOnly}
          className={`
            w-full rounded-xl border px-4 py-3 text-sm text-slate-800 bg-white
            placeholder:text-slate-400 focus:outline-none focus:ring-2
            transition-all duration-150
            ${suffix ? "pl-16" : ""}
            ${readOnly ? "bg-slate-50 text-slate-500 cursor-default" : ""}
            ${error
              ? "border-red-300 focus:ring-red-200 focus:border-red-400"
              : "border-slate-200 focus:ring-blue-100 focus:border-blue-400"
            }
          `}
        />
        {suffix && (
          <span className="absolute left-0 top-0 bottom-0 w-14 flex items-center justify-center text-xs text-slate-400 border-r border-slate-200 font-medium">
            {suffix}
          </span>
        )}
      </div>
      <FieldError message={error} />
    </div>
  );
}

export default function PaymentForm({ bookingId }: { bookingId: number }) {
  const [state, formAction, isPending] = useActionState(createPayment, initialState);

  useEffect(()=>{
     console.log(state);
      if(state?.status === "success"){
       toast_errorHandling(200,"پرداخت انجام شد");
       setTimeout(()=>redirect("/dashboard"),2000);
     }
  },[state])

 

  if (state.status === "success") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center p-4" dir="rtl">
        <div className="w-full max-w-md">
          <div className="rounded-2xl border border-green-100 bg-white p-10 text-center shadow-xl shadow-slate-100">
            <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-green-50 ring-4 ring-green-100">
              <svg className="h-8 w-8 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 className="mb-2 text-xl font-bold text-slate-800">پرداخت انجام شد</h2>
            
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center p-4" dir="rtl">
      <div className="w-full max-w-md">

        {/* Header */}
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-600 shadow-lg shadow-blue-200">
            <svg className="h-7 w-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5z" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-slate-800">پرداخت آنلاین</h1>
          <p className="mt-1 text-sm text-slate-500">
            درخواست پرداخت برای رزرو شماره{" "}
            <span className="font-semibold text-blue-600">#{bookingId}</span>
          </p>
        </div>

        {/* Card */}
        <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-xl shadow-slate-100">

          {/* Global error banner */}
          {state.status === "error" && !state.errors && (
            <div className="mb-5 flex items-start gap-3 rounded-xl border border-red-100 bg-red-50 px-4 py-3">
              <svg className="mt-0.5 h-4 w-4 shrink-0 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
              <p className="text-sm text-red-600">{state.message}</p>
            </div>
          )}

          <form action={formAction} className="space-y-5">
            {/* Hidden bookingId — auto-filled from route param */}
            <input type="hidden" name="bookingId" value={bookingId} />

            <InputField
              label="مبلغ پرداخت"
              name="amount"
              type="number"
              placeholder="مثال: ۳۰۰۰۰۰"
              suffix="ریال"
              error={state.errors?.amount}
            />

            <InputField
              label="توضیحات"
              name="description"
              placeholder="توضیح کوتاهی درباره این پرداخت"
              error={state.errors?.description}
            />

            <InputField
              label="آدرس بازگشت"
              name="callbackUrl"
              type="hidden"
              defaultValue={"http/local3000"}
              error={state.errors?.callbackUrl}
            />

            <InputField
              label="شناسه رزرو"
              name="bookingIdDisplay"
              defaultValue={bookingId}
              readOnly
            />

            {/* Divider */}
            <div className="border-t border-slate-100 pt-1" />

            <button
              type="submit"
              disabled={isPending}
              className="
                w-full rounded-xl bg-blue-600 px-4 py-3 text-sm font-bold
                text-white hover:bg-blue-700 active:bg-blue-800
                disabled:opacity-50 disabled:cursor-not-allowed
                transition-all shadow-md shadow-blue-100
                focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2
              "
            >
              {isPending ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="h-4 w-4 animate-spin" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                  در حال پردازش...
                </span>
              ) : (
                "ایجاد درخواست پرداخت"
              )}
            </button>
          </form>
        </div>

        {/* Footer */}
        <p className="mt-4 text-center text-xs text-slate-400 font-mono">
          POST /api/payments
        </p>
      </div>
    </div>
  );
}