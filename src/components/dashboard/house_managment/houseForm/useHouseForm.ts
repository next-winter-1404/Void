"use client";

import { useCallback, useEffect, useState } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import {
  STEP_ORDER,
  STEP_LABELS,
  type StepName,
  type AccumulatedData,
  type HouseFormProps,
} from "@/types/dashboard/houseManagmentType/type";


export interface UseHouseFormReturn {
  currentStep: StepName;
  currentStepIndex: number;
  accumulatedData: AccumulatedData;
  currentStepLabel: string;
  onStepDone: (stepData: AccumulatedData) => void;
  onBack: () => void;
  isFirstStep: boolean;
  isLastStep: boolean;
  progress: number;
  steps: { name: StepName; label: string }[];
  images: { file: File | null; preview: string }[];
  setImages: React.Dispatch<React.SetStateAction<{ file: File | null; preview: string }[]>>
}



export function useHouseForm({
  initialData,
}: HouseFormProps): UseHouseFormReturn {
  const router       = useRouter();
  const pathname     = usePathname();
  const searchParams = useSearchParams();

  const stepFromUrl = searchParams.get("step") as StepName | null;
  const currentStep: StepName =
    stepFromUrl && STEP_ORDER.includes(stepFromUrl)
      ? stepFromUrl
      : STEP_ORDER[0];

  const currentStepIndex = STEP_ORDER.indexOf(currentStep);

 
  const [accumulatedData, setAccumulatedData] = useState<AccumulatedData>(
    initialData ?? {}
  );

  useEffect(() => {
    if (initialData && Object.keys(initialData).length > 0) {
      setAccumulatedData(initialData);
    }
  }, [1]);

 
  const goToStep = useCallback(
    (name: StepName) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set("step", name);
      router.push(`${pathname}?${params.toString()}`);
    },
    [router, pathname, searchParams]
  );


  const onStepDone = useCallback(
    (stepData: AccumulatedData) => {
      setAccumulatedData(stepData); 
      const nextIndex = currentStepIndex + 1;
      if (nextIndex < STEP_ORDER.length) {
        goToStep(STEP_ORDER[nextIndex]);
      }
    },
    
    [currentStepIndex, goToStep]
  );


  const onBack = useCallback(() => {
    const prevIndex = currentStepIndex - 1;
    if (prevIndex >= 0) {
      goToStep(STEP_ORDER[prevIndex]);
    }
  }, [currentStepIndex, goToStep]);

  useEffect(() => {
    if (!stepFromUrl || !STEP_ORDER.includes(stepFromUrl as StepName)) {
      const params = new URLSearchParams(searchParams.toString());
      params.set("step", STEP_ORDER[0]);

      router.replace(`${pathname}?${params.toString()}`);
    }
  }, []); 

  const [images, setImages] = useState<{ file: File | null; preview: string }[]>(
  () => (initialData?.photos ?? []).map((p) => ({ file: null, preview: p as unknown as string }))
);

useEffect(() => {
  if (initialData?.photos?.length) {
    setImages(initialData.photos.map((p) => ({ file: null, preview: p as unknown as string })));
  }
}, [initialData]);

useEffect(() => {
  const handler = (e: BeforeUnloadEvent) => {
    if (Object.keys(accumulatedData).length > 0) {
      e.preventDefault()
    }
  }
  window.addEventListener("beforeunload", handler)
  return () => window.removeEventListener("beforeunload", handler)
}, [accumulatedData])

  return {
    images,
    setImages,
    currentStep,
    currentStepIndex,
    currentStepLabel: STEP_LABELS[currentStep],
    accumulatedData,
    onStepDone,
    onBack,
    isFirstStep: currentStepIndex === 0,
    isLastStep:  currentStepIndex === STEP_ORDER.length - 1,
    progress:    Math.round((currentStepIndex / (STEP_ORDER.length - 1)) * 100),
    steps: STEP_ORDER.map((name) => ({ name, label: STEP_LABELS[name] })),
  };
}