import "./index.css"

import { useState, useEffect } from "react"

import ProductCard from "../ProductCard"
import Cookies from "js-cookie"
import PulseLoader from "react-spinners/PulseLoader"
import FilterContainer from "../FilterContainer"

import ProductHeader from "../ProductHeader"


const ProductList = () => {

    const apiConstants = {
        initial: "INITIAL",
        success: "SUCCESS",
        failure: "FAILURE",
        inProgress: "IN_PROGRESS"
    }

    const sortByOptions = [{
        optionId: "PRICE_HIGH",
        displayText: "Price(High To Low)"
    },
    {
        optionId: "PRICE_LOW",
        displayText: "Price(Low To High)"
    }
    ]

    const categoryOptions = [{
        name: 'Clothing',
        categoryId: '1',
    },
    {
        name: 'Electronics',
        categoryId: '2',
    },
    {
        name: 'Appliances',
        categoryId: '3',
    },
    {
        name: 'Grocery',
        categoryId: '4',
    },
    {
        name: 'Toys',
        categoryId: '5',
    },

    ]

    const ratingOptions = [
        {
            ratingId: '4',
            imageUrl:
                'https://assets.ccbp.in/frontend/react-js/rating-four-stars-img.png',
        },
        {
            ratingId: '3',
            imageUrl:
                'https://assets.ccbp.in/frontend/react-js/rating-three-stars-img.png',
        },
        {
            ratingId: '2',
            imageUrl:
                'https://assets.ccbp.in/frontend/react-js/rating-two-stars-img.png',
        },
        {
            ratingId: '1',
            imageUrl:
                'https://assets.ccbp.in/frontend/react-js/rating-one-star-img.png',
        },
    ]




    const [showProducts, setShowProducts] = useState(
        {
            activeSortby: "",
            activeRating: "",
            activeCategory: "",
            searchInput: "",
            apiStatus: apiConstants.initial,
            productsList: null,
            errorMsg: null
        }
    )

    const { searchInput, activeCategory, activeRating, activeSortby } = showProducts

    

    let onChangeSortby = (option) => {
        setShowProducts(prevProducts => ({ ...prevProducts, activeSortby: option }))
    }

    let onChangeSearchInput = searchInput => {
        setShowProducts(prevProducts => ({ ...prevProducts, searchInput: searchInput }))
    }

    let changeActtiveCategory = (id) => {
        setShowProducts(prevProducts => ({ ...prevProducts, activeCategory: id }))
    }

    let changeAcitveRating = (id) => {
        setShowProducts(prevProducts => ({ ...prevProducts, activeRating: id }))
    }

    let getProducts = async (jwtToken) => {

        const { activeCategory, activeRating, activeSortby, searchInput } = showProducts

        const apiUrl = `https://apis.ccbp.in/products?sort_by=${activeSortby}&title_search=${searchInput}&category=${activeCategory}&rating=${activeRating}`
        const options = {
            method: "GET",
            headers: {
                Authorization: `Bearers ${jwtToken}`
            }
        }
        const response = await fetch(apiUrl, options)
        const responseproductsList = await response.json()
        if (response.ok) {
            setShowProducts(prevShowProducts => ({
                ...prevShowProducts,
                    apiStatus: apiConstants.success,
                    productsList: responseproductsList.products
            }))
        } else {
            setShowProducts(prevShowProducts => ({
                ...prevShowProducts,
                    apiStatus: apiConstants.failure,
                    errorMsg: responseproductsList.error_msg,
                
            }))
        }
    }

    useEffect(() => {
        let jwtToken = Cookies.get("jwtToken")
        setShowProducts(prevShowProducts => ({
            ...prevShowProducts,
                apiStatus: apiConstants.inProgress,
            
        }))
        getProducts(jwtToken)
 
    },[activeCategory,activeRating,activeSortby])
 
    let renderLoadingView = () => {
        return (
            <div className="products-loader-container">
                <PulseLoader size={15} color="#0b69ff" />
            </div>
        )
    }

    let renderSuccessView = () => {

        const { productsList } = showProducts
        const shouldShowProductList = productsList.length > 0

        return shouldShowProductList ? (
            <div className="all-products-container">
                <ProductHeader
                    activeOptionId={activeSortby}
                    sortbyOptions={sortByOptions}
                    changeSortBy={onChangeSortby}
                />
                <ul className="products-list">
                    {productsList.map(product => (
                        <ProductCard productData={product} key={product.id} />
                    ))}
                </ul>
            </div>
        ) : (
            <div className="no-products-view">
                <img
                    src="https://assets.ccbp.in/frontend/react-js/nxt-trendz/nxt-trendz-no-products-view.png"
                    className="no-products-img"
                    alt="no products"
                />
                <h1 className="no-products-heading">No Products Found</h1>
                <p className="no-products-description">
                    We could not find any products. Try other filters.
                </p>
            </div>
        )
    }

    let renderFailureView = () => {
        return <div className="products-error-view-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/nxt-trendz/nxt-trendz-products-error-view.png"
          alt="all-products-error"
          className="products-failure-img"
        />
        <h1 className="product-failure-heading-text">
          Oops! Something Went Wrong
        </h1>
        <p className="products-failure-description">
          We are having some trouble processing your request. Please try again.
        </p>
      </div>
    }

    let renderProductList = () => {
        const { apiStatus } = showProducts
        switch (apiStatus) {
            case apiConstants.inProgress:
                return renderLoadingView()
            case apiConstants.failure:
                return renderFailureView()
            case apiConstants.success:
                return renderSuccessView()
            default:
                return null
        }
    }

    let clearFilters = () => {
        setShowProducts(prevShowProducts => ({
            ...prevShowProducts, activeSortby: "",
            activeRating: "",
            activeCategory: "",
            searchInput: "",
        }))
        let jwtToken = Cookies.get("jwt_token")
        getProducts(jwtToken)
    }


    let onEnterPressed = () => {
        let jwtToken = Cookies.get("jwtToken")
        getProducts(jwtToken)
    }

   
    return (
        <div className="all-products-section">
            <FilterContainer
                changeSearchInput={onChangeSearchInput}
                searchEnterPressed={onEnterPressed}
                searchInput={searchInput}
                categoryOptions={categoryOptions}
                activeCategory={activeCategory}
                changeActtiveCategory={changeActtiveCategory}
                ratingOptions={ratingOptions}
                changeRating={changeAcitveRating}
                activeRating={activeRating}
                clearFilters={clearFilters}
            />

            {renderProductList()}

        </div>
    )

}

export default ProductList