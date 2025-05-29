"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { storeCookie, getCookie } from "@/lib/client-cookie";
import { ICartGameItem } from "../types";

interface CartContextType {
  cart: ICartGameItem[];
  addToCart: (item: ICartGameItem) => boolean; // return false jika sudah ada
  removeFromCart: (id: number) => void;
  resetCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCart] = useState<ICartGameItem[]>([]);

  useEffect(() => {
    const savedCart = getCookie("cart");
    if (savedCart) {
      try {
        const parsed = JSON.parse(savedCart);
        if (Array.isArray(parsed)) setCart(parsed); // pastikan array
      } catch {
        setCart([]);
      }
    }
  }, []);

  useEffect(() => {
    storeCookie("cart", JSON.stringify(cart));
  }, [cart]);

  const addToCart = (item: ICartGameItem): boolean => {
    const exists = cart.find(g => g.id === item.id);
    if (exists) {
      console.log("[addToCart] Sudah ada di cart:", item);
      return false;
    }

    const newItem = {
      ...item,
      uuid: item.uuid || crypto.randomUUID(),
      quantity: 1,
    };

    console.log("[addToCart] Menambahkan item ke cart:", newItem);
    setCart(prev => [...prev, newItem]);

    return true;
  };


  const removeFromCart = (id: number) => {
    const updated = cart.filter(item => item.id !== id);
    setCart(updated);
  };

  const resetCart = () => {
    setCart([]);
    storeCookie("cart", "");
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, resetCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used within a CartProvider");
  return context;
};
