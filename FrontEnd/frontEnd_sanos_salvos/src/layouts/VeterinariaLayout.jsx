import VetLayout from "./VeterinariaLayout.module.css";
import { useState } from "react";
//import ListMasc from "../pages/listMasc/listMasc";
//import ListMascPerd from "../pages/listMascPerd/listMascPerd";

function VeterinariaLayout() {
    const [vista, setVista] = useState("misMascotas");
    return (
        <section className={VetLayout["layout-veterinaria"]}>
            <aside className={VetLayout["sidebar-veterinaria"]}>
                <h2>Panel Vet</h2>

                <div className={VetLayout["menu-grupo"]}>
                    <h3>Administrar Mascotas</h3>

                    <ul>
                        <li>Mis Mascotas</li>
                        <li>Mascotas Perdidas</li>
                        <li>Mascotas Encontradas</li>
                        <li>Registrar Mascota</li>
                    </ul>
                </div>

                <div className={VetLayout["menu-grupo"]}>
                    <h3>Administración Veterinaria </h3>

                    <ul>
                        <li>Datos Veterinaria</li>
                        <li>Contactos</li>
                    </ul>
                </div>
            </aside>

            <main className={VetLayout["contenido-veterinaria"]}>
                <h1>Mis Mascotas</h1>
                <p>Listado de mascotas de la veterinaria</p>
            </main>
        </section>
    );
}

export default VeterinariaLayout;