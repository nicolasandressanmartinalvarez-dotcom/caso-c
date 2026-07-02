import { FaDog } from "react-icons/fa6";
import { HiBellAlert } from "react-icons/hi2";
import { NavLink } from 'react-router-dom';
import SideBarOrg_CSS from './SideBarOrg.module.css'
import { useState } from "react";

function SideBarOrg() {
    const [AbrirMenu, setAbrirMenu] = useState();

    const AbrirMenuSeleccionado = (Menu) => {
        setAbrirMenu(AbrirMenu === Menu ? null : Menu)
    }

    return (
        <nav className={SideBarOrg_CSS["nav-bar"]}>
            <button className={SideBarOrg_CSS["btn-nav-bar"]} onClick={() => AbrirMenuSeleccionado('Mascotas')}>Gestionar Rescates/Mascotas<FaDog /></button>
            <ul className={`${SideBarOrg_CSS["nav-bar-ul"]} ${AbrirMenu === 'Mascotas' ? SideBarOrg_CSS.show : ''} `}>
                <li><NavLink to="agregar-mascota">Registrar Mascota</NavLink></li>
                <li><NavLink to="listar-mascotas">Listar Mascotas</NavLink></li>
            </ul>

            <button className={SideBarOrg_CSS["btn-nav-bar"]} onClick={() => AbrirMenuSeleccionado('Alertas')}>Alertas de Comunidad<HiBellAlert /></button>
            <ul className={`${SideBarOrg_CSS["nav-bar-ul"]} ${AbrirMenu === 'Alertas' ? SideBarOrg_CSS.show : ''}`}>
                <li><NavLink to="alertas">Ver Alertas</NavLink></li>
            </ul>
        </nav>
    )
}
export default SideBarOrg;
