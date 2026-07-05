import AdminUserVetCSS from './AdminUserVet.module.css';
import { useAuth0 } from "@auth0/auth0-react";
import { useEffect, useState } from "react";
import { FaUserMd, FaCheckCircle, FaExclamationCircle } from "react-icons/fa";

function AdminUserVet() {
    const { getAccessTokenSilently } = useAuth0();
    const [veterinarias, setVeterinarias] = useState([]);
    const [mensaje, setMensaje] = useState({ texto: "", tipo: "" });
    const [cargando, setCargando] = useState(false);

    // Estado del formulario
    const estadoInicial = {
        nombreUser: "",
        apellidoPa: "",
        apellidoMa: "",
        correoUsuario: "",
        rol: "",
        idVeterinaria: ""
    };
    const [form, setForm] = useState(estadoInicial);

    // Cargar la lista de veterinarias para el Select
    const cargarVeterinarias = async () => {
        try {
            const token = await getAccessTokenSilently();
            const response = await fetch("http://localhost:8086/api/veterinaria", {
                headers: { Authorization: `Bearer ${token}` }
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
            
            // Headers diferenciados: El global necesita el bypass de Ngrok
            const headersGlobal = {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`,
                "ngrok-skip-browser-warning": "69420"
            };
            
            const headersLocal = {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            };
            const URL_API_GLOBAL = "https://660a-191-116-44-218.ngrok-free.app/api/usuarios"; 
            const URL_API_VETERINARIA = "http://localhost:8086/api/usuPermitidos";

            // PASO 0: Filtrar duplicados locales
            const resLocalCheck = await fetch(URL_API_VETERINARIA, { headers: headersLocal });
            if (resLocalCheck.ok) {
                const usuariosLocales = await resLocalCheck.json();
                const correoYaExiste = usuariosLocales.find(u => u.correoUsuario.toLowerCase() === form.correoUsuario.toLowerCase());
                
                if (correoYaExiste) {
                    setMensaje({ 
                        texto: "El usuario ya se encuentra registrado en el sistema de esta veterinaria 🚫", 
                        tipo: "error" 
                    });
                    setCargando(false);
                    return; // Detenemos la ejecución aquí
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
                entidadPerteneciente: "Veterinaria"
            };

            const resActualizacion = await fetch(`${URL_API_GLOBAL}/${form.correoUsuario}`, {
                method: "PUT",
                headers: headersGlobal,
                body: JSON.stringify(payloadActualizacion)
            });

            if (!resActualizacion.ok) {
                throw new Error("No se pudo actualizar la entidad en la API Global.");
            }

            // PASO 3: Guardar el usuario en la base de datos de Veterinaria (API Local)
            setMensaje({ texto: "Guardando permisos locales...", tipo: "info" });
            const payloadLocal = {
                correoUsuario: form.correoUsuario,
                rol: form.rol,
                idAuth0: dataUsuarioGlobal.idAuth0,
                nombreUser: form.nombreUser,
                apellidoPa: form.apellidoPa,
                apellidoMa: form.apellidoMa,
                estadoUsuario: "Activo", // Por defecto al crear
                veterinaria: {
                    idVeterinaria: Number(form.idVeterinaria)
                }
            };

            const resGuardadoLocal = await fetch(URL_API_VETERINARIA, {
                method: "POST",
                headers: headersLocal,
                body: JSON.stringify(payloadLocal)
            });

            if (resGuardadoLocal.ok) {
                setMensaje({ texto: "¡Usuario agregado exitosamente a la veterinaria! 🎉", tipo: "exito" });
                setForm(estadoInicial);
                setTimeout(() => setMensaje({ texto: "", tipo: "" }), 5000);
            } else {
                setMensaje({ texto: "Error al guardar el usuario en la veterinaria local ❌", tipo: "error" });
            }

        } catch (error) {
            console.error("Error en el proceso:", error);
            setMensaje({ texto: "Error de conexión o proceso fallido (Revisa que Ngrok esté activo) 🚨", tipo: "error" });
        } finally {
            setCargando(false);
        }
    };
    return (
        <section className={AdminUserVetCSS["contenedor-usuario"]}>
            <div className={AdminUserVetCSS["form-card"]}>
                <h2 className={AdminUserVetCSS["titulo-form"]}>
                    <FaUserMd className={AdminUserVetCSS["icono-titulo"]}/> Agregar Usuario
                </h2>
                <form className={AdminUserVetCSS["form-usuario"]} onSubmit={registrarUsuario}>
                    
                    <div className={AdminUserVetCSS["input-group"]}>
                        <label>Nombres</label>
                        <input type="text" name="nombreUser" value={form.nombreUser} onChange={handleChange} placeholder="Ej: Juan Andrés" required/>
                    </div>
                    
                    <div className={AdminUserVetCSS["row-group"]}>
                        <div className={AdminUserVetCSS["input-group"]}>
                            <label>Apellido Paterno</label>
                            <input type="text" name="apellidoPa" value={form.apellidoPa} onChange={handleChange} placeholder="Ej: Pérez" required/>
                        </div>
                        <div className={AdminUserVetCSS["input-group"]}>
                            <label>Apellido Materno</label>
                            <input type="text" name="apellidoMa" value={form.apellidoMa} onChange={handleChange} placeholder="Ej: Silva" required/>
                        </div>
                    </div>

                    <div className={AdminUserVetCSS["input-group"]}>
                        <label>Correo Electrónico (Debe estar registrado en Auth0)</label>
                        <input type="email" name="correoUsuario" value={form.correoUsuario} onChange={handleChange} placeholder="Ej: juan.perez@vet.com" required/>
                    </div>

                    <div className={AdminUserVetCSS["input-group"]}>
                        <label>Rol del Usuario</label>
                        <div className={AdminUserVetCSS["select-wrapper"]}>
                            <select name="rol" value={form.rol} onChange={handleChange} required>
                                <option value="" disabled>Selecciona un rol...</option>
                                <option value="Jefe Veterinaria">Jefe Veterinaria</option>
                                <option value="Recepcionista">Recepcionista</option>
                                <option value="Veterinario">Veterinario</option>
                            </select>
                        </div>
                    </div>

                    <div className={AdminUserVetCSS["input-group"]}>
                        <label>Veterinaria Asignada</label>
                        <div className={AdminUserVetCSS["select-wrapper"]}>
                            <select name="idVeterinaria" value={form.idVeterinaria} onChange={handleChange} required>
                                <option value="" disabled>Asigna una sucursal...</option>
                                {veterinarias.map((v) => (
                                    <option value={v.id} key={v.idVeterinaria}>{v.nombreVeterinaria}</option>
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

                    <button type="submit" className={AdminUserVetCSS["btn-submit"]} disabled={cargando}>
                        {cargando ? 'Procesando...' : 'Registrar Usuario'}
                    </button>
                </form>
            </div>
        </section>
    );
}

export default AdminUserVet;