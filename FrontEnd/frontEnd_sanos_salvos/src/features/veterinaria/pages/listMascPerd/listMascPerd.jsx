



import { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import "./ListMascPerd.css";

function ListMascPerd() {
    const [mascotas, setMascotas] = useState([]);
    const { getAccessTokenSilently, isAuthenticated } = useAuth0();

    useEffect(() => {
        const obtenerMascotasPerdidas = async () => {
            try {
                const token = await getAccessTokenSilently();

                const res = await fetch("http://localhost:8085/api/bff/mascotas", {
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });

                const data = await res.json();
                const mascotasPerdidas = data.filter((m) => m.estado === "PERDIDO");

                setMascotas(mascotasPerdidas);
            } catch (error) {
                console.error("Error al obtener mascotas perdidas:", error);
            }
        };

        obtenerMascotasPerdidas();
    }, [getAccessTokenSilently]);

    return (
        <>
            {isAuthenticated ? (
                <section className="contenedor-perdidas">
                    <h1>Mascotas Perdidas</h1>

                    {mascotas.length === 0 ? (
                        <p>No hay mascotas perdidas registradas.</p>
                    ) : (
                        <div className="lista-perdidas">
                            {mascotas.map((m) => (
                                <div className="card-perdida" key={m.id}>
                                    <h3>{m.nombre}</h3>

                                    <p><strong>Tipo:</strong> {m.tipoMascota ? m.tipoMascota.nombre : "Sin tipo"}</p>
                                    <p><strong>Raza:</strong> {m.tipoDeRaza ? m.tipoDeRaza.nombre : "Sin raza"}</p>
                                    <p><strong>Estado:</strong> {m.estado === "PERDIDO" ? "Perdido" : "Encontrado"}</p>
                                    <p><strong>Descripción:</strong> {m.descripcion}</p>

                                    {m.imagen && (
                                        <img
                                            className="img-perdida"
                                            src={`http://localhost:8081/imagenes/${m.imagen}`}
                                            alt="Mascota perdida"
                                        />
                                    )}
                                </div>
                            ))}
                        </div>
                    )}
                </section>
            ) : (
                <p>Debe iniciar sesión para ver las mascotas perdidas.</p>
            )}
        </>
    );
}

export default ListMascPerd;