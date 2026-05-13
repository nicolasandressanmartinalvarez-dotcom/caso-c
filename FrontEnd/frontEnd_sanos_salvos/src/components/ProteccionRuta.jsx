import { useAuth0 } from "@auth0/auth0-react";

function ProtectedRoute({ children }) {
  const { isAuthenticated, isLoading } = useAuth0();

  if (isLoading) return <p>Cargando...</p>;

  if (!isAuthenticated) {
    return <p>No tienes acceso. Debes iniciar sesión.</p>;
  }

  return children;
}

export default ProtectedRoute;