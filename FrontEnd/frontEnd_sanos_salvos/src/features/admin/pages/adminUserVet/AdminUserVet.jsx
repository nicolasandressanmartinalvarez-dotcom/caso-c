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

    return(
        <section className={AdminUserVetCSS["contenedor-usuario"]}>
            <div className={AdminUserVetCSS["form-card"]}>
                <h2 className={AdminUserVetCSS["titulo-form"]}>Agregar Usuario</h2>
                <form className={AdminUserVetCSS["form-usuario"]}>
                    
                    <div className={AdminUserVetCSS["input-group"]}>
                        <label>Nombres</label>
                        <input type="text" name="Nombre user" placeholder="Ej: Juan Andrés" required/>
                    </div>
                    
                    <div className={AdminUserVetCSS["row-group"]}>
                        <div className={AdminUserVetCSS["input-group"]}>
                            <label>Apellido Paterno</label>
                            <input type="text" name="ApellidoPa" placeholder="Ej: Pérez" required/>
                        </div>
                        <div className={AdminUserVetCSS["input-group"]}>
                            <label>Apellido Materno</label>
                            <input type="text" name="ApellidoMa" placeholder="Ej: Silva" required/>
                        </div>
                    </div>

                    <div className={AdminUserVetCSS["input-group"]}>
                        <label>Correo Electrónico</label>
                        <input type="email" name="CorreoUser" placeholder="Ej: juan.perez@vet.com" required/>
                    </div>

                    <div className={AdminUserVetCSS["input-group"]}>
                        <label>Rol del Usuario</label>
                        <div className={AdminUserVetCSS["select-wrapper"]}>
                            <select name="rol Usuario" defaultValue="" required>
                                <option value="" disabled>Selecciona un rol...</option>
                                <option value="Jefe Veterinaria">Jefe Veterinaria</option>
                                <option value="Recepcionista">Recepcionista</option>
                                <option value="Veterinario">Veterinario</option>
                            </select>
                        </div>
                    </div>

                    <div className={AdminUserVetCSS["input-group"]}>
                        <label>Veterinaria Asignada</label>
                        <div className={AdminUserVetCSS["select-wrapper"]}>
                            <select name="Veterinaria" defaultValue="" required>
                                <option value="" disabled>Asigna una sucursal...</option>
                                {veterinarias.map((v) => (
                                    <option value={v.id} key={v.id}>{v.nombreVeterinaria}</option>
                                ))}
                            </select>
                        </div>
                    </div>

                    <button type="submit" className={AdminUserVetCSS["btn-submit"]}>Registrar Usuario</button>
                </form>
            </div>
        </section>
    );
}

export default AdminUserVet;