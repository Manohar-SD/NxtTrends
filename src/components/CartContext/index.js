import { createContext } from "react";




let CartContext = createContext({
    cartList:[],
    addCartItem:()=>{},
    deleteCartItem:()=>{},
    changeQuantity:()=>{},
    removeAllItems:()=>{}
})

export default CartContext