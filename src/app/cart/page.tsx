"use client";

import { useCart } from "./cart-context";
import Image from "next/image";
import { BASE_IMAGE_GAME } from "../../../global";
import { useRouter } from "next/navigation";
import emptCart from "../../../public/apaya/Untitled design (18).svg"
// import { IoIosArrowBack } from "react-icons/io";
import { IoCloseCircle } from "react-icons/io5";
import Link from "next/link";

export default function CartPage() {
  const { cart, removeFromCart, resetCart } = useCart();
  const router = useRouter();

  const handleRemoveFromCart = (itemId: number) => {
    removeFromCart(itemId);
  };

  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + item.harga * item.quantity, 0);
  };

  const totalQuantity = cart.reduce((acc, item) => acc + item.quantity, 0);

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
        {/* Order Summary */}
        <div className="w-1/2 ">
          <h2 className="text-2xl sfprodisplay font-semibold mb-4">Order Summary</h2>
          <div className="space-y-4">
            {cart.map((item) => (
              <div key={item.id} className="flex items-center h-[12vh] justify-between bg-[#212430] border rounded border-[#454757] relative">
                <div className="flex items-center gap-4">
                  <Image
                    src={`${BASE_IMAGE_GAME}/${item.gambar}`}
                    alt={item.name}
                    width={200}
                    height={100}
                    className="rounded-lg h-[12vh] object-cover relative -left-1"
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
                  <button onClick={() => handleRemoveFromCart(item.id)} className="absolute -right-2 -top-2">
                    <IoCloseCircle className="text-2xl text-red-500 hover:text-red-700" />
                  </button>
                </div>
              </div>
            ))}
            <div className="mt-4 p-4 bg-white/5 rounded-xl font-medium tracking-wide sfprodisplay text-zinc-400 custom-shadow1">
              Quantity: {totalQuantity} item{totalQuantity > 1 && "s"}
            </div>
          </div>
        </div>

        {/* Payment */}
        <div className="w-1/2 ">
          <h2 className="text-2xl sfprodisplay font-semibold mb-4">Payment</h2>
          <div className="bg-[#212430] p-4 rounded-xl mb-4 custom-shadow1">
            <p className="text-md sfprodisplay text-zinc-300 font-normal tracking-wide">nama customer</p>
          </div>
          <div className="space-y-4 p-6 rounded-xl bg-[#212430] custom-shadow1 sfprodisplay text-zinc-200 tracking-wide">
            <div className="flex justify-between text-sm border-t border-white/10 pt-4">
              <span>Subtotal:</span>
              <span>Rp {getTotalPrice().toLocaleString("id-ID")}</span>
            </div>
            <div className="flex justify-between text-sm border-b border-white/10 pb-4">
              <span>Total:</span>
              <span>Rp {getTotalPrice().toLocaleString("id-ID")}</span>
            </div>
            <div className="flex items-center justify-between">
              <div className=" flex gap-3 items-center">
                <label htmlFor="payment-method">Payment method:</label>
                <select
                  id="payment-method"
                  className="px-3 py-1 bg-white/10 rounded text-white outline-none"
                >
                  <option value="qris" className="text-white font-medium bg-zinc-400">QRIS</option>
                  <option value="gopay" className="text-white font-medium bg-zinc-400">GoPay</option>
                  <option value="dana" className="text-white font-medium bg-zinc-400">DANA</option>
                </select>
              </div>
              <button
                onClick={() => alert("Coming Soon!")}
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
