import { GoogleMap, LoadScript, Marker, Circle } from "@react-google-maps/api";
import { useState } from "react";

function MapPicker({ onLocationSelect }) {
    const containerStyle = {
        width: "100%",
        height: "300px",
        borderRadius: "10px",
        border: "1px solid #cbd5e1"
    };

    const [marcadorCentral, setMarcadorCentral] = useState({ lat: -34.4390, lng: -71.0780 });

    return (
        <div style={{ width: '100%', marginBottom: '15px' }}>
            <LoadScript googleMapsApiKey="AIzaSyATJpdjBoBdFkXUYvtfpU-t5pdGLDiEKYM">
                <GoogleMap
                mapContainerStyle={containerStyle}
                zoom={14}
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
                    onLocationSelect(nuevaPosicion);
                    }}
                />
                <Circle
                    center={marcadorCentral}
                    radius={1000}
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
    );
}

export default MapPicker;