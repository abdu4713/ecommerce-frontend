import { createContext, useState } from "react";
import { products } from "../assets/assets";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";


export const ShopContext = createContext();

const ShopContextProvider = ({ children }) => {

    const currency = '$';
    const delivery_fee = 10;
    const [search, setSearch] = useState('');
    const [showSearch, setShowSearch] = useState(false);
    const [cartItems, setCartItems] = useState(() => {
        try { return JSON.parse(localStorage.getItem('abdusfashions_cart') || '{}'); }
        catch { return {}; }
    });

    const navigate = useNavigate()

    const addToCart = async (itemId, size) => {
        if (!size) {
            toast.error('Select Product Size');
            return;

        }

        let cartData = structuredClone(cartItems);
        if (cartData[itemId]) {
            if (cartData[itemId][size]) {
                cartData[itemId][size] += 1;

            }
            else {
                cartData[itemId][size] = 1;
            }
        }
        else {
            cartData[itemId] = {};
            cartData[itemId][size] = 1;
        }
        setCartItems(cartData);
        localStorage.setItem('abdusfashions_cart', JSON.stringify(cartData));
    }

    const getCartCount = () => Object.values(cartItems).reduce(
        (total, sizes) => total + Object.values(sizes).reduce((sum, quantity) => sum + Math.max(0, quantity), 0),
        0
    );

    const updateQuantity = async (itemId, size, quantity) => {
        let cartData = structuredClone(cartItems);

        cartData[itemId][size] = quantity;

        setCartItems(cartData);
        localStorage.setItem('abdusfashions_cart', JSON.stringify(cartData));
    }

    const getCartAmount = () => Object.entries(cartItems).reduce((total, [itemId, sizes]) => {
        const product = products.find((item) => item._id === itemId);
        if (!product) return total;
        const quantity = Object.values(sizes).reduce((sum, count) => sum + Math.max(0, count), 0);
        return total + product.price * quantity;
    }, 0);

    const value = {
        products, currency, delivery_fee,
        search, setSearch, showSearch, setShowSearch,
        cartItems, addToCart, getCartCount, updateQuantity,
        getCartAmount,navigate,
        clearCart: () => { setCartItems({}); localStorage.removeItem('abdusfashions_cart'); }

    }

    return (
        <ShopContext.Provider value={value}>
            {children}
        </ShopContext.Provider>
    )
}
export default ShopContextProvider;