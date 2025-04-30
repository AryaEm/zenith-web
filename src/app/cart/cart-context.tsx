"use client"

import { createContext, useContext, useState, ReactNode } from "react"
import { storeCookie, getCookie } from "@/lib/client-cookie"
import { ICartGameItem } from "../types"
// import { toast } from "react-toastify"

interface CartContextType {
    cart: ICartGameItem[]
    addToCart: (item: ICartGameItem) => void
    removeFromCart: (id: number) => void
    resetCart: () => void
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export const CartProvider = ({ children }: { children: ReactNode }) => {
    const saveCartToCookie = (cart: ICartGameItem[]) => {
        storeCookie("cart", JSON.stringify(cart))
    }

    const [cart, setCart] = useState<ICartGameItem[]>(() => {
        const savedCart = getCookie("cart")
        return savedCart ? JSON.parse(savedCart) : []
    })

    const addToCart = (item: ICartGameItem) => {
        setCart((prevCart) => {
            const updatedCart = prevCart.some((cartItem) => cartItem.id === item.id)
                ? prevCart.map((cartItem) =>
                    cartItem.id === item.id
                        ? { ...cartItem, quantity: cartItem.quantity + 1 }
                        : cartItem
                )
                : [
                    ...prevCart,
                    {
                        ...item,
                        uuid: item.uuid || crypto.randomUUID(),
                        quantity: 1,
                    },
                ]

            saveCartToCookie(updatedCart)
            return updatedCart
        })
    }

    const removeFromCart = (id: number) => {
        setCart((prevCart) => {
            const updatedCart = prevCart
                .map((item) =>
                    item.id === id
                        ? { ...item, quantity: item.quantity - 1 }
                        : item
                )
                .filter((item) => item.quantity > 0)

            storeCookie("cart", JSON.stringify(updatedCart))

            // Kalau setelah remove, cart kosong ➔ reload page!
            if (updatedCart.length === 0 && typeof window !== "undefined") {
                window.location.reload()
            }

            return updatedCart
        })
    }



    const resetCart = () => {
        setCart([]);
        storeCookie("cart", "");
        if (typeof window !== "undefined") {
            window.location.reload();
        }
    }

    return (
        <CartContext.Provider value={{ cart, addToCart, removeFromCart, resetCart }}>
            {children}
        </CartContext.Provider>
    )
}

export const useCart = () => {
    const context = useContext(CartContext)
    if (!context) {
        throw new Error("useCart must be used within a CartProvider")
    }
    return context
}
