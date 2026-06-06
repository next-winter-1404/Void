'use client'
interface submitType {
    subLabel:string,
    btColor?: "red" | "green"

}

export default function SubmitBt ({subLabel,btColor}:submitType) {

    const BG = btColor === "red" ? "#FF5555" : btColor ==="green" ? "#8CFF45" : "#586CFF"
    

    return (
    <button type="submit" style={{backgroundColor:BG}} className={` py-3 w-full rounded-[16px] text-[white] font-medium text-center`}>
     {subLabel}
    </button>
    )
}