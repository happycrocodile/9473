import { createContext, useContext, useState } from "react";

const context = createContext();

export const useCart = () => useContext(context);

function Cart({ children }) {
    const [payer, setPayer] = useState(null);
    const [cart, setCart] = useState([]);

    return (
        <context.Provider value={{ payer, setPayer, cart, setCart }}>
            {children}
        </context.Provider>
    );
}

export default Cart;
