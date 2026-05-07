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
    fetch("http://localhost:8080/mascotas")
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
          {mascotas.map((m, i) => (
            <Marker
              key={i}
              position={{ lat: m.lat, lng: m.lng }}
              onClick={() => setSeleccionado(m)}
            />
          ))}
          {seleccionado && (
            <InfoWindow
              position={seleccionado.coords}
              onCloseClick={() => setSeleccionado(null)}
            >
              <div>
                <strong>{seleccionado.nombre}</strong>
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
    height: "500px",
    margin: "40px auto",
    width: "100%",
    border: "3px solid black"
  }
};

export default Map;