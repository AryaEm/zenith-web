"use client"

import { useState } from "react"
import { FaAngleUp, FaAngleDown, FaStar, FaDollarSign, FaUser } from "react-icons/fa6";
import { RiHomeFill } from "react-icons/ri";
import { FaCog } from "react-icons/fa";
import Link from "next/link";

export default function SidebarAdmin() {
    const [manageOpen, setManageOpen] = useState(false);
    const [featuresOpen, setFeaturesOpen] = useState(false);
    const [profileOpen, setprofileOpen] = useState(false);
    const [incomeOpen, setIncomeOpen] = useState(false);

    return (
        <>
            <div className="h-dvh w-1/5 bg-[#212430] text-white lg:flex hidden flex-col">

                <div className="flex items-center h-32">
                    <p className="text-white pl-8 font-normal Aerospace text-4xl"><Link href={'/'}>ZENITH</Link></p>
                </div>

                <div className="flex-grow p-6">
                    <ul className="space-y-5 mb-8">

                        <li>
                            <button onClick={() => setManageOpen(!manageOpen)} className="flex items-center justify-between w-full text-left focus:outline-none text-[#AEB9E1] transition-all duration-300 hover:text-[#007AFF]">
                                <div className="flex items-center gap-2">
                                    <RiHomeFill />
                                    <span>Manage</span>
                                </div>
                                {manageOpen ? <FaAngleUp /> : <FaAngleDown />}
                            </button>
                            {manageOpen && (
                                <ul className="ml-6 mt-5 space-y-3 text-sm text-[#AEB9E1]">
                                    <li>All pages</li>
                                    <li>Analytics</li>
                                    <li>Products</li>
                                    <li>Task</li>
                                </ul>
                            )}
                        </li>

                        <li>
                            <button onClick={() => setFeaturesOpen(!featuresOpen)} className="flex items-center justify-between text-[#AEB9E1] w-full text-left focus:outline-none transition-all duration-300 hover:text-[#007AFF]">
                                <div className="flex items-center gap-2">
                                    <FaStar />
                                    <span>Features</span>
                                </div>
                                {featuresOpen ? <FaAngleUp /> : <FaAngleDown />}
                            </button>
                            {featuresOpen && (
                                <ul className="ml-6 mt-5 space-y-3 text-sm text-[#AEB9E1]">
                                    <li>gatau</li>
                                    <li>gatau</li>
                                </ul>
                            )}
                        </li>
                        {/* feature  */}


                        {/* profile  */}
                        <li>
                            <button onClick={() => setprofileOpen(!profileOpen)} className="flex items-center justify-between text-[#AEB9E1] w-full text-left focus:outline-none transition-all duration-300 hover:text-[#007AFF]">
                                <div className="flex items-center gap-2">
                                    <FaUser />
                                    <span>Features</span>
                                </div>
                                {profileOpen ? <FaAngleUp /> : <FaAngleDown />}
                            </button>
                            {profileOpen && (
                                <ul className="ml-6 mt-5 space-y-3 text-sm text-[#AEB9E1]">
                                    <li>gatau</li>
                                    <li>gatau</li>
                                </ul>
                            )}
                        </li>
                        {/* profile  */}


                        {/* income  */}
                        <li>
                            <button onClick={() => setIncomeOpen(!incomeOpen)} className="flex items-center justify-between text-[#AEB9E1] w-full text-left focus:outline-none transition-all duration-300 hover:text-[#007AFF]">
                                <div className="flex items-center gap-2">
                                    <FaDollarSign />
                                    <span>Features</span>
                                </div>
                                {incomeOpen ? <FaAngleUp /> : <FaAngleDown />}
                            </button>
                            {incomeOpen && (
                                <ul className="ml-6 mt-5 space-y-3 text-sm text-[#AEB9E1]">
                                    <li>gatau</li>
                                </ul>
                            )}
                        </li>
                        {/* income  */}
                    </ul>

                    <div className="flex items-center cursor-pointer gap-2 border-t border-white border-opacity-20 pt-8 text-[#AEB9E1] transition-all duration-300 hover:text-[#007AFF]">
                        <FaCog />
                        <span>Settings</span>
                    </div>
                </div>
                {/* menu section */}


                <div className="p-4 pb-14">
                    <Link href={"/admin/game"}>
                        <button className="w-full py-2 px-4 bg-biru hover:bg-blue-700 rounded text-white">
                            Games
                        </button>
                    </Link>
                </div>
            </div>
        </>
    )
}