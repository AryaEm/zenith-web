"use client"

import Image from "next/image"
import { useCart } from "@/app/cart/cart-context"
import { useRouter } from "next/navigation"
import { BASE_IMAGE_GAME } from "../../../global"
import { IGame } from "@/app/types"
import { useEffect, useState } from "react"
import { getCookie } from "@/lib/client-cookie"

export default function GameCard({ game }: { game: IGame }) {
    const { addToCart } = useCart()
    const router = useRouter()
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [showModal, setShowModal] = useState(false)

    useEffect(() => {
        const token = getCookie("token")
        setIsLoggedIn(!!token)
    }, [])

    const handleClick = () => {
        if (!isLoggedIn) {
            setShowModal(true)
            return
        }

        addToCart({
            id: game.id,
            uuid: game.uuid,
            name: game.name,
            price: game.harga,
            genre: game.genre,
            picture: game.gambar,
            description: game.deskripsi,
            quantity: 1,
        })
        router.push("/cart")
    }

    const handleLoginRedirect = () => {
        setShowModal(false)
        router.push("/login")
    }

    return (
        <>
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

            {showModal && (
                <div className="fixed inset-0 z-[9999] bg-black bg-opacity-50 flex justify-center items-center">
                    <div className="bg-white rounded-xl p-6 w-[90%] max-w-md text-center shadow-lg">
                        <h2 className="text-xl font-bold text-gray-800 mb-4">Peringatan</h2>
                        <p className="text-gray-600 mb-6">Anda harus login terlebih dahulu untuk menambahkan game ke keranjang.</p>
                        <div className="flex justify-center gap-4">
                            <button
                                onClick={() => setShowModal(false)}
                                className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400 text-gray-800"
                            >
                                Batal
                            </button>
                            <button
                                onClick={handleLoginRedirect}
                                className="px-4 py-2 rounded bg-blue-600 hover:bg-blue-700 text-white"
                            >
                                Login Sekarang
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}
