import React from "react"

export const metadata = {
    title: 'Admin Dashboard | Zenith',
    description: 'Praktikum SMK Telkom Malang'
}

type PropsLayout = {
    children: React.ReactNode
}

const RootLayout = ({ children }: PropsLayout) => {
    return (
        <div>{children}</div>
    )
}

export default RootLayout