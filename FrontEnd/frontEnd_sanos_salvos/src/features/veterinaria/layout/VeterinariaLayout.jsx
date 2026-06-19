import VetLayout from "./VeterinariaLayout.module.css";
//import ListMasc from "../pages/listMasc/listMasc";
//import ListMascPerd from "../pages/listMascPerd/listMascPerd";

function VeterinariaLayout() {
    return (
        <section className={VetLayout["layout-veterinaria"]}>
            <aside className={VetLayout["sidebar-veterinaria"]}>
                <h2>Panel Vet</h2>

                <button>Mis Mascotas</button>
                <button>Mascotas Perdidas</button>
                <button>Mascotas Encontradas</button>
                <button>Registrar Mascota</button>
            </aside>

            <main className={VetLayout["contenido-veterinaria"]}>
                <h1>Mis Mascotas</h1>
                <p>Listado de mascotas de la veterinaria</p>
            </main>
        </section>
    );
}

export default VeterinariaLayout;