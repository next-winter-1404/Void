import { Children, ReactNode } from "react";
import "@/app/globals.css";

import HeaderComponent from "@/components/common/Header/Header";
import FooterComponent from "@/components/common/Footer/Footer";

import { getToken,removeToken } from '@/util/service/api/token'

export default async function ({children,}: Readonly<{ children: React.ReactNode }>) {

  const token = await getToken();
  
  const removeTok =async ()=>{
      removeToken();
  }
  
    return (
         <>
        
          <header className="w-full  py-[50px]">
          <HeaderComponent token={token} />
          </header>
          <main  className="content">
            
          {children}
          </main>
          
        <footer className="w-full px-16 py-6">
          <FooterComponent />
          </footer>
         
      </>
    )

}