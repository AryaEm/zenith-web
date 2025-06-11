"use client"

import { IGame } from "@/app/types"
import { BASE_API_URL } from "../../../../global"
import { drop } from "@/lib/api-bridge"
import { getCookie } from "@/lib/client-cookie"
import { useRouter } from "next/navigation"
import { FormEvent, useState } from "react"
import { toast } from "react-toastify"
import { ButtonSuccesOutline, ButtonDanger } from "@/components/button"
import Modal from "@/components/Modal"

//cion
import { TfiTrash } from "react-icons/tfi";

interface IApiResponse {
  data: {
    status: boolean;
    message: string;
  };
}

export default function DeleteGame({ selectedGame }: { selectedGame: IGame }) {

    const [isShow, setIsShow] = useState<boolean>(false)
    const [game, setGame] = useState<IGame>({ ...selectedGame })
    const router = useRouter()
    const TOKEN = getCookie("token") || ""

    const openModal = () => {
        setGame({ ...selectedGame })
        setIsShow(true)
    }

    const handleSubmit = async (e: FormEvent) => {
        try {
            e.preventDefault()
            const url = `${BASE_API_URL}/game/${selectedGame.id}`
            const { data } = await drop(url, TOKEN) as IApiResponse
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
            <ButtonDanger type="button" onClick={() => openModal()} className="text-md">
                <TfiTrash />
            </ButtonDanger>
            <Modal isShow={isShow} onClose={state => setIsShow(state)}>
                <form onSubmit={handleSubmit}>
                    {/* modal header */}
                    <div className="sticky top-0 bg-white px-5 pt-5 pb-3 shadow">
                        <div className="w-full flex items-center">
                            <div className="flex flex-col">
                                <strong className="font-bold text-2xl">Delete Game</strong>
                                <small className="text-slate-400 text-sm">Games with existing transaction data cannot be deleted from this page.</small>
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
                        Are you sure you want to delete this game {game.name}?
                    </div>
                    {/* end modal body */}


                    {/* modal footer */}
                    <div className="w-full p-5 flex rounded-b-2xl shadow">
                        <div className="flex ml-auto gap-2">
                            <ButtonDanger type="button" onClick={() => setIsShow(false)}>
                                Cancel
                            </ButtonDanger>
                            <ButtonSuccesOutline type="submit">
                                Delete
                            </ButtonSuccesOutline>
                        </div>
                    </div>
                    {/* end modal footer */}
                </form>
            </Modal>
        </div>
    )


}