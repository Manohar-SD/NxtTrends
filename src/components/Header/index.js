import "./index.css"

import CartContext from "../CartContext"
import Cookies from "js-cookie"
import { useContext } from "react"
import { NavLink,useNavigate } from "react-router-dom"



const Header = () => {

const cartContextValue = useContext(CartContext)

const navigate = useNavigate()

const {cartList} = cartContextValue
const cartItemsCount = cartList.length

  const renderCartItemsCount = ()=>{
   return cartItemsCount>0?<span className="cart-count-badge">{cartItemsCount}</span>:null
  }

  const onClickLogout  = ()=>{
    Cookies.remove('jwtToken')
    navigate("/login")
  }

  return (
    <nav className="nav-header">
      <div className="nav-content">
      <NavLink to="/">
          <img
            className="website-logo"
            src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-logo-img.png"
            alt="website logo"
          />
        </NavLink>
        <ul className="nav-menu">
          <li >
            <NavLink className="nav-link" to="/">Home</NavLink>
          </li>
          <li>
            <NavLink className="nav-link" to="/products">Products</NavLink>
          </li>
          <li >
            <NavLink className="nav-link" to="/cart">Cart {renderCartItemsCount()}</NavLink>
          </li>
        </ul>

    
        <button type="button" className="logout-btn"  onClick={onClickLogout}>
          Logout
       
        </button>


        {/* <button type="button" className="logout-mobile-btn">
            <img
              src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-log-out-img.png"
              alt="logout icon"
              className="logout-icon"
            />
          </button> */}
      </div>
      <div className="nav-menu-mobile">
        <ul className="nav-menu-list-mobile">
          <li className="nav-menu-item-mobile">
            <NavLink to="/" className="nav-link">
              <img
                src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-home-icon.png"
                alt="nav home"
                className="nav-bar-image"
              />
            </NavLink>
          </li>

          <li className="nav-menu-item-mobile">
            <NavLink to="/products" className="nav-link">
              <img
                src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-products-icon.png"
                alt="nav products"
                className="nav-bar-image"
              />
            </NavLink>
          </li>
          <li className="nav-menu-item-mobile">
            <NavLink to="/cart" className="nav-link">
              <img
                src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-cart-icon.png"
                alt="nav cart"
                className="nav-bar-image"
              />
              {renderCartItemsCount()}
            </NavLink>
          </li>
        </ul>
      </div>
    </nav>
  )
}

export default Header