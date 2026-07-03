import { useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import CSS from "./AgregarOrganizacion.module.css";

function AgregarOrganizacion() {
    const [mensaje, setMensaje] = useState("");
    const [form, setForm] = useState({
        nombre: "",
        tipoOrganizacion: "",
        rut: "",
        direccion: "",
        telefono: "",
        email: "",
        municipalidad: ""
    });

    const { getAccessTokenSilently } = useAuth0();

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const registrar = async (e) => {
        e.preventDefault();
        try {
            const token = await getAccessTokenSilently();
            const response = await fetch("http://localhost:8089/api/organizaciones", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify(form)
            });

            if (response.ok || response.status === 201) {
                setMensaje("✅ Organización registrada correctamente");
                setForm({ nombre: "", tipoOrganizacion: "", rut: "", direccion: "", telefono: "", email: "", municipalidad: "" });
            } else {
                setMensaje("❌ Error al registrar la organización");
            }
        } catch (error) {
            console.error(error);
            setMensaje("❌ Error de conexión con el servidor");
        }
    };

    return (
        <section className={CSS["contenedor"]}>
            <div className={CSS["form-card"]}>
                <h2 className={CSS["titulo-form"]}>Agregar Organización</h2>
                <form className={CSS["form"]} onSubmit={registrar}>
                    <div className={CSS["input-group"]}>
                        <label>Nombre</label>
                        <input type="text" name="nombre" placeholder="Ej: Fundación Amigos de los Animales" value={form.nombre} onChange={handleChange} required />
                    </div>
                    <div className={CSS["input-group"]}>
                        <label>Tipo de Organización</label>
                        <input type="text" name="tipoOrganizacion" placeholder="Ej: ONG, Fundación, Refugio" value={form.tipoOrganizacion} onChange={handleChange} required />
                    </div>
                    <div className={CSS["input-group"]}>
                        <label>RUT</label>
                        <input type="text" name="rut" placeholder="Ej: 12.345.678-9" value={form.rut} onChange={handleChange} required />
                    </div>
                    <div className={CSS["input-group"]}>
                        <label>Dirección</label>
                        <input type="text" name="direccion" placeholder="Ej: Av. Libertad 456" value={form.direccion} onChange={handleChange} required />
                    </div>
                    <div className={CSS["input-group"]}>
                        <label>Teléfono</label>
                        <input type="text" name="telefono" placeholder="Ej: +56 9 8765 4321" value={form.telefono} onChange={handleChange} required />
                    </div>
                    <div className={CSS["input-group"]}>
                        <label>Email</label>
                        <input type="email" name="email" placeholder="Ej: contacto@org.cl" value={form.email} onChange={handleChange} required />
                    </div>
                    <div className={CSS["input-group"]}>
                        <label>Municipalidad</label>
                        <input type="text" name="municipalidad" placeholder="Ej: Santiago" value={form.municipalidad} onChange={handleChange} required />
                    </div>
                    <button type="submit" className={CSS["btn-submit"]}>Registrar Organización</button>
                    {mensaje && <p className={CSS["mensaje"]}>{mensaje}</p>}
                </form>
            </div>
        </section>
    );
}

export default AgregarOrganizacion;
