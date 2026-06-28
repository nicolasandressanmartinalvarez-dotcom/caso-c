import { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { NavLink } from "react-router-dom";
import { FaEdit, FaTrashAlt, FaEnvelope, FaPhoneAlt, FaMapMarkerAlt, FaIdCard } from "react-icons/fa";
import { GrOrganization } from "react-icons/gr";
import CSS from "./ListarOrganizaciones.module.css";

function ListarOrganizaciones() {
    const [organizaciones, setOrganizaciones] = useState([]);
    const [cargando, setCargando] = useState(true);
    const { getAccessTokenSilently } = useAuth0();

    const cargarOrganizaciones = async () => {
        try {
            const token = await getAccessTokenSilently();
            const response = await fetch("http://localhost:8082/api/organizaciones", {
                headers: { Authorization: `Bearer ${token}` }
            });
            const data = await response.json();
            setOrganizaciones(data);
        } catch (error) {
            console.error("Error al cargar organizaciones:", error);
        } finally {
            setCargando(false);
        }
    };

    useEffect(() => {
        cargarOrganizaciones();
    }, []);

    const eliminar = async (id) => {
        if (!confirm("¿Eliminar esta organización?")) return;
        try {
            const token = await getAccessTokenSilently();
            await fetch(`http://localhost:8082/api/organizaciones/${id}`, {
                method: "DELETE",
                headers: { Authorization: `Bearer ${token}` }
            });
            setOrganizaciones(organizaciones.filter(o => o.id !== id));
        } catch (error) {
            console.error("Error al eliminar:", error);
        }
    };

    if (cargando) return <p>Cargando organizaciones...</p>;

    return (
        <section className={CSS["contenedor-lista"]}>
            <div className={CSS["header-lista"]}>
                <div className={CSS["titulo-seccion"]}>
                    <h2>Administrar Organizaciones</h2>
                    <p>Gestiona todas las organizaciones registradas en la red.</p>
                </div>
                <NavLink to="/admin/AgregarOrganizacion" className={CSS["btn-nuevo"]}>
                    + Nueva Organización
                </NavLink>
            </div>

            {organizaciones.length === 0 ? (
                <p className={CSS["sin-datos"]}>No hay organizaciones registradas.</p>
            ) : (
                <div className={CSS["grid-cards"]}>
                    {organizaciones.map((org) => (
                        <div className={CSS["card"]} key={org.id}>
                            <div className={CSS["card-header"]}>
                                <h3>{org.nombre}</h3>
                                <span className={CSS["badge"]}>{org.tipoOrganizacion}</span>
                            </div>
                            <div className={CSS["card-body"]}>
                                <p><FaIdCard className={CSS["icono"]} /> RUT: {org.rut}</p>
                                <p><FaMapMarkerAlt className={CSS["icono"]} /> {org.direccion}</p>
                                <p><FaPhoneAlt className={CSS["icono"]} /> {org.telefono}</p>
                                <p><FaEnvelope className={CSS["icono"]} /> {org.email}</p>
                                <p><GrOrganization className={CSS["icono"]} /> {org.municipalidad}</p>
                            </div>
                            <div className={CSS["card-footer"]}>
                                <button className={`${CSS["btn-accion"]} ${CSS["btn-editar"]}`}>
                                    <FaEdit /> Editar
                                </button>
                                <button
                                    className={`${CSS["btn-accion"]} ${CSS["btn-eliminar"]}`}
                                    onClick={() => eliminar(org.id)}
                                >
                                    <FaTrashAlt /> Eliminar
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </section>
    );
}

export default ListarOrganizaciones;
