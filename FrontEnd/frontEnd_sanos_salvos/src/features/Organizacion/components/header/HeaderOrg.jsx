import { useAuth0 } from "@auth0/auth0-react";
import { NavLink } from "react-router-dom";

import HeaderOrgCSS from './HeaderOrg.module.css' 

function HeaderOrg (){
    const { isLoading, isAuthenticated, loginWithRedirect: login, logout: auth0Logout, user} = useAuth0(); 

    const logout = () =>
        auth0Logout({ logoutParams: { returnTo: window.location.origin } });

    if (isLoading) return <p>Cargando...</p>;

    return (
        <header className={HeaderOrgCSS["div-header"]}>
            <div className={HeaderOrgCSS["div-img"]}>
                <NavLink to="/organizacion"> <img src="/Logo.png" alt="Logo" /> </NavLink>
            </div>
            
            <div className={HeaderOrgCSS["user-info"]}>
                {isAuthenticated && (
                    <>
                        <span>Bienvenido, <strong>{user?.nickname}</strong></span>
                        <button className={HeaderOrgCSS["boton_diseño"]} onClick={logout}>
                            Logout
                        </button>
                    </>
                )}
            </div>
        </header>
    );
}   

export default HeaderOrg;
