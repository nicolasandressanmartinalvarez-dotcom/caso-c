import { useAuth0 } from "@auth0/auth0-react";
import { useNavigate } from "react-router-dom";
import HeaderCSS from './Header.module.css'
function Header() {

  const { isLoading, isAuthenticated, error, loginWithRedirect: login, logout: auth0Logout, user, } = useAuth0(); 
  const navigate = useNavigate();

  const signup = () =>
    login({ authorizationParams: { screen_hint: "signup" } });

  const logout = () =>
    auth0Logout({ logoutParams: { returnTo: window.location.origin } });

  if (isLoading) return <p>Cargando...</p>;

  return (
    <header className={HeaderCSS["div-header"]}>
      <h2>Sanos y Salvos</h2>
      <div>
        {!isAuthenticated && (
          <>
            {error && <p>Error: {error.message}</p>}
            <button className={HeaderCSS["boton_diseño"]} onClick={login}> Login </button>
            <button className={HeaderCSS["boton_diseño"]} onClick={signup}> Registro </button>
          </>
        )}
        {isAuthenticated && (
        <>
          <span>Bienvenido {user?.name}</span>
          <button className={HeaderCSS["boton_diseño"]} onClick={logout}> Logout </button>
          <button className={HeaderCSS["boton_diseño"]} onClick={() => navigate("/registrar")}> Registrar Mascota </button>
        </>
        )}
      </div>
    </header>
  );
}


export default Header;