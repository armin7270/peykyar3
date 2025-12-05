import React, { useState, useEffect } from 'react';
import CourierForm from './components/CourierForm';
import CustomerOrderForm from './components/CustomerOrderForm';
import { Courier, CustomerOrder } from './types';
import NavigationLinks from './components/NavigationLinks';
import { LayoutDashboard, UserPlus, MapPin, Package, Menu, X, Phone, Minimize2, Maximize2 } from 'lucide-react';

function App() {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'add-courier' | 'add-order'>('add-order');
  const [couriers, setCouriers] = useState<Courier[]>([]);
  const [orders, setOrders] = useState<CustomerOrder[]>([]);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isMobileMode, setIsMobileMode] = useState(false);
  const [wpAdminBarHeight, setWpAdminBarHeight] = useState(0);

  // تشخیص سایز صفحه و نوار ادمین وردپرس
  useEffect(() => {
    const handleResize = () => {
      setIsMobileMode(window.innerWidth < 1024);
      
      // بررسی وجود نوار ادمین وردپرس
      const adminBar = document.getElementById('wpadminbar');
      if (adminBar && window.innerWidth < 783) { // 783px نقطه شکست موبایل وردپرس
         setWpAdminBarHeight(46); // ارتفاع استاندارد در موبایل
      } else if (adminBar) {
         setWpAdminBarHeight(32); // ارتفاع استاندارد در دسکتاپ
      } else {
         setWpAdminBarHeight(0);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleAddCourier = (c: Courier) => {
    setCouriers([...couriers, c]);
    setActiveTab('dashboard');
  };

  const handleAddOrder = (o: CustomerOrder) => {
    setOrders([...orders, o]);
    setActiveTab('dashboard');
  };

  const NavItem = ({ id, label, icon: Icon }: { id: typeof activeTab, label: string, icon: any }) => (
    <button
      onClick={() => {
        setActiveTab(id);
        setSidebarOpen(false);
      }}
      className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-medium ${
        activeTab === id 
        ? 'bg-brand-50 text-brand-700 shadow-sm' 
        : 'text-gray-600 hover:bg-gray-100'
      }`}
    >
      <Icon className={`w-5 h-5 ${activeTab === id ? 'text-brand-600' : 'text-gray-400'}`} />
      {label}
    </button>
  );

  return (
    <div 
      className={`
        font-sans text-right bg-gray-50 flex overflow-hidden transition-all duration-300
        ${isMobileMode 
          ? 'fixed inset-x-0 bottom-0 z-[9999]' // حالت موبایل: فیکس شده اما با فاصله از بالا برای ادمین بار
          : 'relative w-full h-[800px] border border-gray-200 rounded-2xl shadow-xl' 
        }
      `} 
      style={{ 
        top: isMobileMode ? `${wpAdminBarHeight}px` : 'auto',
        height: isMobileMode ? `calc(100vh - ${wpAdminBarHeight}px)` : '800px'
      }}
      dir="rtl"
    >
      
      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div 
          className="absolute inset-0 bg-black/50 z-[2000] lg:hidden backdrop-blur-sm"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`
        absolute lg:static inset-y-0 right-0 z-[2001] w-72 bg-white border-l border-gray-200 shadow-2xl lg:shadow-none transform transition-transform duration-300 ease-in-out
        ${sidebarOpen ? 'translate-x-0' : 'translate-x-full lg:translate-x-0'}
      `}>
        <div className="p-6 border-b border-gray-100 flex items-center justify-between h-20">
          <div className="flex items-center gap-3">
             <div className="w-10 h-10 bg-brand-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-brand-500/30">
               <MapPin className="w-6 h-6" />
             </div>
             <div>
               <h1 className="font-bold text-lg text-gray-800">پیک‌ یار</h1>
               <p className="text-xs text-gray-500">پنل مدیریت</p>
             </div>
          </div>
          <button onClick={() => setSidebarOpen(false)} className="lg:hidden p-2 hover:bg-gray-100 rounded-full text-gray-500">
            <X className="w-6 h-6" />
          </button>
        </div>

        <nav className="p-4 space-y-2 overflow-y-auto h-[calc(100%-140px)]">
          <NavItem id="dashboard" label="داشبورد و لیست‌ها" icon={LayoutDashboard} />
          <NavItem id="add-order" label="ثبت سفارش جدید" icon={Package} />
          <NavItem id="add-courier" label="ثبت نام سفیر" icon={UserPlus} />
        </nav>
        
        <div className="absolute bottom-0 w-full p-4 border-t border-gray-100 bg-white">
           <div className="bg-gray-50 p-3 rounded-xl border border-gray-100 text-center">
              <p className="text-xs text-gray-500">نسخه موبایل بهینه شده</p>
           </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col h-full overflow-hidden relative w-full">
        {/* Header */}
        <header className="bg-white border-b border-gray-200 h-16 flex items-center justify-between px-4 shrink-0 shadow-sm z-10">
          <div className="flex items-center gap-3">
            <button 
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden p-2 text-gray-600 hover:bg-gray-100 rounded-lg active:scale-95 transition-transform"
            >
              <Menu className="w-6 h-6" />
            </button>
            <span className="font-bold text-gray-700 lg:hidden">
              {activeTab === 'dashboard' && 'داشبورد'}
              {activeTab === 'add-order' && 'ثبت سفارش'}
              {activeTab === 'add-courier' && 'ثبت سفیر'}
            </span>
          </div>
          
          <div className="flex items-center gap-3">
            {/* دکمه خروج از حالت تمام صفحه برای موبایل (اختیاری اگر بخواهید به سایت برگردید) */}
            {isMobileMode && (
               <button 
                 onClick={() => window.history.back()}
                 className="text-xs bg-gray-100 text-gray-600 px-3 py-1.5 rounded-full flex items-center gap-1"
               >
                 بازگشت
               </button>
            )}
            
            <div className="hidden sm:flex items-center gap-4">
              <span className="text-sm text-gray-500">مدیر سیستم</span>
              <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                <UserPlus className="w-4 h-4 text-gray-500" />
              </div>
            </div>
          </div>
        </header>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-3 lg:p-6 bg-slate-50 scroll-smooth">
          <div className="max-w-6xl mx-auto h-full pb-20 lg:pb-0">
            {activeTab === 'add-courier' && <CourierForm onAdd={handleAddCourier} />}
            
            {activeTab === 'add-order' && <CustomerOrderForm onAdd={handleAddOrder} />}
            
            {activeTab === 'dashboard' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                   <h2 className="text-xl lg:text-2xl font-bold text-gray-800">داشبورد وضعیت</h2>
                </div>
                
                {/* Stats */}
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3 lg:gap-4">
                  <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
                     <span className="text-gray-500 text-xs lg:text-sm">سفارشات</span>
                     <p className="text-2xl lg:text-3xl font-bold text-brand-600 mt-2">{orders.length}</p>
                  </div>
                  <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
                     <span className="text-gray-500 text-xs lg:text-sm">سفیران</span>
                     <p className="text-2xl lg:text-3xl font-bold text-green-600 mt-2">{couriers.length}</p>
                  </div>
                </div>

                {/* Orders List */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                  <div className="p-4 border-b border-gray-100 bg-gray-50">
                    <h3 className="font-bold text-gray-700 text-sm lg:text-base">آخرین سفارشات</h3>
                  </div>
                  {orders.length === 0 ? (
                    <div className="p-8 text-center text-gray-400 text-sm">هنوز سفارشی ثبت نشده است</div>
                  ) : (
                    <div className="divide-y divide-gray-100">
                      {orders.map((order) => (
                        <div key={order.id} className="p-4 hover:bg-gray-50 transition-colors flex flex-col gap-3">
                          <div className="flex justify-between items-start">
                            <div>
                               <div className="flex items-center gap-2">
                                  <h4 className="font-bold text-gray-800">{order.customerName}</h4>
                               </div>
                               <p className="text-sm text-gray-500 mt-1 flex items-center gap-1">
                                  <Phone className="w-3 h-3" /> <a href={`tel:${order.phone}`}>{order.phone}</a>
                               </p>
                            </div>
                            <span className="text-xs bg-gray-100 text-gray-500 px-2 py-1 rounded-md">{order.createdAt.toLocaleTimeString('fa-IR', {hour: '2-digit', minute:'2-digit'})}</span>
                          </div>
                          
                          <p className="text-xs text-gray-600 bg-gray-50 p-2 rounded border border-gray-100">{order.address}</p>
                          
                          <div className="pt-2 border-t border-gray-50">
                            <NavigationLinks location={order.location} compact />
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Couriers List */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                  <div className="p-4 border-b border-gray-100 bg-gray-50">
                    <h3 className="font-bold text-gray-700 text-sm lg:text-base">لیست سفیران</h3>
                  </div>
                   {couriers.length === 0 ? (
                    <div className="p-8 text-center text-gray-400 text-sm">هنوز سفیری ثبت نشده است</div>
                  ) : (
                    <div className="divide-y divide-gray-100">
                      {couriers.map((courier) => (
                        <div key={courier.id} className="p-4 flex items-center justify-between">
                          <div className="flex items-center gap-3">
                             <div className="w-10 h-10 bg-brand-100 rounded-full flex items-center justify-center text-brand-600 font-bold shrink-0">
                               {courier.fullName.charAt(0)}
                             </div>
                             <div className="overflow-hidden">
                               <h4 className="font-bold text-gray-800 text-sm truncate">{courier.fullName}</h4>
                               <p className="text-xs text-gray-500 truncate">{courier.plateNumber}</p>
                             </div>
                          </div>
                          <a href={`tel:${courier.phone}`} className="p-2 bg-green-50 text-green-600 rounded-full">
                            <Phone className="w-4 h-4" />
                          </a>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;