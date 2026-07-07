import { useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import CSS from "./AgregarMunicipalidad.module.css";

function AgregarMunicipalidad() {
    const [mensaje, setMensaje] = useState("");
    const [form, setForm] = useState({
        nombre: "",
        comuna: "",
        region: "",
        correoInstitucional: "",
        telefono: "",
        latitud: "",
        longitud: ""
    });

    const { getAccessTokenSilently } = useAuth0();

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const registrar = async (e) => {
        e.preventDefault();
        try {
            const token = await getAccessTokenSilently();
            const body = {
                ...form,
                latitud: form.latitud ? parseFloat(form.latitud) : null,
                longitud: form.longitud ? parseFloat(form.longitud) : null
            };
            const misHeaders = new Headers();
            misHeaders.append("Content-Type", "application/json");
            misHeaders.append("Authorization", `Bearer ${token}`);

            const response = await fetch("http://localhost:8082/api/municipalidades", {
                method: "POST",
                headers: misHeaders,
                body: JSON.stringify(body)
            });

            if (response.ok) {
                setMensaje("✅ Municipalidad registrada correctamente");
                setForm({ nombre: "", comuna: "", region: "", correoInstitucional: "", telefono: "", latitud: "", longitud: "" });
            } else {
                setMensaje("❌ Error al registrar. Revisa la consola del servidor backend.");
            }
        } catch (error) {
            console.error(error);
            setMensaje("❌ Error de conexión con el servidor");
        }
    };

    return (
        <section className={CSS["contenedor"]}>
            <div className={CSS["form-card"]}>
                <h2 className={CSS["titulo-form"]}>Agregar Municipalidad 🏢</h2>
                <form className={CSS["form"]} onSubmit={registrar}>
                    <div className={CSS["input-group"]}>
                        <label>Nombre</label>
                        <input type="text" name="nombre" placeholder="Ej: Municipalidad de Santiago" value={form.nombre} onChange={handleChange} required />
                    </div>
                    <div className={CSS["input-group"]}>
                        <label>Comuna</label>
                        <input type="text" name="comuna" placeholder="Ej: Santiago" value={form.comuna} onChange={handleChange} required />
                    </div>
                    <div className={CSS["input-group"]}>
                        <label>Región</label>
                        <input type="text" name="region" placeholder="Ej: Metropolitana" value={form.region} onChange={handleChange} required />
                    </div>
                    <div className={CSS["input-group"]}>
                        <label>Correo Institucional</label>
                        <input type="email" name="correoInstitucional" placeholder="Ej: contacto@municipalidad.cl" value={form.correoInstitucional} onChange={handleChange} required />
                    </div>
                    <div className={CSS["input-group"]}>
                        <label>Teléfono</label>
                        <input type="text" name="telefono" placeholder="Ej: +56 2 1234 5678" value={form.telefono} onChange={handleChange} required />
                    </div>
                    <div className={CSS["fila-doble"]}>
                        <div className={CSS["input-group"]}>
                            <label>Latitud (opcional)</label>
                            <input type="number" step="any" name="latitud" placeholder="Ej: -33.4569" value={form.latitud} onChange={handleChange} />
                        </div>
                        <div className={CSS["input-group"]}>
                            <label>Longitud (opcional)</label>
                            <input type="number" step="any" name="longitud" placeholder="Ej: -70.6483" value={form.longitud} onChange={handleChange} />
                        </div>
                    </div>
                    <button type="submit" className={CSS["btn-submit"]}>Registrar Municipalidad 💾</button>
                    {mensaje && <p className={CSS["mensaje"]}>{mensaje}</p>}
                </form>
            </div>
        </section>
    );
}

export default AgregarMunicipalidad;