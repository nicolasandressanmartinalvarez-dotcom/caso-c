import { useState, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { NavLink } from "react-router-dom";
import CSS from "./ListarCampanas.module.css";

const TIPO_ICONS = {
    VACUNACION: "💉",
    ESTERILIZACION: "✂️",
    DESPARASITACION: "🐾",
    ADOPCION: "🏠",
};

const TIPO_LABELS = {
    VACUNACION: "Vacunación",
    ESTERILIZACION: "Esterilización",
    DESPARASITACION: "Desparasitación",
    ADOPCION: "Adopción",
};

function calcularEstado(fechaStr) {
    if (!fechaStr) return { label: "Sin fecha", clase: "badgePendiente" };
    const hoy = new Date();
    hoy.setHours(0, 0, 0, 0);
    const fecha = new Date(fechaStr);
    fecha.setHours(0, 0, 0, 0);
    const diff = fecha - hoy;
    if (diff === 0) return { label: "⚡ Hoy", clase: "badgeHoy" };
    if (diff > 0) return { label: "📅 Próxima", clase: "badgeProxima" };
    return { label: "✔ Finalizada", clase: "badgeFinalizada" };
}

function ListarCampanas() {
    const { getAccessTokenSilently } = useAuth0();
    const [campanas, setCampanas] = useState([]);
    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState("");

    const cargarCampanas = async () => {
        setCargando(true);
        setError("");
        try {
            const token = await getAccessTokenSilently();
            const res = await fetch("http://localhost:8085/api/bff/campanas", {
                headers: { Authorization: `Bearer ${token}` },
            });
            if (res.ok) {
                const data = await res.json();
                setCampanas(data.sort((a, b) => new Date(a.fecha) - new Date(b.fecha)));
            } else {
                setError("Error al cargar las campañas.");
            }
        } catch (err) {
            setError("Error de conexión con el servidor.");
        } finally {
            setCargando(false);
        }
    };

    useEffect(() => {
        cargarCampanas();
    }, []);

    const eliminar = async (id) => {
        if (!confirm("¿Seguro que deseas eliminar esta campaña?")) return;
        try {
            const token = await getAccessTokenSilently();
            await fetch(`http://localhost:8085/api/bff/campanas/${id}`, {
                method: "DELETE",
                headers: { Authorization: `Bearer ${token}` },
            });
            setCampanas((prev) => prev.filter((c) => c.id !== id));
        } catch (err) {
            console.error("Error al eliminar campaña:", err);
        }
    };

    return (
        <section className={CSS.contenedor}>
            {/* Encabezado */}
            <div className={CSS.header}>
                <div>
                    <h2 className={CSS.titulo}>Campañas Municipales</h2>
                    <p className={CSS.subtitulo}>Gestiona todos los operativos de tu municipio</p>
                </div>
                <NavLink to="../crear-campaña" className={CSS.btnNueva}>
                    + Nueva Campaña
                </NavLink>
            </div>

            {/* Estadísticas rápidas */}
            <div className={CSS.statsBar}>
                <div className={CSS.statItem}>
                    <span className={CSS.statNum}>{campanas.length}</span>
                    <span className={CSS.statLabel}>Total</span>
                </div>
                <div className={CSS.statItem}>
                    <span className={CSS.statNum}>{campanas.filter(c => calcularEstado(c.fecha).clase === "badgeProxima").length}</span>
                    <span className={CSS.statLabel}>Próximas</span>
                </div>
                <div className={CSS.statItem}>
                    <span className={CSS.statNum}>{campanas.filter(c => calcularEstado(c.fecha).clase === "badgeHoy").length}</span>
                    <span className={CSS.statLabel}>Hoy</span>
                </div>
                <div className={CSS.statItem}>
                    <span className={CSS.statNum}>{campanas.filter(c => calcularEstado(c.fecha).clase === "badgeFinalizada").length}</span>
                    <span className={CSS.statLabel}>Finalizadas</span>
                </div>
            </div>

            {/* Contenido principal */}
            {cargando ? (
                <div className={CSS.loading}>
                    <div className={CSS.spinner}></div>
                    <p>Cargando campañas...</p>
                </div>
            ) : error ? (
                <p className={CSS.errorMsg}>{error}</p>
            ) : campanas.length === 0 ? (
                <div className={CSS.vacio}>
                    <span className={CSS.vacioCicono}>📋</span>
                    <p>No hay campañas registradas aún.</p>
                    <NavLink to="../crear-campaña" className={CSS.btnNueva}>
                        Crear primera campaña
                    </NavLink>
                </div>
            ) : (
                <div className={CSS.grid}>
                    {campanas.map((c) => {
                        const estado = calcularEstado(c.fecha);
                        return (
                            <div className={`${CSS.card} ${CSS[estado.clase + "Border"]}`} key={c.id}>
                                {/* Badge de estado */}
                                <span className={`${CSS.badge} ${CSS[estado.clase]}`}>
                                    {estado.label}
                                </span>

                                {/* Tipo e ícono */}
                                <div className={CSS.cardTop}>
                                    <span className={CSS.tipoIcon}>
                                        {TIPO_ICONS[c.tipoOperativo] || "📌"}
                                    </span>
                                    <span className={CSS.tipoLabel}>
                                        {TIPO_LABELS[c.tipoOperativo] || c.tipoOperativo}
                                    </span>
                                </div>

                                {/* Nombre */}
                                <h3 className={CSS.nombreCampana}>{c.nombre}</h3>

                                {/* Detalles */}
                                <ul className={CSS.detalles}>
                                    <li>
                                        <span className={CSS.detalleIcon}>📅</span>
                                        {c.fecha ? new Date(c.fecha + "T00:00:00").toLocaleDateString("es-CL", {
                                            weekday: "long", year: "numeric", month: "long", day: "numeric"
                                        }) : "—"}
                                        {c.hora && ` · ${c.hora}`}
                                    </li>
                                    <li>
                                        <span className={CSS.detalleIcon}>📍</span>
                                        {c.ubicacion}
                                    </li>
                                    <li>
                                        <span className={CSS.detalleIcon}>🎟️</span>
                                        {c.cupos} cupos disponibles
                                    </li>
                                </ul>

                                {/* Descripción */}
                                {c.descripcion && (
                                    <p className={CSS.descripcion}>{c.descripcion}</p>
                                )}

                                {/* Acciones */}
                                <div className={CSS.acciones}>
                                    <button
                                        className={CSS.btnEliminar}
                                        onClick={() => eliminar(c.id)}
                                    >
                                        🗑️ Eliminar
                                    </button>
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}
        </section>
    );
}

export default ListarCampanas;
