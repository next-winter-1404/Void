import type { Metadata } from "next";
import "./globals.css";
import localFont from 'next/font/local'

import { Toaster } from "react-hot-toast"

const Yekan = localFont({
   src:"../assets/font/iran-yekan/IRANYekanMedium.ttf",
   style:"normal",
})


export const metadata: Metadata = {
  title: "auth",
  description: "authentication",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (

    <html lang="en" style={{height:"full"}} className={Yekan.className} >
     
      <body className="layout" >

        {children}

        <Toaster 
          position="top-right"
          toastOptions={{
            duration: 4000,
          }}
        />
        
        </body>

    </html>
  );
}
