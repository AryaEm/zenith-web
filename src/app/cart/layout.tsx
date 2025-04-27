import { CartProvider } from "./cart-context"

const Layout = ({ children }: { children: React.ReactNode }) => {
    return (
        <CartProvider>
            {children}
        </CartProvider>
    )
}
export default Layout
