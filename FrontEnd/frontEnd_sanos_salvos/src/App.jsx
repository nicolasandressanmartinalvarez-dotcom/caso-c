import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/home/Home"

import './App.css'


//Importaciones de las rutas
import RutaProtegidaAdmin from './components/auth/RutaProtegidaAdmin'
import RutaProtegidaMuni from './components/auth/RutaProtegidaMuni'
import RutaProtegidaOrg from './components/auth/RutaProtegidaOrg'
import RutaProtegidaVeterinaria from "./components/auth/RutaProtegidaVeterinaria";

//Importaciones de los layOuts
import HomeLayOut from "./layouts/HomeLayOut/HomeLayOut";
import LayOutAdmin from './layouts/adminLayOut/AdminLayOut'
import OrganizacionLayOut from './layouts/OrganizacionLayOut/OrganizacionLayOut'
import MunicipalidadLayOut from './layouts/MunicipalidadLayOut/MunicipalidadLayOut'
import LayOutVeterinaria from "./layouts/veterinariaLayOut/VeterinariaLayout";

import RegistrarMascota from "./pages/registrar_mascotas/RegistrarMascota"
import ListarMascotas from "./pages/listar_mascotas/ListarMascotas"


import AlertasComunidad from "./features/organizacion/pages/alertas/AlertasComunidad"

//DashBoard Admin
import DashBoardAdmin from './features/admin/pages/dashBoardAdmin/DashBoardAdmin'
//DashBoard admin

//Paginas de veterianria para admin
import AgregarVeterinaria from './features/admin/pages/pagesVeterinaria/agregarVeterinaria/Veterinaria'
import ListarVeterianarias from './features/admin/pages/pagesVeterinaria/listarVeterianarias/ListarVeterinarias'

import ListarUserPermVet from './features/admin/pages/pagesVeterinaria/listarUsuPermVet/ListarUsuPermVet'
import AgregarUserVet from './features/admin/pages/pagesVeterinaria/egregarUserVet/AgregarUserVet'
import EditUserPermVet from './features/admin/pages/pagesVeterinaria/editarUsuarioPerm/EditarUserPermVet'

// Paginas de Organizaciones y Municipalidades para admin
import ListarUserPermOrg from './features/admin/pages/pagesOrganizacion/listarUsuPermOrg/ListarUsuPermOrg'
import AgregarUserOrg from './features/admin/pages/pagesOrganizacion/agregarUserOrg/AgregarUserOrg'
import EditUserPermOrg from './features/admin/pages/pagesOrganizacion/EditarUsuarioPermOrg/EditarUserPermOrg'

import ListarUserPermMuni from './features/admin/pages/pagesMunicipalidad/listarUsuPermMuni/ListarUsuPermMuni'
import AgregarUserMuni from './features/admin/pages/pagesMunicipalidad/agregarUserMuni/AgregarUserMuni'
import EditUserPermMuni from './features/admin/pages/pagesMunicipalidad/EditarUsuarioPermMuni/EditarUserPermMuni'


import ListarMascotasVeterinaria from './features/admin/pages/pagesVeterinaria/listarMacotasVeterinaria/ListarMascotasVeterinaria'
//Fin importaciones del apartado de veterinaria


//Impotaciones veterinaria LayoUts
import ListMascPerd from './features/veterinaria/pages/listMascPerd/ListMascPerd';
import ListarMascotasVet from './features/veterinaria/pages/listMasc/listMasc';
import AgregarMascVet from './features/veterinaria/pages/ingreMascVet/IngreMascoVete'

// importaciones de Paneles de Municipalidades
import ListarMunicipalidades from './features/municipalidad/pages/listarMunicipalidades/ListarMunicipalidades';
import AgregarMunicipalidad from './features/municipalidad/pages/agregarMunicipalidad/AgregarMunicipalidad';

// importaciones de Paneles de Organizaciones
import ListarOrganizaciones from './features/admin/pages/pagesOrganizacion/listarOrganizacion/ListarOrganizaciones';
import AgregarOrganizacion from './features/organizacion/pages/agregarOrganizacion/AgregarOrganizacion';
import CrearCampana from './features/municipalidad/pages/campanas/CrearCampana';
import ListarCampanas from './features/municipalidad/pages/campanas/ListarCampanas';

