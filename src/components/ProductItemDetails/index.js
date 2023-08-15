import { useContext, useEffect, useState } from "react"
import { useParams } from "react-router-dom"

import SimilarProductItem from "../SimilarProductItem"
import PulseLoader from "react-spinners/PulseLoader"

import "./index.css"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPlus } from "@fortawesome/free-solid-svg-icons"
import { faMinus } from "@fortawesome/free-solid-svg-icons"

import CartContext from "../CartContext"

import Cookies from "js-cookie"


let ProductItemDetails = (props) => {

  const carContextValue = useContext(CartContext)


  const apiConstants = {
    initial: "INITIAL",
    success: "SUCCESS",
    failure: "FAILURE",
    inProgress: "IN_PROGRESS"
  }

  const [state, setState] = useState(
    {
      apiStatus: apiConstants.initial,
      productData: {},
      quantity: 1
    }
  )


  let onIncrementQuantity = () => setState(prevState =>({...prevState,quantity:prevState.quantity+1}))
  let onDecrementQuantity = () => setState(prevState =>({...prevState,quantity:prevState.quantity-1}))
 

  let productId = useParams()
  const url = `https://apis.ccbp.in/products/${productId.id}`

  useEffect(() => {
    let jwtToken = Cookies.get("jwtToken")
    setState(prevState => ({
      ...prevState,
      apiStatus: apiConstants.inProgress,
    }))

    getProductItemDetals(jwtToken)

  }, [url])



  let getProductItemDetals = async (jwtToken) => {
   
    const options = {
      method: "GET",
      headers: {
        Authorization: `Bearer ${jwtToken}`
      }
    }
    const response = await fetch(url, options)
    const responseproductData = await response.json()

    if (response.ok) {
     
      setState(
        prevState => ({
          ...prevState,
          apiStatus: apiConstants.success,
          productData: responseproductData
        })
      )}
    

  }




  let renderFailureView = () => {
    return <div className="product-details-error-view-container">
    <img
      alt="error view"
      src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-error-view-img.png"
      className="error-view-image"
    />
    <h1 className="product-not-found-heading">Product Not Found</h1>
    <button type="button" className="button">
      Continue Shopping
    </button>
  </div>
  }
  let renderSuccesView = () => {
    const { productData,quantity } = state

 
    const { similar_products } = productData

    const { id, image_url, title, price, rating, description, availability, brand, totalReviews } = productData

    const { addCartItem, cartList, onChangeQuantity } = carContextValue

    const product = {
      id, title, brand, price, imageUrl: image_url, quantity
    }

    const onClickAddToCart = () => {
      let productItem = cartList.find(eachProduct => eachProduct.id === id)

      if (productItem === undefined) {
        addCartItem(product)
      } else {
        onChangeQuantity({ id, quantity: productItem.quantity + quantity })
      }

    }


    return (
      <div className="product-details-success-view">
        <div className="product-details-container">
          <img src={image_url} alt="product" className="product-image" />
          <div className="product">
            <h1 className="product-name">{title}</h1>
            <p className="price-details">Rs {price}/-</p>
            <div className="rating-and-reviews-count">
              <div className="rating-container">
                <p className="rating">{rating}</p>
                <img
                  src="https://assets.ccbp.in/frontend/react-js/star-img.png"
                  alt="star"
                  className="star"
                />
              </div>
              <p className="reviews-count">{totalReviews} Reviews</p>
            </div>
            <p className="product-description">{description}</p>
            <div className="label-value-container">
              <p className="label">Available:</p>
              <p className="value">{availability}</p>
            </div>
            <div className="label-value-container">
              <p className="label">Brand:</p>
              <p className="value">{brand}</p>
            </div>
            <hr className="horizontal-line" />
            <div className="quantity-container">
              <button
                type="button"
                className="quantity-controller-button"
                onClick={onDecrementQuantity}
              >
                <FontAwesomeIcon icon={faMinus} />
              </button>
              <p className="quantity">{quantity}</p>
              <button
                type="button"
                className="quantity-controller-button"
                onClick={onIncrementQuantity}
              >
                <FontAwesomeIcon icon={faPlus} />
              </button>
            </div>
            <button
              type="button"
              className="button add-to-cart-btn"
              onClick={onClickAddToCart}
            >
              Add To Cart
            </button>
          </div>
        </div>
        <h1 className="similar-products-heading">Similar Products</h1>
        <ul className="similar-products-list">
          {similar_products.map(eachSimilarProduct => (
            <SimilarProductItem
              productDetails={eachSimilarProduct}
              key={eachSimilarProduct.id}
            />
          ))}
        </ul>
      </div>
    )


  }
  let renderLoadingView = () => {
    return (
      <div className="products-details-loader-container">
        <PulseLoader size={15} color="#0b69ff" />
      </div>
    )
  }

  let renderProductView = () => {
    const { apiStatus } = state

    switch (apiStatus) {
      case apiConstants.failure:
        return renderFailureView()
      case apiConstants.success:
        return renderSuccesView()
      case apiConstants.inProgress:
        return renderLoadingView()
    }
  }

  return (
    <div className="product-item-details-container">
    {renderProductView()}

    </div>

  )


}

export default ProductItemDetails