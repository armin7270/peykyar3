import React, { useState } from 'react';
import { CustomerOrder, Location } from '../types';
import MapPicker from './MapPicker';
import NavigationLinks from './NavigationLinks';
import { MapPin, User, Phone, Home, ArrowDown } from 'lucide-react';

interface Props {
  onAdd: (order: CustomerOrder) => void;
}

// Default center (Tehran)
const DEFAULT_CENTER: Location = { lat: 35.6892, lng: 51.3890 };

const CustomerOrderForm: React.FC<Props> = ({ onAdd }) => {
  const [formData, setFormData] = useState({
    customerName: '',
    phone: '',
    address: '',
  });
  const [location, setLocation] = useState<Location>(DEFAULT_CENTER);
  const [manualInput, setManualInput] = useState({ lat: '', lng: '' });

  const handleManualLocationUpdate = () => {
    const lat = parseFloat(manualInput.lat);
    const lng = parseFloat(manualInput.lng);
    if (!isNaN(lat) && !isNaN(lng)) {
      setLocation({ lat, lng });
    }
  };

  const handleMapSelection = (loc: Location) => {
    setLocation(loc);
    setManualInput({ lat: loc.lat.toFixed(6), lng: loc.lng.toFixed(6) });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.customerName || !formData.phone) return;

    const newOrder: CustomerOrder = {
      id: Date.now().toString(),
      ...formData,
      location,
      createdAt: new Date(),
    };

    onAdd(newOrder);
    setFormData({ customerName: '', phone: '', address: '' });
    alert('سفارش مشتری با موفقیت ثبت شد!');
  };

  return (
    <div className="bg-white p-4 lg:p-6 rounded-xl shadow-sm border border-gray-100 h-full flex flex-col">
      <div className="flex items-center gap-3 mb-4 lg:mb-6 border-b pb-4">
        <div className="bg-green-100 p-2 rounded-lg">
          <MapPin className="w-6 h-6 text-green-600" />
        </div>
        <h2 className="text-lg lg:text-xl font-bold text-gray-800">ثبت سفارش جدید</h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-full overflow-y-auto">
        
        {/* Mobile: Form comes first for quick entry */}
        {/* Desktop: Form on right (order-2), Map on left (order-1) */}
        
        <form onSubmit={handleSubmit} className="order-1 lg:order-2 space-y-4">
           <div className="space-y-1.5">
            <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
              <User className="w-4 h-4 text-gray-400" />
              نام مشتری
            </label>
            <input
              type="text"
              required
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all outline-none bg-gray-50 focus:bg-white"
              value={formData.customerName}
              onChange={(e) => setFormData({ ...formData, customerName: e.target.value })}
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
              <Phone className="w-4 h-4 text-gray-400" />
              تلفن تماس
            </label>
            <input
              type="tel"
              required
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all outline-none bg-gray-50 focus:bg-white"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
              <Home className="w-4 h-4 text-gray-400" />
              آدرس دقیق
            </label>
            <textarea
              required
              rows={3}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all outline-none resize-none bg-gray-50 focus:bg-white"
              placeholder="خیابان اصلی، کوچه..."
              value={formData.address}
              onChange={(e) => setFormData({ ...formData, address: e.target.value })}
            />
          </div>

          {/* Mobile only hint */}
          <div className="lg:hidden flex items-center gap-2 text-xs text-brand-600 font-medium my-2">
            <ArrowDown className="w-4 h-4 animate-bounce" />
            <span>تعیین موقعیت روی نقشه (پایین)</span>
          </div>

          <button
            type="submit"
            className="w-full bg-green-600 text-white py-3.5 rounded-xl font-bold hover:bg-green-700 transition-colors shadow-lg shadow-green-500/30 text-base"
          >
            ثبت نهایی سفارش
          </button>
        </form>

        {/* Map Section */}
        <div className="order-2 lg:order-1 flex flex-col gap-4 pb-8 lg:pb-0">
          <div className="relative w-full rounded-xl overflow-hidden shadow-md border border-gray-200" style={{ minHeight: '40vh' }}>
            <div className="absolute inset-0">
               <MapPicker location={location} onLocationSelect={handleMapSelection} />
            </div>
          </div>
          
          {/* Manual Input - Collapsible on mobile could be better but kept simple */}
          <div className="bg-gray-50 p-3 rounded-lg border border-gray-200">
            <p className="text-xs text-gray-500 mb-2">مختصات جغرافیایی (اختیاری):</p>
            <div className="flex gap-2" dir="ltr">
              <input 
                type="number" 
                placeholder="Lat" 
                className="w-full p-2 rounded border text-center text-sm"
                value={manualInput.lat}
                onChange={(e) => setManualInput({...manualInput, lat: e.target.value})}
              />
              <input 
                type="number" 
                placeholder="Lng" 
                className="w-full p-2 rounded border text-center text-sm"
                value={manualInput.lng}
                onChange={(e) => setManualInput({...manualInput, lng: e.target.value})}
              />
              <button 
                type="button"
                onClick={handleManualLocationUpdate}
                className="bg-brand-600 text-white px-4 rounded text-sm font-medium"
              >
                Go
              </button>
            </div>
          </div>

          <NavigationLinks location={location} />
        </div>

      </div>
    </div>
  );
};

export default CustomerOrderForm;