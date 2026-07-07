import { useAuth0 } from "@auth0/auth0-react";
import { useNavigate } from "react-router-dom";
import HeaderCSS from './Header.module.css'
import { useEffect, useState } from "react";
function Header() {

  const { isLoading, isAuthenticated, error, loginWithRedirect: login,getAccessTokenSilently, logout: auth0Logout, user, } = useAuth0(); 
  const navigate = useNavigate();
  const [datosUser, setDatosUser] = useState([]);
  const [cargDatos, setCargandoDatos] = useState(true);
  const signup = () =>
    login({ authorizationParams: { screen_hint: "signup" } });

  const logout = () =>
    auth0Logout({ logoutParams: { returnTo: window.location.origin } });

  const obtenerUsuario = async () => {
  if (!user?.email || isLoading) return;

  try {
    setCargandoDatos(true);
    const token = await getAccessTokenSilently();
    
    const headersGlobal = {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
        "ngrok-skip-browser-warning": "69420"
    };

    const URL_API_GLOBAL = " https://d4b7-191-116-1-132.ngrok-free.app/api/usuarios"; 
    const resBusqueda = await fetch(`${URL_API_GLOBAL}/${user.email}`, { headers: headersGlobal });

    if (!resBusqueda.ok) throw new Error("Error al obtener el usuario");

    const datosUserJson = await resBusqueda.json();
    setDatosUser(datosUserJson);
  } catch (err) {
    console.error("Error en la petición:", err);
  } finally {
    setCargandoDatos(false);
  }
};

  useEffect(() => {
  if (isAuthenticated && user) {
    obtenerUsuario();
  }
}, [user, isAuthenticated, isLoading]);
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
          <span>Bienvenido {user?.nickname}</span>
          <button className={HeaderCSS["boton_diseño"]} onClick={logout}> Logout </button>
          
          <button className={HeaderCSS["boton_diseño"]} onClick={() => navigate("/registrar")}> 
            Registrar Mascota 
          </button>

          {cargDatos ? (
            <p></p>
          ) : (
            datosUser?.entidadPerteneciente === "Admin" ? <button className={HeaderCSS["boton_diseño"]} onClick={() => navigate("/admin")}>Ir a mi panel</button>:
            datosUser.entidadPerteneciente === "Veterina" ?<button className={HeaderCSS["boton_diseño"]} onClick={() => navigate("/veterinaira")}>Ir a mi panel</button>:
            datosUser.entidadPerteneciente === "Municipalidad" ?<button className={HeaderCSS["boton_diseño"]} onClick={() => navigate("/municipalidad")}>Ir a mi panel</button>:
            datosUser.entidadPerteneciente === "Organizacion" ?<button className={HeaderCSS["boton_diseño"]} onClick={() => navigate("/organizacion")}>Ir a mi panel</button>:
            <p></p>
          )}
        </>
      )}
      </div>
    </header>
  );
}


export default Header;