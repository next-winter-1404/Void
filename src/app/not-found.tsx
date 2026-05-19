'use client';
export default function notFound() {
  return (
    <>
      <div className="w-full min-h-screen bg-[red]/50 flex flex-col items-center justify-center gap-5">
      
        <h1 className="text-[30px] font-bold">404 - Not Found</h1>
        <button className="w-[80px] h-[30px] bg-[red]/50 rounded-[5px] text-[14px] font-medium hover:bg-[red]/70 duration-100" 
        onClick={()=>window.location.href="/home"}>go home</button>
       
      </div>        
    </>
  )
}