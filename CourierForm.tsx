import React, { useState } from 'react';
import { Courier } from '../types';
import { Bike, User, FileText, Phone } from 'lucide-react';

interface Props {
  onAdd: (courier: Courier) => void;
}

const CourierForm: React.FC<Props> = ({ onAdd }) => {
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    nationalId: '',
    plateNumber: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName || !formData.phone) return;

    const newCourier: Courier = {
      id: Date.now().toString(),
      ...formData,
      vehicleType: 'motorcycle',
      status: 'active',
    };

    onAdd(newCourier);
    setFormData({ fullName: '', phone: '', nationalId: '', plateNumber: '' });
    alert('سفیر با موفقیت ثبت شد!');
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
      <div className="flex items-center gap-3 mb-6 border-b pb-4">
        <div className="bg-brand-100 p-2 rounded-lg">
          <Bike className="w-6 h-6 text-brand-600" />
        </div>
        <h2 className="text-xl font-bold text-gray-800">ثبت نام سفیر موتور سوار</h2>
      </div>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
            <User className="w-4 h-4 text-gray-400" />
            نام و نام خانوادگی
          </label>
          <input
            type="text"
            required
            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-brand-500 focus:border-brand-500 transition-all outline-none"
            placeholder="مثال: علی رضایی"
            value={formData.fullName}
            onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
             <Phone className="w-4 h-4 text-gray-400" />
             شماره موبایل
          </label>
          <input
            type="tel"
            required
            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-brand-500 focus:border-brand-500 transition-all outline-none"
            placeholder="0912..."
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
            <FileText className="w-4 h-4 text-gray-400" />
            کد ملی
          </label>
          <input
            type="text"
            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-brand-500 focus:border-brand-500 transition-all outline-none"
            value={formData.nationalId}
            onChange={(e) => setFormData({ ...formData, nationalId: e.target.value })}
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
            <Bike className="w-4 h-4 text-gray-400" />
            پلاک موتور
          </label>
          <input
            type="text"
            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-brand-500 focus:border-brand-500 transition-all outline-none text-center tracking-widest"
            placeholder="123 - 45678"
            value={formData.plateNumber}
            onChange={(e) => setFormData({ ...formData, plateNumber: e.target.value })}
          />
        </div>

        <div className="md:col-span-2 pt-4">
          <button
            type="submit"
            className="w-full bg-brand-600 text-white py-3 rounded-xl font-bold hover:bg-brand-700 transition-colors shadow-lg shadow-brand-500/30 active:scale-95"
          >
            ثبت اطلاعات سفیر
          </button>
        </div>
      </form>
    </div>
  );
};

export default CourierForm;
