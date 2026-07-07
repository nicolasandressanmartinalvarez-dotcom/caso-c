import { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { NavLink } from "react-router-dom";
import { FaMapMarkerAlt, FaPhoneAlt, FaEnvelope, FaEdit, FaTrashAlt, FaCity } from "react-icons/fa";
import CSS from "./ListarMunicipalidades.module.css";

function ListarMunicipalidades() {
    const [municipalidades, setMunicipalidades] = useState([]);
    const [cargando, setCargando] = useState(true);
    const { getAccessTokenSilently } = useAuth0();

    const cargarMunicipalidades = async () => {
        try {
            const token = await getAccessTokenSilently();
            const response = await fetch("http://localhost:8082/api/municipalidades", {
                headers: { Authorization: `Bearer ${token}` }
            });
            const data = await response.json();
            setMunicipalidades(data);
        } catch (error) {
            console.error("Error al cargar municipalidades:", error);
        } finally {
            setCargando(false);
        }
    };

    useEffect(() => {
        cargarMunicipalidades();
    }, []);

    const eliminar = async (id) => {
        if (!confirm("¿Eliminar esta municipalidad?")) return;
        try {
            const token = await getAccessTokenSilently();
            await fetch(`http://localhost:8080/api/municipalidades/${id}`, {
                method: "DELETE",
                headers: { Authorization: `Bearer ${token}` }
            });
            setMunicipalidades(municipalidades.filter(m => m.id !== id));
        } catch (error) {
            console.error("Error al eliminar:", error);
        }
    };

    if (cargando) return <p>Cargando municipalidades...</p>;

    return (
        <section className={CSS["contenedor-lista"]}>
            <div className={CSS["header-lista"]}>
                <div className={CSS["titulo-seccion"]}>
                    <h2>Administrar Municipalidades</h2>
                    <p>Gestiona todas las municipalidades registradas en la red.</p>
                </div>
                <NavLink to="/admin/AgregarMunicipalidad" className={CSS["btn-nuevo"]}>
                    + Nueva Municipalidad
                </NavLink>
            </div>

            {municipalidades.length === 0 ? (
                <p className={CSS["sin-datos"]}>No hay municipalidades registradas.</p>
            ) : (
                <div className={CSS["grid-cards"]}>
                    {municipalidades.map((m) => (
                        <div className={CSS["card"]} key={m.id}>
                            <div className={CSS["card-header"]}>
                                <h3>{m.nombre}</h3>
                                <span className={CSS["badge"]}>{m.region}</span>
                            </div>
                            <div className={CSS["card-body"]}>
                                <p><FaCity className={CSS["icono"]} /> {m.comuna}</p>
                                <p><FaPhoneAlt className={CSS["icono"]} /> {m.telefono}</p>
                                <p><FaEnvelope className={CSS["icono"]} /> {m.correoInstitucional}</p>
                                {m.latitud && <p><FaMapMarkerAlt className={CSS["icono"]} /> {m.latitud}, {m.longitud}</p>}
                            </div>
                            <div className={CSS["card-footer"]}>
                                <button className={`${CSS["btn-accion"]} ${CSS["btn-editar"]}`}>
                                    <FaEdit /> Editar
                                </button>
                                <button
                                    className={`${CSS["btn-accion"]} ${CSS["btn-eliminar"]}`}
                                    onClick={() => eliminar(m.id)}
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

export default ListarMunicipalidades;
