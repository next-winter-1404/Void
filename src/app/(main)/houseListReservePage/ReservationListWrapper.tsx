'use client'
import { useTransition, useEffect, useRef } from "react";
import { useSearchParams } from "next/navigation";
import Loading from "@/app/loading";

interface Props {
  children: React.ReactNode;
}

export default function ReservationListWrapper({ children }: Props) {
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();
  const isFirstRender = useRef(true);
  const prevParams = useRef(searchParams.toString());

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    const current = searchParams.toString();
    if (current !== prevParams.current) {
      prevParams.current = current;
      startTransition(() => {}); 
    }
  }, [searchParams]);

  return (
    <div className="relative w-full h-full">
      {isPending && (
        <div className="absolute inset-0 z-10 flex items-center justify-center bg-white/60">
          <Loading />
        </div>
      )}
      <div className={isPending ? "opacity-40 pointer-events-none" : ""}>
        {children}
      </div>
    </div>
  );
}