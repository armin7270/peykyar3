import React from 'react';
import { Location } from '../types';
import { MapPin, Navigation } from 'lucide-react';

interface Props {
  location: Location;
  compact?: boolean;
}

const NavigationLinks: React.FC<Props> = ({ location, compact = false }) => {
  const { lat, lng } = location;

  // URI Schemes for Iranian and International Apps
  const links = [
    {
      name: 'نشان',
      url: `https://nshn.ir/?lat=${lat}&lng=${lng}`, // Web fallback, mobile usually intercepts
      color: 'bg-blue-600 hover:bg-blue-700',
    },
    {
      name: 'بلد',
      url: `balad://route?dest_lat=${lat}&dest_lng=${lng}&mode=driving`,
      fallback: `https://balad.ir/location?latitude=${lat}&longitude=${lng}`,
      color: 'bg-green-600 hover:bg-green-700',
    },
    {
      name: 'ویز',
      url: `https://waze.com/ul?ll=${lat},${lng}&navigate=yes`,
      color: 'bg-sky-400 hover:bg-sky-500',
    },
    {
      name: 'گوگل',
      url: `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`,
      color: 'bg-gray-600 hover:bg-gray-700',
    },
  ];

  if (compact) {
    return (
      <div className="flex gap-2 flex-wrap">
        {links.map((app) => (
          <a
            key={app.name}
            href={app.url}
            target="_blank"
            rel="noopener noreferrer"
            className={`text-xs text-white px-2 py-1 rounded-md transition-colors ${app.color}`}
          >
            {app.name}
          </a>
        ))}
      </div>
    );
  }

  return (
    <div className="mt-4 p-4 bg-gray-50 rounded-lg border border-gray-200">
      <h4 className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
        <Navigation className="w-4 h-4" />
        ارسال موقعیت به مسیریاب‌ها
      </h4>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {links.map((app) => (
          <a
            key={app.name}
            href={app.url}
            target="_blank"
            rel="noopener noreferrer"
            className={`flex items-center justify-center gap-2 py-2 px-3 rounded-lg text-white font-medium text-sm transition-all shadow-sm ${app.color}`}
          >
            <MapPin className="w-3.5 h-3.5" />
            {app.name}
          </a>
        ))}
      </div>
    </div>
  );
};

export default NavigationLinks;
