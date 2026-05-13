import HomeCSS from './Home.module.css'; 
import ListarMascotas from '../listar_mascotas/ListarMascotas'
import MapaFormulario from '../../components/mapa_formulario/Map'



function Home() {
  return (
    <>
      <section className={HomeCSS["section-home"]}>
        <MapaFormulario/>
        <ListarMascotas/>
      </section>
    </>
  );
}

export default Home;