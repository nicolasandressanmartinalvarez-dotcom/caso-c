import { Outlet } from "react-router-dom";

import HeaderAdmin from '../../features/admin/components/header/HeaderAdmin'
import FooterAdmin from '../../features/admin/components/footer/FooterAdmin'
import SideBar from '../../features/admin/components/nav-bar/Nav-bar'
import { useState } from "react";

function AdminLayOut(){
    return(
        <div className="app-container">
            <HeaderAdmin/>
            <div className="content-area">
                <SideBar/>
                <main className="content-wrap">
                    <Outlet/>
                </main>
            </div>
            <FooterAdmin/>
        </div>
    )
}

export default AdminLayOut;