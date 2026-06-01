import HeaderComponent from "@/components/common/Header/Header";
import { getToken } from "@/util/service/api/token";

export default async function authLayout({children}:Readonly<{children:React.ReactNode}>){

    const token = await getToken() as string;

    return(
        <>
          <header className="w-full  py-[30px]">
          <HeaderComponent token={token} />
          </header>     

          <main dir="rtl" className="flex flex-row items-center h-screen w-full p-2">
         {children}
        </main>   
        </>
        
    )

}