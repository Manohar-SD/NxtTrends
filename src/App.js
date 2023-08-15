import Header from "./components/Header"
import Home from "./components/Home"
import Cart from "./components/Cart"
import Login from "./components/Login";


import { Routes, Route } from "react-router-dom";
import Products from "./components/Products"
import ProductItemDetails from "./components/ProductItemDetails";
import CartContext from "./components/CartContext";
import { useState } from "react";
import ProtectedRoutes from "./components/ProtectedRoutes";
import NotFound from "./components/NotFound";

function App() {

  const [cartList, setCartList] = useState([])


  let onAddCartItem = (product) => {
    setCartList(prevCartList => [...prevCartList, product])
  }


  let onDeleteCartItem = (id) => {
    setCartList(
      prevCartList => {
        return prevCartList.filter(eachProduct => eachProduct.id !== id)
      }
    )

  }

  let onChangeQuantity = (changeDetails) => {
    const { id, quantity } = changeDetails
    setCartList(prevCartList => prevCartList.map(eachProduct => {
      if (eachProduct.id === id) {
        return { ...eachProduct, quantity }
      }
      return eachProduct
    }))
  }

  let onRemoveAll = () => {
    setCartList([])
  }



  return (
    <CartContext.Provider value={{ cartList: cartList, addCartItem: onAddCartItem, removeAllItems: onRemoveAll, deleteCartItem: onDeleteCartItem, onChangeQuantity: onChangeQuantity }}>
      <Header />
      <Routes>
        <Route path="/" element={<ProtectedRoutes/>}>
          <Route index={true}  element={<Home />} />
          <Route path="products" element={<Products />} />
          <Route path="product/:id" element={<ProductItemDetails />} />
          <Route path="cart" element={<Cart />} />
        </Route>

        <Route path="/login" element={<Login />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </CartContext.Provider>

  );
}

export default App;
