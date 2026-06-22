import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/home/Home"

import './App.css'
import Header from './components/header/Header'
import Footer from './components/footer/Footer'

//Importaciones de las rutas
import RutaProtegidaAdmin from './components/auth/RutaProtegidaAdmin'


//Importaciones de los layOuts
import LayOutAdmin from './layouts/adminLayOut/AdminLayOut'
import LayOutVeterinaria from './layouts/veterinariaLayOut/VeterinariaLayout'

import RegistrarMascota from "./pages/registrar_mascotas/RegistrarMascota"

//Importaciones paginas Admin
import DashBoardAdmin from './features/admin/pages/dashBoardAdmin/DashBoardAdmin'

import AgregarVeterinaria from './features/admin/pages/pagesVeterinaria/agregarVeterinaria/Veterinaria'
import ListarVeterianarias from './features/admin/pages/pagesVeterinaria/listarVeterianarias/ListarVeterinarias'

import ListarUserPermVet from './features/admin/pages/pagesVeterinaria/listarUsuPermVet/ListarUsuPermVet'
import AgregarUserVet from './features/admin/pages/pagesVeterinaria/AgregarUserVet/AgregarUserVet'
import EditUserPermVet from './features/admin/pages/pagesVeterinaria/EditarUsuarioPerm/EditarUserPermVet'

//Impotaciones veterinaria LayoUts
import ListMascPerd from './features/veterinaria/pages/listMascPerd/ListMascPerd';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="admin" element={<RutaProtegidaAdmin> <LayOutAdmin/> </RutaProtegidaAdmin>}>
          <Route index element={<Navigate to={"DashBoardAdmin"} replace />}/>
          <Route path="DashBoardAdmin" element={<DashBoardAdmin/>}/>

          //Apartado de Admin veterinaria 
          <Route path="AgregarVeterinaria" element={<AgregarVeterinaria/>}/>
          <Route path="ListarVeterinaria" element={<ListarVeterianarias/>} />
          <Route path="AgregarUserVet" element={<AgregarUserVet/>}/>
          <Route path="ListarUsuariosPermVet" element={<ListarUserPermVet/>}/>
          <Route path="EditarUserPermVet" element={<EditUserPermVet/>}></Route>
        </Route>
        <Route path="veterinaria" element={<RutaProtegidaAdmin><LayOutVeterinaria/></RutaProtegidaAdmin>}>
          <Route path="perdidas" element={<ListMascPerd />} />
        </Route>

        <Route path="/registrar" element={<RegistrarMascota />} />
        <Route path="/" element={<Header/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
