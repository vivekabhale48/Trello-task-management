"use client"

import { useState } from "react"

export default function DropArea({onDrop}) {
    const [isDragged, setisDragged] = useState(false)
    return(
        <div 
        onDragEnter={()=> setisDragged(true)} 
        onDragLeave={() => setisDragged(false)} 
        onDrop={()=> {
            onDrop(); 
            setisDragged(false);
        }} 
        onDragOver={(e) => e.preventDefault()} 
        className={`${isDragged ? 'border-dashed border-[1.5px] border-[#797979] w-full h-[100px] my-3 text-[#797979] transition-all ease-in-out duration-200 opacity-100' : 'opacity-0'}`}
        >

            <span className="p-1">
                Drop Here
            </span>
            
        </div>
    )
}