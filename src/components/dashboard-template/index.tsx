"use client"
import { ReactNode } from "react"
import Navbar from "./navbar"

type MenuType = {
    id: string,
    path: string,
    label: string
}
type DashboardProp = {
    children: ReactNode,
    id: string,
    title: string,
    menuList: MenuType[]
}

export default function DashboardTemplate({ children, id, title, menuList }: DashboardProp) {
    
    return (
        <div className="w-full min-h-dvh bg-[#fcfcfc]">
            <Navbar menuList={menuList} title={title} id={id}>
                {children}
            </Navbar>
        </div>
    )
}
