// import { CartProvider } from "./cart-context"
import { ToastContainer } from "react-toastify"

const Layout = ({ children }: { children: React.ReactNode }) => {
    return (
        <>
            <ToastContainer containerId={"toastPurchase"}/>
            {children}
        </>
    )
}
export default Layout
