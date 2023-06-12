import { useRouter } from "next/router";

interface NavbarItemProps {
    label: string;
    url?: string;
    onClick?: () => void
}

const NavbarItem: React.FC<NavbarItemProps> = ({
    label,
    onClick,
    url
}) => {
    const router = useRouter();
    const { query } = router;
    let { categoryName } = query;
    if (categoryName === undefined) {
        categoryName = 'home';
    }

    return (
        <a onClick={onClick} className={(url && categoryName === url ? 'text-gray-400' : 'text-white') + ' cursor-pointer hover:text-gray-400 transition'}>
            {label}
        </a>
    )
}

export default NavbarItem;