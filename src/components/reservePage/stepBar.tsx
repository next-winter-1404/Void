'use client'

export default function Stepper({ currentStep }: { currentStep: string }) {

    const steps = [
  { id: "submit_Info", label: "ثبت اطلاعات",icon:"set-ico" },
  { id: "purchasing", label: "فرایند پرداخت",icon:"purchase-ico" },
  
];

  const activeIndex = steps.findIndex(s => s.id === currentStep);
 console.log(activeIndex)
  return (
    <div className="flex flex-row items-center w-full max-w-xl ">
      {steps.map((step, index) => {
        const isActive = index <= activeIndex;
        
        return (
          <div key={step.id} className="flex items-center flex-1">
            
            <div
            style={{backgroundImage:`url('/ico/reserve/${step.icon}.png')`}}
              className={`w-12 h-12 rounded-full border-2 flex items-center bg-[length:20px_20px] bg-no-repeat bg-center justify-center transition-all duration-300 shrink-0 ${
                isActive 
                  ? 'bg-blue-600 border-blue-600 text-white' 
                  : 'bg-white border-gray-300 text-gray-400'
              }`}
            >
             
             
            </div>

            
            {index < steps.length && (
              <div className="flex flex-col items-center flex-1 mx-2">
                <span className={`text-sm mb-1 ${isActive ? 'text-blue-600' : 'text-gray-400'}`}>
                  {step.label}
                </span>
                <div className="w-full h-[2px] bg-gray-300 relative overflow-hidden">
                  <div 
                    className={`h-full transition-all duration-500 ${isActive ? 'bg-blue-600 w-full' : 'w-0'}`} 
                  />
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
