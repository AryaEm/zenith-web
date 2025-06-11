import React from "react"
import { ToastContainer } from "react-toastify"

export const metadata = {
    title: 'Admin Game List | Zenith',
    description: 'Praktikum SMK Telkom Malang'
}

type PropsLayout = {
    children: React.ReactNode
}

const RootLayout = ({ children }: PropsLayout) => {
    return (
        <div>
            {children}
            <ToastContainer containerId={`toastMenu`} />
        </div>
    )
}

export default RootLayout