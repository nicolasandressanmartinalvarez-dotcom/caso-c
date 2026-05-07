import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';

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

  const styles = {
    container: { maxWidth: '400px', margin: '0 auto', padding: '20px', fontFamily: 'Arial' },
    formGroup: { marginBottom: '15px' },
    label: { display: 'block', marginBottom: '5px', fontWeight: 'bold' },
    input: { width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' },
    button: { width: '100%', padding: '10px', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '4px', marginTop: '10px' },
    buttonVolver: { width: '100%', padding: '10px', backgroundColor: '#6c757d', color: 'white', border: 'none', borderRadius: '4px', marginTop: '10px' },
    mensaje: { marginTop: '15px', color: 'red', textAlign: 'center' }
  };

  return (
    <div style={styles.container}>
      <h2>Registrar Mascota</h2>
      <form onSubmit={handleSubmit}>
        <div style={styles.formGroup}>
          <label style={styles.label}>Nombre:</label>
          <input type="text" name="nombre" value={mascota.nombre} onChange={handleChange} style={styles.input} required/>
        </div>
        <div style={styles.formGroup}>
          <label style={styles.label}>Descripción:</label>
          <textarea name="descripcion" value={mascota.descripcion} onChange={handleChange} style={{ ...styles.input, height: '80px' }} required/>
        </div>
        <div style={styles.formGroup}>
          <label style={styles.label}>Tipo de Raza:</label>
          <input type="text" name="tipoDeRaza" value={mascota.tipoDeRaza} onChange={handleChange} style={styles.input} required/>
        </div>
        <div style={styles.formGroup}>
          <label style={styles.label}>Dirección:</label>
          <input type="text" name="direccion" value={mascota.direccion} onChange={handleChange} style={styles.input} required/>
        </div>
        <button type="submit" style={styles.button}>Registrar mascota</button>
      </form>
      <button onClick={handleVolver} style={styles.buttonVolver}>
        Volver
      </button>

      {mensaje && <p style={styles.mensaje}>{mensaje}</p>}
    </div>
  );
}

export default RegistrarMascota;