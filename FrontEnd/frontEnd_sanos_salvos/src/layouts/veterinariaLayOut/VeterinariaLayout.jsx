import { useState } from "react";
import { Outlet } from "react-router-dom";
//import ListMasc from "../pages/listMasc/listMasc";
//import ListMascPerd from "../pages/listMascPerd/listMascPerd";

function VeterinariaLayout() {
    const [vista, setVista] = useState("misMascotas");

    return (
        <div className="app-container">
            <div className="content-area">
                <main className="content-wrap">
                    <Outlet/>
                </main>
            </div>
        </div>
    );
}

export default VeterinariaLayout;