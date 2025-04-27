"use client"

import { IMenuCategory } from "@/app/types"
import { useState, useEffect } from "react"
import { getCookie } from "@/lib/client-cookie"
import { BASE_API_URL } from "../../../../global"
import { get } from "@/lib/api-bridge"
import { AlertInfo } from "@/components/alert/index"
import { useRouter, useSearchParams } from "next/navigation"

// icon 
import { PiBowlFoodFill, PiHamburgerFill } from "react-icons/pi";
import { MdEmojiFoodBeverage } from "react-icons/md";

const getMenuCategories = async (): Promise<IMenuCategory[]> => {
    try {
        const TOKEN = getCookie("token") || ""
        const url = `${BASE_API_URL}/menu/categories`;
        const { data } = await get(url, TOKEN);

        let result: IMenuCategory[] = [];
        if (data?.status && data?.menu_categories) result = [...data.menu_categories];

        return result;
    } catch (error) {
        console.log(error);
        return [];
    }
};

const MenuCategory = () => {
    // const menuCategories: IMenuCategory[] = getMenuCategories()
    const [category, setCategory] = useState<IMenuCategory[]>([])
    const searchParams = useSearchParams()
    const router = useRouter()
    const activeTag = searchParams.get("tag") || "all"; // Ambil tag dari URL, default "all"

    useEffect(() => {
        getMenuCategories().then(setCategory);
    }, []);

    const getCategoryIcon = (category: string) => {
        switch (category) {
            case "Food":
                return <PiBowlFoodFill className="text-xl text-white" />;
            case "Drink":
                return <MdEmojiFoodBeverage className="text-xl text-white" />;
            case "Snack":
                return <PiHamburgerFill className="text-xl text-white" />;
            default:
                return null;
        }
    };


    return (
        <>
            {
                category.length == 0 ?
                    <AlertInfo title="informasi">
                        No data Available
                    </AlertInfo>
                    :
                    <>
                        <div className="w-full lg:gap-0 gap-3 flex flex-wrap items-center sfprodisplay">

                            <div
                                onClick={() => router.push(`/cashier/menu?tag=all`)}
                                className={`flex h-10 cursor-pointer rounded mr-2 transition-all duration-300 px-6 items-center w-fit tracking-wide text-white bg-[#323444] ${activeTag === "all" ? "border border-teal-200" : "border-transparent"}`}>
                                All
                            </div>

                            {category.map((data, index) => {
                                const isActive = activeTag === data.category; // Cek apakah kategori ini aktif

                                return (
                                    <div
                                        onClick={() => router.push(`/cashier/menu?tag=${data.category}`)}
                                        key={`keyPrestasi${index}`}
                                        className={`flex h-10 cursor-pointer transition-all duration-300 border gap-2 rounded mr-2 items-center pl-4 w-36 tracking-wide text-white bg-[#323444] ${isActive ? "border-teal-200" : "border-transparent"}`}>
                                        <div className="h-6 w-6 flex items-center justify-center">
                                            {getCategoryIcon(data.category)}
                                        </div>
                                        {data.category}
                                    </div>
                                );
                            })}

                        </div>
                    </>
            }
        </>
    )
}

export default MenuCategory