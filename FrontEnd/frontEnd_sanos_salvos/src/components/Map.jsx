import { GoogleMap, LoadScript, Marker, InfoWindow } from "@react-google-maps/api";
import { useEffect, useState } from "react";

function Map() {

  const containerStyle = {
    width: "100%",
    height: "100%"
  };

  const center = {
    lat: -33.4489,
    lng: -70.6693
  };

  const [seleccionado, setSeleccionado] = useState(null);
  const [mascotas, setMascotas] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8081/api/mascotas")
      .then((res) => res.json())
      .then((data) => {
        setMascotas(data);
      })
      .catch((err) => console.error(err));
  }, []);

  return (
    <div style={styles.container}>
      <LoadScript googleMapsApiKey="AIzaSyATJpdjBoBdFkXUYvtfpU-t5pdGLDiEKYM">
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={center}
          zoom={12}
        >

          {mascotas.map((m) => (
            <Marker
              key={m.id}
              position={{
                lat: -33.4489,
                lng: -70.6693
              }}
              onClick={() => setSeleccionado(m)}
            />
          ))}

          {seleccionado && (
            <InfoWindow
              position={{
                lat: -33.4489,
                lng: -70.6693
              }}
              onCloseClick={() => setSeleccionado(null)}
            >
              <div>
                <h3>{seleccionado.nombre}</h3>
                <p>{seleccionado.descripcion}</p>
                <p>{seleccionado.tipoDeRaza}</p>
              </div>
            </InfoWindow>
          )}
          

        </GoogleMap>
      </LoadScript>
    </div>
  );
}

const styles = {
  container: {
    height: "400px",
    margin: "40px auto",
    width: "80%",
    border: "3px solid black"
  }
};

export default Map;