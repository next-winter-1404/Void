import type { Metadata } from "next";
import "./lib/style/globals.css";


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

    <html lang="en" className={`h-full antialiased`} >
     


      <body className="layout">

        {children}
        
        </body>

    </html>
  );
}
