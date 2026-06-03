import TestimonialSlider from "@/components/auth/sliderContainer/TestimonialSlider"

export default function authLayout({children}:Readonly<{children:React.ReactNode}>){

    return(
        
        <main dir="rtl" className="flex flex-row">

        <div className=" w-[43%] max-xl:w-full h-screen  flex flex-col items-center justify-center ">
            {children}
         </div>

         <div className=" w-[57%] p-3  max-xl:hidden  h-screen  flex flex-col items-end justify-center ">
            <TestimonialSlider/>
         </div>


        </main>
    )

}