import { IGame } from "@/app/types"
import { getCookies } from "@/lib/server-cookie"
import { BASE_API_URL } from "../../../global"
import { get } from "@/lib/api-bridge"
import { AlertInfo } from "../../components/alert"
import GameCard from "./game-card"
import Link from "next/link"

const getGameLogin = async (search: string): Promise<IGame[]> => {
    try {
        const TOKEN = await getCookies("token") || ""
        const url = `${BASE_API_URL}/game/games?search=${search}`
        const { status, data } = await get<IGame[]>(url, TOKEN); // << Tambahkan generic di sini
        return status ? data ?? [] : [];
    } catch (error) {
        console.log(error)
        return []
    }
}

const getGame = async (search: string): Promise<IGame[]> => {
    try {
        const TOKEN = await getCookies("token") || ""
        const url = `${BASE_API_URL}/game?search=${search}`
        const { status, data } = await get<IGame[]>(url, TOKEN); // << Tambahkan generic di sini
        return status ? data ?? [] : [];
    } catch (error) {
        console.log(error)
        return []
    }
}

export default async function GameList() {
    const token = await getCookies("token")
    const games = token ? await getGameLogin("") : await getGame("")

    // const gamesLogin = await getGameLogin("")
    // const games = await getGame("")

    console.log("Games:", games, "Type:", typeof games, "IsArray:", Array.isArray(games));


    if (!Array.isArray(games) || games.length === 0) {
        return <AlertInfo title="Informasi">No data Available</AlertInfo>
    }


    return (
        <div className="h-fit w-full flex justify-center primary">
            <div className="w-[70%] h-full relative z-[1] my-4">
                <div className="flex w-full h-20 gap-5 items-center justify-start my-8">
                    <Link href={''} className="py-2 px-7 text-white text-opacity-60 border border-white border-opacity-40 rounded-full font-medium hover:bg-[#007AFF] hover:text-white transition-all duration-300 hover:border-transparent">All</Link>
                    <Link href={''} className="py-2 px-7 text-white text-opacity-60 border border-white border-opacity-40 rounded-full font-medium hover:bg-[#007AFF] hover:text-white transition-all duration-300 hover:border-transparent">New Trending</Link>
                    <Link href={''} className="py-2 px-7 text-white text-opacity-60 border border-white border-opacity-40 rounded-full font-medium hover:bg-[#007AFF] hover:text-white transition-all duration-300 hover:border-transparent">Best Seller</Link>
                    <Link href={''} className="py-2 px-7 text-white text-opacity-60 border border-white border-opacity-40 rounded-full font-medium hover:bg-[#007AFF] hover:text-white transition-all duration-300 hover:border-transparent">Tranding Free</Link>
                </div>
                <div className="flex flex-col gap-4">
                    {games.map((game) => (
                        <GameCard key={game.id} game={game} />
                    ))}
                </div>
            </div>
        </div>
    )
}
