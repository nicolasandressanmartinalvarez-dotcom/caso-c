import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/home/Home"

import './App.css'
import Header from './components/header/Header'
import Footer from './components/footer/Footer'

//Importaciones de las rutas
import RutaProtegidaAdmin from './components/auth/RutaProtegidaAdmin'


//Importaciones de los layOuts
import LayOutAdmin from './layouts/adminLayOut/AdminLayOut'

import RegistrarMascota from "./pages/registrar_mascotas/RegistrarMascota"

//Importaciones paginas Admin
import DashBoardAdmin from './features/admin/pages/DashBoardAdmin'
import Veterinaria from './features/veterinaria/pages/Veterinaria'

import Municipalidad from './features/municipalidad/pages/Municipalidad';
import Organizacion from './features/Organizacion/pages/Organizacion';


function App() {
  return (

    <BrowserRouter>
      <Routes>
        <Route path="admin" element={<RutaProtegidaAdmin> <LayOutAdmin /> </RutaProtegidaAdmin>}>
          <Route index element={<Navigate to={"DashBoardAdmin"} replace />} />
          <Route path="DashBoardAdmin" element={<DashBoardAdmin />} />
          <Route path="agr" element={<Veterinaria />} />
          <Route path="municipalidad" element={<Municipalidad />} />
          <Route path="organizacion" element={<Organizacion />} />
        </Route>
        <Route path="/" element={<Header />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
