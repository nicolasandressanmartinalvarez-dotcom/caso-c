//Iconos
import { FaDog } from "react-icons/fa6";
import { GrOrganization } from "react-icons/gr";
import { GiPlantsAndAnimals } from "react-icons/gi";
import { FaTreeCity } from "react-icons/fa6";
import { HiBellAlert } from "react-icons/hi2";


import { NavLink } from 'react-router-dom';
import Nav_Bar_CSS from './Nav-bar.module.css'
import { useState } from "react";

function Navbar() {
    const [AbrirMenu, setAbrirMenu] = useState();

    const AbrirMenuSeleccionado = (Menu) => {
        setAbrirMenu(AbrirMenu === Menu ? null : Menu)
    }

    return (
        <nav className={Nav_Bar_CSS["nav-bar"]}>
                <button className={Nav_Bar_CSS["btn-nav-bar"]} onClick={()=>AbrirMenuSeleccionado('MenuMascota')}>Administrar Mascotas<FaDog /></button>
                <ul className={`${Nav_Bar_CSS["nav-bar-ul"]} ${AbrirMenu==='MenuMascota' ? Nav_Bar_CSS.show : ''} `}>
                    <li> <NavLink>Listar Mascotas</NavLink></li>
                </ul>
                <button className={Nav_Bar_CSS["btn-nav-bar"]} onClick={()=>AbrirMenuSeleccionado('Organizacion')}> Administracion de Organizaciones<GrOrganization /> </button>
                <ul className={`${Nav_Bar_CSS["nav-bar-ul"]} ${AbrirMenu==='Organizacion' ? Nav_Bar_CSS.show : ''}`}>
                    <li> <NavLink>Agregar Organizacion</NavLink></li>
                    <li> <NavLink>Agregar Usuarios</NavLink></li>
                </ul>
                <button className={Nav_Bar_CSS["btn-nav-bar"]} onClick={()=>AbrirMenuSeleccionado('Veterinaria')}> Administracion de Veterinaria<GiPlantsAndAnimals /> </button>
                <ul className={`${Nav_Bar_CSS["nav-bar-ul"]} ${AbrirMenu==='Veterinaria' ? Nav_Bar_CSS.show : ''}`}>
                    <li> <NavLink to="AgregarVeterinaria">Agregar Veterinaria</NavLink></li>
                    <li> <NavLink to="ListarVeterinaria">Listar Veterinaria</NavLink></li>
                    <li> <NavLink to="AgregarUserVet">Agregar usuarios</NavLink></li>
                    
                </ul>
                <button className={Nav_Bar_CSS["btn-nav-bar"]} onClick={()=>AbrirMenuSeleccionado('Municipalidad')}> Administracion de Municipalidades<FaTreeCity /> </button>
                <ul className={`${Nav_Bar_CSS["nav-bar-ul"]} ${AbrirMenu==='Municipalidad' ? Nav_Bar_CSS.show : ''}`}>
                    <li> <NavLink>Agregar Municipalidad</NavLink></li>
                    <li> <NavLink>Agregar usuarios</NavLink></li>
                </ul>
                <button className={Nav_Bar_CSS["btn-nav-bar"]} onClick={()=>AbrirMenuSeleccionado('Alertas')}> Administracion de alertas o avisos<HiBellAlert /></button>
                <ul className={`${Nav_Bar_CSS["nav-bar-ul"]} ${AbrirMenu==='Alertas' ? Nav_Bar_CSS.show : ''}`}>
                    <li> <NavLink>Listar alertas</NavLink></li>
                </ul>
        </nav>
    )
}
export default Navbar;