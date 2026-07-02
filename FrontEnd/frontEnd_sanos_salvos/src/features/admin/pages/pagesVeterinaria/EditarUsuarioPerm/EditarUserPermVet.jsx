import EditarUserPermCSS from './EditarUserPermVet.module.css';
import { useAuth0 } from "@auth0/auth0-react";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FaUserEdit } from "react-icons/fa";

function EditarUserPermVet() {
    const { getAccessTokenSilently } = useAuth0();
    const { id } = useParams();
    const navigate = useNavigate();
    
    const [veterinarias, setVeterinarias] = useState([]);
    const [usuario, setUsuario] = useState({
        nombreUser: "",
        apellidoPa: "",
        apellidoMa: "",
        correoUsuario: "",
        rol: "",
        idVeterinaria: "",
        estadoUsuario: ""
    });

    useEffect(() => {
        const cargarDatos = async () => {
            try {
                const token = await getAccessTokenSilently();
                const resVets = await fetch("http://localhost:8086/api/veterinaria", { 
                    headers: { Authorization: `Bearer ${token}` } 
                });
                const listaVets = await resVets.json();
                setVeterinarias(listaVets);

                const resUser = await fetch(`http://localhost:8086/api/usuPermitidos`, { 
                    headers: { Authorization: `Bearer ${token}` } 
                });
                const data = await resUser.json();
                const userToEdit = data.find(u => String(u.id) === String(id));
                
                if (userToEdit) {
                setUsuario({
                    nombreUser: userToEdit.nombreUser || "",
                    apellidoPa: userToEdit.apellidoPa || "",
                    apellidoMa: userToEdit.apellidoMa || "",
                    correoUsuario: userToEdit.correoUsuario || "",
                    rol: userToEdit.rol || "",
                    idVeterinaria: userToEdit.veterinaria.id,

                    estadoUsuario: userToEdit.estadoUser || ""

                });
            }
            } catch (error) {
                console.error("Error al cargar datos:", error);
            }
        };
        cargarDatos();
    }, [id, getAccessTokenSilently]);

    const handleChange = (e) => {
        setUsuario({ ...usuario, [e.target.name]: e.target.value });
    };

    const actualizarUsuario = async (e) => {
        e.preventDefault();
        try {
            const token = await getAccessTokenSilently();
            const payload = {
                ...usuario,
                estadoUsuario: usuario.estadoUsuario,
                veterinaria: { idVeterinaria: Number(usuario.idVeterinaria) }
            };

            await fetch(`http://localhost:8086/api/usuPermitidos/${id}`, {
                method: "PUT",
                headers: { 
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}` 
                },
                body: JSON.stringify(payload)
            });
            
            alert("¡Usuario actualizado con éxito! 🎉");
            navigate("/admin/ListarUsuariosPermVet");
        } catch (error) {
            console.error("Error al guardar:", error);
        }
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
                        <input type="text" name="nombreUser" value={usuario.nombreUser} onChange={handleChange} required />
                    </div>
                    
                    <div className={EditarUserPermCSS["row-group"]}>
                        <div className={EditarUserPermCSS["input-group"]}>
                            <label>Apellido Paterno</label>
                            <input type="text" name="apellidoPa" value={usuario.apellidoPa} onChange={handleChange} required />
                        </div>
                        <div className={EditarUserPermCSS["input-group"]}>
                            <label>Apellido Materno</label>
                            <input type="text" name="apellidoMa" value={usuario.apellidoMa} onChange={handleChange} required />
                        </div>
                    </div>

                    <div className={EditarUserPermCSS["input-group"]}>
                        <label>Correo Electrónico</label>
                        <input type="email" name="correoUsuario" value={usuario.correoUsuario} onChange={handleChange} required />
                    </div>

                    <div className={EditarUserPermCSS["row-group"]}>
                        <div className={EditarUserPermCSS["input-group"]}>
                            <label>Rol del Usuario</label>
                            <div className={EditarUserPermCSS["select-wrapper"]}>
                                <select name="rol" value={usuario.rol} onChange={handleChange} required>
                                    <option value="Jefe Veterinaria">Jefe Veterinaria</option>
                                    <option value="Veterinario">Veterinario</option>
                                    <option value="Recepcionista">Recepcionista</option>
                                </select>
                            </div>
                        </div>
                        <div className={EditarUserPermCSS["input-group"]}>
                            <label>Estado</label>
                            <div className={EditarUserPermCSS["select-wrapper"]}>
                                <select name="estadoUsuario" value={usuario.estadoUsuario} onChange={handleChange} required>
                                    <option value="Activo">Activo</option>
                                    <option value="Inactivo">Inactivo</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    <div className={EditarUserPermCSS["input-group"]}>
                        <label>Veterinaria Asignada</label>
                        <div className={EditarUserPermCSS["select-wrapper"]}>
                            <select name="idVeterinaria" value={usuario.idVeterinaria} onChange={handleChange} required>
                                <option value="" disabled>Selecciona una sucursal...</option>
                                {veterinarias.map((v) => (
                                    <option key={v.id} value={String(v.id)}>
                                        {v.nombreVeterinaria}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>

                    <div className={EditarUserPermCSS["btn-group"]}>
                        <button type="button" className={EditarUserPermCSS["btn-cancelar"]} onClick={() => navigate("/admin/ListarUsuariosPermVet")}>Cancelar</button>
                        <button type="submit" className={EditarUserPermCSS["btn-submit"]}>Guardar Cambios</button>
                    </div>
                </form>
            </div>
        </section>
    );
}

export default EditarUserPermVet;