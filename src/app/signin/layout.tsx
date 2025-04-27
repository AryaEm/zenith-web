import React from "react"
import { ToastContainer } from "react-toastify"

export const metadata = {
    title: 'SignIn | Zenith',
    description: 'Praktikum SMK Telkom Malang'
}

type PropsLayout = {
    children: React.ReactNode
}

const RootLayout = ({ children }: PropsLayout) => {
    return (
        <div>
            <ToastContainer containerId={'toastRegister'} />
            {children}
        </div>
    )
}

export default RootLayout