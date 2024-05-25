interface HeaderTextProps {
    children: React.ReactNode;
}

export const Header = ({ children }: HeaderTextProps) => {
    return (
        <h1 className="text-gradient-white font-bold tracking-tight text-3xl md:text-6xl">
            {children}
        </h1>
    );
};
