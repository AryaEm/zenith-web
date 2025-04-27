import { FaFacebookF, FaInstagram } from "react-icons/fa";
import { RiTwitterXFill } from "react-icons/ri";

const SocialLinks = () => {
    return (
        <div className="flex space-x-4 mt-4">
            <a href="#" className="text-[#0B2149] text-xl bg-white bg-opacity-60 rounded-full p-2">
                <FaFacebookF />
            </a>
            <a href="#" className="text-[#0B2149] text-xl bg-white bg-opacity-60 rounded-full p-2">
                <FaInstagram />
            </a>
            <a href="#" className="text-[#0B2149] text-xl bg-white bg-opacity-60 rounded-full p-2">
                <RiTwitterXFill />
            </a>
        </div>
    );
};

export default SocialLinks;
