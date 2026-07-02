import { Navigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { useEffect, useState } from "react";

function RutaProtegidaVeterinaria({ children }) {
    const { 
        isAuthenticated, 
        isLoading, 
        getAccessTokenSilently, 
        user 
    } = useAuth0();

    const [usuario, setUsuario] = useState(null);
    const [loadingUser, setLoadingUser] = useState(true);

    useEffect(() => {
        const buscarUser = async () => {
            if (!user?.email) {
                setLoadingUser(false);
                return;
            }

            try {
                const token = await getAccessTokenSilently();
                const request = await fetch(`https://a1a3-191-116-30-200.ngrok-free.app/api/usuarios/${user.email}`, {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'ngrok-skip-browser-warning': 'true'
                    },
                });

                if (request.ok) {
                    const info = await request.json();
                    console.log("Usuario encontrado:", info);
                    setUsuario(info);
                } else {
                    console.error("Error en la respuesta del servidor");
                    setUsuario(null);
                }
            } catch (error) {
                console.error("Error haciendo el fetch del usuario:", error);
                setUsuario(null);
            } finally {
                setLoadingUser(false);
            }
        };

        if (!isLoading) {
            if (isAuthenticated) {
                buscarUser();
            } else {
                setLoadingUser(false);
            }
        }
    }, [isLoading, isAuthenticated, user?.email, getAccessTokenSilently]);

    if (isLoading || loadingUser) {
        return <p>Cargando.....</p>;
    }

    if (!isAuthenticated) {
        return <Navigate to="/" replace />;
    }

    if (!usuario) {
        return <p>Error cargando usuario</p>;
    }

    if (usuario.entidadPerteneciente !== "Veterinaria" && usuario.entidadPerteneciente != 'Admin') {
        return <Navigate to="/" replace />;
    }

    return children;
}

export default RutaProtegidaVeterinaria;