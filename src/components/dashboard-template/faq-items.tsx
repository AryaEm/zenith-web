"use client"

import { FaAngleDown } from "react-icons/fa6";
import { FaAngleUp } from "react-icons/fa6";
import { useState } from "react";

interface FAQItemProps {
    question: string;
    answer: string;
}

const FAQItem: React.FC<FAQItemProps> = ({ question, answer }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div
            className="w-full border p-3 border-[#333333] text-white rounded-lg bg-[#252732] py-3 cursor-pointer"
            onClick={() => setIsOpen(!isOpen)}
        >
            <div className="flex justify-between items-center">
                <p className="text-base font-normal">{question}</p>
                <span>{isOpen ? <FaAngleDown/> : <FaAngleUp/>}</span>
            </div>
            {isOpen && <p className="text-white mt-2">{answer}</p>}
        </div>
    );
};

export default FAQItem;
