import ListarMas from "./ListarMascotas.module.css"
function ListarMascotas(){
    return(
        <>
        <section className={ListarMas["contenedor-masc"]}>
            <div className={ListarMas["div-mascotas"]}>
                <div className={ListarMas["cont-img-masc"]}>
                    <img src="perro.jpg" alt="perro" className={ListarMas["img-masc"]} />
                </div>
                <div className={ListarMas["informacion-masc"]}>
                    <h2>Nombre:</h2>
                    <p>franco</p>
                    <h2>dueño:</h2>
                    <p>mily</p>
                    <h2>edad:</h2>
                    <p>12</p>
                    <h2>raza:</h2>
                    <p>nico</p>
                    <h2>direccion:</h2>
                    <p>123456789</p>
                </div>
                <div className={ListarMas["descripcion-masc"]}>
                    <h2>descripcion:</h2>
                    <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Tempore vel amet deleniti in ut delectus eos labore deserunt laboriosam earum odit reiciendis perferendis pariatur consequuntur enim ipsam consequatur, ipsa perspiciatis. </p>
                </div>
                <div className={ListarMas["botones-masc"]}>
                    <button>Localizar</button>
                    <button>Contactar al dueño</button>
                </div>
            </div>
            
        </section>
        </>
    )
}
export default ListarMascotas;