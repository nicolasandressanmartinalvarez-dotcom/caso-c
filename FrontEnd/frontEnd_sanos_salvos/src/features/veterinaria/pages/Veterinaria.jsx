import { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import VetCss from "./Veterinaria.module.css";

function Veterinaria() {
    const [veterinarias, setVeterinarias] = useState([]);
    const { getAccessTokenSilently } = useAuth0();

    useEffect(() => {
        const cargarVeterinarias = async () => {
            try {
                const token = await getAccessTokenSilently();

                const response = await fetch("http://localhost:8086/api/veterinaria", {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });

                const data = await response.json();

                console.log(data);
                setVeterinarias(data);

            } catch (error) {
                console.error(error);
            }
        };

        cargarVeterinarias();
    }, [getAccessTokenSilently]);

    return (
        <section className={VetCss["contenedor-veterinaria"]}>
            <h2>Veterinarias Registradas</h2>

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