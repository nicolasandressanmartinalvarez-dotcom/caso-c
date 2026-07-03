import { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { NavLink } from 'react-router-dom';
import { FaMapMarkerAlt, FaPhoneAlt, FaEnvelope, FaGlobe, FaEdit, FaTrashAlt } from "react-icons/fa";
import ListarVeterinariasCSS from './ListarVeterinarias.module.css';

function ListarVeterinarias() {
    const [veterinarias, setVeterinarias] = useState([]);
    const { getAccessTokenSilently } = useAuth0();

    const cargarVeterinarias = async () => {
        try {
            const token = await getAccessTokenSilently();
            const response = await fetch("http://localhost:8086/api/veterinaria", {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            if (response.ok) {
                const data = await response.json();
                setVeterinarias(data);
            }
        } catch (error) {
            console.error("Error al cargar veterinarias:", error);
        }
    };

    useEffect(() => {
        cargarVeterinarias();
    }, [getAccessTokenSilently]);

    return (
        <section className={ListarVeterinariasCSS["contenedor-lista"]}>
            <div className={ListarVeterinariasCSS["header-lista"]}>
                <div className={ListarVeterinariasCSS["titulo-seccion"]}>
                    <h2>Administrar Veterinarias</h2>
                    <p>Gestiona todas las sucursales y clínicas registradas en la red.</p>
                </div>
                <NavLink to="/admin/AgregarVeterinaria" className={ListarVeterinariasCSS["btn-nuevo"]}>
                    + Nueva Veterinaria
                </NavLink>
            </div>

            <div className={ListarVeterinariasCSS["grid-veterinarias"]}>
                {veterinarias.length === 0 ? <><p>No hay veterinarias registradas</p></> :
                veterinarias.map((vet) => (
                    <div className={ListarVeterinariasCSS["card-vet"]} key={vet.id}>
                        <div className={ListarVeterinariasCSS["card-header"]}>
                            <h3>{vet.nombreVeterinaria}</h3>
                            <span className={ListarVeterinariasCSS["badge-activo"]}>Activa</span>
                        </div>
                        
                        <div className={ListarVeterinariasCSS["card-body"]}>
                            <p><FaMapMarkerAlt className={ListarVeterinariasCSS["icono"]} /> {vet.direccion}</p>
                            <p><FaPhoneAlt className={ListarVeterinariasCSS["icono"]} /> {vet.telefono}</p>
                            <p><FaEnvelope className={ListarVeterinariasCSS["icono"]} /> {vet.correo}</p>
                            <p><FaGlobe className={ListarVeterinariasCSS["icono"]} /> {vet.dominio}</p>
                        </div>

                        <div className={ListarVeterinariasCSS["card-footer"]}>
                            <button className={`${ListarVeterinariasCSS["btn-accion"]} ${ListarVeterinariasCSS["btn-editar"]}`}>
                                <FaEdit /> Editar
                            </button>
                            <button className={`${ListarVeterinariasCSS["btn-accion"]} ${ListarVeterinariasCSS["btn-eliminar"]}`}>
                                <FaTrashAlt /> Eliminar
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}

export default ListarVeterinarias;