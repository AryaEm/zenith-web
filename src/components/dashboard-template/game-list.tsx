import Link from "next/link"
import Image from "next/image"
import { IGame } from "@/app/types"
import { getCookies } from "@/lib/server-cookie"
import { BASE_API_URL, BASE_IMAGE_GAME } from "../../../global"
import { get } from "@/lib/api-bridge"
import { AlertInfo } from "../alert"
import { IoIosArrowForward } from "react-icons/io";

const getGame = async (search: string): Promise<IGame[]> => {
    try {
        const TOKEN = await getCookies("token") || ""
        const url = `${BASE_API_URL}/game/quick-access?search=${search}`
        const { data } = await get(url, TOKEN)

        let result: IGame[] = []
        if (data?.status) result = [...data.data]
        return result
    } catch (error) {
        console.log(error)
        return []
    }
}

const GameList = async () => {
    const game: IGame[] = await getGame("")

    return (
        <>
            <div className="h-fit w-full flex justify-center primary">
                <div className="w-[70%] h-full relative z-[1] my-4">
                    <div className="flex w-full h-20 gap-5 items-center justify-start my-8">
                        <Link href={''} className="py-2 px-7 text-white text-opacity-60 border border-white border-opacity-40 rounded-full font-medium hover:bg-[#007AFF] hover:text-white transition-all duration-300 hover:border-transparent">All</Link>
                        <Link href={''} className="py-2 px-7 text-white text-opacity-60 border border-white border-opacity-40 rounded-full font-medium hover:bg-[#007AFF] hover:text-white transition-all duration-300 hover:border-transparent">New Trending</Link>
                        <Link href={''} className="py-2 px-7 text-white text-opacity-60 border border-white border-opacity-40 rounded-full font-medium hover:bg-[#007AFF] hover:text-white transition-all duration-300 hover:border-transparent">Best Seller</Link>
                        <Link href={''} className="py-2 px-7 text-white text-opacity-60 border border-white border-opacity-40 rounded-full font-medium hover:bg-[#007AFF] hover:text-white transition-all duration-300 hover:border-transparent">Tranding Free</Link>
                    </div>


                    {
                        game.length == 0 ?
                            <AlertInfo title="informasi">
                                No data Available
                            </AlertInfo>
                            :
                            <>
                                <div className="w-full h-fit my-5 rounded-xl flex flex-col gap-4">
                                    {game.map((data, index) => (
                                        <div key={`keyPrestasi${index}`} className={`w-full h-36 bg-white gamelistshadow bg-opacity-10 backdrop-blur-md rounded-xl flex items-center cursor-pointer border border-blue-500 sfprodisplay`}>
                                            <div className="w-1/4 h-full rounded-xl bg-[#007AFF]">
                                                <Image src={`${BASE_IMAGE_GAME}/${data.gambar}`} alt="preview" height={144} width={144} className="rounded-xl w-full h-full object-cover object-right" unoptimized />
                                            </div>
                                            <div className="flex w-3/4 h-full px-5 justify-between items-center">
                                                <div className="w-1/2 h-3/4 flex flex-col text-white">
                                                    <p className="text-xl font-medium">{data.name}</p>
                                                    <p className="text-lg my-px font-normal text-white text-opacity-50">{data.genre}</p>
                                                </div>
                                                <div className="w-1/2 h-3/4 flex flex-col items-end justify-between">
                                                    <p className="text-xl font-semibold text-white">
                                                        {data.harga === 0 ? "Free" : new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR" }).format(data.harga)}
                                                    </p>
                                                    <p className="text-base text-white text-opacity-60">
                                                        {new Date(data.tahun_rilis).toLocaleDateString("id-ID", { year: "numeric", month: "long", day: "numeric" })}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    ))}

                                    <div className="w-full h-fit flex justify-end sfprodisplay">
                                        <div className="bg-[#007AFF] w-[12%] rounded h-11 flex items-center justify-center cursor-pointer">
                                            <p className="text-white tracking-wide flex items-center gap-1">View all <IoIosArrowForward className=" font-bold" /> </p>
                                        </div>
                                    </div>
                                </div>
                            </>
                    }

                </div>
            </div>
        </>
    )
}

export default GameList