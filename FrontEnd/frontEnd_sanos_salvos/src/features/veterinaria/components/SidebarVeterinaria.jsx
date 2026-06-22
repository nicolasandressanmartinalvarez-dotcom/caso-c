import { NavLink } from "react-router-dom";

function SidebarVeterinaria() {
    return (
        <aside>
            <ul>
                <li>
                    <NavLink to="/veterinaria">
                        Inicio
                    </NavLink>
                </li>

                <li>
                    <NavLink to="/veterinaria/perdidas">
                        Mascotas Perdidas
                    </NavLink>
                </li>

                <li>
                    <NavLink to="/veterinaria">
                        Veterinarias
                    </NavLink>
                </li>
            </ul>
        </aside>
    );
}

export default SidebarVeterinaria;