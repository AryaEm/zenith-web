import TesProfile from "../../../public/image/gaming.svg"
import Image from "next/image"

export default function WelcomeAdmin() {
    return (
        <>
            <div className="w-full h-[12%] flex justify-between items-center">
                <div className="flex flex-col justify-center gap-1">
                    <p className="text-white font-medium text-2xl">Welcome back, Arya</p>
                    <p className="text-[#AEB9E1] text-sm">Measure your advertising ROI and report website traffic.</p>
                </div>

                <div className="h-16 w-16 rounded-full cursor-pointer">
                    <Image src={TesProfile} alt="tes profl" className="h-full w-full object-cover object-[120%] rounded-full"></Image>
                </div>
            </div>
        </>
    )
}