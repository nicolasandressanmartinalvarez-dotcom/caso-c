import { useEffect, useState, useRef } from "react";
import { useNavigate } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import { GoogleMap, LoadScript, Marker, InfoWindow, Circle } from "@react-google-maps/api";

import FormRegisMasc from './RegistrarMasc.module.css';

function RegistrarMascota() {
  const [tiposRaza, setTiposRaza] = useState([]);
  const [tiposMascota, setTiposMascota] = useState([]);
  const [mascota, setMascota] = useState({

    nombre: '',
    descripcion: '',
    latitud: '',
    longitud: '',
    imagen: '',
    tipoRazaId: '',
    tipoMascotaId: '',
    estado: 'PERDIDO'
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

  useEffect(() => {
    const cargarCatalogos = async () => {
      try {
        const token = await getAccessTokenSilently();

        const respRazas = await fetch('http://localhost:8081/api/tipos-raza', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        const respTipos = await fetch('http://localhost:8081/api/tipos-mascota', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        const dataRazas = await respRazas.json();
        const dataTipos = await respTipos.json();

        setTiposRaza(dataRazas);
        setTiposMascota(dataTipos);

        console.log("Razas:", dataRazas);
        console.log("Tipos:", dataTipos);

      } catch (error) {
        console.error('Error al cargar catálogos:', error);
      }
    };
    cargarCatalogos();
  }, [getAccessTokenSilently]);


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

    if (
      !mascota.nombre ||
      !mascota.descripcion ||
      !mascota.imagen ||
      !mascota.tipoMascotaId ||
      !mascota.tipoRazaId
    ) {
      setMensaje('Todos los campos son obligatorios');
      return;
    }
    const datosMasc = {
      nombre: mascota.nombre,
      descripcion: mascota.descripcion,
      correoReportante: user?.email || '',
      latitud: mascota.latitud,
      longitud: mascota.longitud,
      estado: mascota.estado,
      tipoMascota: {
        idTipoMascota: Number(mascota.tipoMascotaId)
      },
      tipoRaza: {
        idTipoRaza: Number(mascota.tipoRazaId)
      }
    };
    console.log(datosMasc);
    try {
      const token = await getAccessTokenSilently();
      const formData = new FormData();
      formData.append('file', mascota.imagen);
      formData.append('mascota', new Blob([JSON.stringify(datosMasc)], { type: "application/json" }));

      const response = await fetch('http://localhost:8081/api/mascotas', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: formData
      });

      if (response.ok) {
        setMensaje('Mascota registrada con éxito');
        setMascota({
          nombre: '',
          descripcion: '',
          latitud: '',
          longitud: '',
          imagen: '',
          tipoRazaId: '',
          tipoMascotaId: '',
          estado: 'PERDIDO'
        });
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

        <form onSubmit={handleSubmit} method="POST">
          <div className={FormRegisMasc["form-group"]}>
            <label>Nombre:</label>
            <input type="text" name="nombre" value={mascota.nombre} onChange={handleChange} required />
          </div>

          <div className={FormRegisMasc["form-group"]}>
            <label>Descripción:</label>
            <textarea name="descripcion" value={mascota.descripcion} onChange={handleChange} required />
          </div>

          <div className={FormRegisMasc["form-group"]}>
            <label>Tipo de Mascota:</label>
            <select name="tipoMascotaId" value={mascota.tipoMascotaId} onChange={handleChange} required>
              <option value="">Seleccione tipo</option>
              {tiposMascota.map((tipo) => (
                <option key={tipo.id} value={tipo.id}>{tipo.nombre}</option>
              ))}
            </select>
          </div>

          <div className={FormRegisMasc["form-group"]}>
            <label>Tipo de Raza:</label>
            <select name="tipoRazaId" value={mascota.tipoRazaId} onChange={handleChange} required>
              <option value="">Seleccione raza</option>
              {tiposRaza.map((raza) => (
                <option key={raza.id} value={raza.id}>{raza.nombre}</option>
              ))}
            </select>
          </div>

          <div className={FormRegisMasc["form-group"]}>
            <label>Estado:</label>
            <select name="estado" value={mascota.estado} onChange={handleChange} required>
              <option value="PERDIDO">Perdido</option>
              <option value="ENCONTRADO">Encontrado</option>
            </select>
          </div>

          <div className={FormRegisMasc["form-group"]}>
            <label>Imagen:</label>
            <input type="file" name="imagen" onChange={handleChange} required />
          </div>

          <div className={FormRegisMasc["form-group"]}>
            <div className={FormRegisMasc["mini_mapa"]}>
              <LoadScript googleMapsApiKey="AIzaSyATJpdjBoBdFkXUYvtfpU-t5pdGLDiEKYM">
                <GoogleMap mapContainerStyle={containerStyle} center={marcadorCentral} zoom={14}>
                  <Marker
                    position={marcadorCentral}
                    draggable={true}
                    onDragEnd={(e) => {
                      const nuevaPosicion = {
                        lat: e.latLng.lat(),
                        lng: e.latLng.lng()
                      };

                      setMarcadorCentral(nuevaPosicion);
                      setMascota((prevMascota) => ({
                        ...prevMascota,
                        latitud: nuevaPosicion.lat,
                        longitud: nuevaPosicion.lng
                      }));
                    }}
                  />

                  <Circle
                    onLoad={(circle) => { circleRef.current = circle; }}
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
                </GoogleMap>
              </LoadScript>
            </div>
          </div>

          <button type="submit" className={FormRegisMasc["button-form"]}>
            Registrar Mascota
          </button>
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
