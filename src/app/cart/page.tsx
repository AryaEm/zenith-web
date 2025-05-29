"use client";

import { useEffect, useState } from "react";
import { useCart } from "./cart-context";
import { getCookie } from "@/lib/client-cookie";
import { getUserFromToken } from "@/lib/jwt";
import { BASE_IMAGE_GAME } from "../../../global";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { IoCloseCircle } from "react-icons/io5";
import emptCart from "../../../public/apaya/Untitled design (18).svg";
// import { post } from "@/lib/api-bridge";
import { toast } from "react-toastify";
import { BASE_API_URL } from "../../../global";

export default function CartPage() {
  const { cart, removeFromCart, resetCart } = useCart();
  const router = useRouter();
  const [userName, setUserName] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("QRIS");
  const [loadingPurchase, setLoadingPurchase] = useState(false);

  useEffect(() => {
    // Ambil user hanya sekali, bukan tiap render
    const token = getCookie("token");
    if (!token) {
      setUserName(""); // Optional: redirect to login if needed
      return;
    }
    const user = getUserFromToken(token);
    if (user) setUserName(user.username);
  }, []);

  const getTotalPrice = () =>
    cart.reduce((total, item) => total + item.harga * item.quantity, 0);

  const handlePurchase = async () => {
    const token = getCookie("token");
    if (!token) {
      toast("Login dulu ya!", {
        hideProgressBar: true,
        type: "warning",
        containerId: "toastPurchase",
      });
      router.push("/login");
      return;
    }

    if (cart.length === 0) {
      toast("Keranjang kosong.", {
        hideProgressBar: true,
        type: "warning",
        containerId: "toastPurchase",
      });
      return;
    }

    try {
      setLoadingPurchase(true);

      const payload = {
        metode_pembayaran: paymentMethod,
        status: "Lunas",
        detail_transaksi: cart.map(item => ({ gameId: item.id })),
      };

      console.log("Purchase Payload:", payload);

      const response = await fetch(`${BASE_API_URL}/transaksi`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();
      console.log("Response from /order:", data);

      if (data?.status) {
        toast(data.message || "Pembelian berhasil!", {
          hideProgressBar: true,
          type: "success",
          containerId: "toastPurchase",
        });

        resetCart();

        setTimeout(() => {
          router.push("/");
        }, 1000);
      } else {
        toast(data.message || "Gagal memproses pembelian.", {
          hideProgressBar: true,
          type: "warning",
          containerId: "toastPurchase",
        });
      }
    } catch (error) {
      console.error("Purchase error:", error);
      toast("Terjadi kesalahan sistem.", {
        hideProgressBar: true,
        type: "error",
        containerId: "toastPurchase",
      });
    } finally {
      setLoadingPurchase(false);
    }
  };

  if (cart.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-screen text-white primary">
        <Image src={emptCart} alt="Empty Cart" width={300} height={300} />
        <h1 className="text-2xl font-semibold mt-4">Cart is Empty</h1>
        <button
          className="mt-4 px-4 py-2 bg-blue-500 rounded hover:bg-blue-600"
          onClick={() => router.push("/")}
        >
          Back to Dashboard
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-10 text-white cart-bg">
      <Link href="/">
        <h1 className="text-2xl font-bold mb-6">ZENITH / <span className="text-white/60">checkout</span></h1>
      </Link>

      <div className="flex gap-12 items-center justify-center h-[80vh] absolute w-[92%] left-1/2 -translate-x-1/2">
        {/* Bagian Kiri */}
        <div className="w-1/2">
          <h2 className="text-2xl sfprodisplay font-semibold mb-4">Order Summary</h2>
          <div className="space-y-4">
            {cart.map(item => (
              <div key={item.id} className="flex items-center justify-between bg-[#212430] border rounded border-[#454757] relative h-[14vh]">
                <div className="flex items-center gap-4">
                  <Image
                    src={`${BASE_IMAGE_GAME}/${item.gambar}`}
                    alt={item.name}
                    width={200}
                    height={100}
                    className="rounded-lg h-[14vh] object-cover"
                  />
                  <div>
                    <p className="text-lg font-medium sfprodisplay">{item.name}</p>
                    <p className="text-sm text-white/50">{item.genre}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <p className="text-lg text-zinc-200 font-normal mr-8">
                    {item.harga > 0 ? `Rp ${item.harga.toLocaleString("id-ID")}` : "Free"}
                  </p>
                  <button onClick={() => removeFromCart(item.id)} className="absolute -right-2 -top-2">
                    <IoCloseCircle className="text-2xl text-red-500 hover:text-red-700" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bagian Kanan */}
        <div className="w-1/2 space-y-4">
          <div className="bg-[#212430] p-4 rounded-xl custom-shadow1">
            <p className="text-md text-zinc-300">Nama Customer: {userName}</p>
          </div>
          <div className="space-y-4 p-6 rounded-xl bg-[#212430] custom-shadow1 text-zinc-200">
            <div className="flex justify-between text-sm border-t border-white/10 pt-4">
              <span>Subtotal:</span>
              <span>Rp {getTotalPrice().toLocaleString("id-ID")}</span>
            </div>
            <div className="flex justify-between text-sm border-b border-white/10 pb-4">
              <span>Total:</span>
              <span>Rp {getTotalPrice().toLocaleString("id-ID")}</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex gap-3 items-center">
                <label htmlFor="payment-method">Payment method:</label>
                <select
                  id="payment-method"
                  className="px-3 py-1 bg-white/10 rounded text-white outline-none"
                  value={paymentMethod}
                  onChange={e => setPaymentMethod(e.target.value)}
                >
                  <option value="QRIS">QRIS</option>
                  <option value="GOPAY">GoPay</option>
                  <option value="DANA">DANA</option>
                </select>
              </div>
              <button
                onClick={handlePurchase}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded text-white"
              >
                Purchase
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
