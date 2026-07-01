import { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import VetCss from "./Veterinaria.module.css";

function Veterinaria() {
    const [mensaje, setMensaje] = useState("");
    const [form, setForm] = useState({
        nombreVeterinaria: "",
        direccion: "",
        telefono: "",
        correo: "",
        dominio:""
    });

    const { getAccessTokenSilently } = useAuth0();

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
                setMensaje("Veterinaria registrada correctamente 🎉");
                setForm({
                    nombreVeterinaria: "", direccion: "", telefono: "", correo: "", dominio:""
                });
            } else {
                setMensaje("Error al registrar veterinaria");
            }
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <section className={VetCss["contenedor-veterinaria"]}>
            <div className={VetCss["form-card"]}>
                <h2 className={VetCss["titulo-form"]}>Agregar Veterinaria</h2>
                <form className={VetCss["form-veterinaria"]} onSubmit={registrarVeterinaria}>
                    
                    <div className={VetCss["input-group"]}>
                        <label>Nombre Veterinaria</label>
                        <input type="text" name="nombreVeterinaria" placeholder="Ej: VetCenter" value={form.nombreVeterinaria} onChange={handleChange} required/>
                    </div>

                    <div className={VetCss["input-group"]}>
                        <label>Dirección</label>
                        <input type="text" name="direccion" placeholder="Ej: Av. Principal 123" value={form.direccion} onChange={handleChange} required />
                    </div>

                    <div className={VetCss["input-group"]}>
                        <label>Teléfono</label>
                        <input type="text"  name="telefono" placeholder="Ej: +56 9 1234 5678" value={form.telefono} onChange={handleChange} required/>
                    </div>

                    <div className={VetCss["input-group"]}>
                        <label>Correo Electrónico</label>
                        <input type="email" name="correo" placeholder="Ej: contacto@vet.com" value={form.correo} onChange={handleChange} required/>
                    </div>
                    
                    <div className={VetCss["input-group"]}>
                        <label>Dominio</label>
                        <input type="text" name="dominio" placeholder="Ej: vetcenter.cl" value={form.dominio} onChange={handleChange} required/>
                    </div>

                    <button type="submit" className={VetCss["btn-submit"]}>Registrar Veterinaria</button>
                    {mensaje && <p className={VetCss["mensaje-veterinaria"]}>{mensaje}</p>}
                </form>
            </div>
        </section>
    );
}

export default Veterinaria;