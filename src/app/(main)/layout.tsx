import { Children, ReactNode } from "react";
import "@/app/globals.css";


export default function ({children,}: Readonly<{ children: React.ReactNode }>) {
  
    return (
         <>
        
      
          <main dir="rtl" className="content">
          {children}
          </main>
      
         
      </>
    )

}