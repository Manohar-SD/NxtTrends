import "./index.css"

import CartContext from "../CartContext"
import { useContext, useState } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPlus } from "@fortawesome/free-solid-svg-icons"
import { faMinus } from "@fortawesome/free-solid-svg-icons"
import { faXmark } from "@fortawesome/free-solid-svg-icons"
const CartItem = (props)=>{


const value = useContext(CartContext)

const {deleteCartItem,onChangeQuantity} = value


  
    const {cartItemDetails} = props
    const {id, title, brand, quantity, price, imageUrl} = cartItemDetails

    
    let onQuantityIncrease = ()=>{
        onChangeQuantity({id,quantity:quantity+1})     
    }

    let onQuantityDecrease = ()=>{
      if(quantity<=1){
        deleteCartItem(id)
      }else{
        onChangeQuantity({id,quantity:quantity-1})
      }
    }
   
    return(
        <li className="cart-item">
        <img className="cart-product-image" src={imageUrl} alt={title} />
        <div className="cart-item-details-container">
          <div className="cart-product-title-brand-container">
            <p className="cart-product-title">{title}</p>
            <p className="cart-product-brand">by {brand}</p>
          </div>
          <div className="cart-quantity-container">
            <button type="button" className="quantity-controller-button" onClick={onQuantityDecrease}>
            <FontAwesomeIcon icon={faMinus}/>
            </button>
            <p className="cart-quantity">{quantity}</p>
            <button type="button" className="quantity-controller-button" onClick={onQuantityIncrease}>
             <FontAwesomeIcon icon={faPlus}/>
            </button>
          </div>
          <div className="total-price-delete-container">
            <p className="cart-total-price">Rs {price * quantity}/-</p>
            <button
              className="remove-button"
              type="button"
            >
              Remove
            </button>
            <button
            className="close-button"
            onClick={()=>deleteCartItem(id)}
            >
             <FontAwesomeIcon  icon={faXmark}/>
            </button>
          </div>
        </div>
        </li>
    )
}

export default CartItem