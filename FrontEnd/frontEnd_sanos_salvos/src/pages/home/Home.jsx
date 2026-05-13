import HomeCSS from './Home.module.css'; 
import ListarMascotas from '../listar_mascotas/ListarMascotas'
import MapaHome from '../../pages/map-home/map-home'
import { use, useEffect, useState } from 'react';

function Home() {

  const [coordenadas, setCoordenadas] = useState({
    lat: -33.4489, lng: -70.6693 
  });

  const mascotaSeleccionada = (mascota) =>{
    setCoordenadas(mascota)
  }

  useEffect(()=>{
    console.log(coordenadas)
  },[coordenadas]);
  return (
    <>
      <section className={HomeCSS["section-home"]}>
        <MapaHome coordenadas={coordenadas}/>
        <ListarMascotas setNuevaMascota={mascotaSeleccionada} />
      </section>
    </>
  );
}

export default Home;