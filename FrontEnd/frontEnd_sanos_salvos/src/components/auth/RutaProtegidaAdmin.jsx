import { Navigate}from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";

function RutaProtegidaAdmin ({ children }){
    const {isAuthenticated, isLoading } = useAuth0();
    
    // Esperar a que Auth0 termine de verificar la sesión antes de decidir
    if(isLoading){
        return <p>Cargando.....</p>
    }
    if(!isAuthenticated){
        return <Navigate to="/" replace/>
    }
    return children;
}

export default RutaProtegidaAdmin;