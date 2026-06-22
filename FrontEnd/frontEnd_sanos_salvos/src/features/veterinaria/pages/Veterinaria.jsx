import { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import VetCss from "./Veterinaria.module.css";

function Veterinaria() {
    const [veterinarias, setVeterinarias] = useState([]);
    const [mensaje, setMensaje] = useState("");
    const [form, setForm] = useState({
        nombreVeterinaria: "",
        direccion: "",
        telefono: "",
        correo: ""
    });

    const { getAccessTokenSilently } = useAuth0();

    const cargarVeterinarias = async () => {
        try {
            const token = await getAccessTokenSilently();

            const response = await fetch("http://localhost:8086/api/veterinaria", {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            const data = await response.json();
            setVeterinarias(data);
        } catch (error) {
            console.error(error);
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

    const registrarVeterinaria = async (e) => {
        e.preventDefault();

        try {
            const token = await getAccessTokenSilently();

            const response = await fetch("http://localhost:8086/api/veterinaria", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify(form)
            });

            if (response.ok) {
                setMensaje("Veterinaria registrada correctamente");
                setForm({
                    nombreVeterinaria: "",
                    direccion: "",
                    telefono: "",
                    correo: ""
                });

                cargarVeterinarias();
            } else {
                setMensaje("Error al registrar veterinaria");
            }
        } catch (error) {
            console.error(error);
            setMensaje("Error al conectar con el servidor");
        }
    };

    return (
        <section className={VetCss["contenedor-veterinaria"]}>
            <div className={VetCss["banner-veterinaria"]}>
                <h1>Administración de Veterinarias</h1>
                <p>Gestiona las clínicas veterinarias asociadas al sistema Sanos y Salvos.</p>
            </div>

            <div className={VetCss["panel-formulario"]}>
                <div className={VetCss["titulo-seccion"]}>
                    <h2>Registrar Veterinaria</h2>
                    <p>Agrega una nueva veterinaria colaboradora al sistema.</p>
                </div>

                <form className={VetCss["form-veterinaria"]} onSubmit={registrarVeterinaria}>
                    <input
                        type="text"
                        name="nombreVeterinaria"
                        placeholder="Nombre veterinaria"
                        value={form.nombreVeterinaria}
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

                    <button type="submit">Registrar Veterinaria</button>

                    {mensaje && (
                        <p className={VetCss["mensaje-veterinaria"]}>
                            {mensaje}
                        </p>
                    )}
                </form>
            </div>

            <div className={VetCss["titulo-seccion"]}>
                <h2>Veterinarias Registradas</h2>
                <p>Listado de veterinarias disponibles para colaborar con reportes de mascotas.</p>
            </div>

            <div className={VetCss["lista-veterinarias"]}>
                {veterinarias.map((v) => (
                    <div className={VetCss["card-veterinaria"]} key={v.id}>
                        <h3>{v.nombreVeterinaria}</h3>
                        <p><strong>Dirección:</strong> {v.direccion}</p>
                        <p><strong>Teléfono:</strong> {v.telefono}</p>
                        <p><strong>Correo:</strong> {v.correo}</p>
                    </div>
                ))}
            </div>
        </section>
    );
}

export default Veterinaria;