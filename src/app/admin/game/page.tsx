import { IGame } from "@/app/types"
import { getCookies } from "@/lib/server-cookie"
import { BASE_API_URL, BASE_IMAGE_GAME } from "../../../../global"
import { get } from "@/lib/api-bridge"
import { AlertInfo } from "@/components/alert/index"
import AddGame from "./addGame"
import EditGame from "./editGame"
import DeleteGame from "./deleteGame"
import Image from "next/image"
import Search from "../../search"

const getGame = async (search: string): Promise<IGame[]> => {
    try {
        const TOKEN = await getCookies("token") || ""
        const url = `${BASE_API_URL}/game?search=${search}`
        const response = await get<IGame[]>(url, TOKEN)
        // console.log("API GAME response:", response)
        const { status, data } = response
        return status ? data ?? [] : [];
    } catch (error) {
        console.log(error)
        return []
    }
}

const GamePage = async ({ searchParams }: { searchParams: { [key: string]: string | string[] | undefined } }) => {
    const search = searchParams.search ? searchParams.search.toString() : ``
    const game: IGame[] = await
        getGame(search)
    // console.log("game result:", game); 

    return (
        <div className="min-h-dvh primary flex justify-center pt-28 pb-10">
            <div className="w-3/4 h-fit ">

                <h4 className="text-7xl text-white font-bold mb-2">Games</h4>
                <p className="text-sm text-secondary my-4 text-white text-opacity-60">
                    This page displays game data, allowing games to view details,
                    search, and manage game items by adding, editing, or deleting them.
                </p>
                <div className="flex items-center my-12 ">
                    <div className="flex w-full max-w-md flex-grow h-10">
                        <Search url={`/admin/game`} search={search} />
                    </div>

                    <div className="ml-5">
                        <AddGame />
                    </div>
                </div>

                {
                    game.length == 0 ?
                        <AlertInfo title="informasi">
                            No data Available
                        </AlertInfo>
                        :
                        <>
                            <div className="w-full flex flex-wrap gap-6 justify-start">
                                {game.map((data, index) => (
                                    <div
                                        key={`keyGameCard${index}`}
                                        className="w-64 bg-[#1f2028] rounded-xl overflow-hidden shadow-md hover:shadow-teal-500/40 transition-shadow duration-300 flex-shrink-0"
                                    >
                                        <div className="w-full h-40 bg-[#323444] flex items-center justify-center">
                                            <Image
                                                width={256}
                                                height={160}
                                                src={`${BASE_IMAGE_GAME}/${data.gambar}`}
                                                className="w-full h-full object-cover"
                                                alt="preview"
                                                unoptimized
                                            />
                                        </div>
                                        <div className="p-4 text-white flex flex-col justify-between h-48">
                                            <div>
                                                <div className="text-teal-400 text-sm mb-1">
                                                    {data.genre.length > 28 ? data.genre.slice(0, 28) + '...' : data.genre}
                                                </div>
                                                <div className="text-lg font-semibold mb-2 line-clamp-2">{data.name}</div>
                                                <p className="text-sm text-gray-300 line-clamp-3">{data.deskripsi}</p>
                                            </div>
                                            <div className="mt-4 flex justify-between items-center">
                                                <span className="text-base font-medium">Rp {data.harga}</span>
                                                <div className="flex gap-2">
                                                    <DeleteGame selectedGame={data} />
                                                    <EditGame selectedGame={data} />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>


                        </>
                }

            </div>
        </div>
    )
}
export default GamePage