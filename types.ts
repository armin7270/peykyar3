export interface Location {
  lat: number;
  lng: number;
}

export interface Courier {
  id: string;
  fullName: string;
  nationalId: string;
  phone: string;
  plateNumber: string;
  vehicleType: 'motorcycle' | 'car' | 'van';
  status: 'active' | 'inactive' | 'busy';
}

export interface CustomerOrder {
  id: string;
  customerName: string;
  phone: string;
  address: string;
  location: Location;
  assignedCourierId?: string;
  createdAt: Date;
}
