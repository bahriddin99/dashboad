import { Navigate } from "react-router-dom";
import { isAuthenticated } from "../../utils/data-service";
import { ProtectedRouteProps } from "../../interface/global";

const Protected = ({element}:ProtectedRouteProps)=>{
    return isAuthenticated() ? <Navigate to={"/main"} replace/>: element
}

export default Protected