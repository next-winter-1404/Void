import PaymentForm from "@/components/dashboard/paymentCom/payment";

interface Props {
  params: Promise<{ id: string }>;
}

export default async function PaymentPage({ params }: Props) {
  const { id } = await params;
  const bookingId = Number(id);

  return <PaymentForm bookingId={bookingId} />;
}