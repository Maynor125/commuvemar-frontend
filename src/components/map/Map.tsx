// components/Map.tsx

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

interface MapProps {
  latitude: number;
  longitude: number;
}

const customMarkerIcon = L.icon({
  iconUrl: "../../../public/images/assets/iconLocation.png", // URL de la imagen del ícono personalizado
  iconSize: [25, 41], // Tamaño del ícono
  iconAnchor: [12, 41], // Punto del ícono que se ancla a la ubicación
});

const Map: React.FC<MapProps> = ({ latitude, longitude }) => {
  return (
    <MapContainer
      center={[latitude, longitude]}
      zoom={14}
      style={{ height: "350px", width: "100%",borderRadius:'6px'}}
      scrollWheelZoom={false}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={[latitude, longitude]} icon={customMarkerIcon}>
        <Popup>
          Esta es la ubicacion <br /> donde fue registrada.
        </Popup>
      </Marker>
    </MapContainer>
  );
};

export default Map;
