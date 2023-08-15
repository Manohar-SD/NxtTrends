import EmptyCartView from "../EmptyCartView"
import "./index.css"
import CartContext from "../CartContext"
import { useContext } from "react"
import CartList from "../CartList"
import CartSummary from "../CartSummary"
export default function Cart() {

    const value = useContext(CartContext)
    const { cartList, removeAllItems } = value
    const showEmptyView = cartList.length === 0

    let removeAll = () => {
        removeAllItems()
    }

    return (
        <>
            <div className="cart-container">
                {showEmptyView ? <EmptyCartView /> : (
                    <div className="cart-content-container">
                        <div className="cart-header">
                            <h1 className="cart-heading">My Cart</h1>
                            <button className="remove-all-button" onClick={removeAll}>Remove All</button>
                        </div>
                        <CartList />
                        <div className="cart-summary-container">
                        <CartSummary />
                        </div>

                       
                    </div>
                )}

            </div>
        </>

    )
}