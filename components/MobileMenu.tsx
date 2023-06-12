import Link from "next/link";
import { useRouter } from "next/router";

interface MobileMenuProps {
    visible?: boolean;
}

const MobileMenu: React.FC<MobileMenuProps> = ({
    visible
}) => {
    const router = useRouter();
    const { query } = router;
    let { categoryName } = query;
    if (categoryName === undefined && !router.pathname.includes('search')) {
        categoryName = 'home';
    }

    if (!visible) {
        return null;
    }

    const scrollToSection = (sectionId: string) => {
        const section = document.getElementById(sectionId);
        if (section) {
          section.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <div className="bg-black w-56 absolute top-8 left-0 py-5 flex-col border-2 border-gray-800 flex">
            <Link href="/" className="flex flex-col gap-4">
                <div className={(categoryName === 'home' ? 'text-red-600' : 'text-white') + ' px-3 text-center hover:underline'}>
                    Home
                </div>
            </Link>

            <Link href="/category/series" className="flex flex-col gap-4">
                <div className={(categoryName === 'series' ? 'text-red-600' : 'text-white') + " px-3 text-center hover:underline"}>
                    Series
                </div>
            </Link>

            <Link href="/category/films" className="flex flex-col gap-4">
                <div className={(categoryName === 'films' ? 'text-red-600' : 'text-white') + " px-3 text-center hover:underline"}>
                    Films
                </div>
            </Link>

            <Link href="/category/new" className="flex flex-col gap-4">
                <div className={(categoryName === 'new' ? 'text-red-600' : 'text-white') + " px-3 text-center hover:underline"}>
                    New & Popular
                </div>
            </Link>

            <div onClick={() => scrollToSection('my-list')} className="flex flex-col gap-4">
                <div className="px-3 text-center text-white hover:underline">
                    My List
                </div>
            </div>
        </div>
    )
}

export default MobileMenu;