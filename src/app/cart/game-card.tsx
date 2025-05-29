"use client";

import Image from "next/image";
import { useCart } from "@/app/cart/cart-context";
import { useRouter } from "next/navigation";
import { BASE_IMAGE_GAME } from "../../../global";
import { IGame } from "@/app/types";
import { useEffect, useState } from "react";
import { getCookie } from "@/lib/client-cookie";
import { getUserFromToken } from "@/lib/jwt";

export default function GameCard({ game }: { game: IGame }) {
    const { addToCart } = useCart();
    const router = useRouter();
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [ownedGameIds, setOwnedGameIds] = useState<number[]>([]);

    useEffect(() => {
        const token = getCookie("token");
        setIsLoggedIn(!!token);
        if (token) {
            const user = getUserFromToken(token);
            setOwnedGameIds(user?.ownedGameIds || []);
        }
    }, []);

    const handleAddToCart = async () => {
        console.log("Klik game:", game);

        if (!isLoggedIn) {
            setShowModal(true);
            return;
        }

        if (game.isOwned) {
            alert("Game ini sudah kamu beli!");
            return;
        }


        const success = addToCart({
            id: game.id,
            uuid: game.uuid,
            name: game.name,
            harga: game.harga,
            genre: game.genre,
            gambar: game.gambar,
            deskripsi: game.deskripsi,
            quantity: 1,
        });

        console.log("addToCart result:", success);

        if (!success) {
            alert("Game sudah ada di cart.");
            return;
        }

        // Tunggu sejenak agar state & cookie sempat tersimpan
        setTimeout(() => {
            router.push("/cart");
        }, 200); // 200ms delay
    };

    const handleLoginRedirect = () => {
        setShowModal(false);
        router.push("/login");
    };

    return (
        <>
            <div
                className="w-full h-36 bg-white gamelistshadow bg-opacity-10 backdrop-blur-md rounded-xl flex items-center border border-blue-500 sfprodisplay"
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
                    <div className="w-1/2 flex flex-col items-end justify-start h-full pt-4 relative sfprodisplay">


                        {(!isLoggedIn || !game.isOwned) && (
                            <div>
                                <p className="w-full text-lg font-semibold text-white">{game.harga > 0 ? `Rp ${game.harga.toLocaleString()}` : 'Gratis'}</p>
                                <p className="w-full text-sm text-white text-opacity-60"> {new Date(game.tahun_rilis).toLocaleDateString('id-ID', {
                                    year: 'numeric',
                                    month: 'long',
                                    day: 'numeric',
                                })}</p>
                            </div>
                        )}

                        {isLoggedIn ? (

                            game.isOwned ? (
                                <button className="mt-2 px-8 py-1 rounded bg-blue-500 hover:bg-blue-600 text-white text-md font-medium tracking-wide absolute bottom-4">Play</button>
                            ) : (
                                <button className="mt-2 px-3 py-1 rounded border-2 border-blue-500 hover:border-blue-600 transition-all duration-300 text-white text-md font-medium absolute bottom-4" onClick={handleAddToCart}>Add to Cart</button>
                            )
                        ) : (
                            <button className="cursor-not-allowed mt-2 px-3 py-1 rounded bg-red-500 hover:bg-red-600 transition-all duration-300 text-white text-md font-medium absolute bottom-4" disabled>LogIn untuk membeli</button>
                        )}


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
    );
}
