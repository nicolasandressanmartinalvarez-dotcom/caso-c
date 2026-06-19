import { Outlet } from "react-router-dom";

import HeaderAdmin from '../../features/admin/components/header/HeaderAdmin'
import FooterAdmin from '../../features/admin/components/footer/FooterAdmin'

function AdminLayOut(){
    return(
        <div className="app-container">
            <HeaderAdmin/>
            <div className="content-area">
                <main className="content-wrap">
                    <Outlet/>
                </main>
            </div>
            <FooterAdmin/>
        </div>
    )
}

export default AdminLayOut;