import { useState, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { useNavigate } from "react-router-dom";
import CSS from "./CrearCampana.module.css";

const TIPOS_OPERATIVO = [
    { value: "VACUNACION", label: "💉 Vacunación" },
    { value: "ESTERILIZACION", label: "✂️ Esterilización" },
    { value: "DESPARASITACION", label: "🐾 Desparasitación" },
    { value: "ADOPCION", label: "🏠 Adopción" },
];

function CrearCampana() {
    const { getAccessTokenSilently } = useAuth0();
    const navigate = useNavigate();

    const [municipalidades, setMunicipalidades] = useState([]);
    const [loadingMuni, setLoadingMuni] = useState(true);
    const [enviando, setEnviando] = useState(false);
    const [mensaje, setMensaje] = useState({ tipo: "", texto: "" });

    const [form, setForm] = useState({
        nombre: "",
        tipoOperativo: "",
        fecha: "",
        hora: "",
        ubicacion: "",
        cupos: "",
        descripcion: "",
        municipalidadId: "",
    });

    // Cargar municipalidades para el select
    useEffect(() => {
        const cargarMunicipalidades = async () => {
            try {
                const token = await getAccessTokenSilently();
                const res = await fetch("http://localhost:8085/api/bff/municipalidades", {
                    headers: { Authorization: `Bearer ${token}` },
                });
                if (res.ok) {
                    const data = await res.json();
                    setMunicipalidades(data);
                }
            } catch (err) {
                console.error("Error al cargar municipalidades:", err);
            } finally {
                setLoadingMuni(false);
            }
        };
        cargarMunicipalidades();
    }, [getAccessTokenSilently]);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setEnviando(true);
        setMensaje({ tipo: "", texto: "" });

        try {
            const token = await getAccessTokenSilently();
            const body = {
                ...form,
                cupos: parseInt(form.cupos, 10),
                municipalidadId: parseInt(form.municipalidadId, 10),
            };

            const res = await fetch("http://localhost:8085/api/bff/campanas", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(body),
            });

            if (res.ok) {
                setMensaje({ tipo: "exito", texto: "✅ Campaña creada exitosamente." });
                setForm({
                    nombre: "", tipoOperativo: "", fecha: "", hora: "",
                    ubicacion: "", cupos: "", descripcion: "", municipalidadId: "",
                });
                setTimeout(() => navigate("../listar-campañas"), 1500);
            } else {
                setMensaje({ tipo: "error", texto: "❌ Error al crear la campaña. Verifica los datos." });
            }
        } catch (err) {
            setMensaje({ tipo: "error", texto: "❌ Error de conexión con el servidor." });
        } finally {
            setEnviando(false);
        }
    };

    return (
        <section className={CSS.contenedor}>
            <div className={CSS.card}>
                <div className={CSS.cardHeader}>
                    <span className={CSS.iconoTitulo}>🗓️</span>
                    <div>
                        <h2 className={CSS.titulo}>Nueva Campaña</h2>
                        <p className={CSS.subtitulo}>Registra un operativo para la comunidad</p>
                    </div>
                </div>

                <form className={CSS.form} onSubmit={handleSubmit}>
                    {/* Nombre */}
                    <div className={CSS.inputGroup}>
                        <label className={CSS.label}>Nombre de la Campaña</label>
                        <input
                            className={CSS.input}
                            type="text"
                            name="nombre"
                            placeholder="Ej: Campaña de Vacunación Antirrábica 2026"
                            value={form.nombre}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    {/* Tipo Operativo */}
                    <div className={CSS.inputGroup}>
                        <label className={CSS.label}>Tipo de Operativo</label>
                        <select
                            className={CSS.select}
                            name="tipoOperativo"
                            value={form.tipoOperativo}
                            onChange={handleChange}
                            required
                        >
                            <option value="">— Selecciona un tipo —</option>
                            {TIPOS_OPERATIVO.map((t) => (
                                <option key={t.value} value={t.value}>{t.label}</option>
                            ))}
                        </select>
                    </div>

                    {/* Municipalidad */}
                    <div className={CSS.inputGroup}>
                        <label className={CSS.label}>Municipalidad</label>
                        <select
                            className={CSS.select}
                            name="municipalidadId"
                            value={form.municipalidadId}
                            onChange={handleChange}
                            required
                            disabled={loadingMuni}
                        >
                            <option value="">
                                {loadingMuni ? "Cargando municipalidades..." : "— Selecciona una municipalidad —"}
                            </option>
                            {municipalidades.map((m) => (
                                <option key={m.id} value={m.id}>{m.nombre} — {m.comuna}</option>
                            ))}
                        </select>
                    </div>

                    {/* Fecha y Hora */}
                    <div className={CSS.filaDos}>
                        <div className={CSS.inputGroup}>
                            <label className={CSS.label}>Fecha del Operativo</label>
                            <input
                                className={CSS.input}
                                type="date"
                                name="fecha"
                                value={form.fecha}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className={CSS.inputGroup}>
                            <label className={CSS.label}>Hora</label>
                            <input
                                className={CSS.input}
                                type="time"
                                name="hora"
                                value={form.hora}
                                onChange={handleChange}
                                required
                            />
                        </div>
                    </div>

                    {/* Ubicación y Cupos */}
                    <div className={CSS.filaDos}>
                        <div className={CSS.inputGroup}>
                            <label className={CSS.label}>Ubicación / Dirección</label>
                            <input
                                className={CSS.input}
                                type="text"
                                name="ubicacion"
                                placeholder="Ej: Sede Comunitaria Las Condes"
                                value={form.ubicacion}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className={CSS.inputGroup}>
                            <label className={CSS.label}>Cupos Disponibles</label>
                            <input
                                className={CSS.input}
                                type="number"
                                name="cupos"
                                min="1"
                                placeholder="Ej: 50"
                                value={form.cupos}
                                onChange={handleChange}
                                required
                            />
                        </div>
                    </div>

                    {/* Descripción */}
                    <div className={CSS.inputGroup}>
                        <label className={CSS.label}>Descripción / Instrucciones</label>
                        <textarea
                            className={CSS.textarea}
                            name="descripcion"
                            placeholder="Ej: Traer la mascota en ayunas, con correa y vacuna anterior al día..."
                            value={form.descripcion}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    {mensaje.texto && (
                        <p className={mensaje.tipo === "exito" ? CSS.exito : CSS.error}>
                            {mensaje.texto}
                        </p>
                    )}

                    <button className={CSS.btnSubmit} type="submit" disabled={enviando}>
                        {enviando ? "Creando campaña..." : "🚀 Crear Campaña"}
                    </button>
                </form>
            </div>
        </section>
    );
}

export default CrearCampana;
