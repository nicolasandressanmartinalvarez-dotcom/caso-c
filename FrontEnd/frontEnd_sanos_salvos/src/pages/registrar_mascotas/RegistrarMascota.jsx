import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

import FormRegisMasc from './RegistrarMasc.module.css';

function RegistrarMascota() {
  const [mascota, setMascota] = useState({
    nombre: '',
    descripcion: '',
    tipoDeRaza: '',
    direccion: ''
  });

  const [mensaje, setMensaje] = useState('');
  const navigate = useNavigate();
  const { getAccessTokenSilently, user } = useAuth0();
  const [marcadorCentral, setMarcadorCentral] = useState({ lat: -33.4489, lng: -70.6693 });
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

    if (!mascota.nombre || !mascota.descripcion || !mascota.tipoDeRaza || !mascota.direccion) {
      setMensaje('Todos los campos son obligatorios');
      return;
    }

    try {
      const token = await getAccessTokenSilently();

      const mascotaConCorreo = {
        ...mascota,
        correoReportante: user?.email || ''
      };

      const response = await fetch('http://localhost:8081/api/mascotas', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(mascotaConCorreo)
      });

      if (response.ok) {
        setMensaje('Mascota registrada con éxito');
        setMascota({ nombre: '', descripcion: '', tipoDeRaza: '', direccion: '' });
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
            <label>Dirección:</label>
            <input type="text" name="direccion" value={mascota.direccion} onChange={handleChange} required />
          </div>

          <div className={FormRegisMasc["form-group"]}>
            <label>Direccion:</label>
            <input type="text"
              name="direccion"
              value={mascota.direccion}
              onChange={handleChange}
              required
            />
            <div className={FormRegisMasc["mini_mapa"]}>
              <LoadScript googleMapsApiKey="AIzaSyATJpdjBoBdFkXUYvtfpU-t5pdGLDiEKYM">
                <GoogleMap
                  mapContainerStyle={containerStyle}
                  center={marcadorCentral}
                  zoom={14}
                >
                  <Marker
                    position={marcadorCentral}
                    draggable={true}
                    onDragEnd={(e) => {
                      setMarcadorCentral({
                        lat: e.latLng.lat(),
                        lng: e.latLng.lng()
                      });
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