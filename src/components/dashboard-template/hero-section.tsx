"use client"

import Image from "next/image"
import Profil from "../../../public/image/gaming.svg"
import decoration1 from "../../../public/image/Abstract Line2.png"
import decoration2 from "../../../public/image/Fill.svg"
import { IoGameController } from "react-icons/io5";
import { RiUserCommunityFill } from "react-icons/ri";
import { GetStartedBtn } from "../button";


export default function HeroSect() {
    return (
        <>
            <div className="md:flex primary">

                <div className="w-1/2 h-dvh flex items-center justify-center relative ">
                    <div className="h-80 w-80 bg-[#007AFF] absolute left-0 rounded-full bg-opacity-15 blur-3xl"></div>
                    <div className="h-80 w-80 bg-[#007AFF] absolute -right-32 bottom-0 rounded-full bg-opacity-10 blur-3xl"></div>
                    <div className="w-fit mx-10 h-fit relative z-[2]">
                        <div className="w-16 h-16 absolute -top-4 -left-10">
                            <Image src={decoration1} alt="Abstract line" />
                        </div>
                        <p className="font-bold text-6xl sfprodisplay leading-[4.5rem] text-white text-opacity-80">Discover and buy <br />the latest games <br />for all platforms</p>
                        <p className="sfprodisplay py-2 mb-2 text-white text-opacity-80">Start Your Gamer Journey with Us! Play New Game, Master <br />Your Skill, and Achieve Your Dreams with the Best Game <br />Shop Platform.</p>
                        <GetStartedBtn type="button" >
                            Get Started
                        </GetStartedBtn>
                    </div>
                </div>


                <div className="w-1/2 h-dvh flex relative justify-center items-center overflow-hidden">
                    <div className="h-80 w-80 bg-[#007AFF] absolute -right-10 rounded-full bg-opacity-15 blur-3xl"></div>
                    <div className="mx-10 h-fit w-fit relative z-[2] flex items-center justify-center">
                        <div className="absolute h-20 w-20 right-4 -top-10">
                            <Image src={decoration2} alt="fill" />
                        </div>
                        <div className="w-[400px] h-[400px] rounded-full mr-10 mb-10 border border-[#007AFF]"></div>
                        <div className="w-[400px] h-[400px] rounded-full absolute">
                            <Image src={Profil} alt="main profil" className="rounded-full" />
                        </div>
                        <div className="w-40 h-[70px] border rounded-2xl bg-slate-300 top-14 -left-14 absolute border-[#007AFF] custom-shadow">
                            <div className="flex h-full">
                                <div className="h-full w-[40%] flex items-center justify-center">
                                    <div className="h-10 w-10 bg-[#007AFF] rounded-xl flex items-center justify-center">
                                        <IoGameController className="text-white h-6 w-6" />
                                    </div>
                                </div>
                                <div className="h-full w-[60%] flex flex-col justify-center sfprodisplay">
                                    <p className="font-bold text-xl leading-6">2K+</p>
                                    <p className="font-medium text-xs text-[#101828] text-opacity-50 leading-4">Video Game</p>
                                </div>
                            </div>
                        </div>
                        <div className="w-40 h-[70px] border rounded-2xl bg-slate-300 bottom-4 right-8 absolute border-[#007AFF] custom-shadow">
                            <div className="flex h-full">
                                <div className="h-full w-[40%] flex items-center justify-center">
                                    <div className="h-10 w-10 bg-[#007AFF] rounded-xl flex items-center justify-center">
                                        <RiUserCommunityFill className="text-white h-6 w-6" />
                                    </div>
                                </div>
                                <div className="h-full w-[60%] flex flex-col justify-center sfprodisplay">
                                    <p className="font-medium text-xs text-[#101828] text-opacity-50 leading-4">Comunity</p>
                                    <p className="font-bold text-xl leading-6">100+</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </>
    )
}   