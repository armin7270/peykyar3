import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, useMapEvents, useMap } from 'react-leaflet';
import L from 'leaflet';
import { Location } from '../types';
import { Crosshair, MapPin } from 'lucide-react';

// Fix for default Leaflet icon not showing in some bundlers
const iconSvg = `
  <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="#ef4444" stroke="#7f1d1d" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
    <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/>
    <circle cx="12" cy="10" r="3" fill="white"/>
  </svg>
`;
const customIcon = new L.DivIcon({
  html: iconSvg,
  className: 'bg-transparent',
  iconSize: [32, 32],
  iconAnchor: [16, 32],
});

interface Props {
  location: Location;
  onLocationSelect: (loc: Location) => void;
  interactive?: boolean;
}

const LocationMarker = ({ position, setPosition }: { position: Location, setPosition: (l: Location) => void }) => {
  const map = useMap();

  useMapEvents({
    click(e) {
      setPosition(e.latlng);
      map.flyTo(e.latlng, map.getZoom());
    },
  });

  useEffect(() => {
    map.flyTo(position, map.getZoom());
  }, [position, map]);

  return position ? <Marker position={position} icon={customIcon} /> : null;
};

const MapPicker: React.FC<Props> = ({ location, onLocationSelect, interactive = true }) => {
  const [currentLoc, setCurrentLoc] = useState<Location>(location);
  const [loading, setLoading] = useState(false);

  // Sync internal state if prop changes
  useEffect(() => {
    setCurrentLoc(location);
  }, [location]);

  const handleLocateMe = () => {
    setLoading(true);
    if (!navigator.geolocation) {
      alert('مرورگر شما از موقعیت‌یابی پشتیبانی نمی‌کند.');
      setLoading(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const newLoc = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };
        setCurrentLoc(newLoc);
        onLocationSelect(newLoc);
        setLoading(false);
      },
      (error) => {
        console.error(error);
        alert('خطا در دریافت موقعیت. لطفا GPS را روشن کنید.');
        setLoading(false);
      }
    );
  };

  return (
    <div className="relative w-full h-full rounded-lg overflow-hidden border border-gray-300 shadow-inner group">
      <MapContainer
        center={currentLoc}
        zoom={13}
        scrollWheelZoom={interactive}
        dragging={interactive}
        className="h-full w-full z-0"
        style={{ minHeight: '300px' }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {interactive && (
           <LocationMarker 
             position={currentLoc} 
             setPosition={(loc) => {
               setCurrentLoc(loc);
               onLocationSelect(loc);
             }} 
           />
        )}
        {!interactive && <Marker position={currentLoc} icon={customIcon} />}
      </MapContainer>

      {interactive && (
        <div className="absolute top-4 right-4 z-[400] flex flex-col gap-2">
          <button
            type="button"
            onClick={handleLocateMe}
            disabled={loading}
            className="bg-white text-gray-700 hover:text-brand-600 p-2 rounded-lg shadow-md border border-gray-200 transition-colors flex items-center gap-2 text-sm font-medium"
          >
            {loading ? (
              <span className="animate-spin text-brand-500">⏳</span>
            ) : (
              <Crosshair className="w-5 h-5" />
            )}
            <span className="hidden sm:inline">موقعیت من</span>
          </button>
        </div>
      )}
      
      {interactive && (
        <div className="absolute bottom-4 right-4 z-[400] bg-white/90 backdrop-blur px-3 py-1 rounded-md shadow text-xs text-gray-500 pointer-events-none">
          برای انتخاب موقعیت روی نقشه کلیک کنید
        </div>
      )}
    </div>
  );
};

export default MapPicker;
