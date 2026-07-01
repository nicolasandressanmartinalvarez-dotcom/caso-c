import { GoogleMap, LoadScript, Marker, Circle } from "@react-google-maps/api";

function MapViewer({ latitud, longitud }) {
    const containerStyle = {
        width: "100%",
        height: "200px",
        borderRadius: "10px",
        border: "1px solid #e2e8f0"
    };

    const posicion = { lat: Number(latitud), lng: Number(longitud) };

    return (
        <div style={{ width: '100%', marginTop: '15px' }}>
            <LoadScript googleMapsApiKey="AIzaSyATJpdjBoBdFkXUYvtfpU-t5pdGLDiEKYM">
                <GoogleMap
                    mapContainerStyle={containerStyle}
                    zoom={14}
                    center={posicion}
                    options={{ disableDefaultUI: true, zoomControl: true }}
                >
                    <Marker position={posicion} />
                    <Circle
                        center={posicion}
                        radius={800}
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

export default MapViewer;