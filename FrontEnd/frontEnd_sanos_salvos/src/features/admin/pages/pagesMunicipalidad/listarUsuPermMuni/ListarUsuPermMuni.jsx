import { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import ListarUsuPermCSS from './ListarUsuPermMuni.module.css';
import { FaSearch, FaUserEdit, FaTrashAlt, FaUserShield, FaCheckCircle, FaTimesCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

function ListarUsuPermMuni() {
    const navigate = useNavigate();
    const { getAccessTokenSilently } = useAuth0();
    const [usuarios, setUsuarios] = useState([]);
    const [filtrados, setFiltrados] = useState([]);
    const [busqueda, setBusqueda] = useState("");
    const [filtroRol, setFiltroRol] = useState("");

    const cargarUsuarios = async () => {
        try {
            const token = await getAccessTokenSilently();
            const response = await fetch("http://localhost:8080/api/usuPermitidosMuni", {
                headers: { Authorization: `Bearer ${token}` }
            });
            const data = await response.json();
            setUsuarios(data);
            setFiltrados(data);
        } catch (error) {
            console.error("Error al cargar usuarios:", error);
        } 
    };

    useEffect(() => {
        cargarUsuarios();
    }, [getAccessTokenSilently]);

    useEffect(() => {
        let resultado = usuarios.filter((u) => {
            const coincideBusqueda = (u.nombreUser || "").toLowerCase().includes(busqueda.toLowerCase()) || 
                                     (u.correoUsuario || "").toLowerCase().includes(busqueda.toLowerCase());
            const coincideRol = filtroRol === "" || u.rol === filtroRol;
            return coincideBusqueda && coincideRol;
        });
        setFiltrados(resultado);
    }, [busqueda, filtroRol, usuarios]);

    return (
        <section className={ListarUsuPermCSS["contenedor-usuarios"]}>
            <div className={ListarUsuPermCSS["header-lista"]}>
                <div className={ListarUsuPermCSS["titulo-seccion"]}>
                    <h2>Usuarios Permitidos Muni <FaUserShield className={ListarUsuPermCSS["icono-titulo"]}/></h2>
                    <p>Gestión de accesos y roles del personal municipal.</p>
                </div>
            </div>
            <div className={ListarUsuPermCSS["toolbar"]}>
                <div className={ListarUsuPermCSS["search-box"]}>
                    <FaSearch className={ListarUsuPermCSS["search-icon"]} />
                    <input type="text" placeholder="Buscar por nombre o correo..." value={busqueda} onChange={(e) => setBusqueda(e.target.value)} />
                </div>
                <div className={ListarUsuPermCSS["filter-box"]}>
                    <select value={filtroRol} onChange={(e) => setFiltroRol(e.target.value)}>
                        <option value="">Todos los roles</option>
                        <option value="Administrador Municipal">Administrador Municipal</option>
                        <option value="Fiscalizador">Fiscalizador</option>
                        <option value="Operador">Operador</option>
                    </select>
                </div>
            </div>
            <div className={ListarUsuPermCSS["table-container"]}>
                <table className={ListarUsuPermCSS["table-usuarios"]}>
                    <thead>
                        <tr>
                            <th>Nombre</th>
                            <th>Correo</th>
                            <th>Rol</th>
                            <th>Municipalidad</th>
                            <th>Estado</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filtrados.map((user) => (
                            <tr key={user.id}>
                                <td className={ListarUsuPermCSS["nombre-cell"]}>{user.nombreUser} {user.apellidoPa}</td>
                                <td>{user.correoUsuario}</td>
                                <td><span className={`${ListarUsuPermCSS["badge-rol"]} ${ListarUsuPermCSS[(user.rol || "").replace(/\s+/g, '-').toLowerCase()] || ''}`}>{user.rol}</span></td>
                                <td>{user.municipalidad?.nombreMunicipalidad || "N/A"}</td>
                                <td>
                                    {user.estadoUser === "Activo" ? (
                                        <span className={ListarUsuPermCSS["status-activo"]}><FaCheckCircle /> Activo</span>
                                    ) : (
                                        <span className={ListarUsuPermCSS["status-inactivo"]}><FaTimesCircle /> Inactivo</span>
                                    )}
                                </td>
                                <td className={ListarUsuPermCSS["acciones-cell"]}>
                                    <button className={ListarUsuPermCSS["btn-icon"]} title="Editar permisos" onClick={() => navigate(`/admin/editarUserPermMuni/${user.id}`)}>
                                        <FaUserEdit />
                                    </button>
                                    <button className={`${ListarUsuPermCSS["btn-icon"]} ${ListarUsuPermCSS["btn-delete"]}`} title="Revocar acceso"><FaTrashAlt /></button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </section>
    );
}

export default ListarUsuPermMuni;
