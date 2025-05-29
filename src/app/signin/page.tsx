"use client"

import { BASE_API_URL } from "../../../global"
import { storeCookie } from "@/lib/client-cookie"
import axios from "axios"
import { useRouter } from "next/navigation"
import { FormEvent, useState } from "react"
import { toast } from "react-toastify"
import { IoMdMail } from "react-icons/io";
import { FaLock } from "react-icons/fa6";
import { IoMdEye } from "react-icons/io";
import { IoMdEyeOff } from "react-icons/io";
import { FaUserNinja } from "react-icons/fa";
import Link from "next/link"

const SignInPage = () => {
    const [username, setUsername] = useState<string>("")
    const [email, setEmail] = useState<string>("")
    const [password, setPassword] = useState<string>("")
    const [showPassword, setShowPassword] = useState<boolean>(false)
    const router = useRouter()

    const handleRegister = async (e: FormEvent) => {
        e.preventDefault()

        try {
            const url = `${BASE_API_URL}/user/register`
            const payload = JSON.stringify({ username, email, password });
            const { data } = await axios.post(url, payload, {
                headers: { "Content-Type": "application/json" }
            })
            if (data.status == true) {
                // toast(data.message, { hideProgressBar: true, containerId: `toastRegister`, type: "success", autoClose: 2000 })
                storeCookie("id", data.data.id)
                storeCookie("username", data.data.username)
                storeCookie("role", data.data.role)
                storeCookie("token", data.token)

                toast.success(data.message, { hideProgressBar: true, containerId: `toastRegister`, type: "success", autoClose: 2000 });
                router.replace("/");
            } else {
                toast(data.message, { hideProgressBar: true, containerId: 'toastRegister', type: "warning" });
            }
        }
        catch (error) {
            console.log(error)
            toast(`Samting wen wrong ${error}`, {
                hideProgressBar: true, containerId: 'toastRegister', type: 'error'
            })
        }
    }

    return (
        <>
            <div className='w-screen h-screen bg-login bg-cover'>
                {/* <ToastContainer containerId={`toastLogin`} /> */}
                <div className="w-full h-full flex items-center">
                    <div className="absolute left-0 grad-login h-dvh w-full">
                        {/* <div className="h-dvh w-4 absolute-center bg-white"></div> */}

                        <div className="w-full md:w-6/12 xl:w-2/5 h-dvh p-5 flex flex-col items-center justify-center relative">
                            <div className="w-3/4">
                                <div className="absolute bottom-0 left-0 w-full pb-4 text-center">
                                    <small className="text-zinc-200">Copyright @2024</small>
                                </div>
                                {/* <Image alt="moklet-app" src={inilogo}className="h-20 w-20 mb-10" /> */}
                                <div className="mb-8">
                                    <p className="text-white Aerospace text-4xl font-normal">Zenith</p>
                                </div>
                                <span className="text-sm text-white uppercase my-3 text-opacity-70 font-normal text-center">
                                    Start for free
                                </span>
                                <h4 className="text-3xl font-semibold text-white mb-2 sfprodisplay my-3 tracking-wider">Create new account<span className="text-[#007AFF]">.</span></h4>
                                <span className="text-sm text-white text-opacity-70 font-normal text-center flex gap-1">
                                    Already have an account? <Link href={"/login"}><p className="font-bold cursor-pointer text-[#007AFF]" >Login</p></Link>
                                </span>
                            </div>

                            <form onSubmit={handleRegister} className="w-3/4 my-6">
                                <div className="flex w-full my-4">
                                    <div className="bg-[#323644] rounded-l-md p-3 flex items-center justify-center">
                                        <FaUserNinja className="text-zinc-200"></FaUserNinja>
                                    </div>
                                    <input type="text" onChange={(e) => setUsername(e.target.value)} className="bg-[#323644] text-zinc-200 p-3 grow rounded-r-md focus:outline-none focus:ring-[#323644]"
                                        placeholder="Username" id={`uername`} />
                                </div>

                                <div className="flex w-full my-4">
                                    <div className="bg-[#323644] rounded-l-md p-3 flex items-center justify-center">
                                        <IoMdMail className="text-zinc-200"></IoMdMail>
                                    </div>
                                    <input type="text" onChange={(e) => setEmail(e.target.value)} className="bg-[#323644] text-zinc-200 p-3 grow rounded-r-md focus:outline-none focus:ring-[#323644]"
                                        placeholder="Email" id={`email`} />
                                </div>


                                <div className="flex w-full my-4">
                                    <div className="bg-[#323644] rounded-l-md p-3 flex items-center justify-center">
                                        <FaLock className="text-zinc-200"></FaLock>
                                    </div>
                                    <input type={showPassword ? `text` : `password`} onChange={(e) => setPassword(e.target.value)} className="p-3 grow bg-[#323644] text-zinc-200 focus:outline-none focus:ring-[#007AFF]"
                                        placeholder="Password" id={`password-industri-app`} />
                                    <div className="cursor-pointer bg-[#323644] rounded-r-md px-3 flex items-center justify-center" onClick={() => setShowPassword(!showPassword)}>
                                        {
                                            showPassword ?
                                                <IoMdEyeOff className="text-xl text-zinc-200"> </IoMdEyeOff> :
                                                <IoMdEye className="text-xl text-zinc-200"> </IoMdEye>
                                        }
                                    </div>
                                </div>


                                <div className="my-10 flex gap-2 sfprodisplay text-sm">
                                    <p className="bg-[#323644] hover:bg-primary w-1/2 p-3 font-medium rounded-md text-white">
                                        Continue with Google
                                    </p>
                                    <button type="submit" className="bg-[#007AFF] hover:bg-primary w-1/2 p-3 font-medium rounded-md text-white">
                                        Create Account
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default SignInPage