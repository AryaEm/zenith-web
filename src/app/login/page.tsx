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
// import { FaUserNinja } from "react-icons/fa";

const LogInPage = () => {
    const [email, setEmail] = useState<string>("")
    const [password, setPassword] = useState<string>("")
    const [showPassword, setShowPassword] = useState<boolean>(false)
    const router = useRouter()

    const handleSubmit = async (e: FormEvent) => {
        try {
            e.preventDefault()
            const url = `${BASE_API_URL}/user/login`
            const playload = JSON.stringify({ email: email, password })
            const { data } = await axios.post(url, playload, {
                headers: { "Content-Type": "application/json" }
            })
            if (data.status == true) {
                toast(data.message, { hideProgressBar: true, containerId: `toastLogin`, type: "success", autoClose: 2000 })
                storeCookie("token", data.token)
                storeCookie("id", data.data.id)
                storeCookie("username", data.data.username)
                storeCookie("role", data.data.role)
                storeCookie("no_telp", data.data.no_telp)
                const role = data.data.role
                if (role === `Admin`) setTimeout(() => router.replace(`/admin/dashboard`), 300)
                else if (role === `Pelanggan`) setTimeout(() => router.replace(`/`), 300)
            }
            else toast(data.message, { hideProgressBar: true, containerId: 'toastLogin', type: "warning" })
        }
        catch (error) {
            console.log(error)
            toast(`Samting wen wrong ${error}`, {
                hideProgressBar: true, containerId: 'toastLogin', type: 'error'
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
                                <div className="absolute bottom-0 left-0 w-full py-3 text-center">
                                    <small className="text-zinc-200">Copyright &copy; 2024</small>
                                </div>
                                {/* <Image alt="moklet-app" src={inilogo} className="h-20 w-20 my-" priority /> */}
                                <div className="mb-8">
                                    <p className="text-white Aerospace text-4xl font-normal">Zenith</p>
                                </div>
                                <h4 className="text-3xl font-semibold text-white mb-2 sfprodisplay tracking-wider">Welcome Back<span className="text-[#007AFF]">.</span></h4>
                                <span className="text-sm text-white text-opacity-70 font-normal text-center">
                                    <span className="text-sm text-white text-opacity-70 flex gap-1 font-normal text-center">
                                        Don&apos;t have an account? <p className="font-bold cursor-pointer text-[#007AFF]">SignUp</p>
                                    </span>
                                </span>
                            </div>

                            <form onSubmit={handleSubmit} className="w-3/4 my-10 ">
                                <div className="flex w-full my-4">
                                    <div className="bg-[#323644] rounded-l-md p-3 flex items-center justify-center">
                                        <IoMdMail className="text-zinc-200"></IoMdMail>
                                    </div>
                                    <input type="text" className="bg-[#323644] text-zinc-200 p-3 grow rounded-r-md focus:outline-none" value={email}
                                        onChange={e => setEmail(e.target.value)} placeholder="Email" id={`email`} />
                                </div>


                                <div className="flex w-full my-4">
                                    <div className="bg-[#323644] rounded-l-md p-3 flex items-center justify-center">
                                        <FaLock className="text-zinc-200"></FaLock>
                                    </div>
                                    <input type={showPassword ? `text` : `password`} className="p-3 grow bg-[#323644] text-zinc-200 focus:outline-none" value={password}
                                        onChange={e => setPassword(e.target.value)} placeholder="Password" id={`password-industri-app`} />
                                    <div className="cursor-pointer bg-[#323644] rounded-r-md px-3 flex items-center justify-center" onClick={() => setShowPassword(!showPassword)}>
                                        {
                                            showPassword ?
                                                <IoMdEyeOff className="text-xl text-zinc-200"> </IoMdEyeOff> :
                                                <IoMdEye className="text-xl text-zinc-200"> </IoMdEye>
                                        }
                                    </div>
                                </div>


                                <div className="my-10">
                                    <button type="submit" className="bg-[#007AFF] hover:bg-primary w-full p-2 font-semibold rounded-md text-white">
                                        Login
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

export default LogInPage