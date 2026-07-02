import { useEffect, useState } from "react";
import ListMascCss from "./listMasc.module.css";

import {
    FaSearch,
    FaFilter,
    FaMapMarkerAlt,
    FaRuler,
    FaPalette,
    FaDog,
    FaCat,
    FaTimes,
    FaInfoCircle,
    FaMapMarkedAlt
} from "react-icons/fa";

import MapViewer from "../../../../features/admin/components/mapViewer/MapViewer";

function ListMasc() {

    const [mascotas, setMascotas] = useState([]);
    const [mascotaSeleccionada, setMascotaSeleccionada] = useState(null);

    // 🔥 TEMPORAL: luego lo sacamos de Auth0 o usuario logueado
    const idVeterinaria = 1;

    useEffect(() => {
        cargarMascotas();
    }, []);

    const cargarMascotas = async () => {
        try {
            const response = await fetch(
                `http://localhost:8086/api/mascotas/veterinaria/${idVeterinaria}`
            );

            if (!response.ok) {
                console.error("Error al cargar mascotas");
                return;
            }

            const data = await response.json();
            setMascotas(data);

        } catch (error) {
            console.error("Error de conexión:", error);
        }
    };

    const abrirModal = (mascota) => {
        setMascotaSeleccionada(mascota);
        document.body.style.overflow = "hidden";
    };

    const cerrarModal = () => {
        setMascotaSeleccionada(null);
        document.body.style.overflow = "auto";
    };

    return (
        <section className={ListMascCss["contenedor-lista"]}>

            {/* HEADER */}
            <div className={ListMascCss["header-lista"]}>
                <h2>🐾 Mascotas de la Veterinaria</h2>
                <p>Listado filtrado por tu veterinaria</p>
            </div>

            {/* BARRA DE FILTROS (VISUAL POR AHORA) */}
            <div className={ListMascCss["toolbar-filtros"]}>

                <div className={ListMascCss["search-box"]}>
                    <FaSearch />
                    <input type="text" placeholder="Buscar mascota..." />
                </div>

                <div className={ListMascCss["filtros-group"]}>

                    <div className={ListMascCss["select-wrapper"]}>
                        <FaFilter />
                        <select>
                            <option>Estado</option>
                            <option>Perdido</option>
                            <option>Encontrado</option>
                            <option>Adopción</option>
                        </select>
                    </div>

                    <div className={ListMascCss["select-wrapper"]}>
                        <FaRuler />
                        <select>
                            <option>Tamaño</option>
                            <option>Pequeño</option>
                            <option>Mediano</option>
                            <option>Grande</option>
                        </select>
                    </div>

                    <div className={ListMascCss["select-wrapper"]}>
                        <FaDog />
                        <select>
                            <option>Tipo</option>
                            <option>Perro</option>
                            <option>Gato</option>
                        </select>
                    </div>

                    <div className={ListMascCss["select-wrapper"]}>
                        <FaPalette />
                        <select>
                            <option>Color</option>
                            <option>Negro</option>
                            <option>Blanco</option>
                            <option>Café</option>
                        </select>
                    </div>

                </div>
            </div>

            {/* GRID */}
            <div className={ListMascCss["grid-mascotas"]}>

                {mascotas.map((mascota) => (
                    <div key={mascota.id} className={ListMascCss["card-mascota"]}>

                        <div className={ListMascCss["card-imagen-container"]}>
                            <img
                                src={mascota.imagen}
                                alt={mascota.nombre}
                                className={ListMascCss["card-imagen"]}
                            />

                            <span className={`${ListMascCss["badge-estado"]}`}>
                                {mascota.estado}
                            </span>
                        </div>

                        <div className={ListMascCss["card-body"]}>

                            <div className={ListMascCss["card-header"]}>
                                <h3>{mascota.nombre}</h3>

                                {mascota.tipoMascota?.nombre === "Perro"
                                    ? <FaDog />
                                    : <FaCat />
                                }
                            </div>

                            <ul className={ListMascCss["mascota-detalles"]}>
                                <li>
                                    <strong>Raza:</strong>{" "}
                                    {mascota.tipoDeRaza?.nombre}
                                </li>

                                <li>
                                    <strong>Tamaño:</strong> {mascota.tamanio}
                                </li>

                                <li>
                                    <strong>Color:</strong> {mascota.color}
                                </li>
                            </ul>

                            <div className={ListMascCss["mascota-ubicacion"]}>
                                <FaMapMarkerAlt />
                                {mascota.ubicacion}
                            </div>

                        </div>

                        <div className={ListMascCss["card-footer"]}>
                            <button
                                className={ListMascCss["btn-ver-mas"]}
                                onClick={() => abrirModal(mascota)}
                            >
                                Ver Detalles
                            </button>
                        </div>

                    </div>
                ))}

            </div>

            {/* MODAL */}
            {mascotaSeleccionada && (
                <div
                    className={ListMascCss["modal-overlay"]}
                    onClick={cerrarModal}
                >
                    <div
                        className={ListMascCss["modal-content"]}
                        onClick={(e) => e.stopPropagation()}
                    >

                        <button
                            className={ListMascCss["btn-cerrar-modal"]}
                            onClick={cerrarModal}
                        >
                            <FaTimes />
                        </button>

                        <div className={ListMascCss["modal-grid"]}>

                            <div className={ListMascCss["modal-imagen-box"]}>
                                <img
                                    src={mascotaSeleccionada.imagen}
                                    alt={mascotaSeleccionada.nombre}
                                />
                            </div>

                            <div className={ListMascCss["modal-info-box"]}>

                                <h2>{mascotaSeleccionada.nombre}</h2>

                                <p>
                                    <FaMapMarkerAlt />
                                    {mascotaSeleccionada.ubicacion}
                                </p>

                                <div className={ListMascCss["modal-descripcion"]}>
                                    <h3><FaInfoCircle /> Descripción</h3>
                                    <p>{mascotaSeleccionada.descripcion}</p>
                                </div>

                                <div className={ListMascCss["modal-mapa"]}>
                                    <h3><FaMapMarkedAlt /> Ubicación</h3>

                                    <MapViewer
                                        latitud={mascotaSeleccionada.latitud}
                                        longitud={mascotaSeleccionada.longitud}
                                    />
                                </div>

                            </div>

                        </div>

                    </div>
                </div>
            )}

        </section>
    );
}

export default ListMasc;