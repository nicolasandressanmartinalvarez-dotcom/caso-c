import { useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import VetCss from "./Veterinaria.module.css";
import { FaHospital, FaCheckCircle, FaExclamationCircle } from "react-icons/fa";

function Veterinaria() {
    const { getAccessTokenSilently } = useAuth0();
    
    const [mensaje, setMensaje] = useState({ texto: "", tipo: "" });
    const [cargando, setCargando] = useState(false);

    const estadoInicial = {
        nombreVeterinaria: "",
        direccion: "",
        telefono: "",
        correo: "",
        dominio: ""
    };

    const [form, setForm] = useState(estadoInicial);

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };

    const registrarVeterinaria = async (e) => {
        e.preventDefault();
        setCargando(true);
        setMensaje({ texto: "Registrando veterinaria...", tipo: "info" });

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
                setMensaje({ texto: "¡Veterinaria registrada con éxito!", tipo: "exito" });
                setForm(estadoInicial); 
                setTimeout(() => setMensaje({ texto: "", tipo: "" }), 4000);
            } else {
                setMensaje({ texto: "Error al registrar la veterinaria. Verifica los datos.", tipo: "error" });
            }

        } catch (error) {
            console.error("Error en la petición:", error);
            setMensaje({ texto: "Error de conexión con el servidor.", tipo: "error" });
        } finally {
            setCargando(false);
        }
    };

    return (
        <section className={VetCss["contenedor-veterinaria"]}>
            <div className={VetCss["form-card"]}>
                <h2 className={VetCss["titulo-form"]}>
                    <FaHospital className={VetCss["icono-titulo"]}/> Agregar Veterinaria
                </h2>
                <p className={VetCss["subtitulo"]}>Ingresa los datos de la nueva sucursal o clínica asociada.</p>

                <form className={VetCss["form-veterinaria"]} onSubmit={registrarVeterinaria}>
                    
                    <div className={VetCss["input-group"]}>
                        <label>Nombre de la Veterinaria</label>
                        <input type="text" name="nombreVeterinaria" placeholder="Ej: VetCenter Principal" value={form.nombreVeterinaria} onChange={handleChange} required/>
                    </div>

                    <div className={VetCss["input-group"]}>
                        <label>Dirección Física</label>
                        <input type="text" name="direccion" placeholder="Ej: Av. Providencia 1234, Santiago" value={form.direccion} onChange={handleChange} required />
                    </div>

                    <div className={VetCss["row-group"]}>
                        <div className={VetCss["input-group"]}>
                            <label>Teléfono de Contacto</label>
                            <input 
                                type="text"  
                                name="telefono" 
                                placeholder="Ej: +56 9 1234 5678" 
                                value={form.telefono} 
                                onChange={handleChange} 
                                required
                            />
                        </div>
                        <div className={VetCss["input-group"]}>
                            <label>Dominio Web</label>
                            <input 
                                type="text" 
                                name="dominio" 
                                placeholder="Ej: vetcenter.cl" 
                                value={form.dominio} 
                                onChange={handleChange} 
                                required
                            />
                        </div>
                    </div>

                    <div className={VetCss["input-group"]}>
                        <label>Correo Electrónico Oficial</label>
                        <input 
                            type="email" 
                            name="correo" 
                            placeholder="Ej: contacto@vetcenter.cl" 
                            value={form.correo} 
                            onChange={handleChange} 
                            required
                        />
                    </div>
                    {mensaje.texto && (
                        <div className={`${VetCss["mensaje-feedback"]} ${VetCss[mensaje.tipo]}`}>
                            {mensaje.tipo === 'exito' && <FaCheckCircle />}
                            {mensaje.tipo === 'error' && <FaExclamationCircle />}
                            <span>{mensaje.texto}</span>
                        </div>
                    )}

                    <button 
                        type="submit" 
                        className={VetCss["btn-submit"]} 
                        disabled={cargando}
                    >
                        {cargando ? 'Guardando...' : 'Registrar Veterinaria'}
                    </button>
                </form>
            </div>
        </section>
    );
}

export default Veterinaria;