import { useAuth0 } from "@auth0/auth0-react";
import { NavLink } from "react-router-dom";

import HeaderMuniCSS from './HeaderMuni.module.css' 

function HeaderMuni (){
    const { isLoading, isAuthenticated, loginWithRedirect: login, logout: auth0Logout, user} = useAuth0(); 

    const logout = () =>
        auth0Logout({ logoutParams: { returnTo: window.location.origin } });

    if (isLoading) return <p>Cargando...</p>;

    return (
        <header className={HeaderMuniCSS["div-header"]}>
            <div className={HeaderMuniCSS["div-img"]}>
                <NavLink to="/municipalidad"> <img src="/Logo.png" alt="Logo" /> </NavLink>
            </div>
            
            <div className={HeaderMuniCSS["user-info"]}>
                {isAuthenticated && (
                    <>
                        <span>Bienvenido, <strong>{user?.nickname}</strong></span>
                        <button className={HeaderMuniCSS["boton_diseño"]} onClick={logout}>
                            Logout
                        </button>
                    </>
                )}
            </div>
        </header>
    );
}   

export default HeaderMuni;
