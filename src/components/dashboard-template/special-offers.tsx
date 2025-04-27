import Image from "next/image";
import { IGame } from "@/app/types";
import { getCookies } from "@/lib/server-cookie";
import { BASE_API_URL, BASE_IMAGE_GAME } from "../../../global";
import { get } from "@/lib/api-bridge";
import { AlertInfo } from "../alert";

const getMostPurchasedGames = async (): Promise<IGame[]> => {
    try {
        const TOKEN = await getCookies("token");
        console.log("Token:", TOKEN);  
        const url = `${BASE_API_URL}/game/mostpurchased`;  
        const { data } = await get(url, TOKEN);

        // console.log("Response API:", data); // Tambahkan log ini untuk melihat data yang dikembalikan

        let result: IGame[] = [];
        if (data?.status) result = [...data.data];
        return result;
    } catch (error) {
        console.log(error);
        return [];
    } 
}; 

export default async function SpecialOffers() {
    const games: IGame[] = await getMostPurchasedGames();
    // console.log("Games:", games); // Debugging untuk melihat apakah games ada datanya

    const truncateDescription = (text: string, wordLimit: number = 8): string => {
        const words = text.split(" ");
        if (words.length > wordLimit) {
            return words.slice(0, wordLimit).join(" ") + "...";
        }
        return text;
    };

    const truncateTitle = (text: string, wordLimit: number = 2): string => {
        const words = text.split(" ");
        if (words.length > wordLimit) {
            return words.slice(0, wordLimit).join(" ") + "...";
        }
        return text;
    };
    

    return (
        <main className="blue-bg w-full h-[80dvh] sfprodisplay">
            <div className="h-[20%] flex flex-col items-center justify-end">
                <p className="my-2 text-[#f5f5f5] opacity-90">For You</p>
                <p className="font-medium tracking-wide text-2xl mb-3 text-white">Top Trending</p>
            </div>

            <div className="h-fit w-full mt-16 gap-6 ini-scrollbar overflow-x-scroll">
                <div className="h-fit w-max gap-6 flex pl-20 pr-20 mb-8">

                    {games.length === 0 ? (
                        <div className="w-full">
                            <AlertInfo title="Informasi">No games available</AlertInfo>
                        </div>
                    ) : (
                        games.map((game, index) => (
                            <div key={game.id} className="bg-white cursor-pointer relative rounded-xl shadow-lg flex flex-col justify-between w-[380px] h-80">
                                <div className="w-full h-[60%] rounded-t-xl overflow-hidden relative">
                                    <Image
                                        src={`${BASE_IMAGE_GAME}/${game.gambar}`}
                                        alt={game.name}
                                        layout="fill"
                                        objectFit="cover"
                                        unoptimized
                                    />
                                </div>
                                <div className="w-full h-[45%] absolute bottom-0 rounded-xl bg-white p-3 flex flex-col justify-between">
                                    <div className="h-[65%] w-full flex sfprodisplay">
                                        <div className="w-[65%]">
                                            <p className="font-semibold mb-2 text-lg leading-6">{truncateTitle(game.name)}</p>
                                            <p className="font-normal text-base text-black leading-5 text-opacity-60">
                                                {truncateDescription(game.deskripsi)}
                                            </p>
                                        </div>
                                        <p className="w-[35%] h-full flex items-center justify-center font-semibold text-3xl text-[#007AFF]">
                                            #{index + 1}
                                        </p>
                                    </div>
                                    <p className="text-sm text-gray-600">{game.total_dibeli}x purchased </p>
                                </div>
                            </div>
                        ))
                    )}

                </div>
            </div>
        </main>
    )
}