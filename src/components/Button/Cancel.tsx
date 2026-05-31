import type { BtnProps } from "../../types/btn";
 export const CancelBtn=({text,onClick}:BtnProps)=>{
    return (
        <button onClick={onClick} className="w-fit h-10 sm:h-11
         md:h-12 lg:h-13 p-1 sm:p-1.5 md:p-2 lg:p-3
         bg-grey
         text-(--text-color)
         rounded-lg
         cursor-pointer
         text-sm sm:text-base md:text-lg
         font-medium
         transition-all duration-200">
            {text}
        </button>
    )
}