"use client"

import { IGame } from "@/app/types"
import { BASE_API_URL } from "../../../../global"
import { put } from "@/lib/api-bridge"
import { getCookie } from "@/lib/client-cookie"
import { useRouter } from "next/navigation"
import { FormEvent, useRef, useState } from "react"
import { toast } from "react-toastify"
import { ButtonDanger, ButtonInfoOutline, ButtonSuccess } from "@/components/button"
import { InputGroupComponent } from "@/components/InputComponent"
import Modal from "@/components/Modal"
import Select from "@/components/Select"
import FileInput from "@/components/FileInput"
// import Image from "next/image"
// import { BASE_IMAGE_MENU } from "../../../../global"

//icon
import { FiEdit } from "react-icons/fi";

interface IApiResponse {
  data: {
    status: boolean;
    message: string;
  };
}


const EditGame = ({ selectedGame }: { selectedGame: IGame }) => {
    const [isShow, setIsShow] = useState<boolean>(false)
    // const [menu, setMenu] = useState<IMenu>({ ...selectedMenu })
    const [game, setGame] = useState<IGame>(selectedGame || { name: "", harga: 0, deskripsi: "", genre: "" })
    const router = useRouter()
    const TOKEN = getCookie("token") || ""
    const [file, setFile] = useState<File | null>(null)
    const formRef = useRef<HTMLFormElement>(null)

    const openModal = () => {
        setGame({ ...selectedGame })
        setIsShow(true)
        if (formRef.current) formRef.current.reset()
    }

    const handleSubmit = async (e: FormEvent) => {
        try {
            e.preventDefault()
            const url = `${BASE_API_URL}/game/${selectedGame.id}`
            const { name, harga, deskripsi, genre } = game
            const payload = new FormData()
            payload.append("name", name || "")
            payload.append("harga", harga !== undefined ? harga.toString() : "0")
            payload.append("deskripsi", deskripsi || "")
            payload.append("genre", genre || "")
            if (file !== null) payload.append("gambar", file || "")
            const response = await put(url, payload, TOKEN) as IApiResponse
            if (!response || !response.data) {
                throw new Error("Invalid response from server")
            }
            const { data } = await put(url, payload, TOKEN) as IApiResponse
            if (data?.status) {
                setIsShow(false)
                toast(data?.message, { hideProgressBar: true, containerId: `toastGame`, type: `success` })
                setTimeout(() => router.refresh(), 300)
            } else {
                toast(data?.message, { hideProgressBar: true, containerId: `toastGame`, type: `warning` })
            }
        } catch (error) {
            console.log(error);
            toast(`Something Wrong`, { hideProgressBar: true, containerId: `toastGame`, type: `error` })
        }
    }


    return (
        <div >
            {/* <ToastContainer containerId={`toastMenu`} /> */}
            <ButtonInfoOutline type="button" onClick={() => openModal()}>
                <FiEdit />
            </ButtonInfoOutline>

            <Modal isShow={isShow} onClose={state => setIsShow(state)}>
                <form onSubmit={handleSubmit}>
                    {/* modal header */}
                    <div className="sticky border-4 bg-teal-500 rounded-2xl px-5 pt-7 pb-5">
                        <div className="w-full flex items-center">
                            <div className="flex flex-col">
                                <strong className="font-bold text-2xl text-[#f5f5f5]">Update Menu</strong>
                                <small className="text-white text-opacity-80 text-sm">Managers can update both Cashier and Manager roles on this page.</small>
                            </div>
                            <div className="ml-auto">
                                <button type="button" className="text-white text-opacity-80" onClick={() => setIsShow(false)}>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </div>
                    {/* end modal header */}


                    {/* modal body */}
                    <div className="p-5 text-black">
                        <InputGroupComponent id={`name`} type="text" value={game.name}
                            onChange={val => setGame({ ...game, name: val })}
                            required={true} placeholder="game Name" />


                        <InputGroupComponent id={`price`} type="number" value={game.harga.toString()}
                            onChange={val => setGame({ ...game, harga: Number(val) })}
                            required={true} placeholder="Price" />


                        <InputGroupComponent id={`description`} type="text" value={game.deskripsi}
                            onChange={val => setGame({ ...game, deskripsi: val })}
                            required={true} placeholder="Deskripsi" />

                        <InputGroupComponent id={`genre`} type="text" value={game.genre}
                            onChange={val => setGame({ ...game, deskripsi: val })}
                            required={true} placeholder="Deskripsi" />


                        <FileInput acceptTypes={["application/pdf", "image/png", "image/jpeg", "image/jpg"]} id="profile_picture"
                            label="Unggah Foto (Max 2MB, PDF/JPG/JPEG/PNG)" onChange={f => setFile(f)} required={false} />

                    </div>
                    {/* end modal body */}


                    {/* modal footer */}
                    <div className="w-full p-5 flex rounded-b-2xl">
                        <div className="flex ml-auto gap-2">
                            <ButtonDanger type="button" onClick={() => setIsShow(false)}>
                                Cancel
                            </ButtonDanger>
                            <ButtonSuccess type="submit">
                                Save
                            </ButtonSuccess>
                        </div>
                    </div>
                    {/* end modal footer */}
                </form>
            </Modal>
        </div>
    )


}
export default EditGame