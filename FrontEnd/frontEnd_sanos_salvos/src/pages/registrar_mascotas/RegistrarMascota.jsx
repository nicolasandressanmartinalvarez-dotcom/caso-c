import { useEffect, useState, useRef } from "react";
import { useNavigate } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import { GoogleMap, LoadScript, Marker, InfoWindow, Circle } from "@react-google-maps/api";

import FormRegisMasc from './RegistrarMasc.module.css';

function RegistrarMascota() {
  const [mascota, setMascota] = useState({
    nombre: '',
    descripcion: '',
    tipoDeRaza: '',
    color: '',
    tamanio: '',
    entidadReportante: '',
    latitud: '',
    longitud: '',
    imagen: ''
  });

  const circleRef = useRef(null);
  const radio = 1000;
  const [mensaje, setMensaje] = useState('');
  const navigate = useNavigate();
  const { getAccessTokenSilently, user } = useAuth0();


  const [marcadorCentral, setMarcadorCentral] = useState({ lat: -33.400, lng: -70.600 });
  const containerStyle = {
    width: "100%",
    height: "100%"
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === 'imagen') {
      setMascota({
        ...mascota,
        imagen: files[0]
      });
    } else {
      setMascota({
        ...mascota,
        [name]: value
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!mascota.nombre || !mascota.descripcion || !mascota.tipoDeRaza || !mascota.imagen) {
      setMensaje('Todos los campos son obligatorios');
      return;
    }
    const datosMasc = {

    }
    try {
      const token = await getAccessTokenSilently();
      const formData = new FormData();
      formData.append('imagen', mascota.imagen);
      formData.append('nombre', mascota.nombre);
      formData.append('descripcion', mascota.descripcion);
      formData.append('tipoDeRaza', mascota.tipoDeRaza);
      formData.append('color', mascota.color);
      formData.append('tamanio', mascota.tamanio);
      formData.append('entidadReportante', mascota.entidadReportante);
      formData.append('direccion', mascota.direccion);
      formData.append('latitud', mascota.latitud);
      formData.append('longitud', mascota.longitud)
      formData.append('correoReportante', user?.email || '');

      const response = await fetch('http://localhost:8085/api/bff/mascotas', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: formData
      });

      if (response.ok) {
        setMensaje('Mascota registrada con éxito');
        setMascota({ nombre: '', descripcion: '', tipoDeRaza: '', imagen: '' });
      } else {
        setMensaje('Error al registrar la mascota.');
      }
    } catch (error) {
      console.error('Error:', error);
      setMensaje('Error de conexión con el servidor.');
    }
  };
  const handleVolver = () => {
    navigate(-1);
  };
  useEffect(() => { console.log(mascota) }, [mascota]);
  return (
    <section className={FormRegisMasc["section-form"]}>
      <div className={FormRegisMasc["container-form"]}>
        <h2>Registrar Mascota</h2>
        <form onSubmit={handleSubmit} method='POST'>
          <div className={FormRegisMasc["form-group"]}>
            <label>Nombre:</label>
            <input type="text" name="nombre" value={mascota.nombre} onChange={handleChange} required />
          </div>
          <div className={FormRegisMasc["form-group"]}>
            <label>Descripción:</label>
            <textarea name="descripcion" value={mascota.descripcion} onChange={handleChange} required />
          </div>
          <div className={FormRegisMasc["form-group"]}>
            <label>Tipo de Raza:</label>
            <input type="text" name="tipoDeRaza" value={mascota.tipoDeRaza} onChange={handleChange} required />
          </div>
          <div className={FormRegisMasc["form-group"]}>
            <label>Color:</label>
            <input type="text" name="color" value={mascota.color} onChange={handleChange} required />
          </div>
          <div className={FormRegisMasc["form-group"]}>
            <label>Tamaño:</label>
            <input type="text" name="tamanio" value={mascota.tamanio} onChange={handleChange} required />
          </div>
          <div className={FormRegisMasc["form-group"]}>
            <label>Entidad Reportante:</label>
            <input type="text" name="entidadReportante" value={mascota.entidadReportante} onChange={handleChange} required />
          </div>
          <div className={FormRegisMasc["form-group"]}>
            <label>Imagen:</label>
            <input type="file" name="imagen" onChange={handleChange} required />
          </div>
          <div className={FormRegisMasc["form-group"]}>
            <div className={FormRegisMasc["mini_mapa"]}>
              <LoadScript googleMapsApiKey="AIzaSyATJpdjBoBdFkXUYvtfpU-t5pdGLDiEKYM">
                <GoogleMap mapContainerStyle={containerStyle} center={marcadorCentral} zoom={14}>
                  <Marker position={marcadorCentral} draggable={true} onDragEnd={(e) => {
                    const nuevaPosicion = { lat: e.latLng.lat(), lng: e.latLng.lng() };
                    setMarcadorCentral(nuevaPosicion);
                    setMascota((prevMascota) => ({ ...prevMascota, latitud: nuevaPosicion.lat, longitud: nuevaPosicion.lng }));
                  }}
                  />
                  <Circle onLoad={(circle) => { circleRef.current = circle; }} onUnmount={() => {
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
                </GoogleMap>
              </LoadScript>
            </div>
          </div>
          <button type="submit" className={FormRegisMasc["button-form"]}>Registrar Mascota</button>
        </form>
        <button onClick={handleVolver} className={FormRegisMasc["button-volver"]}>
          Volver
        </button>

        {mensaje && <p className={FormRegisMasc["mensaje"]}>{mensaje}</p>}
      </div>
    </section>
  );
}

export default RegistrarMascota;