export default function authLayout({children}:Readonly<{children:React.ReactNode}>){

    return(
        
        <main dir="rtl" className="flex flex-row items-center h-screen w-full p-2">
         {children}
        </main>
    )

}