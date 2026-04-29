import { useAuth0 } from "@auth0/auth0-react";
import { useNavigate } from "react-router-dom";
import './diseño/Header.css'
function Header() {

  const {
    isLoading,
    isAuthenticated,
    error,
    loginWithRedirect: login,
    logout: auth0Logout,
    user,
  } = useAuth0();
  const navigate = useNavigate();

  const signup = () =>
    login({ authorizationParams: { screen_hint: "signup" } });

  const logout = () =>
    auth0Logout({ logoutParams: { returnTo: window.location.origin } });

  if (isLoading) return <p>Cargando...</p>;

  return (
    <header style={styles.header}>
      <h2>Sanos y Salvos</h2>

      <div>
        {/* Inicio de seccion o registro de usuarios */}
        {!isAuthenticated && (
          <>
            {error && <p>Error: {error.message}</p>}

            <button style={styles.boton_diseño} onClick={login}>
              Login
            </button>

            <button style={styles.boton_diseño} onClick={signup}>
              Registro
            </button>
          </>
        )}

        {/* una vez que estes iniciado o registrado desde auth0 */}
        {isAuthenticated && (
          <>
            <span>Bienvenido {user?.name}</span>

            <button style={styles.boton_diseño} onClick={logout}>
              Logout
            </button>

            <button style={styles.boton_diseño} onClick={() => navigate("/registrar")}>
              Registrar Mascota
            </button>
          </>
        )}
      </div>
    </header>
  );
}

const styles = {
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "10px",
    borderBottom: "2px solid black",
    backgroundColor: "#00ff95",  /*buged ?*/

    color: "white"
  },
  boton_diseño: {
    marginLeft: "10px",
    padding: "8px 15px",
    backgroundColor: "#12d412d3", /** color de los botones, falta arreglar con el ccs */
    color: "white",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer"
  }
};

export default Header;