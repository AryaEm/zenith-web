import Image from "next/image"
import inisponsor from "../../../public/image/Mask group.png"

export default function Sponsor() {
    return(
        <>
            <div className="h-[70dvh] w-full flex items-center justify-center primary">
                <Image src={inisponsor} alt=""></Image>
            </div>
        </>
    )
}