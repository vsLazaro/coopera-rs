import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { Icon } from 'leaflet';
import 'leaflet/dist/leaflet.css';

const customIcon = new Icon({
  iconUrl: 'https://cdn-icons-png.flaticon.com/512/684/684908.png', // Ícone vermelho
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png', // Sombra do marcador
  iconSize: [30, 45],
  iconAnchor: [15, 45],
});

interface StoreMapProps {
  address: string; // Endereço da loja
}

const StoreMap: React.FC<StoreMapProps> = ({ address }) => {
  const [coordinates, setCoordinates] = useState<{ lat: number; lng: number } | null>(null);

  // Função para buscar as coordenadas com base no endereço
  const fetchCoordinates = async () => {
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(address)}`
      );
      const data = await response.json();

      if (data && data.length > 0) {
        setCoordinates({ lat: parseFloat(data[0].lat), lng: parseFloat(data[0].lon) });
      } else {
        console.error('Endereço não encontrado.');
      }
    } catch (error) {
      console.error('Erro ao buscar coordenadas:', error);
    }
  };

  useEffect(() => {
    fetchCoordinates();
  }, [address]);

  return (
    <div className="store-map">
      {coordinates ? (
        <MapContainer
          center={[coordinates.lat, coordinates.lng]}
          zoom={15}
          style={{ height: '300px', width: '100%', borderRadius: '8px' }}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          <Marker position={[coordinates.lat, coordinates.lng]} icon={customIcon}>
            <Popup>
              <strong>{address}</strong>
            </Popup>
          </Marker>
        </MapContainer>
      ) : (
        <p>Carregando mapa...</p>
      )}
    </div>
  );
};

export default StoreMap;