import mapa from "../assets/captura.png";
function Map() {
  return (
    <div style={styles.container}>
        <img 
        src={mapa} 
        alt="Mapa" 
        style={{with: "100%",height:"100%", objectFit:"cover"}}/>
    </div>
    //mas adelante mapa de api de google maps
  );
}

const styles = {
  container: {
    height: "400px",
    margin: "40px auto",
    width: "80%",
    border: "3px solid black",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "90vh",
    backgroundColor: "#000000"
  }
};

export default Map;