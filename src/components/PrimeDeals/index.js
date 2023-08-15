import { useState, useEffect } from "react"
import PulseLoader from "react-spinners/PulseLoader"
import ProductCard from "../ProductCard"
import Cookies from "js-cookie"
import "./index.css"
let PrimeDeals = () => {
    let apiConstants = {
        initial: "INITIAL",
        inProgress: "IN_PROGRESS",
        success: "SUCCESS",
        failure: "FAILURE"
    }
    const [apiResponse, setApiResponse] = useState({
        status: apiConstants.initial,
        primeDeals: null,
        errorMsg: null
    })

    useEffect(() => {
        setApiResponse(prevResponse=>({
            ...prevResponse,
            status:apiConstants.inProgress
        }))
        getPrimeDeals()
    }, [])




    let getPrimeDeals = async () => {
        const url = "https://apis.ccbp.in/prime-deals"
        const token = Cookies.get("jwtToken")
        const options = {
            method: "GET",
            headers: {
                "content-type": "application/json",
                Authorization: `Bearer ${token}`
            }
        }

        const response = await fetch(url, options)
        const responseData = await response.json()
        console.log(responseData)
        if (response.ok) {
            setApiResponse(prevResponse => ({ ...prevResponse, status: apiConstants.success, primeDeals: responseData.prime_deals }))
        } else {
            setApiResponse(prevResponse => ({ ...prevResponse, status: apiConstants.failure, errorMsg: responseData.error_msg }))
        }
    }

    let renderPrimeDealsList = ()=>{
        const {primeDeals} = apiResponse
        return  <div>
        <h1 className="primedeals-list-heading">Exclusive Prime Deals</h1>
        <ul className="products-list">
          {primeDeals.map(product => (
            <ProductCard productData={product} key={product.id} />
          ))}
        </ul>
      </div>
    }

    let renderLoadingView = () => {
        return (
            <div className="primedeals-loader-container">
                <PulseLoader size={15} color="#0b69ff" />
            </div>
        )
    }

    let renderPrimeDealsFailureView = () => (
        <img
          src="https://assets.ccbp.in/frontend/react-js/exclusive-deals-banner-img.png"
          alt="Register Prime"
          className="register-prime-image"
        />
      )

    let renderPrimeDeals = ()=>{
        const {status} = apiResponse
        switch(status){
            case apiConstants.success:
                return renderPrimeDealsList()
            case apiConstants.inProgress:
                return renderLoadingView()
            case apiConstants.failure:
                return renderPrimeDealsFailureView()
        }
    }


    return (
        renderPrimeDeals()
    )


}

export default PrimeDeals