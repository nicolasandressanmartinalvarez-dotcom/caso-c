import { Outlet } from "react-router-dom";
import HeaderMuni from "../../features/municipalidad/components/header/HeaderMuni";
import SideBarMuni from "../../features/municipalidad/components/nav-bar/SideBarMuni";
import FooterMuni from "../../features/municipalidad/components/footer/FooterMuni";

function MunicipalidadLayOut() {
    return (
        <div className="app-container">
            <HeaderMuni />
            <div className="content-area">
                <SideBarMuni />
                <main className="content-wrap">
                    <Outlet />
                </main>
            </div>
            <FooterMuni />
        </div>
    );
}

export default MunicipalidadLayOut;
