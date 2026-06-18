import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/home/Home"

import './App.css'
import Header from './components/header/Header'
import Footer from './components/footer/Footer'

import RegistrarMascota from "./pages/registrar_mascotas/RegistrarMascota"
import ProtectedRoute from "./components/ProteccionRuta"

function AppRoutes(){
  return(
    // Aca se cargan todas las rutas de los componentes a usar
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path="/registrar" element={ <ProtectedRoute> <RegistrarMascota/> </ProtectedRoute> } />
      <Routes path="/DashVet" element={}></Routes>
    </Routes>
  )
}
function App() {
  return (
    <BrowserRouter>
      <div className="app-container">
        <Header/>
          <div className="content-area">
            <main className="content-wrap">
              <AppRoutes/>
            </main>
          </div>
        <Footer/>
      </div>
    </BrowserRouter>
  );
}

export default App;
