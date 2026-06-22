import { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import MuniCss from "./Municipalidad.module.css";

function Municipalidad() {
    const [municipalidades, setMunicipalidades] = useState([]);
    const [mensaje, setMensaje] = useState("");
    const [form, setForm] = useState({
        nombreMunicipalidad: "",
        direccion: "",
        telefono: "",
        correo: ""
    });

    const { getAccessTokenSilently } = useAuth0();

    const cargarMunicipalidades = async () => {
        try {
            const token = await getAccessTokenSilently();

            const response = await fetch("http://localhost:8086/api/municipalidad", {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            const data = await response.json();
            setMunicipalidades(data);

        } catch (error) {
            console.error(error);
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

    const registrarMunicipalidad = async (e) => {
        e.preventDefault();

        try {
            const token = await getAccessTokenSilently();

            const response = await fetch("http://localhost:8086/api/municipalidad", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify(form)
            });

            if (response.ok) {
                setMensaje("Municipalidad registrada correctamente");
                setForm({
                    nombreMunicipalidad: "",
                    direccion: "",
                    telefono: "",
                    correo: ""
                });
                cargarMunicipalidades();
            } else {
                setMensaje("Error al registrar municipalidad");
            }

        } catch (error) {
            console.error(error);
        }
    };

    return (
        <section className={MuniCss["contenedor-municipalidad"]}>
            <h2>Panel Municipalidad</h2>

            <form className={MuniCss["form-municipalidad"]} onSubmit={registrarMunicipalidad}>
                <input
                    type="text"
                    name="nombreMunicipalidad"
                    placeholder="Nombre municipalidad"
                    value={form.nombreMunicipalidad}
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
                <button type="submit">Registrar Municipalidad</button>
                {mensaje && <p className={MuniCss["mensaje-municipalidad"]}>{mensaje}</p>}
            </form>

            <h2>Municipalidades Registradas</h2>

            <div className={MuniCss["lista-municipalidades"]}>
                {municipalidades.map((m) => (
                    <div className={MuniCss["card-municipalidad"]} key={m.id}>
                        <h3>{m.nombreMunicipalidad}</h3>
                        <p><strong>Dirección:</strong> {m.direccion}</p>
                        <p><strong>Teléfono:</strong> {m.telefono}</p>
                        <p><strong>Correo:</strong> {m.correo}</p>
                    </div>
                ))}
            </div>
        </section>
    );
}

export default Municipalidad;
