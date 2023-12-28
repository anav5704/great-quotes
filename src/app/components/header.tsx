import React from "react"

interface HeaderTextProps {
    children: React.ReactNode 
}

export const HeaderText = ({ children }: HeaderTextProps) => {
    return (
        <div className="font-semibold py-[15vh] text-3xl md:text-6xl flex flex-col items-center justify-center text-white">
            {children}
        </div>
    )
}
