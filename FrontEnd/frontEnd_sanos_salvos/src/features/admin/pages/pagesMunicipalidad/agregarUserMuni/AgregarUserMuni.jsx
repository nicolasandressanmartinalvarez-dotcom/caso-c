import AdminUserMuniCSS from './AdminUserMuni.module.css';
import { useAuth0 } from "@auth0/auth0-react";
import { useEffect, useState } from "react";
import { FaUserShield, FaCheckCircle, FaExclamationCircle } from "react-icons/fa";

function AdminUserMuni() {
    const { getAccessTokenSilently } = useAuth0();
    const [municipalidades, setMunicipalidades] = useState([]);
    const [mensaje, setMensaje] = useState({ texto: "", tipo: "" });
    const [cargando, setCargando] = useState(false);

    // Estado del formulario
    const estadoInicial = {
        nombreUser: "",
        apellidoPa: "",
        apellidoMa: "",
        correoUsuario: "",
        rol: "",
        idMunicipalidad: ""
    };
    const [form, setForm] = useState(estadoInicial);

    // Cargar la lista de municipalidades para el Select
    const cargarMunicipalidades = async () => {
        try {
            const token = await getAccessTokenSilently();
            const response = await fetch("http://localhost:8080/api/municipalidades", {
                headers: { Authorization: `Bearer ${token}` }
            });
            if (response.ok) {
                const data = await response.json();
                setMunicipalidades(data);
            }
        } catch (error) {
            console.error("Error al cargar municipalidades:", error);
        }
    };

    useEffect(() => {
        cargarMunicipalidades();
    }, [getAccessTokenSilently]);

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };

    // --- LÓGICA DE ORQUESTACIÓN DE APIs ---
    const registrarUsuario = async (e) => {
        e.preventDefault();
        setCargando(true);
        setMensaje({ texto: "Verificando registros locales...", tipo: "info" });

        try {
            const token = await getAccessTokenSilently();

            const headersGlobal = {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`,
                "ngrok-skip-browser-warning": "69420"
            };

            const headersLocal = {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            };

            const URL_API_GLOBAL = "https://sliceable-tilt-untamed.ngrok-free.dev/api/usuarios";
            const URL_API_MUNICIPALIDAD = "http://localhost:8080/api/usuPermitidosMuni";

            // PASO 0: Filtrar duplicados locales
            const resLocalCheck = await fetch(URL_API_MUNICIPALIDAD, { headers: headersLocal });
            if (resLocalCheck.ok) {
                const usuariosLocales = await resLocalCheck.json();
                const correoYaExiste = usuariosLocales.find(u => u.correoUsuario.toLowerCase() === form.correoUsuario.toLowerCase());

                if (correoYaExiste) {
                    setMensaje({
                        texto: "El usuario ya se encuentra registrado en esta municipalidad 🚫",
                        tipo: "error"
                    });
                    setCargando(false);
                    return;
                }
            }

            // PASO 1: Buscar al usuario en la API Global por correo
            setMensaje({ texto: "Buscando usuario en la red global...", tipo: "info" });
            const resBusqueda = await fetch(`${URL_API_GLOBAL}/${form.correoUsuario}`, { headers: headersGlobal });

            if (!resBusqueda.ok) {
                setMensaje({
                    texto: "El usuario no existe en la red global. Debe iniciar sesión en la app principal primero.",
                    tipo: "error"
                });
                setCargando(false);
                return;
            }

            const dataUsuarioGlobal = await resBusqueda.json();

            // PASO 2: Actualizar la Entidad Perteneciente en la API Global
            setMensaje({ texto: "Asignando entidad global al usuario...", tipo: "info" });
            const payloadActualizacion = {
                correoUsuario: form.correoUsuario,
                idAuth0: dataUsuarioGlobal.idAuth0,
                entidadPerteneciente: "Municipalidad"
            };

            const resActualizacion = await fetch(`${URL_API_GLOBAL}/${form.correoUsuario}`, {
                method: "PUT",
                headers: headersGlobal,
                body: JSON.stringify(payloadActualizacion)
            });

            if (!resActualizacion.ok) {
                throw new Error("No se pudo actualizar la entidad en la API Global.");
            }

            // PASO 3: Guardar el usuario en la base de datos de Municipalidad (API Local)
            setMensaje({ texto: "Guardando permisos locales...", tipo: "info" });
            const payloadLocal = {
                correoUsuario: form.correoUsuario,
                rol: form.rol,
                idAuth0: dataUsuarioGlobal.idAuth0,
                nombreUser: form.nombreUser,
                apellidoPa: form.apellidoPa,
                apellidoMa: form.apellidoMa,
                estadoUsuario: "Activo",
                municipalidad: {
                    idMunicipalidad: Number(form.idMunicipalidad)
                }
            };

            const resGuardadoLocal = await fetch(URL_API_MUNICIPALIDAD, {
                method: "POST",
                headers: headersLocal,
                body: JSON.stringify(payloadLocal)
            });

            if (resGuardadoLocal.ok) {
                setMensaje({ texto: "¡Usuario agregado exitosamente a la municipalidad! 🎉", tipo: "exito" });
                setForm(estadoInicial);
                setTimeout(() => setMensaje({ texto: "", tipo: "" }), 5000);
            } else {
                setMensaje({ texto: "Error al guardar el usuario en la municipalidad local ❌", tipo: "error" });
            }

        } catch (error) {
            console.error("Error en el proceso:", error);
            setMensaje({ texto: "Error de conexión o proceso fallido (Revisa que Ngrok esté activo o el backend esté corriendo) 🚨", tipo: "error" });
        } finally {
            setCargando(false);
        }
    };

    return (
        <section className={AdminUserMuniCSS["contenedor-usuario"]}>
            <div className={AdminUserMuniCSS["form-card"]}>
                <h2 className={AdminUserMuniCSS["titulo-form"]}>
                    <FaUserShield className={AdminUserMuniCSS["icono-titulo"]} /> Agregar Usuario Municipalidad
                </h2>
                <form className={AdminUserMuniCSS["form-usuario"]} onSubmit={registrarUsuario}>

                    <div className={AdminUserMuniCSS["input-group"]}>
                        <label>Nombres</label>
                        <input type="text" name="nombreUser" value={form.nombreUser} onChange={handleChange} placeholder="Ej: Juan Andrés" required />
                    </div>

                    <div className={AdminUserMuniCSS["row-group"]}>
                        <div className={AdminUserMuniCSS["input-group"]}>
                            <label>Apellido Paterno</label>
                            <input type="text" name="apellidoPa" value={form.apellidoPa} onChange={handleChange} placeholder="Ej: Pérez" required />
                        </div>
                        <div className={AdminUserMuniCSS["input-group"]}>
                            <label>Apellido Materno</label>
                            <input type="text" name="apellidoMa" value={form.apellidoMa} onChange={handleChange} placeholder="Ej: Silva" required />
                        </div>
                    </div>

                    <div className={AdminUserMuniCSS["input-group"]}>
                        <label>Correo Electrónico (Debe estar registrado en Auth0)</label>
                        <input type="email" name="correoUsuario" value={form.correoUsuario} onChange={handleChange} placeholder="Ej: juan.perez@muni.com" required />
                    </div>

                    <div className={AdminUserMuniCSS["input-group"]}>
                        <label>Rol del Usuario</label>
                        <div className={AdminUserMuniCSS["select-wrapper"]}>
                            <select name="rol" value={form.rol} onChange={handleChange} required>
                                <option value="" disabled>Selecciona un rol...</option>
                                <option value="Administrador Municipal">Administrador Municipal</option>
                                <option value="Fiscalizador">Fiscalizador</option>
                                <option value="Operador">Operador</option>
                            </select>
                        </div>
                    </div>

                    <div className={AdminUserMuniCSS["input-group"]}>
                        <label>Municipalidad Asignada</label>
                        <div className={AdminUserMuniCSS["select-wrapper"]}>
                            <select name="idMunicipalidad" value={form.idMunicipalidad} onChange={handleChange} required>
                                <option value="" disabled>Asigna una municipalidad...</option>
                                {municipalidades.map((muni) => (
                                    <option value={muni.id} key={muni.id}>{muni.nombre}</option>
                                ))}
                            </select>
                        </div>
                    </div>

                    {mensaje.texto && (
                        <div style={{
                            padding: "12px", borderRadius: "8px", fontWeight: "600", fontSize: "14px", marginTop: "10px", display: "flex", alignItems: "center", gap: "8px",
                            backgroundColor: mensaje.tipo === 'error' ? '#fee2e2' : mensaje.tipo === 'exito' ? '#dcfce7' : '#e0f2fe',
                            color: mensaje.tipo === 'error' ? '#991b1b' : mensaje.tipo === 'exito' ? '#166534' : '#0369a1'
                        }}>
                            {mensaje.tipo === 'exito' ? <FaCheckCircle /> : <FaExclamationCircle />}
                            {mensaje.texto}
                        </div>
                    )}

                    <button type="submit" className={AdminUserMuniCSS["btn-submit"]} disabled={cargando}>
                        {cargando ? 'Procesando...' : 'Registrar Usuario'}
                    </button>
                </form>
            </div>
        </section>
    );
}

export default AdminUserMuni;
