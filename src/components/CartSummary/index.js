import "./index.css"
import CartContext from "../CartContext"
import { useContext } from "react"
export default function CartSummary() {
    const value = useContext(CartContext)
    const { cartList } = value


  let total = 0 
  for (let i=0;i<cartList.length;i++){
    total+=cartList[i].price*cartList[i].quantity
  }


    return (
    <div className="summary-container">
        <h1 className="summary-heading">Cart Total :  <span className="total-text">{total}</span></h1>
        <p className="no-items"><span className="total-text">{cartList.length}</span> items added</p>
        <button className="checkout-btn">Checkout</button>
    </div>
    )
}


