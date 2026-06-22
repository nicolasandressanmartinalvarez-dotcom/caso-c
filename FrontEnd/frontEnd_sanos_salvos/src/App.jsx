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
import DashBoardAdmin from './features/admin/pages/dashBoardAdmin/DashBoardAdmin'
import AgregarVeterinaria from './features/admin/pages/agregarVeterinaria/Veterinaria'
import AgregarUserVet from './features/admin/pages/adminUserVet/AdminUserVet'


function App() {
  return (
    
    <BrowserRouter>
      <Routes>
        <Route path="admin" element={<RutaProtegidaAdmin> <LayOutAdmin/> </RutaProtegidaAdmin>}>
          <Route index element={<Navigate to={"DashBoardAdmin"} replace />}/>
          <Route path="DashBoardAdmin" element={<DashBoardAdmin/>}/>
          <Route path="AgregarVeterinaria" element={<AgregarVeterinaria/>}/>
          <Route path="AgregarUserVet" element={<AgregarUserVet/>}/>
        </Route>
        <Route path="/" element={<Header/>}/>

      </Routes>
    </BrowserRouter>
  );
}

export default App;
