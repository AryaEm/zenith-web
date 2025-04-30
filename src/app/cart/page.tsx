"use client"

import { useCart } from "@/app/cart/cart-context"
import Image from "next/image"
import { BASE_IMAGE_GAME } from "../../../global"
import { useRouter } from "next/navigation"
import { IoIosArrowBack } from "react-icons/io";
import emptCart from "../../../public/apaya/Untitled design (18).svg"

export default function CartPage() {
    const { cart, removeFromCart, resetCart } = useCart()
    const router = useRouter()

    const getTotalPrice = () => {
        return cart.reduce((total, item) => total + item.price * item.quantity, 0)
    }

    if (cart.length === 0) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-[#282828] text-white">
                <Image src={emptCart} alt="Empty Cart" className="h-24 object-cover w-24 mb-4~~~"></Image>
                <h1 className="text-3xl mb-4 font-semibold  ">Cart is Empty</h1>
                <button
                    onClick={() => router.push("/")}
                    className="bg-blue-500 hover:bg-blue-600 px-6 py-2 rounded-full mt-4 transition-all"
                >
                    Back to Dashboard
                </button>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-[#282828] text-white p-8 flex justify-center relative">
            <div className="w-11/12 flex flex-col items-center">
                <div className="flex mb-8 gap-4 w-full">

                    <button
                        onClick={() => router.push("/")}
                        className="bg-[#3c3c3c] hover:bg-opacity-50 h-8 w-8 mt-2 flex items-center justify-center rounded-full transition-all"
                    >
                        <IoIosArrowBack className="text-xl" />
                    </button>
                    <h1 className="text-2xl font-bold mt-2">Your Cart</h1>
                </div>

                <div className="flex flex-col gap-5 ">
                    {cart.map((item) => (
                        <div
                            key={item.id}
                            className="flex items-center justify-between cart-bg p-4 pr-6 rounded-lg shadow-md h-[80dvh] w-11/12 relative"
                        >
                            <div className="flex items-center gap-4">
                                <Image
                                    src={`${BASE_IMAGE_GAME}/${item.picture}`}
                                    alt={item.name}
                                    width={400}
                                    height={300}
                                    className="rounded-lg object-cover h-[25vh]"
                                    unoptimized
                                />
                                <div className="flex justify-between h-[20vh]">
                                    <div className=" w-[70%]">
                                        <p className="text-2xl font-semibold">{item.name}</p>
                                        <p className="text-sm text-gray-400">{item.genre}</p>
                                        <p className="text-sm text-gray-400 mt-2">{item.description}</p>
                                    </div>
                                    <p className="mt-2 font-bold flex items-end">
                                        {item.price === 0
                                            ? "Free"
                                            : new Intl.NumberFormat("id-ID", {
                                                style: "currency",
                                                currency: "IDR",
                                            }).format(item.price)}
                                    </p>
                                </div>
                            </div>
                            <div className="flex flex-col items-end absolute -top-3 -right-3">
                                {/* <p className="font-medium">Qty: {item.quantity}</p> */}
                                <button
                                    onClick={() => removeFromCart(item.id)}
                                    className="bg-red-500 hover:bg-red-600 h-7 w-7 font-bold rounded-full text-sm transition-all"
                                >
                                    X
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="flex flex-col justify-between border border-[#202020] w-4/5 bg-[#646464] bg-opacity-50 backdrop-blur-xl rounded-lg h-[25dvh] fixed left-1/2 bottom-5 -translate-x-1/2">
                <div>
                    <p></p>
                    <p className="text-xl font-semibold p-6 border">
                        Total: {getTotalPrice() === 0 ? "Free" : getTotalPrice().toLocaleString("id-ID", { style: "currency", currency: "IDR" })}
                    </p>
                </div>
                <div className="flex gap-4 mt-4 border p-4">
                    <button
                        onClick={resetCart}
                        className="bg-red-500 hover:bg-red-600 px-6 py-2 rounded-lg transition-all"
                    >
                        Clear Cart
                    </button>
                    <button
                        onClick={() => alert("Checkout feature coming soon! ")}
                        className="bg-green-500 hover:bg-green-600 px-6 py-2 rounded-lg transition-all"
                    >
                        Checkout
                    </button>
                </div>
            </div>
        </div>
    )
}
