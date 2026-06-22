import AdminUserVetCSS from './AdminUserVet.module.css'
import { useAuth0 } from "@auth0/auth0-react";
import {useEffect, useState } from "react";


function AdminUserVet(){

    const [veterinarias, setVeterinarias] = useState([]);
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


    return<>
        <section className={AdminUserVetCSS["contenedor-veterinaria"]}>
            <form className={AdminUserVetCSS["form-veterinaria"]}>
                <input type="email" name="CorreoUser" placeholder="Correo Usuario" required/>
                <input type="Text" name="Nombre user" placeholder="Nombre usuario" required/>
                <input type="text" name="ApellidoPa" placeholder="Apellido Paterno Usuario" required/>
                <input type="text" name="ApellidoMa" placeholder="Apellido Materno Usuario" required/>
                <select name="rol Usuario">
                    <option value="Jefe Veterinaria">Jefe Veterinaria</option>
                    <option value="Recepcionista">Recepcionista</option>
                    <option value="Veterinario">Veterinario</option>
                </select>
                <select name="Veterinaria">
                    {veterinarias.map((v) => (
                            <option value={v.id} key={v.id}>{v.nombreVeterinaria}</option>
                        
                    ))}
                </select>
                <button type="submit">Registrar Veterinaria</button>
            </form>
        </section>
    </>
}

export default AdminUserVet;