import { useAuth0 } from "@auth0/auth0-react";
import { NavLink, useNavigate } from "react-router-dom";

import HeaderAdminCSS from './HeaderAdmin.module.css' 

function HeaderAdmin (){
    const { isLoading, isAuthenticated, error, loginWithRedirect: login, logout: auth0Logout, user} = useAuth0(); 
    const navigate = useNavigate();

    const signup = () =>
        login({ authorizationParams: { screen_hint: "signup" } });

    const logout = () =>
        auth0Logout({ logoutParams: { returnTo: window.location.origin } });

    if (isLoading) return <p>Cargando...</p>;

    return (
        <header className={HeaderAdminCSS["div-header"]}>
            <div className={HeaderAdminCSS["div-img"]}>
                <NavLink to="DashBoardAdmin"> <img src="/Logo.png" alt="Logo" /> </NavLink>
            </div>
            
            <div className={HeaderAdminCSS["user-info"]}>
                {isAuthenticated && (
                    <>
                        <span>Bienvenido, <strong>{user?.nickname}</strong></span>
                        <button className={HeaderAdminCSS["boton_diseño"]} onClick={logout}>
                            Logout
                        </button>
                    </>
                )}
            </div>
        </header>
    );
}   

export default HeaderAdmin;