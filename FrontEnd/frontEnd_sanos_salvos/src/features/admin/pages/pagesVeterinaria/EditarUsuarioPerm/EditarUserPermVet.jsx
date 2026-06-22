import EditarUserPermCSS from './EditarUserPermVet.module.css';
import { useAuth0 } from "@auth0/auth0-react";
import { useEffect, useState } from "react";
import { FaUserEdit } from "react-icons/fa";

function EditarUserPermVet() {
    const { getAccessTokenSilently } = useAuth0();
    const [veterinarias, setVeterinarias] = useState([]);
    const [usuarioAEditar, setUsuarioAEditar] = useState({
        nombres: "",
        apellidoPa: "",
        apellidoMa: "",
        correo: "",
        rol: "",
        idVeterinaria: "",
        estado: ""
    });

    const cargarVeterinarias = async () => {
        try {
            const token = await getAccessTokenSilently();
            const response = await fetch("http://localhost:8086/api/veterinaria", {
                headers: { Authorization: `Bearer ${token}` }
            });
            const data = await response.json();
            setVeterinarias(data);
        } catch (error) {
            console.error("Error cargando veterinarias", error);
        }
    };

    useEffect(() => {
        cargarVeterinarias();
    }, [getAccessTokenSilently]);

    const handleChange = (e) => {
        setUsuarioAEditar({
            ...usuarioAEditar,
            [e.target.name]: e.target.value
        });
    };

    const actualizarUsuario = (e) => {
        e.preventDefault();
        console.log("Datos a actualizar:", usuarioAEditar);
        alert("¡Usuario actualizado con éxito! 🎉");
    };

    return (
        <section className={EditarUserPermCSS["contenedor-editar"]}>
            <div className={EditarUserPermCSS["form-card"]}>
                <h2 className={EditarUserPermCSS["titulo-form"]}>
                    <FaUserEdit className={EditarUserPermCSS["icono-titulo"]}/> Editar Usuario
                </h2>
                <form className={EditarUserPermCSS["form-usuario"]} onSubmit={actualizarUsuario}>
                    
                    <div className={EditarUserPermCSS["input-group"]}>
                        <label>Nombres</label>
                        <input type="text" name="nombres" value={usuarioAEditar.nombres} onChange={handleChange} required />
                    </div>
                    
                    <div className={EditarUserPermCSS["row-group"]}>
                        <div className={EditarUserPermCSS["input-group"]}>
                            <label>Apellido Paterno</label>
                            <input type="text" name="apellidoPa" value={usuarioAEditar.apellidoPa} onChange={handleChange} required />
                        </div>
                        <div className={EditarUserPermCSS["input-group"]}>
                            <label>Apellido Materno</label>
                            <input type="text" name="apellidoMa" value={usuarioAEditar.apellidoMa} onChange={handleChange} required />
                        </div>
                    </div>

                    <div className={EditarUserPermCSS["input-group"]}>
                        <label>Correo Electrónico (Solo lectura)</label>
                        <input type="email" name="correo" value={usuarioAEditar.correo} readOnly className={EditarUserPermCSS["input-readonly"]} />
                    </div>

                    <div className={EditarUserPermCSS["row-group"]}>
                        <div className={EditarUserPermCSS["input-group"]}>
                            <label>Rol del Usuario</label>
                            <div className={EditarUserPermCSS["select-wrapper"]}>
                                <select name="rol" value={usuarioAEditar.rol} onChange={handleChange} required>
                                    <option value="Jefe Veterinaria">Jefe Veterinaria</option>
                                    <option value="Recepcionista">Recepcionista</option>
                                    <option value="Veterinario">Veterinario</option>
                                </select>
                            </div>
                        </div>

                        <div className={EditarUserPermCSS["input-group"]}>
                            <label>Estado</label>
                            <div className={EditarUserPermCSS["select-wrapper"]}>
                                <select name="estado" value={usuarioAEditar.estado} onChange={handleChange} required>
                                    <option value="Activo">Activo</option>
                                    <option value="Inactivo">Inactivo</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    <div className={EditarUserPermCSS["input-group"]}>
                        <label>Veterinaria Asignada</label>
                        <div className={EditarUserPermCSS["select-wrapper"]}>
                            <select name="idVeterinaria" value={usuarioAEditar.idVeterinaria} onChange={handleChange} required>
                                <option value="" disabled>Asigna una sucursal...</option>
                                {veterinarias.map((v) => (
                                    <option value={v.id} key={v.id}>{v.nombreVeterinaria}</option>
                                ))}
                            </select>
                        </div>
                    </div>

                    <div className={EditarUserPermCSS["btn-group"]}>
                        <button type="button" className={EditarUserPermCSS["btn-cancelar"]}>Cancelar</button>
                        <button type="submit" className={EditarUserPermCSS["btn-submit"]}>Guardar Cambios</button>
                    </div>
                </form>
            </div>
        </section>
    );
}

export default EditarUserPermVet;