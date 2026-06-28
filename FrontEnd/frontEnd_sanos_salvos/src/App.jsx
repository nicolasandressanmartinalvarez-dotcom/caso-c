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
import OrganizacionLayOut from './layouts/OrganizacionLayout/OrganizacionLayOut'
import MunicipalidadLayOut from './layouts/MunicipalidadLayOut/MunicipalidadLayOut'

import RegistrarMascota from "./pages/registrar_mascotas/RegistrarMascota"
import ListarMascotas from "./pages/listar_mascotas/ListarMascotas"
import AlertasComunidad from "./features/organizacion/pages/alertas/AlertasComunidad"

//Importaciones paginas Admin
import DashBoardAdmin from './features/admin/pages/dashBoardAdmin/DashBoardAdmin'

import AgregarVeterinaria from './features/admin/pages/pagesVeterinaria/agregarVeterinaria/Veterinaria'
import ListarVeterianarias from './features/admin/pages/pagesVeterinaria/listarVeterianarias/ListarVeterinarias'

import ListarUserPermVet from './features/admin/pages/pagesVeterinaria/listarUsuPermVet/ListarUsuPermVet'
import AgregarUserVet from './features/admin/pages/pagesVeterinaria/AgregarUserVet/AgregarUserVet'
import EditUserPermVet from './features/admin/pages/pagesVeterinaria/EditarUsuarioPerm/EditarUserPermVet'

//Impotaciones veterinaria LayoUts
import ListMascPerd from './features/veterinaria/pages/listMascPerd/ListMascPerd';

// Reemplaza las líneas comentadas por estos imports:
import ListarMunicipalidades from './features/municipalidad/pages/listarMunicipalidades/ListarMunicipalidades';
import AgregarMunicipalidad from './features/municipalidad/pages/agregarMunicipalidad/AgregarMunicipalidad';
import ListarOrganizaciones from './features/Organizacion/pages/listarOrganizacion/ListarOrganizaciones';
import AgregarOrganizacion from './features/Organizacion/pages/agregarOrganizacion/AgregarOrganizacion';
import CrearCampana from './features/municipalidad/pages/campanas/CrearCampana';
import ListarCampanas from './features/municipalidad/pages/campanas/ListarCampanas';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="admin" element={<RutaProtegidaAdmin> <LayOutAdmin /> </RutaProtegidaAdmin>}>
          <Route index element={<Navigate to={"DashBoardAdmin"} replace />} />
          <Route path="DashBoardAdmin" element={<DashBoardAdmin />} />

          //Apartado de Admin veterinaria
          <Route path="AgregarVeterinaria" element={<AgregarVeterinaria />} />
          <Route path="ListarVeterinaria" element={<ListarVeterianarias />} />
          <Route path="AgregarUserVet" element={<AgregarUserVet />} />
          <Route path="ListarUsuariosPermVet" element={<ListarUserPermVet />} />
          <Route path="EditarUserPermVet" element={<EditUserPermVet />}></Route>
          //Apartado de Admin municipalidades y organizaciones
          <Route path="ListarMunicipalidades" element={<ListarMunicipalidades />} />
          <Route path="AgregarMunicipalidad" element={<AgregarMunicipalidad />} />
          <Route path="ListarOrganizaciones" element={<ListarOrganizaciones />} />
          <Route path="AgregarOrganizacion" element={<AgregarOrganizacion />} />
        </Route>

        <Route path="/organizacion" element={<OrganizacionLayOut />}>
          <Route index element={<h1>Dashboard Organización</h1>} />
          <Route path="agregar-mascota" element={<RegistrarMascota />} />
          <Route path="listar-mascotas" element={<ListarMascotas />} />
          <Route path="alertas" element={<AlertasComunidad />} />
        </Route>
        <Route path="/municipalidad" element={<MunicipalidadLayOut />}>
          <Route index element={<Navigate to="listar-campañas" replace />} />
          <Route path="crear-campaña" element={<CrearCampana />} />
          <Route path="listar-campañas" element={<ListarCampanas />} />
        </Route>


        <Route path="veterinaria" element={<RutaProtegidaAdmin><LayOutVeterinaria /></RutaProtegidaAdmin>}>
          <Route path="perdidas" element={<ListMascPerd />} />
        </Route>
        <Route path="/registrar" element={<RegistrarMascota />} />
        <Route path="/" element={<Header />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
