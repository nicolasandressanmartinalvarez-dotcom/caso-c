import { useEffect, useState } from "react";
import { useAuth0 } from '@auth0/auth0-react';
import styles from "./AlertasComunidad.module.css";

function AlertasComunidad() {
  const [alertas, setAlertas] = useState([]);
  const [form, setForm] = useState({
    correoEmisor: "",
    correoRemitente: "",
    mensaje: ""
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [exito, setExito] = useState("");
  const { user } = useAuth0();

  useEffect(() => {
    if (user?.email) {
      setForm((prev) => ({ ...prev, correoEmisor: user.email }));
    }
  }, [user]);

  const cargarAlertas = async () => {
    try {
      const response = await fetch("http://localhost:8085/api/bff/notificaciones");
      if (response.ok) {
        const data = await response.json();
        // Ordenamos para ver las más recientes primero
        setAlertas(data.reverse());
      } else {
        console.error("Error al cargar las alertas");
      }
    } catch (err) {
      console.error("Error de conexión:", err);
    }
  };

  useEffect(() => {
    cargarAlertas();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setExito("");

    const usuario = "admin";
    const password = "admin123";
    const credenciales = btoa(`${usuario}:${password}`);

    try {
      const response = await fetch("http://localhost:8085/api/bff/notificaciones", {
        method: "POST",
        headers: {
          "Authorization": `Basic ${credenciales}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          correoEmisor: form.correoEmisor,
          correoRemitente: form.correoRemitente,
          mensaje: form.mensaje
        })
      });

      if (response.ok) {
        setExito("¡Alerta comunitaria registrada y enviada con éxito!");
        setForm((prev) => ({
          ...prev,
          correoRemitente: "",
          mensaje: ""
        }));
        cargarAlertas();
      } else {
        setError("Error al registrar la alerta en el servidor.");
      }
    } catch (err) {
      setError("Error de conexión al intentar enviar la alerta.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1>Alertas de Comunidad</h1>
        <p>Reporta incidencias, avisa de rescates o envía notificaciones a la comunidad.</p>
      </header>

      <div className={styles.grid}>
        {/* Formulario de Emisión */}
        <section className={styles.card}>
          <h2>Emitir Alerta de Comunidad</h2>
          <form onSubmit={handleSubmit} className={styles.form}>
            <div className={styles.formGroup}>
              <label htmlFor="correoEmisor">Correo Emisor (Tus Datos):</label>
              <input
                type="email"
                id="correoEmisor"
                name="correoEmisor"
                value={form.correoEmisor}
                onChange={handleChange}
                placeholder="ejemplo@organizacion.org"
                required
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="correoRemitente">Correo Destinatario / Dueño:</label>
              <input
                type="email"
                id="correoRemitente"
                name="correoRemitente"
                value={form.correoRemitente}
                onChange={handleChange}
                placeholder="ejemplo@dueño.com"
                required
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="mensaje">Mensaje / Descripción de Alerta:</label>
              <textarea
                id="mensaje"
                name="mensaje"
                value={form.mensaje}
                onChange={handleChange}
                placeholder="Describe la situación (ej. Mascota reportada extraviada en calle principal)..."
                required
              />
            </div>

            <button type="submit" className={styles.button} disabled={loading}>
              {loading ? "Enviando..." : "Enviar Alerta"}
            </button>

            {exito && <p className={styles.exito}>{exito}</p>}
            {error && <p className={styles.error}>{error}</p>}
          </form>
        </section>

        {/* Lista de Alertas */}
        <section className={styles.card}>
          <h2>Historial de Alertas Registradas</h2>
          <div className={styles.alertasList}>
            {alertas.length === 0 ? (
              <p className={styles.noAlerts}>No hay alertas registradas aún.</p>
            ) : (
              alertas.map((alerta, idx) => (
                <div key={idx} className={styles.alertaCard}>
                  <div className={styles.alertaHeader}>
                    <span className={styles.badge}>Alerta #{alertas.length - idx}</span>
                    <span className={styles.fecha}>{alerta.fechaDelRegistro || "Fecha no disponible"}</span>
                  </div>
                  <div className={styles.alertaDetalle}>
                    <p><strong>De:</strong> {alerta.correoEmisor}</p>
                    <p><strong>Para:</strong> {alerta.correoRemitente}</p>
                  </div>
                  <div className={styles.alertaMensaje}>
                    <p>{alerta.mensaje}</p>
                  </div>
                </div>
              ))
            )}
          </div>
        </section>
      </div>
    </div>
  );
}

export default AlertasComunidad;
