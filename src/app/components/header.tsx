import React from "react"

interface HeaderTextProps {
    noMargin?: boolean,
    children: React.ReactNode 
}

export const HeaderText = ({ children, noMargin }: HeaderTextProps) => {
    return (
        <div className={`${!noMargin && "py-[16vh]"} font-semibold text-3xl md:text-6xl flex flex-col items-center justify-center text-white`}>
            {children}
        </div>
    )
}
