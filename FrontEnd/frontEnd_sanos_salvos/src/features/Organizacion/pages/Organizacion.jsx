import { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import OrgCss from "./Organizacion.module.css";

function Organizacion() {
    const [organizaciones, setOrganizaciones] = useState([]);
    const [mensaje, setMensaje] = useState("");
    const [form, setForm] = useState({
        nombreOrganizacion: "",
        direccion: "",
        telefono: "",
        correo: ""
    });

    const { getAccessTokenSilently } = useAuth0();

    const cargarOrganizaciones = async () => {
        try {
            const token = await getAccessTokenSilently();

            const response = await fetch("http://localhost:8086/api/organizacion", {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            const data = await response.json();
            setOrganizaciones(data);

        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        cargarOrganizaciones();
    }, [getAccessTokenSilently]);

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };

    const registrarOrganizacion = async (e) => {
        e.preventDefault();

        try {
            const token = await getAccessTokenSilently();

            const response = await fetch("http://localhost:8086/api/organizacion", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify(form)
            });

            if (response.ok) {
                setMensaje("Organización registrada correctamente");
                setForm({
                    nombreOrganizacion: "",
                    direccion: "",
                    telefono: "",
                    correo: ""
                });
                cargarOrganizaciones();
            } else {
                setMensaje("Error al registrar organización");
            }

        } catch (error) {
            console.error(error);
        }
    };

    return (
        <section className={OrgCss["contenedor-organizacion"]}>
            <h2>Panel Organización</h2>

            <form className={OrgCss["form-organizacion"]} onSubmit={registrarOrganizacion}>
                <input
                    type="text"
                    name="nombreOrganizacion"
                    placeholder="Nombre organización"
                    value={form.nombreOrganizacion}
                    onChange={handleChange}
                    required
                />
                <input
                    type="text"
                    name="direccion"
                    placeholder="Dirección"
                    value={form.direccion}
                    onChange={handleChange}
                    required
                />
                <input
                    type="text"
                    name="telefono"
                    placeholder="Teléfono"
                    value={form.telefono}
                    onChange={handleChange}
                    required
                />
                <input
                    type="email"
                    name="correo"
                    placeholder="Correo"
                    value={form.correo}
                    onChange={handleChange}
                    required
                />
                <button type="submit">Registrar Organización</button>
                {mensaje && <p className={OrgCss["mensaje-organizacion"]}>{mensaje}</p>}
            </form>

            <h2>Organizaciones Registradas</h2>

            <div className={OrgCss["lista-organizaciones"]}>
                {organizaciones.map((o) => (
                    <div className={OrgCss["card-organizacion"]} key={o.id}>
                        <h3>{o.nombreOrganizacion}</h3>
                        <p><strong>Dirección:</strong> {o.direccion}</p>
                        <p><strong>Teléfono:</strong> {o.telefono}</p>
                        <p><strong>Correo:</strong> {o.correo}</p>
                    </div>
                ))}
            </div>
        </section>
    );
}

export default Organizacion;
