import { Link } from "react-router-dom"
import "./index.css"
let ProductCard = (props) => {
    const { productData } = props
    const { title, brand, image_url, rating, price, id } = productData
    return (
      <Link className="link-item" to={`/product/${id}`}>
            <li className="product-item">
                <img src={image_url} alt="product" className="thumbnail" />
                <h1 className="title">{title}</h1>
                <p className="brand">by {brand}</p>
                <div className="product-details">
                    <p className="price">Rs {price}/-</p>
                    <div className="rating-container">
                        <p className="rating">{rating}</p>
                        <img
                            src="https://assets.ccbp.in/frontend/react-js/star-img.png"
                            alt="star"
                            className="star"
                        />
                    </div>
                </div>
            </li>
            </Link>
    )
}

export default ProductCard