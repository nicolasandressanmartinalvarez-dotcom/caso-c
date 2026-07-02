import IngreMascoVeteCSS from './IngreMascoVete.module.css';
import { FaPaw, FaMapMarkerAlt, FaCamera, FaInfoCircle } from "react-icons/fa";
import { useState } from "react";
import MapPicker from '../mapa_picker/Mapa_picker';

function IngreMascoVete() {
    const [coordenadas, setCoordenadas] = useState({
        lat: -34.4390,
        lng: -71.0780
    });

    const handleLocationSelect = (nuevaUbicacion) => {
        setCoordenadas(nuevaUbicacion);
    };

    return (
        <section className={IngreMascoVeteCSS["contenedor-ingreso"]}>
            <div className={IngreMascoVeteCSS["form-card"]}>
                <h2 className={IngreMascoVeteCSS["titulo-form"]}>
                    <FaPaw className={IngreMascoVeteCSS["icono-titulo"]} /> Registrar Mascota
                </h2>
                <p className={IngreMascoVeteCSS["subtitulo"]}>Ingresa los datos de la mascota reportada en la sucursal.</p>
                <form className={IngreMascoVeteCSS["form-mascota"]}>
                    <div className={IngreMascoVeteCSS["seccion-form"]}>
                        <h3 className={IngreMascoVeteCSS["titulo-seccion"]}>Datos de la Mascota 🐶</h3>

                        <div className={IngreMascoVeteCSS["row-group"]}>
                            <div className={IngreMascoVeteCSS["input-group"]}>
                                <label>Nombre (Si lo tiene)</label>
                                <input type="text" name="nombre" placeholder="Ej: Firulais" />
                            </div>
                            <div className={IngreMascoVeteCSS["input-group"]}>
                                <label>Tipo de Mascota</label>
                                <div className={IngreMascoVeteCSS["select-wrapper"]}>
                                    <select name="tipoMascota" defaultValue="">
                                        <option value="" disabled>Seleccionar...</option>
                                        <option value="perro">Perro</option>
                                        <option value="gato">Gato</option>
                                        <option value="otro">Otro</option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        <div className={IngreMascoVeteCSS["row-group"]}>
                            <div className={IngreMascoVeteCSS["input-group"]}>
                                <label>Raza</label>
                                <div className={IngreMascoVeteCSS["select-wrapper"]}>
                                    <select name="tipoDeRaza" defaultValue="">
                                        <option value="" disabled>Seleccionar raza...</option>
                                        <option value="mestizo">Mestizo / Quiltro</option>
                                        <option value="pastor">Pastor Alemán</option>
                                        <option value="poodle">Poodle</option>
                                    </select>
                                </div>
                            </div>
                            <div className={IngreMascoVeteCSS["input-group"]}>
                                <label>Tamaño</label>
                                <div className={IngreMascoVeteCSS["select-wrapper"]}>
                                    <select name="tamanio" defaultValue="">
                                        <option value="" disabled>Seleccionar...</option>
                                        <option value="pequeno">Pequeño</option>
                                        <option value="mediano">Mediano</option>
                                        <option value="grande">Grande</option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        <div className={IngreMascoVeteCSS["input-group"]}>
                            <label>Color Dominante</label>
                            <input type="text" name="color" placeholder="Ej: Negro con manchas blancas" />
                        </div>
                    </div>

                    <div className={IngreMascoVeteCSS["seccion-form"]}>
                        <h3 className={IngreMascoVeteCSS["titulo-seccion"]}>Detalles del Reporte 📋</h3>

                        <div className={IngreMascoVeteCSS["row-group"]}>
                            <div className={IngreMascoVeteCSS["input-group"]}>
                                <label>Estado del Reporte</label>
                                <div className={IngreMascoVeteCSS["select-wrapper"]}>
                                    <select name="estado" defaultValue="">
                                        <option value="" disabled>Seleccionar...</option>
                                        <option value="perdido">Perdido</option>
                                        <option value="encontrado">Encontrado</option>
                                        <option value="adopcion">En Adopción</option>
                                    </select>
                                </div>
                            </div>
                            <div className={IngreMascoVeteCSS["input-group"]}>
                                <label>Entidad Reportante <FaInfoCircle title="Campo automático" className={IngreMascoVeteCSS["icon-info"]} /></label>
                                <input type="text" name="entidadReportante" value="Usuario" readOnly className={IngreMascoVeteCSS["input-readonly"]} />
                            </div>
                        </div>

                        <div className={IngreMascoVeteCSS["input-group"]}>
                            <label>Correo de Contacto</label>
                            <input type="email" name="correoReportante" placeholder="Ej: dueño@correo.com" required />
                        </div>

                        <div className={IngreMascoVeteCSS["input-group"]}>
                            <label>Descripción / Observaciones</label>
                            <textarea name="descripcion" rows="3" placeholder="Detalles de collares, heridas, comportamiento, etc."></textarea>
                        </div>

                        <div className={IngreMascoVeteCSS["input-group"]}>
                            <label><FaCamera /> Subir Fotografía</label>
                            <input type="file" name="imagen" accept="image/*" className={IngreMascoVeteCSS["input-file"]} />
                        </div>
                    </div>
                    <div className={IngreMascoVeteCSS["seccion-form"]}>
                        <h3 className={IngreMascoVeteCSS["titulo-seccion"]}><FaMapMarkerAlt /> Ubicación del Avistamiento 📍</h3>

                        <p style={{ fontSize: "14px", color: "#64748b", margin: "0 0 10px 0" }}>
                        </p>
                        <MapPicker onLocationSelect={handleLocationSelect} />
                        <div className={IngreMascoVeteCSS["row-group"]}>
                            <div className={IngreMascoVeteCSS["input-group"]}>
                                <label>Latitud</label>
                                <input
                                    type="number"
                                    name="latitud"
                                    value={coordenadas.lat}
                                    readOnly
                                    className={IngreMascoVeteCSS["input-readonly"]}
                                />
                            </div>
                            <div className={IngreMascoVeteCSS["input-group"]}>
                                <label>Longitud</label>
                                <input
                                    type="number"
                                    name="longitud"
                                    value={coordenadas.lng}
                                    readOnly
                                    className={IngreMascoVeteCSS["input-readonly"]}
                                />
                            </div>
                        </div>
                    </div>

                    <div className={IngreMascoVeteCSS["btn-group"]}>
                        <button type="submit" className={IngreMascoVeteCSS["btn-submit"]}>Registrar Mascota</button>
                    </div>
                </form>
            </div>
        </section>
    );
}

export default IngreMascoVete;