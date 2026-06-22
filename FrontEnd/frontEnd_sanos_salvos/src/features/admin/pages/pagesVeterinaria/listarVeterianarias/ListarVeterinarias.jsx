import ListarVeterinariasCSS from './ListarVeterinarias.module.css';
import { FaMapMarkerAlt, FaPhoneAlt, FaEnvelope, FaGlobe, FaEdit, FaTrashAlt } from "react-icons/fa";
import { NavLink } from 'react-router-dom';
function ListarVeterinarias() {
    const veterinariasMock = [
        { id: 1, nombreVeterinaria: "VetCenter Principal", direccion: "Av. Providencia 1234", telefono: "+56 9 1234 5678", correo: "contacto@vetcenter.cl", dominio: "vetcenter.cl" },
        { id: 2, nombreVeterinaria: "Clínica San Roque", direccion: "Calle Los Leones 56", telefono: "+56 9 8765 4321", correo: "admin@sanroque.cl", dominio: "sanroque.cl" },
        { id: 3, nombreVeterinaria: "Paws & Tails", direccion: "Av. Las Condes 400", telefono: "+56 9 1122 3344", correo: "hola@paws.cl", dominio: "paws.cl" }
    ];

    return (
        <section className={ListarVeterinariasCSS["contenedor-lista"]}>
            <div className={ListarVeterinariasCSS["header-lista"]}>
                <div className={ListarVeterinariasCSS["titulo-seccion"]}>
                    <h2>Administrar Veterinarias</h2>
                    <p>Gestiona todas las sucursales y clínicas registradas en la red.</p>
                </div>
                <NavLink to="/admin/AgregarVeterinaria" className={ListarVeterinariasCSS["btn-nuevo"]}>+ Nueva Veterinaria</NavLink>
            </div>

            <div className={ListarVeterinariasCSS["grid-veterinarias"]}>
                {veterinariasMock.map((vet) => (
                    <div className={ListarVeterinariasCSS["card-vet"]} key={vet.id}>
                        <div className={ListarVeterinariasCSS["card-header"]}>
                            <h3>{vet.nombreVeterinaria}</h3>
                            <span className={ListarVeterinariasCSS["badge-activo"]}>Activa</span>
                        </div>
                        
                        <div className={ListarVeterinariasCSS["card-body"]}>
                            <p><FaMapMarkerAlt className={ListarVeterinariasCSS["icono"]} /> {vet.direccion}</p>
                            <p><FaPhoneAlt className={ListarVeterinariasCSS["icono"]} /> {vet.telefono}</p>
                            <p><FaEnvelope className={ListarVeterinariasCSS["icono"]} /> {vet.correo}</p>
                            <p><FaGlobe className={ListarVeterinariasCSS["icono"]} /> {vet.dominio}</p>
                        </div>

                        <div className={ListarVeterinariasCSS["card-footer"]}>
                            <button className={ListarVeterinariasCSS["btn-accion"] + " " + ListarVeterinariasCSS["btn-editar"]}>
                                <FaEdit /> Editar
                            </button>
                            <button className={ListarVeterinariasCSS["btn-accion"] + " " + ListarVeterinariasCSS["btn-eliminar"]}>
                                <FaTrashAlt /> Eliminar
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}

export default ListarVeterinarias;