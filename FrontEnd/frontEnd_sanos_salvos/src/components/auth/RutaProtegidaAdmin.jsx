import { Navigate}from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";

function RutaProtegidaAdmin ({ children }){
    const {isAuthenticated, isLoading } = useAuth0();
    
    if(isLoading){
        return <p>Cargando.....</p>
    }
    if(!isAuthenticated){
        alert("Debe de iniciar sesion")
        return <Navigate to="/" replace/>
    }
    return children;
}

export default RutaProtegidaAdmin;