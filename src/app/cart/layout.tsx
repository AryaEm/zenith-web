// import { CartProvider } from "./cart-context"
import { ToastContainer } from "react-toastify"

const Layout = ({ children }: { children: React.ReactNode }) => {
    return (
        <>
            {/* <CartProvider> */}
            {children}
            <ToastContainer />
            {/* </CartProvider> */}
        </>
    )
}
export default Layout
