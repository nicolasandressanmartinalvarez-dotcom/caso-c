import { GoogleMap, LoadScript, Marker, InfoWindow, Circle } from "@react-google-maps/api";
import { useEffect, useState, useRef } from "react";
import { useAuth0 } from '@auth0/auth0-react';

function Map() {
  const containerStyle = {
    width: "100%",
    height: "100%"
  };
  const { getAccessTokenSilently } = useAuth0();
  const circleRef = useRef(null);
  const [seleccionado, setSeleccionado] = useState(null);
  const [mascotas, setMascotas] = useState([]);
  const [mapRef, setMapRef] = useState(null);


  const [marcadorCentral, setMarcadorCentral] = useState({ lat: -33.4489, lng: -70.6693 });
  const radio = 1000;

  useEffect(() => {
    const cargarMascotas = async () => {
      try {
        const token = await getAccessTokenSilently();

        const response = await fetch("http://localhost:8081/api/mascotas", {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        const data = await response.json();
        console.log(data);
        setMascotas(data);

      } catch (error) {
        console.error("Error al cargar mascotas:", error);
      }
    };

    cargarMascotas();
  }, [getAccessTokenSilently]);


  useEffect(() => {
    if (mapRef && mascotas.length > 0) {
      const bounds = new window.google.maps.LatLngBounds();

      mascotas
        .filter((m) => typeof m.latitud === "number" && typeof m.longitud === "number")
        .forEach(m => bounds.extend({ lat: m.latitud, lng: m.longitud }));

      mapRef.fitBounds(bounds);

      setTimeout(() => {
        mapRef.setZoom(7);
      }, 1000);
    }
  }, [mapRef, mascotas]);

  return (
    <div style={styles.container}>
      <LoadScript googleMapsApiKey="AIzaSyATJpdjBoBdFkXUYvtfpU-t5pdGLDiEKYM">
        <GoogleMap
          mapContainerStyle={containerStyle}
          zoom={12}
          onLoad={(map) => setMapRef(map)}
          center={marcadorCentral}
        >

          <Marker
            position={marcadorCentral}
            draggable={true}
            onDragEnd={(e) => {
              const nuevaPosicion = {
                lat: e.latLng.lat(),
                lng: e.latLng.lng()
              };

              setMarcadorCentral(nuevaPosicion);
            }}
          />


          <Circle
            onLoad={(circle) => {
              circleRef.current = circle;
            }}
            onUnmount={() => {
              if (circleRef.current) {
                circleRef.current.setMap(null);
                circleRef.current = null;
              }
            }}
            center={marcadorCentral}
            radius={radio}
            options={{
              fillColor: "#00BFFF",
              fillOpacity: 0.2,
              strokeColor: "#1E90FF",
              strokeOpacity: 0.8,
              strokeWeight: 2,
            }}
          />


          {mascotas
            .filter((m) => typeof m.latitud === "number" && typeof m.longitud === "number")
            .map((m) => (
              <Marker
                key={m.id}
                position={{ lat: m.latitud, lng: m.longitud }}
                onClick={() => setSeleccionado(m)}
              />
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

  useEffect(() => {
    if (circleRef.current) {
      circleRef.current.setCenter(marcadorCentral);
    }
  }, [marcadorCentral]"el fran se la come toda");
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
