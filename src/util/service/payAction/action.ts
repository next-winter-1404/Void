"use server";

import { getToken } from "../api/token";

export type PaymentFormState = {
  status: "idle" | "success" | "error";
  message: string;
  paymentUrl?: string;
  errors?: {
    amount?: string;
    description?: string;
    callbackUrl?: string;
  };
};

export async function createPayment(
  prevState: PaymentFormState,
  formData: FormData
): Promise<PaymentFormState> {
  const rawAmount = formData.get("amount");
  const description = formData.get("description") as string;
  const callbackUrl = "";
  const bookingId = Number(formData.get("bookingId"));

  // const errors: PaymentFormState["errors"] = {};

  const amount = Number(rawAmount);
  

  const payload = { amount, description, callbackUrl, bookingId };

  try {
    const token = await getToken();
    const res = await fetch(`http://188.121.111.8:3003/api/payments`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      const errorData = await res.json().catch(() => ({}));
      return {
        status: "error",
        message: errorData?.message ?? `خطا در ارسال درخواست. کد: ${res.status}`,
      };
    }

    const data = await res.json();

    return {
      status: "success",
      message: "درخواست پرداخت با موفقیت ایجاد شد!",
      paymentUrl: data?.paymentUrl,
    };
  } catch (err) {
    console.error("Payment API error:", err);
    return {
      status: "error",
      message: "خطای شبکه. لطفاً اتصال اینترنت خود را بررسی کنید.",
    };
  }
}