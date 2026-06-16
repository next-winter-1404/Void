"use client";

import { useHouseForm } from "./useHouseForm";
import type { HouseFormProps, BaseStepProps } from "@/types/dashboard/houseManagmentType/type";


import Step1BasicInfo from "@/components/dashboard/house_managment/steps/Step1BasicInfo";
import Step2Address from "@/components/dashboard/house_managment/steps/Step2Address";
import Step3Amenities from "@/components/dashboard/house_managment/steps/Step3Amenities";
import Step4Images from "@/components/dashboard/house_managment/steps/Step4Images";
import Step5Review from "@/components/dashboard/house_managment/steps/Step5Review";


export default function HouseForm({ mode, initialData, houseId }: HouseFormProps) {

  const {
    images,
    setImages,
    currentStep,
    currentStepIndex,
    accumulatedData,
    onStepDone,
    onBack,
    isFirstStep,
    isLastStep,
    progress,
    steps,
  } = useHouseForm({ mode, initialData, houseId });

  const sharedStepProps: BaseStepProps = {
    accumulatedData,
    onStepDone,
    onBack,
  };

  

  function renderStep() {
    switch (currentStep) {
      case "basic-info": return <Step1BasicInfo {...sharedStepProps} />;
      case "address":    return <Step2Address   {...sharedStepProps} />;
      case "amenities":  return <Step3Amenities {...sharedStepProps} />;
      case "images":     return <Step4Images    {...sharedStepProps} images={images} setImages={setImages} />;
      case "review":
        return (
          <Step5Review
            accumulatedData={accumulatedData}
            onBack={onBack}
            mode={mode}
            houseId={houseId}
          />
        );
      default:
        return null;
    }
  }

  return (
    <div className="house-form-wizard">
     
      <div className="house-form-wizard__content">
        {renderStep()}
      </div>
    </div>
  );
}