import { Outlet } from "react-router-dom";
import HeaderOrg from "../../features/organizacion/components/header/HeaderOrg";
import SideBarOrg from "../../features/organizacion/components/nav-bar/SideBarOrg";
import FooterOrg from "../../features/organizacion/components/footer/FooterOrg";

function OrganizacionLayOut() {
    return (
        <div className="app-container">
            <HeaderOrg />
            <div className="content-area">
                <SideBarOrg />
                <main className="content-wrap">
                    <Outlet />
                </main>
            </div>
            <FooterOrg />
        </div>
    );
}

export default OrganizacionLayOut;
