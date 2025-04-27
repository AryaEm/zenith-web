"use client"

import { useCart } from "@/app/cart/cart-context"
import Image from "next/image"
import { BASE_IMAGE_GAME } from "../../../global"
import { useRouter } from "next/navigation"
import { IoIosArrowBack } from "react-icons/io";


export default function CartPage() {
    const { cart, removeFromCart, resetCart } = useCart()
    const router = useRouter()

    const getTotalPrice = () => {
        return cart.reduce((total, item) => total + item.price * item.quantity, 0)
    }

    if (cart.length === 0) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-[#282828] text-white">
                <h1 className="text-3xl mb-4">Cart is Empty 🛒</h1>
                <button
                    onClick={() => router.push("/")}
                    className="bg-blue-500 hover:bg-blue-600 px-6 py-2 rounded-full mt-4 transition-all"
                >
                    Back to Games
                </button>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-[#282828] text-white p-8">
            <div className="flex mb-8 gap-4">

                <button
                    onClick={() => router.push("/")}
                    className="bg-[#3c3c3c] hover:bg-opacity-50 h-8 w-8 mt-2 flex items-center justify-center rounded-full transition-all"
                >
                    <IoIosArrowBack className="text-xl"/>
                </button>
                <h1 className="text-4xl font-bold ">Your Cart</h1>
            </div>

            <div className="flex flex-col gap-6">
                {cart.map((item) => (
                    <div
                        key={item.id}
                        className="flex items-center justify-between bg-[#3c3c3c] p-4 rounded-lg shadow-md"
                    >
                        <div className="flex items-center gap-4">
                            <Image
                                src={`${BASE_IMAGE_GAME}/${item.picture}`}
                                alt={item.name}
                                width={100}
                                height={100}
                                className="rounded-lg object-cover"
                                unoptimized
                            />
                            <div>
                                <p className="text-xl font-semibold">{item.name}</p>
                                <p className="text-sm text-gray-400">{item.genre}</p>
                                <p className="mt-2 font-bold">
                                    {item.price === 0
                                        ? "Free"
                                        : new Intl.NumberFormat("id-ID", {
                                            style: "currency",
                                            currency: "IDR",
                                        }).format(item.price)}
                                </p>
                            </div>
                        </div>
                        <div className="flex flex-col items-end">
                            <p className="font-medium">Qty: {item.quantity}</p>
                            <button
                                onClick={() => removeFromCart(item.id)}
                                className="mt-2 bg-red-500 hover:bg-red-600 px-3 py-1 rounded-full text-sm transition-all"
                            >
                                Remove
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            <div className="mt-12 flex flex-col items-end">
                <p className="text-2xl font-bold mb-2">
                    Total: {getTotalPrice() === 0 ? "Free" : getTotalPrice().toLocaleString("id-ID", { style: "currency", currency: "IDR" })}
                </p>
                <div className="flex gap-4 mt-4">
                    <button
                        onClick={resetCart}
                        className="bg-red-500 hover:bg-red-600 px-6 py-3 rounded-full transition-all"
                    >
                        Clear Cart
                    </button>
                    <button
                        onClick={() => alert("Checkout feature coming soon! 😎")}
                        className="bg-green-500 hover:bg-green-600 px-6 py-3 rounded-full transition-all"
                    >
                        Checkout
                    </button>
                </div>
            </div>
        </div>
    )
}