// Importaciones de Paneles de Mascotas para Organización y Municipalidad
import AgregarMascotaMuni from './features/municipalidad/pages/agregarMascota/AgregarMascotaMuni';
import AgregarMascotaOrg from './features/Organizacion/pages/agregarMascota/AgregarMascotaOrg';
import ListarMascotasMuniAdmin from './features/admin/pages/pagesMunicipalidad/listarMascotasMuni/ListarMascotasMuniAdmin';
import ListarMascotasOrgAdmin from './features/admin/pages/pagesOrganizacion/listarMascotasOrg/ListarMascotasOrgAdmin';

//Paginas de usuarios usuarios
import AgregarMascUsusario from './pages/registrar_mascotas/RegistrarMascota'


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="admin" element={<RutaProtegidaAdmin> <LayOutAdmin /> </RutaProtegidaAdmin>}>
          <Route index element={<Navigate to={"DashBoardAdmin"} replace />} />
          <Route path="DashBoardAdmin" element={<DashBoardAdmin />} />

          //Apartado de Admin municipalidades y organizaciones
          <Route path="ListarMunicipalidades" element={<ListarMunicipalidades />} />
          <Route path="AgregarMunicipalidad" element={<AgregarMunicipalidad />} />
          <Route path="AgregarUserMuni" element={<AgregarUserMuni />} />
          <Route path="ListarUsuariosPermMuni" element={<ListarUserPermMuni />} />
          <Route path="EditarUserPermMuni/:id" element={<EditUserPermMuni />} />

          <Route path="ListarOrganizaciones" element={<ListarOrganizaciones />} />
          <Route path="AgregarOrganizacion" element={<AgregarOrganizacion />} />
          <Route path="AgregarUserOrg" element={<AgregarUserOrg />} />
          <Route path="ListarUsuariosPermOrg" element={<ListarUserPermOrg />} />
          <Route path="EditarUserPermOrg/:id" element={<EditUserPermOrg />} />

          //Apartado de Admin veterinaria
          <Route path="AgregarVeterinaria" element={<AgregarVeterinaria />} />
          <Route path="ListarVeterinaria" element={<ListarVeterianarias />} />
          <Route path="AgregarUserVet" element={<AgregarUserVet />} />
          <Route path="ListarUsuariosPermVet" element={<ListarUserPermVet />} />
          <Route path="EditarUserPermVet/:id" element={<EditUserPermVet />} />
          <Route path="ListarMascotaVeterinaria" element={<ListarMascotasVeterinaria />}></Route>
          <Route path="ListarMascotasMuniAdmin" element={<ListarMascotasMuniAdmin />}></Route>
          <Route path="ListarMascotasOrgAdmin" element={<ListarMascotasOrgAdmin />}></Route>
        </Route>

        <Route path="organizacion" element={<RutaProtegidaOrg><OrganizacionLayOut /></RutaProtegidaOrg>}>
          <Route index element={<h1>Dashboard Organización</h1>} />
          <Route path="agregar-mascota" element={<AgregarMascotaOrg />} />
          <Route path="listar-mascotas" element={<ListarMascotas />} />
          <Route path="alertas" element={<AlertasComunidad />} />
        </Route>

        <Route path="municipalidad" element={<RutaProtegidaMuni><MunicipalidadLayOut /></RutaProtegidaMuni>}>
          <Route index element={<Navigate to="listar-campañas" replace />} />
          <Route path="crear-campaña" element={<CrearCampana />} />
          <Route path="listar-campañas" element={<ListarCampanas />} />
          <Route path="agregar-mascota" element={<AgregarMascotaMuni />} />
          <Route path="listar-mascotas" element={<ListarMascotas />} />
        </Route>


        <Route path="veterinaria" element={<RutaProtegidaVeterinaria><LayOutVeterinaria /></RutaProtegidaVeterinaria>}>
          <Route path="perdidas" element={<ListMascPerd />} />
          <Route path="listar-mascotas" element={<ListarMascotasVet />}></Route>
          <Route path="ingresar-mascota" element={<AgregarMascVet />}></Route>
        </Route>


        <Route path="" element={<HomeLayOut />}>
          <Route index element={<Navigate to={"home"} replace />} />
          <Route path="home" element={<Home />} />
          <Route path="registrar" element={<AgregarMascUsusario />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
