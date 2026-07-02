import { useState } from "react";
import { NavLink } from "react-router-dom";
import { FaDog } from "react-icons/fa6";
import { GiPlantsAndAnimals } from "react-icons/gi";
import { HiBellAlert } from "react-icons/hi2";
import "./SidebarVeterinaria.css";

function SidebarVeterinaria() {
    const [abrirMenu, setAbrirMenu] = useState("MenuMascotas");

    const abrirMenuSeleccionado = (menu) => {
        setAbrirMenu(abrirMenu === menu ? null : menu);
    };

    return (
        <aside className="sidebar-veterinaria">
            <div className="sidebar-title">
                <h3>Panel Veterinaria</h3>
                <p>Sanos y Salvos</p>
            </div>

            <button 
                className="btn-sidebar"
                onClick={() => abrirMenuSeleccionado("MenuInicio")}
            >
                <span>Inicio</span>
                <span className="sidebar-arrow">
                    {abrirMenu === "MenuInicio" ? "▲" : "▼"}
                </span>
            </button>

            <ul className={`sidebar-ul ${abrirMenu === "MenuInicio" ? "show" : ""}`}>
                <li>
                    <NavLink to="/veterinaria" end>
                        Panel principal
                    </NavLink>
                </li>
            </ul>

            <button 
                className="btn-sidebar"
                onClick={() => abrirMenuSeleccionado("MenuMascotas")}
            >
                <span>
                    Mascotas <FaDog />
                </span>
                <span className="sidebar-arrow">
                    {abrirMenu === "MenuMascotas" ? "▲" : "▼"}
                </span>
            </button>

            <ul className={`sidebar-ul ${abrirMenu === "MenuMascotas" ? "show" : ""}`}>
                <li>
                    <NavLink to="/veterinaria/perdidas">
                        Mascotas perdidas
                    </NavLink>
                </li>

                <li>
                    <NavLink to="/veterinaria/ingresar-mascota">
                        Ingresar mascota
                    </NavLink>
                </li>

                <li>
                    <NavLink to="/veterinaria/listar-mascotas">
                        Listar mascotas
                    </NavLink>
                </li>
            </ul>

            <button 
                className="btn-sidebar"
                onClick={() => abrirMenuSeleccionado("MenuVeterinaria")}
            >
                <span>
                    Veterinaria <GiPlantsAndAnimals />
                </span>
                <span className="sidebar-arrow">
                    {abrirMenu === "MenuVeterinaria" ? "▲" : "▼"}
                </span>
            </button>

            <ul className={`sidebar-ul ${abrirMenu === "MenuVeterinaria" ? "show" : ""}`}>
                <li>
                    <NavLink to="/veterinaria/perfil">
                        Mi veterinaria
                    </NavLink>
                </li>

                <li>
                    <NavLink to="/veterinaria/reportes">
                        Reportes recibidos
                    </NavLink>
                </li>
            </ul>


        </aside>
    );
}

export default SidebarVeterinaria;