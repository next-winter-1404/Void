'use client'


interface submitType {
    subLabel:string
}

export default function SubmitBt ({subLabel}:submitType) {

    return (
    <button type="submit" className="bg-[#586CFF] p-3 px-33 rounded-[16px] text-[white] font-medium text-center">
     {subLabel}
    </button>
    )
}