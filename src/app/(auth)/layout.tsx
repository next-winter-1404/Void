

export default function authLayout({children}:Readonly<{children:React.ReactNode}>){

    return(
        <main dir="rtl" className="flex flex-row">
            {children}
        </main>
    )

}