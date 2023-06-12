interface NavbarItemProps {
    label: string;
    onClick?: () => void
}

const NavbarItem: React.FC<NavbarItemProps> = ({
    label,
    onClick
}) => {
    return (
        <a onClick={onClick} className="text-white cursor-pointer hover:text-gray-300 transition">
            {label}
        </a>
    )
}

export default NavbarItem;