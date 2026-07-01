import VetLayout from "./VeterinariaLayout.module.css";
import { Outlet } from "react-router-dom";
import HeaderVeterinaria from "../../features/veterinaria/components/HeaderVeterinaria";
import SidebarVeterinaria from "../../features/veterinaria/components/SidebarVeterinaria";
import FooterVeterinaria from "../../features/veterinaria/components/FooterVeterinaria";

function VeterinariaLayout() {

    return (
        <div className={VetLayout["app-container"]}>
            <HeaderVeterinaria />

            <div className={VetLayout["content-area"]}>
                <SidebarVeterinaria />
                <main className={VetLayout["content-wrap"]}>
                    <Outlet />
                </main>
            </div>
            <FooterVeterinaria />
        </div>
    );
}

export default VeterinariaLayout;