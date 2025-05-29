"use client"

import { ReactNode, useEffect, useState } from "react"
import MenuItem from "./menu-item"
import { IoSearchOutline } from "react-icons/io5";
import Link from "next/link";
import { removeCookie, getCookie } from "@/lib/client-cookie"
// import { useRouter } from "next/navigation";

type MenuType = {
    id: string,
    path: string,
    label: string
}
type ManagerProp = {
    children: ReactNode,
    id: string,
    title: string,
    menuList: MenuType[]
}

export default function Navbar({ children, menuList }: ManagerProp) {
    // const router = useRouter()
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const token = getCookie("token");
        setIsLoggedIn(!!token);
    }, []);

    const handleLogout = () => {
        removeCookie("token")
        removeCookie("id")
        removeCookie("username")
        removeCookie("role")
        removeCookie("no_telp")
        removeCookie("profile_picture")
        setIsLoggedIn(false);
    };

    return (
        <>

            <div className="flex items-center fixed z-[999] w-full h-20 primary">

                {/* logo section */}
                <div className="w-fit ml-14 flex items-center">
                    <p className="text-white font-normal Aerospace text-4xl">Zenith</p>
                </div>
                {/* end logo section */}


                {/* Search bar section */}
                <div className="relative hidden md:flex items-center w-[260px] ml-10">
                    <IoSearchOutline className="absolute text-xl left-4 text-[#6E6E73]" />
                    <input
                        type="search"
                        placeholder="Search"
                        className="w-full h-10 pl-10 pr-4 rounded-xl bg-transparent border-2 border-[#f5f5f5] border-opacity-20 text-white text-opacity-70 outline-none placeholder-gray-500"
                    />
                </div>
                {/* end Search bar section */}


                {/* menu section */}
                <div className="w-fit hidden md:flex ml-auto mr-14">
                    <div className="px-5 flex" >
                        {
                            menuList.map((menu, index) => (
                                <MenuItem
                                    label={menu.label}
                                    path={menu.path}
                                    key={`keyMenu${index}`} />
                            ))
                        }
                    </div>

                    <div className="items-center gap-3 flex">
                        {!isLoggedIn && (<>
                            <Link href={'/signin'} className="items-center px-4 font-medium text-white ">
                                <span>Sign Up</span>
                            </Link>
                            <Link href={'/login'} className="items-center px-4 font-medium p-2 text-white bg-[#007AFF] rounded-lg">
                                <span>Sign In</span>
                            </Link>
                        </>)}
                        {isLoggedIn && (<Link href={'/'} className="flex items-center px-4 font-medium p-2 text-white bg-red-500 rounded-lg" onClick={handleLogout}>
                            <span>Logout</span>
                        </Link>)}
                    </div>

                </div>
                {/* menu section */}

            </div>

            <div >
                {children}
            </div>


        </>
    )
}