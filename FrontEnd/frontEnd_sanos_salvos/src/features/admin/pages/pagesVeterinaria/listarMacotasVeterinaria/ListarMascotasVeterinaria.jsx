import { useState } from 'react';
import ListarMascotasCss from './ListarMascotasVeterinaria.module.css';
import { FaSearch, FaFilter, FaMapMarkerAlt, FaRuler, FaPalette, FaDog, FaCat, FaTimes, FaEnvelope, FaInfoCircle, FaMapMarkedAlt } from "react-icons/fa";
import MapViewer from '../../../components/mapViewer/MapViewer';

function ListarMascotasVeterinaria() {
    const [mascotaSeleccionada, setMascotaSeleccionada] = useState(null);

    const mascotasMock = [
        { id: 1, nombre: "Luna", tipoMascota: "Perro", tipoDeRaza: "Mestizo / Quiltro", color: "Negro con blanco", tamanio: "Mediano", estado: "Perdido", ubicacion: "San Vicente de Tagua Tagua", latitud: -34.4390, longitud: -71.0780, descripcion: "Tiene una mancha en el ojo izquierdo. Llevaba collar rojo.", correoReportante: "dueño.luna@gmail.com", entidadReportante: "Veterinaria", imagen: "https://images.unsplash.com/photo-1543466835-00a73410f2ce?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60" },
        { id: 2, nombre: "Milo", tipoMascota: "Gato", tipoDeRaza: "Doméstico Corto", color: "Naranja", tamanio: "Pequeño", estado: "Encontrado", ubicacion: "Plaza de Armas", latitud: -34.4375, longitud: -71.0760, descripcion: "Gatito naranja encontrado cerca del kiosco.", correoReportante: "vecino.plaza@gmail.com", entidadReportante: "Veterinaria", imagen: "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60" },
        { id: 3, nombre: "Rocky", tipoMascota: "Perro", tipoDeRaza: "Pastor Alemán", color: "Café y Negro", tamanio: "Grande", estado: "Adopción", ubicacion: "Veterinaria Central", latitud: -34.4420, longitud: -71.0805, descripcion: "Rocky es un perro joven. Necesita patio grande.", correoReportante: "adopciones@vetcentral.cl", entidadReportante: "Veterinaria", imagen: "https://images.unsplash.com/photo-1589952283406-b53a7d1347e8?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60" }
    ];

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
                    <h2>Directorio de Mascotas 🐾</h2>
                    <p>Explora y filtra las mascotas reportadas en la red veterinaria.</p>
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

                    <div className={ListarMascotasCss["select-wrapper"]}>
                        <FaRuler className={ListarMascotasCss["icon-select"]}/>
                        <select defaultValue="">
                            <option value="">Tamaño (Todos)</option>
                            <option value="pequeno">Pequeño</option>
                            <option value="mediano">Mediano</option>
                            <option value="grande">Grande</option>
                        </select>
                    </div>

                    <div className={ListarMascotasCss["select-wrapper"]}>
                        <FaDog className={ListarMascotasCss["icon-select"]}/>
                        <select defaultValue="">
                            <option value="">Raza (Todas)</option>
                            <option value="mestizo">Mestizo / Quiltro</option>
                            <option value="pastor">Pastor Alemán</option>
                            <option value="poodle">Poodle</option>
                        </select>
                    </div>

                    <div className={ListarMascotasCss["select-wrapper"]}>
                        <FaPalette className={ListarMascotasCss["icon-select"]}/>
                        <select defaultValue="">
                            <option value="">Color (Todos)</option>
                            <option value="negro">Negro</option>
                            <option value="blanco">Blanco</option>
                            <option value="cafe">Café</option>
                            <option value="naranja">Naranja</option>
                        </select>
                    </div>
                </div>
            </div>
            <div className={ListarMascotasCss["grid-mascotas"]}>
                {mascotasMock.map((mascota) => (
                    <div className={ListarMascotasCss["card-mascota"]} key={mascota.id}>
                        <div className={ListarMascotasCss["card-imagen-container"]}>
                            <img src={mascota.imagen} alt={mascota.nombre} className={ListarMascotasCss["card-imagen"]} />
                            <span className={`${ListarMascotasCss["badge-estado"]} ${ListarMascotasCss[mascota.estado.toLowerCase()]}`}>
                                {mascota.estado}
                            </span>
                        </div>
                        <div className={ListarMascotasCss["card-body"]}>
                            <div className={ListarMascotasCss["card-header"]}>
                                <h3>{mascota.nombre}</h3>
                                {mascota.tipoMascota === "Perro" ? <FaDog className={ListarMascotasCss["icon-tipo"]}/> : <FaCat className={ListarMascotasCss["icon-tipo"]}/>}
                            </div>
                            <ul className={ListarMascotasCss["mascota-detalles"]}>
                                <li><strong>Raza:</strong> {mascota.tipoDeRaza}</li>
                                <li><strong>Tamaño:</strong> {mascota.tamanio}</li>
                                <li><strong>Color:</strong> {mascota.color}</li>
                            </ul>
                            <div className={ListarMascotasCss["mascota-ubicacion"]}>
                                <FaMapMarkerAlt className={ListarMascotasCss["icon-ubicacion"]}/> {mascota.ubicacion}
                            </div>
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
                                <img src={mascotaSeleccionada.imagen} alt={mascotaSeleccionada.nombre} />
                                <span className={`${ListarMascotasCss["badge-estado-modal"]} ${ListarMascotasCss[mascotaSeleccionada.estado.toLowerCase()]}`}>
                                    {mascotaSeleccionada.estado}
                                </span>
                            </div>
                            <div className={ListarMascotasCss["modal-info-box"]}>
                                <div>
                                    <h2>{mascotaSeleccionada.nombre}</h2>
                                    <p className={ListarMascotasCss["modal-subtitulo"]}>
                                        <FaMapMarkerAlt className={ListarMascotasCss["icon-ubicacion"]}/> {mascotaSeleccionada.ubicacion}
                                    </p>
                                </div>

                                <div className={ListarMascotasCss["modal-tags"]}>
                                    <span className={ListarMascotasCss["tag"]}>{mascotaSeleccionada.tipoMascota}</span>
                                    <span className={ListarMascotasCss["tag"]}>{mascotaSeleccionada.tipoDeRaza}</span>
                                    <span className={ListarMascotasCss["tag"]}>{mascotaSeleccionada.tamanio}</span>
                                </div>

                                <div className={ListarMascotasCss["modal-descripcion"]}>
                                    <h3><FaInfoCircle /> Descripción</h3>
                                    <p>{mascotaSeleccionada.descripcion}</p>
                                </div>
                                <div className={ListarMascotasCss["modal-mapa"]}>
                                    <h3><FaMapMarkedAlt /> Ubicación del Reporte</h3>
                                    <MapViewer 
                                        latitud={mascotaSeleccionada.latitud} 
                                        longitud={mascotaSeleccionada.longitud} 
                                    />
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

export default ListarMascotasVeterinaria;