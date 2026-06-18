import { Outlet } from "react-router-dom";


function AdminLayOut(){
    return(
        <div className="app-container">
            <Header/>
            <div className="content-area">
                <main className="content-wrap">
                    <Outlet/>
                </main>
            </div>
            <Footer/>
        </div>
    )
}

export default AdminLayOut;