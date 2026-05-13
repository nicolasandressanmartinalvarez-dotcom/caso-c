import { useEffect, useState } from "react";
import { useAuth0 } from '@auth0/auth0-react';
import ListarMas from "./ListarMascotas.module.css"
function ListarMascotas({setNuevaMascota}){
    const [mascota, setMascota] = useState([]);
    const [correos, setCorreos] = useState({correoRemitente: "",correoEmisor: ""})
    const { getAccessTokenSilently, user } = useAuth0();
    const { isAuthenticated, isLoading } = useAuth0();
    useEffect(() => {
        const obtenerMascotas = async () => {
            try {
                const token = await getAccessTokenSilently();
                const res = await fetch('http://localhost:8081/api/mascotas', {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`
                    },
                });
                const data = await res.json();
                setMascota(data);
            } catch (error) {
                console.error(error);
            }
        };
        obtenerMascotas();
    }, []);

    const setCoordenadas = (coordenadasMascota)=>{
        const latitudYLongitud = {
            lat:coordenadasMascota.latitud,
            lng: coordenadasMascota.longitud
        }
        setNuevaMascota(latitudYLongitud)
        console.log(latitudYLongitud)
    }


    //Empieza el boton contactar

    
    const contactarDueño = (datMas)=>{
        const usuario = "admin";
        const password = "admin123";
        const credenciales = btoa(`${usuario}:${password}`);
        
        setCorreos(
            {
                correoRemitente: datMas.correoReportante,
                correoEmisor: user?.email
            }
        )


        const response = fetch('http://localhost:8082/api/registro/v1', {
            method: 'POST',
                headers: {
                "Authorization": `Basic ${credenciales}`,
                "Content-Type": "application/json"
            },
            body:JSON.stringify(correos)
        });
    }


    return (
        <>
            {isAuthenticated ? (
                <section className={ListarMas["contenedor-masc"]}>
                {mascota.map((m) => (
                    <div className={ListarMas["div-mascotas"]} key={m.id}>
                    <div className={ListarMas["informacion-masc"]}>
                        <div><h2>Nombre</h2><p>{m.nombre}</p></div>
                        <div><h2>Raza</h2><p>{m.tipoDeRaza}</p></div>
                    </div>
                    <div className={ListarMas["cont-img-masc"]}>
                        <img src={`http://localhost:8081/imagenes/${m.imagen}`} alt="Mascota" />
                    </div>
                    <div className={ListarMas["descripcion-masc"]}>
                        <p>{m.descripcion}</p>
                    </div>
                    <div className={ListarMas["botones-masc"]}>
                        <button className={ListarMas["btn-localizar"]} onClick={() => setCoordenadas(m)}>Localizar</button>
                        <button className={ListarMas["btn-contactar"]} onClick={()=>contactarDueño(m)}>Contactar</button>
                    </div>
                    </div>
                ))}
                </section>
            ) : (
                <p className={ListarMas["noLogin"]}>Debe de iniciar sesion para ver a las mascotas</p>
            )}
        </>
    );
}
export default ListarMascotas;