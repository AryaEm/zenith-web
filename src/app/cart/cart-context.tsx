"use client"

import { createContext, useContext, useState, useEffect, ReactNode } from "react"
import { storeCookie, getCookie } from "@/lib/client-cookie"
import { ICartGameItem } from "../types"

interface CartContextType {
  cart: ICartGameItem[]
  addToCart: (item: ICartGameItem) => void
  removeFromCart: (id: number) => void
  resetCart: () => void
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export const CartProvider = ({ children }: { children: ReactNode }) => {
  // ✅ Ambil cookie hanya sekali saat awal load
  const [cart, setCart] = useState<ICartGameItem[]>(() => {
    try {
      const savedCart = getCookie("cart")
      return savedCart ? JSON.parse(savedCart) : []
    } catch {
      return []
    }
  })

  // ✅ Setiap kali cart berubah → simpan ke cookie
  useEffect(() => {
    storeCookie("cart", JSON.stringify(cart))
  }, [cart])

  const addToCart = (item: ICartGameItem) => {
    setCart(currentCart => {
      const exists = currentCart.find(g => g.id === item.id)
      if (exists) {
        return currentCart.map(g =>
          g.id === item.id ? { ...g, quantity: g.quantity + 1 } : g
        )
      } else {
        return [
          ...currentCart,
          {
            ...item,
            uuid: item.uuid || crypto.randomUUID(),
            quantity: 1,
          },
        ]
      }
    })
  }

  const removeFromCart = (id: number) => {
    setCart(currentCart => {
      const updated = currentCart
        .map(g => g.id === id ? { ...g, quantity: g.quantity - 1 } : g)
        .filter(g => g.quantity > 0)

      if (updated.length === 0 && typeof window !== "undefined") {
        window.location.reload()
      }

      return updated
    })
  }

  const resetCart = () => {
    setCart([])
    storeCookie("cart", "")
    if (typeof window !== "undefined") {
      window.location.reload()
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
  if (!context) throw new Error("useCart must be used within a CartProvider")
  return context
}
