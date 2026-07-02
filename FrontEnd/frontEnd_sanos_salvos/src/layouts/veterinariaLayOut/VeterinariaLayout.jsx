import { Outlet } from "react-router-dom";
import HeaderVeterinaria from "../../features/veterinaria/components/headerVeterinaria/HeaderVeterinaria";
import SidebarVeterinaria from "../../features/veterinaria/components/sidebarVeterinaria/SidebarVeterinaria";
import FooterVeterinaria from "../../features/veterinaria/components/footerVeterinaria/FooterVeterinaria";

function VeterinariaLayout() {

    return (
        <div className="app-container">
            <HeaderVeterinaria />

            <div className="content-area">
                <SidebarVeterinaria />
                <main className="content-wrap">
                    <Outlet />
                </main>
            </div>
            <FooterVeterinaria />
        </div>
    );
}

export default VeterinariaLayout;