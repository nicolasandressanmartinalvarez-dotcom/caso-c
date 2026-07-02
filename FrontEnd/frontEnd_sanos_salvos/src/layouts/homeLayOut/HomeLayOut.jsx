import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import { Outlet } from "react-router-dom";
function HomeLayOut(){
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

export default HomeLayOut;