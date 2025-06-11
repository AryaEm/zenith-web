"use client"

import { IGame } from "@/app/types"
import { BASE_API_URL } from "../../../../global"
import { post } from "@/lib/api-bridge"
import { getCookie } from "@/lib/client-cookie"
// import { useRouter } from "next/navigation"
import { FormEvent, useRef, useState } from "react"
import { toast } from "react-toastify"
import { ButtonSuccesOutline, ButtonSuccess, ButtonDanger } from "@/components/button"
import { InputGroupComponent } from "@/components/InputComponent"
import Modal from "@/components/Modal"
import Select from "@/components/Select"
import FileInput from "@/components/FileInput"
import { useRouter } from "next/navigation"

interface IApiResponse {
  data: {
    status: boolean;
    message: string;
  };
}

const AddGame = () => {
    const [isShow, setIsShow] = useState<boolean>(false)
    const [game, setGame] = useState<IGame>({
        id: 0, uuid: ``, name: ``, harga: 0, deskripsi: ``,
        genre: ``, gambar: ``, createdAt: ``, updatedAt: ``
    })
    // const router = useRouter()
    const TOKEN = getCookie("token") || ""
    const [file, setFile] = useState<File | null>(null)
    const formRef = useRef<HTMLFormElement>(null)
    const router = useRouter()

    const openModal = () => {
        setGame({
            id: 0, uuid: ``, name: ``, harga: 0, deskripsi: ``,
            genre: ``, gambar: ``, createdAt: ``, updatedAt: ``
        })
        setIsShow(true)
        if (formRef.current) formRef.current.reset()
    }

    const handleSubmit = async (e: FormEvent) => {
        try {
            e.preventDefault()
            const url = `${BASE_API_URL}/game`
            const { name, harga, deskripsi, genre } = game
            const payload = new FormData()
            payload.append("name", name || "")
            payload.append("harga", harga !== undefined ? harga.toString() : "0");
            payload.append("genre", genre || "")
            payload.append("deskripsi", deskripsi || "")
            if (file !== null) payload.append("gambar", file || "")
            const { data } = await post(url, payload, TOKEN) as IApiResponse
            if (data?.status) {
                setIsShow(false)
                toast(data?.message, { hideProgressBar: true, containerId: `toastGame`, type: `success` })
                setTimeout(() => router.refresh(), 1000)
            } else {
                toast(data?.message, { hideProgressBar: true, containerId: `toastGame`, type: `warning` })
            }
        } catch (error) {
            console.log(error);
            toast(`Something Wrong`, { hideProgressBar: true, containerId: `toastGame`, type: `error` })
        }
    }

    return (
        <div>
            {/* <ToastContainer containerId={`toastMenu`} /> */}
            <ButtonSuccess type="button" onClick={() => openModal()}>
                <div className="flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                    </svg>
                    Add Game
                </div>
            </ButtonSuccess>
            <Modal isShow={isShow} onClose={state => setIsShow(state)}>
                <form onSubmit={handleSubmit}>
                    {/* modal header */}
                    <div className="sticky top-0 bg-white px-5 pt-5 pb-3 shadow">
                        <div className="w-full flex items-center">
                            <div className="flex flex-col">
                                <strong className="font-bold text-2xl">Create New Game</strong>
                                <small className="text-slate-400 text-sm">Managers can create game items on this page.</small>
                            </div>
                            <div className="ml-auto">
                                <button type="button" className="text-slate-400" onClick={() => setIsShow(false)}>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </div>
                    {/* end modal header */}


                    {/* modal body */}
                    <div className="p-5">
                        <p className="text-sm font-semibold">Name</p>
                        <InputGroupComponent id={`name`} type="text" value={game.name}
                            onChange={val => setGame({ ...game, name: val })}
                            required={true} label="Name" />

                        <p className="text-sm font-semibold pt-2">Price</p>
                        <InputGroupComponent id={`harga`} type="number" value={game.harga.toString()}
                            onChange={val => setGame({ ...game, harga: Number(val) })}
                            required={true} label="harga" />

                        <p className="text-sm font-semibold pt-2">description</p>
                        <InputGroupComponent id={`deskripsi`} type="text" value={game.deskripsi}
                            onChange={val => setGame({ ...game, deskripsi: val })}
                            required={true} label="deskripsi" />

                        <p className="text-sm font-semibold pt-2">Genre</p>
                        <InputGroupComponent id={`genre`} type="text" value={game.genre}
                            onChange={val => setGame({ ...game, genre: val })}
                            required={true} label="genre" />


                        <FileInput acceptTypes={["application/pdf", "image/png", "image/jpeg", "image/jpg"]} id="profile_picture"
                            label="Upload Picture (Max 2MB, PDF/JPG/JPEG/PNG)" onChange={f => setFile(f)} required={false} />

                    </div>
                    {/* end modal body */}


                    {/* modal footer */}
                    <div className="w-full p-5 flex rounded-b-2xl shadow">
                        <div className="flex ml-auto gap-2">
                            <ButtonDanger type="button" onClick={() => setIsShow(false)}>
                                Cancel
                            </ButtonDanger>
                            <ButtonSuccesOutline type="submit">
                                Save
                            </ButtonSuccesOutline>
                        </div>
                    </div>
                    {/* end modal footer */}
                </form>
            </Modal>
        </div>
    )


}
export default AddGame