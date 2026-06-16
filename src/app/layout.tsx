import type { Metadata } from "next";
import "./globals.css";
import localFont from 'next/font/local'
import { ThemeProvider } from "@/components/darkmode/theme-Provider"



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

    <html lang="en" suppressHydrationWarning style={{height:"full"}} className={Yekan.className} >
     
      <body className="layout" >

        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
          >
        {children}

        </ThemeProvider>


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
