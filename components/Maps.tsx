"use client"

import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { Location } from '@/lib/generated/prisma';

type IconDefaultWithInternal = typeof L.Icon.Default.prototype & {
  _getIconUrl?: unknown;
};

delete (L.Icon.Default.prototype as IconDefaultWithInternal)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.3/dist/images/marker-shadow.png',
});

export interface LocationMapsProps {
  locations: Location[];
}

export default function Maps({ locations }: LocationMapsProps) {
  
  const apiKey = process.env.NEXT_PUBLIC_LOCATION_IQ_API_KEY;
  const defaultLat = locations[0]?.latitude || 0;
  const defaultLon = locations[0]?.longitude || 0;
  const zoomLevel = locations.length > 0 ? 13 : 2;

  return (
    <MapContainer
      center={[defaultLat, defaultLon]}
      zoom={zoomLevel}
      scrollWheelZoom
      className="h-full rounded-md"
    >
      <TileLayer
        url={`https://{s}-tiles.locationiq.com/v3/streets/r/{z}/{x}/{y}.png?key=${apiKey}`}
      />
      {locations.map((loc, idx) => (
        <Marker key={idx} position={[loc.latitude, loc.longitude]}>
          <Popup>
            {loc.name || `Location ${idx + 1}`}
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}
