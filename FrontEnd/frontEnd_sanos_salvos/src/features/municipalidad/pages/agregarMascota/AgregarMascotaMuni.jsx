import IngreMascoMuniCSS from './AgregarMascotaMuni.module.css';
import { FaPaw, FaMapMarkerAlt, FaCamera } from "react-icons/fa";
import { useState, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import MapPicker from '../../../../components/mapa_picker/Mapa_picker'; 

function AgregarMascotaMuni() {
    const { getAccessTokenSilently, user } = useAuth0();
    const [mensaje, setMensaje] = useState({ texto: "", tipo: "" });

    const [coordenadas, setCoordenadas] = useState({ lat: -34.4390, lng: -71.0780 });
    const [imagen, setImagen] = useState(null);

    const [tiposMascota, setTiposMascota] = useState([]);
    const [razas, setRazas] = useState([]);

    const [form, setForm] = useState({
        nombre: "",
        tipoMascota: "", 
        tipoDeRaza: "",  
        tamanio: "",
        color: "",
        genero: "",
        estado: "",
        correoReportante: "",
        descripcion: ""
    });

    useEffect(() => {
        const cargarCatalogos = async () => {
            try {
                const token = await getAccessTokenSilently();
                const headers = { Authorization: `Bearer ${token}` };

                const resMascota = await fetch("http://localhost:8080/api/tipos-mascota", { headers });
                if (resMascota.ok) {
                    const dataMascota = await resMascota.json();
                    setTiposMascota(dataMascota);
                }

                const resRaza = await fetch("http://localhost:8080/api/tipos-raza", { headers });
                if (resRaza.ok) {
                    const dataRaza = await resRaza.json();
                    setRazas(dataRaza);
                }
            } catch (error) {
                console.error("Error al cargar los catálogos:", error);
            }
        };

        cargarCatalogos();
    }, [getAccessTokenSilently]);

    const handleLocationSelect = (nuevaUbicacion) => {
        setCoordenadas(nuevaUbicacion);
    };

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };

    const handleFileChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            setImagen(e.target.files[0]);
        }
    };

    const registrarMascota = async (e) => {
        e.preventDefault();
        setMensaje({ texto: "Enviando datos...", tipo: "info" });

        try {
            const token = await getAccessTokenSilently();
            // const headers = { Authorization: `Bearer ${token}` };
            
            // Obtener id de municipalidad del usuario actual
            const responseUsuarios = await fetch("http://localhost:8080/api/usuPermitidosMuni", { headers: { Authorization: `Bearer ${token}` } });
            const usuariosPermitidos = await responseUsuarios.json();
            const usuarioActual = usuariosPermitidos.find(u => u.correoUsuario === user.email);
            
            if (!usuarioActual || !usuarioActual.municipalidad?.id) {
                setMensaje({ texto: "Error: No tienes una municipalidad asignada 🚨", tipo: "error" });
                return;
            }
            
            const idMunicipalidad = usuarioActual.municipalidad.id;

            const mascotaDTO = {
                nombre: form.nombre,
                descripcion: form.descripcion,
                correoReportante: form.correoReportante,
                latitud: coordenadas.lat,
                longitud: coordenadas.lng,
                estado: form.estado,
                color: form.color,
                tamanio: form.tamanio,
                genero: form.genero,
                tipoMascota: form.tipoMascota ? { idTipoMascota: Number(form.tipoMascota) } : null,
                tipoRaza: form.tipoDeRaza ? { idTipoRaza: Number(form.tipoDeRaza) } : null,
                municipalidad: { id: idMunicipalidad }
            };

            const formData = new FormData();
            formData.append("mascota", new Blob([JSON.stringify(mascotaDTO)], {
                type: "application/json"
            }));

            if (imagen) {
                formData.append("file", imagen);
            }

            const response = await fetch("http://localhost:8080/api/mascotas", {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${token}`
                },
                body: formData
            });

            if (response.ok) {
                setMensaje({ texto: "¡Mascota registrada correctamente! 🎉", tipo: "exito" });
                setForm({ nombre: "", tipoMascota: "", tipoDeRaza: "", tamanio: "", color: "", genero: "", estado: "", correoReportante: "", descripcion: "" });
                setImagen(null);
                document.querySelector('input[type="file"]').value = "";
            } else {
                setMensaje({ texto: "Error al registrar la mascota ❌", tipo: "error" });
            }

        } catch (error) {
            console.error("Error en la petición:", error);
            setMensaje({ texto: "Error de conexión con el servidor 🚨", tipo: "error" });
        }
    };

    return (
        <section className={IngreMascoMuniCSS["contenedor-ingreso"]}>
            <div className={IngreMascoMuniCSS["form-card"]}>
                <h2 className={IngreMascoMuniCSS["titulo-form"]}>
                    <FaPaw className={IngreMascoMuniCSS["icono-titulo"]}/> Registrar Mascota Municipal
                </h2>
                <p className={IngreMascoMuniCSS["subtitulo"]}>Ingresa los datos de la mascota reportada por la municipalidad.</p>
                
                <form className={IngreMascoMuniCSS["form-mascota"]} onSubmit={registrarMascota}>
                    
                    <div className={IngreMascoMuniCSS["seccion-form"]}>
                        <h3 className={IngreMascoMuniCSS["titulo-seccion"]}>Datos de la Mascota 🐶</h3>
                        
                        <div className={IngreMascoMuniCSS["row-group"]}>
                            <div className={IngreMascoMuniCSS["input-group"]}>
                                <label>Nombre (Si lo tiene)</label>
                                <input type="text" name="nombre" value={form.nombre} onChange={handleChange} placeholder="Ej: Firulais" />
                            </div>
                            <div className={IngreMascoMuniCSS["input-group"]}>
                                <label>Tipo de Mascota</label>
                                <div className={IngreMascoMuniCSS["select-wrapper"]}>
                                    <select name="tipoMascota" value={form.tipoMascota} onChange={handleChange}>
                                        <option value="" disabled>Seleccionar...</option>
                                        {tiposMascota.map((tipo) => (
                                            <option key={tipo.idTipoMascota || tipo.id} value={tipo.idTipoMascota || tipo.id}>
                                                {tipo.nombreTipoMascota || tipo.nombre}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                        </div>

                        <div className={IngreMascoMuniCSS["row-group"]}>
                            <div className={IngreMascoMuniCSS["input-group"]}>
                                <label>Raza</label>
                                <div className={IngreMascoMuniCSS["select-wrapper"]}>
                                    <select name="tipoDeRaza" value={form.tipoDeRaza} onChange={handleChange}>
                                        <option value="" disabled>Seleccionar raza...</option>
                                        {razas.map((raza) => (
                                            <option key={raza.idTipoRaza || raza.id} value={raza.idTipoRaza || raza.id}>
                                                {raza.nombreTipoRaza || raza.nombre}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                            <div className={IngreMascoMuniCSS["input-group"]}>
                                <label>Tamaño</label>
                                <div className={IngreMascoMuniCSS["select-wrapper"]}>
                                    <select name="tamanio" value={form.tamanio} onChange={handleChange}>
                                        <option value="" disabled>Seleccionar...</option>
                                        <option value="pequeño">Pequeño</option>
                                        <option value="mediano">Mediano</option>
                                        <option value="grande">Grande</option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        <div className={IngreMascoMuniCSS["row-group"]}>
                            <div className={IngreMascoMuniCSS["input-group"]}>
                                <label>Color Dominante</label>
                                <input type="text" name="color" value={form.color} onChange={handleChange} placeholder="Ej: Negro con manchas" />
                            </div>
                            <div className={IngreMascoMuniCSS["input-group"]}>
                                <label>Género</label>
                                <div className={IngreMascoMuniCSS["select-wrapper"]}>
                                    <select name="genero" value={form.genero} onChange={handleChange}>
                                        <option value="" disabled>Seleccionar...</option>
                                        <option value="macho">Macho</option>
                                        <option value="hembra">Hembra</option>
                                        <option value="desconocido">No se sabe</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className={IngreMascoMuniCSS["seccion-form"]}>
                        <h3 className={IngreMascoMuniCSS["titulo-seccion"]}>Detalles del Reporte 📋</h3>
                        
                        <div className={IngreMascoMuniCSS["row-group"]}>
                            <div className={IngreMascoMuniCSS["input-group"]}>
                                <label>Estado del Reporte</label>
                                <div className={IngreMascoMuniCSS["select-wrapper"]}>
                                    <select name="estado" value={form.estado} onChange={handleChange} required>
                                        <option value="" disabled>Seleccionar...</option>
                                        <option value="PERDIDO">Perdido</option>
                                        <option value="ENCONTRADO">Encontrado</option>
                                        <option value="ADOPCION">En Adopción</option>
                                    </select>
                                </div>
                            </div>
                            <div className={IngreMascoMuniCSS["input-group"]}>
                                <label>Entidad Reportante</label>
                                <input type="text" name="entidadReportante" value="Municipalidad" readOnly className={IngreMascoMuniCSS["input-readonly"]} />
                            </div>
                        </div>

                        <div className={IngreMascoMuniCSS["input-group"]}>
                            <label>Correo de Contacto</label>
                            <input type="email" name="correoReportante" value={form.correoReportante} onChange={handleChange} placeholder="Ej: admin@municipalidad.com" required/>
                        </div>

                        <div className={IngreMascoMuniCSS["input-group"]}>
                            <label>Descripción / Observaciones</label>
                            <textarea name="descripcion" value={form.descripcion} onChange={handleChange} rows="3" placeholder="Detalles extra..."></textarea>
                        </div>

                        <div className={IngreMascoMuniCSS["input-group"]}>
                            <label><FaCamera /> Subir Fotografía</label>
                            <input type="file" accept="image/*" onChange={handleFileChange} className={IngreMascoMuniCSS["input-file"]} />
                        </div>
                    </div>

                    <div className={IngreMascoMuniCSS["seccion-form"]}>
                        <h3 className={IngreMascoMuniCSS["titulo-seccion"]}><FaMapMarkerAlt /> Ubicación del Avistamiento 📍</h3>
                        
                        <MapPicker onLocationSelect={handleLocationSelect} />

                        <div className={IngreMascoMuniCSS["row-group"]}>
                            <div className={IngreMascoMuniCSS["input-group"]}>
                                <label>Latitud</label>
                                <input type="number" value={coordenadas.lat} readOnly className={IngreMascoMuniCSS["input-readonly"]} />
                            </div>
                            <div className={IngreMascoMuniCSS["input-group"]}>
                                <label>Longitud</label>
                                <input type="number" value={coordenadas.lng} readOnly className={IngreMascoMuniCSS["input-readonly"]} />
                            </div>
                        </div>
                    </div>

                    {mensaje.texto && (
                        <p style={{ textAlign: "center", fontWeight: "bold", color: mensaje.tipo === "error" ? "#ef4444" : "#10b981" }}>
                            {mensaje.texto}
                        </p>
                    )}

                    <div className={IngreMascoMuniCSS["btn-group"]}>
                        <button type="submit" className={IngreMascoMuniCSS["btn-submit"]}>Registrar Mascota</button>
                    </div>
                </form>
            </div>
        </section>
    );
}

export default AgregarMascotaMuni;
