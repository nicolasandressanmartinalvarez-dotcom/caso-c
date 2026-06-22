import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/home/Home"

import './App.css'
import Header from './components/header/Header'
import Footer from './components/footer/Footer'

//Importaciones de las rutas
import RutaProtegidaAdmin from './components/auth/RutaProtegidaAdmin'


//Importaciones de los layOuts
import LayOutAdmin from './layouts/adminLayOut/AdminLayOut'
import VeterinariaLayout from "./layouts/veterinariaLayOut/VeterinariaLayout";
import RegistrarMascota from "./pages/registrar_mascotas/RegistrarMascota"

//Importaciones paginas Admin
import DashBoardAdmin from './features/admin/pages/DashBoardAdmin'
import Veterinaria from './features/veterinaria/pages/Veterinaria'
import ListMascPerd from './features/veterinaria/pages/listMascPerd/ListMascPerd';


function App() {
  return (

    <BrowserRouter>
      <Routes>
        <Route path="admin" element={<RutaProtegidaAdmin> <LayOutAdmin /> </RutaProtegidaAdmin>}>
          <Route index element={<Navigate to={"DashBoardAdmin"} replace />} />
          <Route path="DashBoardAdmin" element={<DashBoardAdmin />} />
          <Route path="agr" element={<Veterinaria />} />
        </Route>

        <Route path="veterinaria" element={<VeterinariaLayout />}>
          <Route index element={<Veterinaria />} />
          <Route path="perdidas" element={<ListMascPerd />} />
        </Route>

        <Route path="/registrar" element={<RegistrarMascota />} />
        <Route path="/" element={<Header />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
