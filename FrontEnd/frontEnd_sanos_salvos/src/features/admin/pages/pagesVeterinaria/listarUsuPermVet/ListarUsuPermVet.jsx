import ListarUsuPermCSS from './ListarUsuPermVet.module.css';
import { FaSearch, FaUserEdit, FaTrashAlt, FaUserShield, FaCheckCircle, FaTimesCircle } from "react-icons/fa";

function ListarUsuPerm() {
    const usuariosMock = [
        { id: 1, rut: "18.456.789-0", nombre: "Carlos Mendoza", correo: "carlos.m@vetcenter.cl", rol: "Jefe Veterinaria", sucursal: "VetCenter Principal", estado: "Activo" },
        { id: 2, rut: "19.876.543-K", nombre: "Ana Soto", correo: "ana.s@sanroque.cl", rol: "Veterinario", sucursal: "Clínica San Roque", estado: "Activo" },
        { id: 3, rut: "20.123.456-7", nombre: "Felipe Lagos", correo: "felipe.l@paws.cl", rol: "Recepcionista", sucursal: "Paws & Tails", estado: "Inactivo" },
    ];

    return (
        <section className={ListarUsuPermCSS["contenedor-usuarios"]}>
            <div className={ListarUsuPermCSS["header-lista"]}>
                <div className={ListarUsuPermCSS["titulo-seccion"]}>
                    <h2>Usuarios Permitidos <FaUserShield className={ListarUsuPermCSS["icono-titulo"]}/></h2>
                    <p>Gestión de accesos y roles del personal veterinario.</p>
                </div>
            </div>
            <div className={ListarUsuPermCSS["toolbar"]}>
                <div className={ListarUsuPermCSS["search-box"]}>
                    <FaSearch className={ListarUsuPermCSS["search-icon"]} />
                    <input type="text" placeholder="Buscar por RUT o nombre..." />
                </div>
                <div className={ListarUsuPermCSS["filter-box"]}>
                    <select defaultValue="">
                        <option value="">Todos los roles</option>
                        <option value="Jefe Veterinaria">Jefe Veterinaria</option>
                        <option value="Veterinario">Veterinario</option>
                        <option value="Recepcionista">Recepcionista</option>
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
                            <th>Sucursal</th>
                            <th>Estado</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {usuariosMock.map((user) => (
                            <tr key={user.id}>
                                <td className={ListarUsuPermCSS["nombre-cell"]}>{user.nombre}</td>
                                <td>{user.correo}</td>
                                <td>
                                    <span className={`${ListarUsuPermCSS["badge-rol"]} ${ListarUsuPermCSS[user.rol.replace(/\s+/g, '-').toLowerCase()]}`}>
                                        {user.rol}
                                    </span>
                                </td>
                                <td>{user.sucursal}</td>
                                <td>
                                    {user.estado === "Activo" ? (
                                        <span className={ListarUsuPermCSS["status-activo"]}><FaCheckCircle /> Activo</span>
                                    ) : (
                                        <span className={ListarUsuPermCSS["status-inactivo"]}><FaTimesCircle /> Inactivo</span>
                                    )}
                                </td>
                                <td className={ListarUsuPermCSS["acciones-cell"]}>
                                    <button className={ListarUsuPermCSS["btn-icon"]} title="Editar permisos">
                                        <FaUserEdit />
                                    </button>
                                    <button className={`${ListarUsuPermCSS["btn-icon"]} ${ListarUsuPermCSS["btn-delete"]}`} title="Revocar acceso">
                                        <FaTrashAlt />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </section>
    );
}

export default ListarUsuPerm;