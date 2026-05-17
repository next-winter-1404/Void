import { Children, ReactNode } from "react";
import "@/app/globals.css";


export default function ({children,}: Readonly<{ children: React.ReactNode }>) {
  
    return (
         <>
        
      
          <main  className="content">
            
          {children}
          </main>
      
         
      </>
    )

}