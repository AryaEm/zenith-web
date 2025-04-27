"use client"

import Image from "next/image"
import { useCart } from "@/app/cart/cart-context"
import { useRouter } from "next/navigation"
import { BASE_IMAGE_GAME } from "../../../global"
import { IGame } from "@/app/types"

export default function GameCard({ game }: { game: IGame }) {
    const { addToCart } = useCart()
    const router = useRouter()

    const handleClick = () => {
        addToCart({
            id: game.id,
            uuid: game.uuid,
            name: game.name,
            price: game.harga,
            genre: game.genre,
            picture: game.gambar,
            description: "",
            quantity: 1,
        })
        router.push("/cart")
    }

    return (
        <div
            onClick={handleClick}
            className="w-full h-36 bg-white gamelistshadow bg-opacity-10 backdrop-blur-md rounded-xl flex items-center cursor-pointer border border-blue-500 sfprodisplay"
        >
            <div className="w-1/4 h-full rounded-xl bg-[#007AFF]">
                <Image
                    src={`${BASE_IMAGE_GAME}/${game.gambar}`}
                    alt={game.name}
                    width={144}
                    height={144}
                    className="rounded-xl w-full h-full object-cover object-center"
                    unoptimized
                />
            </div>
            <div className="flex w-3/4 h-full px-5 justify-between items-center">
                <div className="w-1/2 flex flex-col text-white">
                    <p className="text-xl font-medium">{game.name}</p>
                    <p className="text-lg font-normal text-white text-opacity-50">{game.genre}</p>
                </div>
                <div className="w-1/2 flex flex-col items-end justify-between">
                    <p className="text-xl font-semibold text-white">
                        {game.harga === 0
                            ? "Free"
                            : new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR" }).format(game.harga)}
                    </p>
                    <p className="text-base text-white text-opacity-60">
                        {new Date(game.tahun_rilis).toLocaleDateString("id-ID", {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                        })}
                    </p>
                </div>
            </div>
        </div>
    )
}
