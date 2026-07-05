import { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import ListarUsuPermCSS from './listarEmp.module.css'; // Importamos tu mismo archivo de estilos
import { FaSearch, FaUserEdit, FaTrashAlt, FaUserShield, FaCheckCircle, FaTimesCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

function ListarEmpleados() {
    const navigate = useNavigate();
    const { getAccessTokenSilently, user, isAuthenticated, isLoading: authLoading } = useAuth0();
    
    const [empleados, setEmpleados] = useState([]);
    const [filtrados, setFiltrados] = useState([]);
    const [cargandoDatos, setCargandoDatos] = useState(true);
    const [error, setError] = useState(null);
    
    const [busqueda, setBusqueda] = useState("");
    const [filtroRol, setFiltroRol] = useState("");

    const cargarEmpleados = async () => {
        if (!user?.email) return;

        try {
            setCargandoDatos(true);
            setError(null);
            const token = await getAccessTokenSilently();
            const headers = { Authorization: `Bearer ${token}` };

            // 1. Buscamos al usuario logueado en la lista general para extraer su idVeterinaria
            const responseUsuarios = await fetch("http://localhost:8086/api/usuPermitidos", { headers });
            if (!responseUsuarios.ok) throw new Error("Error al obtener los usuarios permitidos");
            
            const usuariosPermitidos = await responseUsuarios.json();
            const usuarioActual = usuariosPermitidos.find(u => u.correoUsuario === user.email);
            
            if (!usuarioActual || !usuarioActual.veterinaria?.id) {
                setError("El usuario actual no tiene una veterinaria asignada.");
                setEmpleados([]);
                setFiltrados([]);
                return;
            }

            const idVeterinaria = usuarioActual.veterinaria.id;

            // 2. Traemos únicamente los empleados que pertenecen a esa veterinaria (Puerto 8086)
            const responseEmpleados = await fetch(`http://localhost:8086/api/usuPermitidos/veterinaria/${idVeterinaria}`, { headers });
            if (!responseEmpleados.ok) throw new Error("Error al cargar los empleados de la veterinaria");

            const dataEmpleados = await responseEmpleados.json();
            setEmpleados(dataEmpleados);
            setFiltrados(dataEmpleados);
        } catch (error) {
            console.error("Error al cargar empleados:", error);
            setError(error.message);
        } finally {
            setCargandoDatos(false);
        }
    };

    // Efecto para vigilar el estado de la sesión de Auth0
    useEffect(() => {
        if (isAuthenticated && !authLoading) {
            cargarEmpleados();
        } else if (!authLoading && !isAuthenticated) {
            setCargandoDatos(false);
            setError("Debes iniciar sesión para ver los empleados.");
        }
    }, [isAuthenticated, authLoading, user, getAccessTokenSilently]);

    // Efecto para la barra de búsqueda y filtros en tiempo real
    useEffect(() => {
        let resultado = empleados.filter((u) => {
            const nombreCompleto = `${u.nombreUser || ""} ${u.apellidoPa || ""} ${u.apellidoMa || ""}`.toLowerCase();
            const coincideBusqueda = nombreCompleto.includes(busqueda.toLowerCase()) || 
                                     (u.correoUsuario || "").toLowerCase().includes(busqueda.toLowerCase());
            const coincideRol = filtroRol === "" || u.rol === filtroRol;
            return coincideBusqueda && coincideRol;
        });
        setFiltrados(resultado);
    }, [busqueda, filtroRol, empleados]);

    if (authLoading || cargandoDatos) {
        return (
            <section className={ListarUsuPermCSS["contenedor-usuarios"]}>
                <p style={{ textAlign: "center", padding: "2rem" }}>Cargando directorio de empleados...</p>
            </section>
        );
    }

    return (
        <section className={ListarUsuPermCSS["contenedor-usuarios"]}>
            <div className={ListarUsuPermCSS["header-lista"]}>
                <div className={ListarUsuPermCSS["titulo-seccion"]}>
                    <h2>Directorio de Empleados <FaUserShield className={ListarUsuPermCSS["icono-titulo"]}/></h2>
                    <p>Visualiza y gestiona los accesos y roles del personal de tu sucursal.</p>
                </div>
            </div>

            <div className={ListarUsuPermCSS["toolbar"]}>
                <div className={ListarUsuPermCSS["search-box"]}>
                    <FaSearch className={ListarUsuPermCSS["search-icon"]} />
                    <input 
                        type="text" 
                        placeholder="Buscar por nombre o correo..." 
                        value={busqueda} 
                        onChange={(e) => setBusqueda(e.target.value)} 
                    />
                </div>
                <div className={ListarUsuPermCSS["filter-box"]}>
                    <select value={filtroRol} onChange={(e) => setFiltroRol(e.target.value)}>
                        <option value="">Todos los roles</option>
                        <option value="Jefe Veterinaria">Jefe Veterinaria</option>
                        <option value="Veterinario">Veterinario</option>
                        <option value="Recepcionista">Recepcionista</option>
                    </select>
                </div>
            </div>

            {error ? (
                <div style={{ textAlign: "center", padding: "2rem", color: "#ef4444", fontWeight: "600" }}>
                    <p>{error}</p>
                </div>
            ) : (
                <div className={ListarUsuPermCSS["table-container"]}>
                    <table className={ListarUsuPermCSS["table-usuarios"]}>
                        <thead>
                            <tr>
                                <th>Nombre</th>
                                <th>Correo</th>
                                <th>Rol</th>
                                <th>Sucursal</th>
                                <th>Estado</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filtrados.length === 0 ? (
                                <tr>
                                    <td colSpan="6" style={{ textAlign: "center", padding: "2rem" }}>
                                        No se encontraron empleados registrados en tu sucursal.
                                    </td>
                                </tr>
                            ) : (
                                filtrados.map((emp) => (
                                    <tr key={emp.id}>
                                        <td className={ListarUsuPermCSS["nombre-cell"]}>
                                            {emp.nombreUser} {emp.apellidoPa} {emp.apellidoMa || ""}
                                        </td>
                                        <td>{emp.correoUsuario}</td>
                                        <td>
                                            <span className={`${ListarUsuPermCSS["badge-rol"]} ${ListarUsuPermCSS[(emp.rol || "").replace(/\s+/g, '-').toLowerCase()]}`}>
                                                {emp.rol}
                                            </span>
                                        </td>
                                        <td>{emp.veterinaria?.nombreVeterinaria || "N/A"}</td>
                                        <td>
                                            {emp.estadoUser === "Activo" ? (
                                                <span className={ListarUsuPermCSS["status-activo"]}><FaCheckCircle /> Activo</span>
                                            ) : (
                                                <span className={ListarUsuPermCSS["status-inactivo"]}><FaTimesCircle /> Inactivo</span>
                                            )}
                                        </td>
                                        <td className={ListarUsuPermCSS["acciones-cell"]}>
                                            <button 
                                                className={ListarUsuPermCSS["btn-icon"]} 
                                                title="Editar permisos" 
                                                onClick={() => navigate(`/admin/editarUserPermVet/${emp.id}`)}
                                            >
                                                <FaUserEdit />
                                            </button>
                                            <button 
                                                className={`${ListarUsuPermCSS["btn-icon"]} ${ListarUsuPermCSS["btn-delete"]}`} 
                                                title="Revocar acceso"
                                            >
                                                <FaTrashAlt />
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            )}
        </section>
    );
}

export default ListarEmpleados;