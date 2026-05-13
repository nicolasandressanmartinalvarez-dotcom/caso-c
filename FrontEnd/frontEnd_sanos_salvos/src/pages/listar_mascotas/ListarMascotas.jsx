import { useState } from "react";
import ListarMas from "./ListarMascotas.module.css"
function ListarMascotas({setNuevaMascota}){

    const [listaMascotas, setListaMascotas] = useState({lat: 33.4489, lng: 70.6693 });


    const setDatos = () => {
        setNuevaMascota(listaMascotas)
    }



    
    return(
        <>
        <section className={ListarMas["contenedor-masc"]}>
            <div className={ListarMas["div-mascotas"]}>
                <div className={ListarMas["informacion-masc"]}>
                    <div><h2>Nombre</h2><p>Franco</p></div>
                    <div><h2>Dueño</h2><p>Mily</p></div>
                    <div><h2>Edad</h2><p>12 años</p></div>
                    <div><h2>Raza</h2><p>Golden</p></div>
                </div>
                <div className={ListarMas["cont-img-masc"]}>
                    <img src="perro.jpg" alt="Mascota" />
                </div>
                <div className={ListarMas["descripcion-masc"]}>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore.</p>
                </div>
                <div className={ListarMas["botones-masc"]}>
                    <button className={ListarMas["btn-localizar"]} onClick={()=>setDatos()}>Localizar</button>
                    <button className={ListarMas["btn-contactar"]}>Contactar</button>
                </div>
            </div>
        </section>
        </>
    )
}
export default ListarMascotas;