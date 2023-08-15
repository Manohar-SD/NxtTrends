import { Outlet, Navigate } from "react-router-dom"
import Cookies from "js-cookie"


const ProtectedRoutes = ()=>{

    let jwtToken = Cookies.get("jwtToken")
    if(jwtToken===undefined){
        return <Navigate to={"/login"}/>
    }else{
        return <Outlet/>
    }

}

export default ProtectedRoutes