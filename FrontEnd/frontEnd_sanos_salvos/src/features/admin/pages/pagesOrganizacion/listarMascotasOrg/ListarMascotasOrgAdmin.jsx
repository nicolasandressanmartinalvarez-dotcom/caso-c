import { useEffect, useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import ListarMascotasCss from './ListarMascotasOrgAdmin.module.css';
import { FaSearch, FaFilter, FaMapMarkerAlt, FaRuler, FaPalette, FaDog, FaCat, FaTimes, FaInfoCircle, FaMapMarkedAlt } from "react-icons/fa";
import MapViewer from '../../../components/mapViewer/MapViewer';

function ListarMascotasOrgAdmin() {
    const { getAccessTokenSilently } = useAuth0();
    const [mascotas, setMascotas] = useState([]);
    const [mascotaSeleccionada, setMascotaSeleccionada] = useState(null);

    const IMAGEN_DEFAULT = "https://images.unsplash.com/photo-1543466835-00a73410f2ce?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60";

    const cargarMascotas = async () => {
        try {
            const token = await getAccessTokenSilently();
            const response = await fetch("http://localhost:8089/api/mascotas", {
                headers: { Authorization: `Bearer ${token}` }
            });
            const data = await response.json();
            setMascotas(data);
        } catch (error) {
            console.error("Error al cargar mascotas:", error);
        }
    };

    useEffect(() => {
        cargarMascotas();
    }, [getAccessTokenSilently]);

    const abrirModal = (mascota) => {
        setMascotaSeleccionada(mascota);
        document.body.style.overflow = 'hidden'; 
    };

    const cerrarModal = () => {
        setMascotaSeleccionada(null);
        document.body.style.overflow = 'auto';
    };

    return (
        <section className={ListarMascotasCss["contenedor-lista"]}>
            <div className={ListarMascotasCss["header-lista"]}>
                <div className={ListarMascotasCss["titulo-seccion"]}>
                    <h2>Directorio de Mascotas Organización 🐾</h2>
                    <p>Explora y filtra las mascotas reportadas por la Organización.</p>
                </div>
            </div>

            <div className={ListarMascotasCss["toolbar-filtros"]}>
                <div className={ListarMascotasCss["search-box"]}>
                    <FaSearch className={ListarMascotasCss["icon-input"]} />
                    <input type="text" placeholder="Buscar por nombre..." />
                </div>

                <div className={ListarMascotasCss["filtros-group"]}>
                    <div className={ListarMascotasCss["select-wrapper"]}>
                        <FaFilter className={ListarMascotasCss["icon-select"]}/>
                        <select defaultValue="">
                            <option value="">Estado (Todos)</option>
                            <option value="perdido">Perdido</option>
                            <option value="encontrado">Encontrado</option>
                            <option value="adopcion">Adopción</option>
                        </select>
                    </div>
                </div>
            </div>

            <div className={ListarMascotasCss["grid-mascotas"]}>
                {mascotas.length === 0 ? <><p>No hay mascotas registradas</p></> :
                mascotas.map((mascota) => (
                    <div className={ListarMascotasCss["card-mascota"]} key={mascota.id}>
                        <div className={ListarMascotasCss["card-imagen-container"]}>
                            <img src={mascota.imagen ? `http://localhost:8089/imagenes/${mascota.imagen}` : IMAGEN_DEFAULT} alt={mascota.nombre} className={ListarMascotasCss["card-imagen"]} />
                            <span className={`${ListarMascotasCss["badge-estado"]} ${ListarMascotasCss[mascota.estado?.toLowerCase()]}`}>
                                {mascota.estado}
                            </span>
                        </div>
                        <div className={ListarMascotasCss["card-body"]}>
                            <div className={ListarMascotasCss["card-header"]}>
                                <h3>{mascota.nombre || "Sin Nombre"}</h3>
                                {mascota.tipoMascota?.nombreTipoMascota === "Perro" ? <FaDog className={ListarMascotasCss["icon-tipo"]}/> : <FaCat className={ListarMascotasCss["icon-tipo"]}/>}
                            </div>
                            <ul className={ListarMascotasCss["mascota-detalles"]}>
                                <li><strong>Raza:</strong> {mascota.tipoDeRaza?.nombreTipoRaza || "No especificada"}</li>
                                <li><strong>Tamaño:</strong> {mascota.tamanio || "No especificado"}</li>
                                <li><strong>Color:</strong> {mascota.color || "No especificado"}</li>
                                <li><strong>Organización:</strong> {mascota.municipalidad ? mascota.municipalidad.nombreMuni : "No asignada"}</li>
                            </ul>
                        </div>
                        <div className={ListarMascotasCss["card-footer"]}>
                            <button className={ListarMascotasCss["btn-ver-mas"]} onClick={() => abrirModal(mascota)}>
                                Ver Detalles
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {mascotaSeleccionada && (
                <div className={ListarMascotasCss["modal-overlay"]} onClick={cerrarModal}>
                    <div className={ListarMascotasCss["modal-content"]} onClick={(e) => e.stopPropagation()}>
                        <button className={ListarMascotasCss["btn-cerrar-modal"]} onClick={cerrarModal}>
                            <FaTimes />
                        </button>
                        <div className={ListarMascotasCss["modal-grid"]}>
                            <div className={ListarMascotasCss["modal-imagen-box"]}>
                                <img src={mascotaSeleccionada.imagen ? `http://localhost:8089/imagenes/${mascotaSeleccionada.imagen}` : IMAGEN_DEFAULT} alt={mascotaSeleccionada.nombre} />
                                <span className={`${ListarMascotasCss["badge-estado-modal"]} ${ListarMascotasCss[mascotaSeleccionada.estado?.toLowerCase()]}`}>
                                    {mascotaSeleccionada.estado}
                                </span>
                            </div>
                            <div className={ListarMascotasCss["modal-info-box"]}>
                                <div>
                                    <h2>{mascotaSeleccionada.nombre || "Sin Nombre"}</h2>
                                    <p className={ListarMascotasCss["modal-subtitulo"]}>
                                        <FaMapMarkerAlt className={ListarMascotasCss["icon-ubicacion"]}/> {mascotaSeleccionada.ubicacion || "Ubicación"}
                                    </p>
                                </div>
                                <div className={ListarMascotasCss["modal-tags"]}>
                                    <span className={ListarMascotasCss["tag"]}>{mascotaSeleccionada.tipoMascota?.nombreTipoMascota || "No especificado"}</span>
                                    <span className={ListarMascotasCss["tag"]}>{mascotaSeleccionada.tipoDeRaza?.nombreTipoRaza || "No especificada"}</span>
                                    <span className={ListarMascotasCss["tag"]}>{mascotaSeleccionada.tamanio || "No especificado"}</span>
                                    <span className={ListarMascotasCss["tag"]}>Organización: {mascotaSeleccionada.municipalidad ? mascotaSeleccionada.municipalidad.nombreMuni : "No asignada"}</span>
                                </div>
                                <div className={ListarMascotasCss["modal-descripcion"]}>
                                    <h3><FaInfoCircle /> Descripción</h3>
                                    <p>{mascotaSeleccionada.descripcion || "Sin descripción"}</p>
                                </div>
                                <div className={ListarMascotasCss["modal-mapa"]}>
                                    <h3><FaMapMarkedAlt /> Ubicación del Reporte</h3>
                                    <MapViewer latitud={mascotaSeleccionada.latitud} longitud={mascotaSeleccionada.longitud} />
                                </div>
                                <div className={ListarMascotasCss["modal-acciones"]}>
                                    <a href={`mailto:${mascotaSeleccionada.correoReportante}`} className={ListarMascotasCss["btn-contactar"]}>
                                        Contactar: {mascotaSeleccionada.correoReportante}
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </section>
    );
}

export default ListarMascotasOrgAdmin;
