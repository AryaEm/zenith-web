import Image from "next/image"
import { IGame } from "@/app/types"
import { getCookies } from "@/lib/server-cookie"
import { BASE_API_URL, BASE_IMAGE_GAME } from "../../../global"
import { get } from "@/lib/api-bridge"
import { AddToCartBtn } from "../button"
import { AlertInfo } from "../alert"

async function getRecommendedGames(): Promise<IGame[]> {
    try {
        const TOKEN = await getCookies("token")
        const url = `${BASE_API_URL}/game/?latest=true`
        const { data } = await get(url, TOKEN)

        let result: IGame[] = []
        if (data?.status) result = [...data.data]
        return result
    } catch (error) {
        console.error(error)
        return []
    }
}

export default async function RecommendedGames() {
    const games = await getRecommendedGames()

    if (games.length === 0) {
        return <AlertInfo title="Informasi">No recommended games available</AlertInfo>
    }

    return (
        <>
            <div className="h-[95dvh] primary flex flex-col items-center sfprodisplay">
                <div className="w-[45%] h-[10%] flex items-center flex-col my-4">
                    <p className="sfprodisplay text-white text-opacity-60 tracking-wide text-lg">Featured</p>
                    <p className="sfprodisplay text-white text-2xl font-semibold tracking-wide">Latest game</p>
                </div>

                <div className="w-[65%] h-[70%] my-5 flex overflow-x-scroll rounded-xl scrollbar-hide">
                    <div className="flex flex-nowrap w-full gap-5">

                        {games.map((game) => (
                            <div key={game.id} className="h-full w-full relative flex-shrink-0">
                                <Image
                                    src={`${BASE_IMAGE_GAME}/${game.gambar}`}
                                    alt={game.name}
                                    className="w-full h-full object-cover object-center rounded-xl"
                                    width={600}
                                    height={400}
                                    unoptimized
                                />
                                <div className="absolute top-0 w-full h-full bg-gradient-to-t from-black via-black/10 to-transparent flex items-end rounded-xl">
                                    <div className="h-1/4 flex w-full">
                                        <div className="w-1/2 pl-8">
                                            <p className="text-white text-2xl font-medium">{game.name}</p>
                                            <p className="text-white font-thin">available</p>
                                            <p className="py-2 text-white">
                                                {game.harga === 0
                                                    ? "Free"
                                                    : new Intl.NumberFormat("id-ID", {
                                                        style: "currency",
                                                        currency: "IDR",
                                                    }).format(game.harga)}
                                            </p>
                                        </div>
                                        <div className="w-1/2 flex items-center justify-end pr-8">
                                            <AddToCartBtn type="button">Add to cart</AddToCartBtn>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}

                    </div>
                </div>
            </div>
        </>
    )
}