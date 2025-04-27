import Image from "next/image"
import counterstrike2 from "../../../public/image/counter-strike-2.jpeg"
import { AddToCartBtn } from "../button"

export default function RecommendedGames() {
    return (
        <>
            <div className="h-[95dvh] primary flex flex-col items-center sfprodisplay">
                <div className="w-[45%] h-[10%] flex items-center flex-col my-4">
                    <p className="sfprodisplay text-white text-opacity-60 tracking-wide text-lg">Featured</p>
                    <p className="sfprodisplay text-white text-2xl font-semibold tracking-wide">Recommended Games</p>
                </div>

                <div className="w-[65%] h-[70%] my-5 flex overflow-x-scroll rounded-xl scrollbar-hide">
                    <div className="flex flex-nowrap w-full gap-5">

                        <div className="h-full w-full relative flex-shrink-0">
                            <Image src={counterstrike2} alt="Counter Strike 2" className="w-full h-full object-cover object-center rounded-xl" />
                            <div className="absolute top-0 w-full h-full bg-gradient-to-t from-black via-black/10 to-transparent flex items-end rounded-xl">
                                <div className="h-1/4 flex w-full">
                                    <div className="w-1/2 pl-8">
                                        <p className="text-white text-2xl font-medium">Counter Strike 2</p>
                                        <p className="text-white font-thin">available</p>
                                        <p className="py-2 text-white">Rp 696 969</p>
                                    </div>
                                    <div className="w-1/2 flex items-center justify-end pr-8">
                                        <AddToCartBtn type="button">Add to cart</AddToCartBtn>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="h-full w-full relative flex-shrink-0">
                            <Image src={counterstrike2} alt="Counter Strike 2" className="w-full h-full object-cover object-center rounded-xl" />
                            <div className="absolute top-0 w-full h-full bg-gradient-to-t from-black via-black/10 to-transparent flex items-end rounded-xl">
                                <div className="h-1/4 flex w-full">
                                    <div className="w-1/2 pl-8">
                                        <p className="text-white text-2xl font-medium">Counter Strike 2</p>
                                        <p className="text-white font-thin">available</p>
                                        <p className="py-2 text-white">Rp 2500</p>
                                    </div>
                                    <div className="w-1/2 flex items-center justify-end pr-8">
                                        <AddToCartBtn type="button">Add to cart</AddToCartBtn>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </>
    )
}