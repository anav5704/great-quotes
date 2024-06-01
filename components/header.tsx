import classNames from "classnames"

interface HeaderTextProps {
    children: React.ReactNode,
    className?: string
}


export const Header = ({ children, className }: HeaderTextProps) => {
    return (
        <h1 className={classNames(
            className,
            "text-gradient-white font-bold tracking-tight text-3xl md:text-6xl"
        )}>
            {children}
        </h1>
    )
}
