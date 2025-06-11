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
        const { status, data } = await get<IGame[]>(url, TOKEN); // << Tambahkan generic di sini
        return status ? data ?? [] : [];
    } catch (error) {
        console.log(error)
        return []
    }
}

const MenuPage = async ({ searchParams }: { searchParams: { [key: string]: string | string[] | undefined } }) => {
    const search = searchParams.search ? searchParams.search.toString() : ``
    const game: IGame[] = await getGame(search)
    console.log("game result:", game); //  Tambahkan di sini

    return (
        <div className="min-h-dvh primary flex justify-center pt-32 pb-10">
            <div className="w-3/4 h-fit">

                <h4 className="text-7xl text-white font-bold mb-2">Menus</h4>
                <p className="text-sm text-secondary my-4 text-white text-opacity-60">
                    This page displays menu data, allowing menus to view details,
                    search, and manage menu items by adding, editing, or deleting them.
                </p>
                <div className="flex items-center my-12 ">
                    <div className="flex w-full max-w-md flex-grow h-10">
                        <Search url={`/manager/menu`} search={search} />
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
                            <div className="w-full flex flex-wrap justify-center gap-12">
                                {game.map((data, index) => (
                                    <div key={`keyPrestasi${index}`} className={`flex w-full h-80 cursor-pointer`}>
                                        <div className="h-80 w-[45%] bg-[#323444] overflow-hidden flex items-end justify-center rounded-xl border-l-4 border-teal-500">
                                            <Image width={40} height={40} src={`${BASE_IMAGE_GAME}/${data.gambar}`} className="w-3/4 h-3/4 rounded object-cover" alt="preview" unoptimized />
                                        </div>

                                        <div className="w-[60%] h-full sfprodisplay relative">
                                            <div className="text-white text-opacity-60 pl-6 pt-10">
                                                {data.genre}
                                            </div>
                                            <div className="text-white pl-6 text-3xl tracking-wide py-3 font-semibold">
                                                {data.name}
                                            </div>
                                            <div className="text-white text-opacity-70 text-sm tracking-wide pt-2 w-full pl-6 flex justify-between">
                                                <p className="w-3/4">{data.deskripsi}</p>
                                                <p className="text-xl">Rp {data.harga}</p>
                                            </div>
                                            <div className="w-fit pl-6 flex gap-3 absolute bottom-0">
                                                <DeleteGame selectedGame={data} />
                                                <EditGame selectedGame={data} />
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
export default MenuPage