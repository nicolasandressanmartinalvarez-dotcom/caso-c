import { useEffect, useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
// Importamos los estilos copiados de veterinaria
import ListarMascotasCss from './ListarMascotas.module.css';
import { FaSearch, FaFilter, FaMapMarkerAlt, FaRuler, FaPalette, FaDog, FaCat, FaTimes, FaInfoCircle, FaMapMarkedAlt } from "react-icons/fa";
import MapViewer from '../../../../components/mapa_picker/Mapa_picker';

function ListarMascotasOrg() {
    // Extraemos user, isAuthenticated y isLoading de Auth0
    const { getAccessTokenSilently, user, isAuthenticated, isLoading: authLoading } = useAuth0();
    
    const [mascotas, setMascotas] = useState([]);
    const [mascotaSeleccionada, setMascotaSeleccionada] = useState(null);
    const [cargandoDatos, setCargandoDatos] = useState(true);
    const [error, setError] = useState(null);
    const [nombreEntidad, setNombreEntidad] = useState("");

    const IMAGEN_DEFAULT = "https://images.unsplash.com/photo-1543466835-00a73410f2ce?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60";

    const cargarDatos = async () => {
        if (!user?.email) return;

        try {
            setCargandoDatos(true);
            const token = await getAccessTokenSilently();
            const headers = { Authorization: `Bearer ${token}` };

            // 1. Buscar al usuario en la API de usuPermitidosOrg usando su correo (Puerto 8089)
            const responseUsuarios = await fetch("http://localhost:8089/api/usuPermitidosOrg", { headers });
            
            if (!responseUsuarios.ok) throw new Error("Error al obtener los usuarios permitidos de la organización");
            
            const usuariosPermitidos = await responseUsuarios.json();
            
            // Filtramos al usuario logueado por su correo
            const usuarioActual = usuariosPermitidos.find(u => u.correoUsuario === user.email);
            if (!usuarioActual || !usuarioActual.organizacion?.id) {
                setError("El usuario no tiene una organización asignada o no está permitido.");
                setMascotas([]);
                setCargandoDatos(false);
                return;
            }

            const idOrganizacion = usuarioActual.organizacion.id;
            setNombreEntidad(usuarioActual.organizacion.nombre);
            
            // 2. Obtener las mascotas filtradas directamente desde el Backend (Puerto 8089)
            const responseMascotas = await fetch(`http://localhost:8089/api/mascotas/organizacion/${idOrganizacion}`, { headers });
            
            if (!responseMascotas.ok) throw new Error("Error al cargar las mascotas");

            const dataMascotas = await responseMascotas.json();
            setMascotas(dataMascotas);

        } catch (error) {
            console.error("Error en la carga de datos:", error);
            setError(error.message);
        } finally {
            setCargandoDatos(false);
        }
    };

    // Usamos useEffect para reaccionar cuando Auth0 termina de cargar
    useEffect(() => {
        if (isAuthenticated && !authLoading) {
            cargarDatos();
        } else if (!authLoading && !isAuthenticated) {
            setCargandoDatos(false);
            setError("Debes iniciar sesión para ver las mascotas.");
        }
    }, [isAuthenticated, authLoading, user, getAccessTokenSilently]);

    const abrirModal = (mascota) => {
        setMascotaSeleccionada(mascota);
        document.body.style.overflow = 'hidden'; 
    };

    const cerrarModal = () => {
        setMascotaSeleccionada(null);
        document.body.style.overflow = 'auto';
    };

    if (authLoading || cargandoDatos) {
        return (
            <section className={ListarMascotasCss["contenedor-lista"]}>
                <p style={{ textAlign: "center", padding: "2rem" }}>Cargando directorio de mascotas...</p>
            </section>
        );
    }
    console.log(mascotas)
    return (
        <section className={ListarMascotasCss["contenedor-lista"]}>
            <div className={ListarMascotasCss["header-lista"]}>
                <div className={ListarMascotasCss["titulo-seccion"]}>
                    <h2>Directorio de Mascotas de tu Organización 🐾</h2>
                    <p>Explora y filtra las mascotas reportadas en tu organización.</p>
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

            {/* Manejo de Errores y Lista Vacía */}
            {error ? (
                <div style={{ textAlign: "center", padding: "2rem", color: "red" }}>
                    <p>{error}</p>
                </div>
            ) : (
                <div className={ListarMascotasCss["grid-mascotas"]}>
                    {mascotas.length === 0 ? (
                        <p style={{ gridColumn: "1 / -1", textAlign: "center" }}>No hay mascotas registradas para tu organización.</p>
                    ) : (
                        mascotas.map((mascota) => (
                            <div className={ListarMascotasCss["card-mascota"]} key={mascota.id}>
                                <div className={ListarMascotasCss["card-imagen-container"]}>
                                    <img 
                                        src={mascota.imagen ? `http://localhost:8089/imagenes/${mascota.imagen}` : IMAGEN_DEFAULT} 
                                        alt={mascota.nombre} 
                                        className={ListarMascotasCss["card-imagen"]} 
                                    />
                                    <span className={`${ListarMascotasCss["badge-estado"]} ${ListarMascotasCss[mascota.estado?.toLowerCase()]}`}>
                                        {mascota.estado}
                                    </span>
                                </div>
                                <div className={ListarMascotasCss["card-body"]}>
                                    <div className={ListarMascotasCss["card-header"]}>
                                        <h3>{mascota.nombre || "Sin nombre"}</h3>
                                        {mascota.tipoMascota?.nombreTipoMascota === "Perro" ? <FaDog className={ListarMascotasCss["icon-tipo"]}/> : <FaCat className={ListarMascotasCss["icon-tipo"]}/>}
                                    </div>
                                    <ul className={ListarMascotasCss["mascota-detalles"]}>
                                        <li><strong>Raza:</strong> {mascota.tipoDeRaza?.nombreTipoRaza || "No especificada"}</li>
                                        <li><strong>Tamaño:</strong> {mascota.tamanio || "No especificado"}</li>
                                        <li><strong>Color:</strong> {mascota.color || "No especificado"}</li>
                                        <li><strong>Organización:</strong> {nombreEntidad}</li>
                                    </ul>
                                </div>
                                <div className={ListarMascotasCss["card-footer"]}>
                                    <button className={ListarMascotasCss["btn-ver-mas"]} onClick={() => abrirModal(mascota)}>
                                        Ver Detalles
                                    </button>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            )}

            {mascotaSeleccionada && (
                <div className={ListarMascotasCss["modal-overlay"]} onClick={cerrarModal}>
                    <div className={ListarMascotasCss["modal-content"]} onClick={(e) => e.stopPropagation()}>
                        <button className={ListarMascotasCss["btn-cerrar-modal"]} onClick={cerrarModal}>
                            <FaTimes />
                        </button>
                        <div className={ListarMascotasCss["modal-grid"]}>
                            <div className={ListarMascotasCss["modal-imagen-box"]}>
                                <img 
                                    src={mascotaSeleccionada.imagen ? `http://localhost:8089/imagenes/${mascotaSeleccionada.imagen}` : IMAGEN_DEFAULT} 
                                    alt={mascotaSeleccionada.nombre} 
                                />
                                <span className={`${ListarMascotasCss["badge-estado-modal"]} ${ListarMascotasCss[mascotaSeleccionada.estado?.toLowerCase()]}`}>
                                    {mascotaSeleccionada.estado}
                                </span>
                            </div>
                            <div className={ListarMascotasCss["modal-info-box"]}>
                                <div>
                                    <h2>{mascotaSeleccionada.nombre || "Sin nombre"}</h2>
                                    <p className={ListarMascotasCss["modal-subtitulo"]}>
                                        <FaMapMarkerAlt className={ListarMascotasCss["icon-ubicacion"]}/> {mascotaSeleccionada.ubicacion || "Ubicación no especificada"}
                                    </p>
                                </div>
                                <div className={ListarMascotasCss["modal-tags"]}>
                                    <span className={ListarMascotasCss["tag"]}>{mascotaSeleccionada.tipoMascota?.nombreTipoMascota || "No especificado"}</span>
                                    <span className={ListarMascotasCss["tag"]}>{mascotaSeleccionada.tipoDeRaza?.nombreTipoRaza || "No especificada"}</span>
                                    <p><strong>Color:</strong> {mascotaSeleccionada.color || "No especificado"}</p>
                                    <p><strong>Organización:</strong> {nombreEntidad}</p>
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

export default ListarMascotasOrg;
