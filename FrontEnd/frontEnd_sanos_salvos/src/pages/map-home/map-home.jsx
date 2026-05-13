import { GoogleMap, LoadScript, Marker, InfoWindow, Circle } from "@react-google-maps/api";
import { useEffect, useState, useRef } from "react";
import { useAuth0 } from '@auth0/auth0-react';

function Map({coordenadas}) {

    const containerStyle = {
        width: "100%",
        height: "100%"
    };
    
    const circleRef = useRef(null);
    const [mapRef, setMapRef] = useState(null);
    const radio = 1000;

    return (
        <div>
            <LoadScript googleMapsApiKey="AIzaSyATJpdjBoBdFkXUYvtfpU-t5pdGLDiEKYM"> 
                <GoogleMap mapContainerStyle={containerStyle} zoom={12} onLoad={(map) => setMapRef(map)} center={coordenadas}>
                <Circle onLoad={(circle) => { circleRef.current = circle; }} onUnmount={() => { if (circleRef.current) { circleRef.current.setMap(null); circleRef.current = null;}}}
                    center={coordenadas}
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
    );
    useEffect(() => {
        if (circleRef.current) {
        circleRef.current.setCenter(coordenadas);
        }
    }, [coordenadas]);
}

export default Map;
