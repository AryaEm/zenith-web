'use client'

import Image from "next/image"
import { useState, useEffect } from "react"
import { BASE_IMAGE_GAME } from "../../../global"
import { AddToCartBtn } from "../button"
import { IGame } from "@/app/types"

interface Props {
    game: IGame
}


export default function ClientGameCard({ game }: Props) {
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [, setShowModal] = useState(false)

    useEffect(() => {
        // Cek token dari cookie browser (client-side)
        const tokenExists = document.cookie.includes("token=")
        setIsLoggedIn(tokenExists)
    }, [])

    const handleClick = () => {
        if (!isLoggedIn) {
            setShowModal(true)
        } else {
            window.location.href = `/game/${game.id}` // atau router.push
        }
    }

    return (
        <>


            {/* {game.map((game) => ( */}
            <div key={game.id} className="h-full w-full relative flex-shrink-0 cursor-pointer" onClick={handleClick}>
                <Image
                    src={`${BASE_IMAGE_GAME}/${game.gambar}`}
                    alt={game.name}
                    className="w-full h-full object-cover object-center rounded-xl"
                    width={600}
                    height={400}
                    unoptimized
                />
                <div className="absolute top-0 w-full h-full bg-gradient-to-t from-black via-black/10 to-transparent flex items-end rounded-xl">
                    <div className="h-1/5 flex w-full">
                        <div className="w-1/2 pl-8">
                            <p className="text-white text-2xl font-medium">{game.name}</p>
                            <p className="text-white font-thin">{game.genre}</p>
                            <p className="text-zinc-400 font-thin">{game.deskripsi}</p>
                            {/* <p className="py-2 text-white">
                                                {game.harga === 0
                                                    ? "Free"
                                                    : new Intl.NumberFormat("id-ID", {
                                                        style: "currency",
                                                        currency: "IDR",
                                                    }).format(game.harga)}
                                            </p> */}
                        </div>
                        <div className="w-1/2 flex items-center justify-end pr-8">
                            <AddToCartBtn type="button">{game.total_dibeli} Users</AddToCartBtn>
                        </div>
                    </div>
                </div>
            </div>
            {/* ))} */}

        </>
    )
}