import SidebarAdmin from "@/components/admin-template/sidebar-admin"
import AdminContent from "@/components/admin-template/admin-content"

export default function DashboardAdmin() {
    return (
        <>
            <main className="h-dvh w-full bg-[#282A37] flex">
                <SidebarAdmin></SidebarAdmin>
                <AdminContent></AdminContent>
            </main>
        </>
    )
}