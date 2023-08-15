import CartItem from "../CartItem"
import "./index.css"

import CartContext from "../CartContext/index"
import { useContext } from "react"

const  CartList=()=>{

    const value = useContext(CartContext)
    const {cartList} = value
    return(
        <ul className="cart-list">
            {cartList.map(eachCartItem=>
                <CartItem cartItemDetails={eachCartItem} key={eachCartItem.id}/>)}
        </ul>
    )
}

export default CartList