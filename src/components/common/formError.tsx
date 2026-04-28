'use client'
type Props = {
  message?: string | null;
};

export default function FormError({ message }: Props) {
  if (!message) return null;
  console.log(message);

  return <div className="border p-2 bg-[red]">{message}</div>;
}