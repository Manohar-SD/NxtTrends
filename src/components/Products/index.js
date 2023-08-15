import "./index.css"
import ProductList from "../ProductsList"
import PrimeDeals from "../PrimeDeals"

const  Products = () => {
   return (
    <div className="product-sections">
        <PrimeDeals/>
        <ProductList/>
    </div>
       
    )
}

export default Products