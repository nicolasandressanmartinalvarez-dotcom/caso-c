import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";

const ProtectedRoute = ({ children }) => {
    const { isAuthenticated, isLoading } = useAuth0();
    const navigate = useNavigat(); 
    
    useEffect(()=>{
        if(!isAuthenticated){
            alert("Debe de iniciar sesion")
            navigate("/")
        }
    },[])

    if (!isAuthenticated) {
        return <p>No tienes acceso. Debes iniciar sesión.</p>;
    }

    return children;
}

export default ProtectedRoute;