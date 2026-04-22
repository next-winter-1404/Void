import type { Metadata } from "next";
import "./globals.css";
import localFont from 'next/font/local'


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
        
        </body>

    </html>
  );
}
