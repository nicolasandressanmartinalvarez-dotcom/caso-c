import { GoogleMap, LoadScript, Marker, InfoWindow } from "@react-google-maps/api";
import { useEffect, useState } from "react";

function Map() {
  const containerStyle = {
    width: "100%",
    height: "100%"
  };

  const [seleccionado, setSeleccionado] = useState(null);
  const [mascotas, setMascotas] = useState([]);
  const [mapRef, setMapRef] = useState(null);

  useEffect(() => {
    fetch("http://localhost:8081/api/mascotas")
      .then((res) => res.json())
      .then((data) => {
        console.log(data); // 👀 revisa que lleguen varias mascotas
        setMascotas(data);
      })
      .catch((err) => console.error(err));
  }, []); 

  useEffect(() => {
    if (mapRef && mascotas.length > 0) {
      const bounds = new window.google.maps.LatLngBounds();
      mascotas.forEach(m => bounds.extend({ lat: m.latitud, lng: m.longitud }));
      mapRef.fitBounds(bounds);
    }
  }, [mapRef, mascotas]);

  return (
    <div style={styles.container}>
      <LoadScript googleMapsApiKey="AIzaSyATJpdjBoBdFkXUYvtfpU-t5pdGLDiEKYM">
        <GoogleMap
          mapContainerStyle={containerStyle}
          zoom={12}
          onLoad={(map) => setMapRef(map)}
        >
          {mascotas.map((m) => (
            <Marker key={m.id} position={{ lat: m.latitud, lng: m.longitud }} onClick={() => setSeleccionado(m)}/>
          ))}
          {seleccionado && (
            <InfoWindow
              position={{ lat: seleccionado.latitud, lng: seleccionado.longitud }}
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
    height: "500px",
    margin: "40px auto",
    width: "100%",
    border: "3px solid black"
  }
};

export default Map;
