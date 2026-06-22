import { NavLink } from "react-router-dom";
import "./SidebarVeterinaria.css";

function SidebarVeterinaria() {
    return (
        <aside className="sidebar-veterinaria">
            <nav>
                <NavLink to="/veterinaria" className="sidebar-link">
                    Inicio
                </NavLink>

                <NavLink to="/veterinaria/perdidas" className="sidebar-link">
                    Mascotas Perdidas
                </NavLink>

                <NavLink to="/veterinaria" className="sidebar-link">
                    Veterinarias
                </NavLink>
            </nav>
        </aside>
    );
}

export default SidebarVeterinaria;