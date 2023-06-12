import { useCallback, useEffect, useRef, useState } from "react";
import MobileMenu from "./MobileMenu";
import NavbarItem from "./NavbarItem";
import { BsBell, BsChevronDown, BsSearch } from 'react-icons/bs'
import AccountMenu from "./AccountMenu";
import { useRouter } from "next/router";
import Link from "next/link";

const TOP_OFFSET = 66;

const Navbar = () => {
    const [showMobileMenu, setShowMobileMenu] = useState(false);
    const [showAccountMenu, setShowAccountMenu] = useState(false);
    const [showBackground, setShowBackground] = useState(false);
    const router = useRouter();
    const searchInputRef = useRef(null);

    const scrollToSection = (sectionId: string) => {
        const section = document.getElementById(sectionId);
        if (section) {
          section.scrollIntoView({ behavior: 'smooth' });
        }
    };

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY >= TOP_OFFSET) {
                setShowBackground(true);
            } else {
                setShowBackground(false);
            }
        }

        window.addEventListener('scroll', handleScroll);

        // unmount
        return () => {
            window.removeEventListener('scroll', handleScroll);
        }
    }, [])

    const toggleMobileMenu = useCallback(() => {
        setShowMobileMenu((current) => !current);
    }, [])

    const toggleAccountMenu = useCallback(() => {
        setShowAccountMenu((current) => !current);
    }, []);

    const searchHandler = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        
        if (searchInputRef.current === null || (searchInputRef.current as HTMLInputElement).value === '') {
            return;
        }

        const searchInput = (searchInputRef.current as HTMLInputElement).value;
        router.push(`/search/${searchInput}`)
    }

    return (
        <nav className="w-full fixed z-40">
            <div className={`
                px-4
                md:px-16
                py-6
                flex
                flex-row
                items-center
                transition
                duration-500
                ${showBackground ? 'bg-zinc-900 bg-opacity-90' : ''}
            `}>
                <Link href="/"><img className="h-4 lg:h-7" src="/images/logo.png" alt="Logo"/></Link>
                {/* Only Desktop Screen */}
                <div className="
                    flex-row
                    ml-8
                    gap-7
                    hidden
                    lg:flex
                ">
                    <NavbarItem onClick={() => router.push('/')} url="home" label="Home"/>
                    <NavbarItem onClick={() => router.push('/category/series')} url="series" label="Series"/>
                    <NavbarItem onClick={() => router.push('/category/films')} url="films" label="Films"/>
                    <NavbarItem onClick={() => router.push('/category/new')} url="new" label="New & Popular"/>
                    <NavbarItem onClick={() => scrollToSection('my-list')} label="My List"/>
                </div>

                {/* only mobile screen */}
                <div onClick={toggleMobileMenu} className="lg:hidden flex flex-row items-center gap-1 md-gap-2 ml-4 cursor-pointer relative">
                    <p className="text-white text-sm">Browse</p>
                    <BsChevronDown size="15" className={`text-white transition ${showMobileMenu ? 'rotate-180' : 'rotate-0'}`}/>
                    <MobileMenu visible={showMobileMenu}/>
                </div>

                {/* every screen */}
                <div className="flex flex-row ml-auto gap-2 md:gap-7 items-center">
                    <form onSubmit={searchHandler} className={`text-xs md:text-lg rounded-full py-1.5 md:py-2 px-2 md:px-4 flex items-center ${showBackground ? 'bg-gray-200 bg-opacity-90' : 'bg-zinc-700'}`}>
                        <input ref={searchInputRef} id="searchKeyWord" type="text" className={`text-xs md:text-lg max-w-[110px] md:max-w-xs bg-transparent outline-none ml-2 flex-grow ${showBackground ? 'text-zinc-900 placeholder-zinc-900' : 'text-gray-200 placeholder-gray-200'}`} placeholder="Search..."/>
                        <button type="submit" className={`bg-transparent border-none ${showBackground ? 'text-zinc-900' : 'text-gray-200'}`}>
                            <BsSearch/>
                        </button>
                    </form>

                    <div onClick={toggleAccountMenu} className="flex flex-row items-center gap-2 cursor-pointer relative">
                        <div className="w-6 h-6 lg:w-10 lg:h-10 rounded-md overflow-hidden">
                            <img src="/images/default-blue.png" alt="Logo"/>
                        </div>

                        <BsChevronDown className={`text-white transition ${showAccountMenu ? 'rotate-180' : 'rotate-0'}`}/>
                        <AccountMenu visible={showAccountMenu}/>
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default Navbar;