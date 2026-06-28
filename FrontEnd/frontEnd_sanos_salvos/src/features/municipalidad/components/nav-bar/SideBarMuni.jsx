import { FaTreeCity } from "react-icons/fa6";
import { HiBellAlert } from "react-icons/hi2";
import { NavLink } from 'react-router-dom';
import SideBarMuni_CSS from './SideBarMuni.module.css'
import { useState } from "react";

function SideBarMuni() {
    const [AbrirMenu, setAbrirMenu] = useState();

    const AbrirMenuSeleccionado = (Menu) => {
        setAbrirMenu(AbrirMenu === Menu ? null : Menu)
    }

    return (
        <nav className={SideBarMuni_CSS["nav-bar"]}>
            <button className={SideBarMuni_CSS["btn-nav-bar"]} onClick={() => AbrirMenuSeleccionado('Campañas')}>Gestión de Campañas<FaTreeCity /></button>
            <ul className={`${SideBarMuni_CSS["nav-bar-ul"]} ${AbrirMenu === 'Campañas' ? SideBarMuni_CSS.show : ''} `}>
                <li><NavLink to="crear-campaña">Crear Campaña</NavLink></li>
                <li><NavLink to="listar-campañas">Listar Campañas</NavLink></li>
            </ul>

            <button className={SideBarMuni_CSS["btn-nav-bar"]} onClick={() => AbrirMenuSeleccionado('Alertas')}>Alertas y Ordenanzas<HiBellAlert /></button>
            <ul className={`${SideBarMuni_CSS["nav-bar-ul"]} ${AbrirMenu === 'Alertas' ? SideBarMuni_CSS.show : ''}`}>
                <li><NavLink to="alertas-comunitarias">Alertas Comunitarias</NavLink></li>
            </ul>
        </nav>
    )
}
export default SideBarMuni;
