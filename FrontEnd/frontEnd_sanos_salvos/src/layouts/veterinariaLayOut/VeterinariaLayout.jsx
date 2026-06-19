import VetLayout from "./VeterinariaLayout.module.css";
import { useState } from "react";
//import ListMasc from "../pages/listMasc/listMasc";
//import ListMascPerd from "../pages/listMascPerd/listMascPerd";

function VeterinariaLayout() {
    const [vista, setVista] = useState("misMascotas");

    return (
        <div className="app-container">
            <HeaderAdmin/> //Aca header
            <div className="content-area">
                <SideBar/> //Acam panel lateral
                <main className="content-wrap">
                    <Outlet/>
                </main>
            </div>
            <FooterAdmin/> //Aca footer
        </div>
    );
}

export default VeterinariaLayout;