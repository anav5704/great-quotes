import classNames from "classnames"

interface HeaderTextProps {
    children: React.ReactNode,
    noMargin?: boolean,
}

export const Header = ({ children, noMargin }: HeaderTextProps) => {
    return (
        <div className={classNames(
            !noMargin && "py-[16vh]",
            "text-gradient-white font-black tracking-normal text-3xl md:text-6xl flex flex-col items-center justify-center"
        )}>
            {children}
        </div>
    )
} 