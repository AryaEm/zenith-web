import SocialLinks from "../footer-component/social-links";
import FooterLinks from "../footer-component/footer-links";

export default function Footer() {
    return (
        <>
            <div className="bg-[#252732] h-[55dvh] w-full box-border px-40">
                <div className="border-b-[1.5px] border-white border-opacity-20 w-full h-3/4 flex">
                    <div className="flex flex-col justify-center text-white sfprodisplay">
                        <div className="h-fit w-fit mb-4 rounded Aerospace text-4xl font-normal">Zenith</div>
                        <p className="text-lg font-semibold">Get in touch</p>
                        <SocialLinks />
                    </div>

                    <FooterLinks />
                </div>

                <p className="text-white text-opacity-60 text-center my-3">@2024 Zenith, All right reserved</p>
            </div>
        </>
    )
}