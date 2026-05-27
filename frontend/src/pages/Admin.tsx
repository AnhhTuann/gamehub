import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  LayoutDashboard, 
  ShoppingCart, 
  Package, 
  Archive, 
  Users, 
  UserCircle, 
  Ticket, 
  Settings, 
  Search, 
  Bell, 
  Menu,
  X,
  ArrowUpRight,
  ArrowDownRight
} from 'lucide-react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from 'recharts';
import { dummyProducts } from '../data/products';

const salesData = [
  { name: '1', revenue: 4000 },
  { name: '5', revenue: 3000 },
  { name: '10', revenue: 5000 },
  { name: '15', revenue: 4500 },
  { name: '20', revenue: 6000 },
  { name: '25', revenue: 5800 },
  { name: '30', revenue: 7500 },
];

const RECENT_ORDERS = [
  { id: 'ORD-001', customer: 'Sophia Chen', date: '2026-05-27', total: 450.00, status: 'Shipped' },
  { id: 'ORD-002', customer: 'Marcus Wright', date: '2026-05-26', total: 1250.00, status: 'Pending' },
  { id: 'ORD-003', customer: 'Elena Rodriguez', date: '2026-05-26', total: 85.00, status: 'Shipped' },
  { id: 'ORD-004', customer: 'David Kim', date: '2026-05-25', total: 320.00, status: 'Cancelled' },
  { id: 'ORD-005', customer: 'Olivia Martinez', date: '2026-05-25', total: 890.00, status: 'Shipped' },
];

const STAFF = [
  { id: 'EMP-01', name: 'Sarah Miller', role: 'Admin', lastLogin: '2 mins ago', status: 'Active' },
  { id: 'EMP-02', name: 'James Wilson', role: 'Manager', lastLogin: '1 hour ago', status: 'Active' },
  { id: 'EMP-03', name: 'Emily Davis', role: 'Editor', lastLogin: '3 days ago', status: 'Offline' },
  { id: 'EMP-04', name: 'Michael Brown', role: 'Editor', lastLogin: '1 week ago', status: 'On Leave' },
];

const LOW_STOCK = dummyProducts.slice(0, 4).map((p, i) => ({ ...p, stock: i + 1 }));

const StatusBadge = ({ status }: { status: string }) => {
  const styles = {
    Shipped: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
    Pending: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
    Cancelled: 'bg-rose-500/10 text-rose-400 border-rose-500/20',
  }[status] || 'bg-zinc-500/10 text-zinc-400 border-zinc-500/20';

  return (
    <span className={`px-3 py-1 rounded-full text-xs font-semibold tracking-wider uppercase border ${styles}`}>
      {status}
    </span>
  );
};

export const Admin = () => {
  const [activeMenu, setActiveMenu] = useState('Dashboard');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const menuItems = [
    { id: 'Dashboard', icon: LayoutDashboard },
    { id: 'Orders', icon: ShoppingCart },
    { id: 'Products', icon: Package },
    { id: 'Inventory', icon: Archive },
    { id: 'Customers', icon: Users },
    { id: 'Staff', icon: UserCircle },
    { id: 'Promotions', icon: Ticket },
    { id: 'Settings', icon: Settings },
  ];

  const renderDashboard = () => (
    <div className="flex flex-col gap-8">
      {/* Analytics Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: 'Total Revenue', value: '$124,500', trend: '+12.5%', isUp: true },
          { label: 'Orders', value: '1,245', trend: '+8.2%', isUp: true },
          { label: 'New Customers', value: '342', trend: '-2.4%', isUp: false },
          { label: 'Conversion Rate', value: '3.2%', trend: '+1.1%', isUp: true },
        ].map((stat, idx) => (
          <div key={idx} className="bg-zinc-900 border border-zinc-800 p-6 flex flex-col gap-4">
            <span className="text-zinc-400 text-sm font-medium tracking-wide uppercase">{stat.label}</span>
            <div className="flex items-end justify-between">
              <span className="text-white text-3xl font-bold tracking-wider">{stat.value}</span>
              <div className={`flex items-center gap-1 text-sm font-medium ${stat.isUp ? 'text-emerald-400' : 'text-rose-400'}`}>
                {stat.isUp ? <ArrowUpRight className="w-4 h-4" /> : <ArrowDownRight className="w-4 h-4" />}
                {stat.trend}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Sales Trend Chart */}
      <div className="bg-zinc-900 border border-zinc-800 p-6 flex flex-col gap-6">
        <h3 className="font-serif text-2xl font-bold text-white tracking-wide">Sales Overview (30 Days)</h3>
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={salesData} margin={{ top: 10, right: 0, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#27272a" />
              <XAxis dataKey="name" stroke="#52525b" tick={{ fill: '#a1a1aa', fontSize: 12 }} axisLine={false} tickLine={false} />
              <YAxis stroke="#52525b" tick={{ fill: '#a1a1aa', fontSize: 12 }} axisLine={false} tickLine={false} tickFormatter={(value) => `$${value}`} />
              <Tooltip 
                contentStyle={{ backgroundColor: '#18181b', borderColor: '#27272a', color: '#fff' }}
                itemStyle={{ color: '#10b981' }}
              />
              <Area type="monotone" dataKey="revenue" stroke="#10b981" strokeWidth={3} fillOpacity={1} fill="url(#colorRevenue)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        {/* Order Management Table */}
        <div className="xl:col-span-2 bg-zinc-900 border border-zinc-800 p-6 flex flex-col gap-6 overflow-hidden">
          <div className="flex items-center justify-between">
            <h3 className="font-serif text-2xl font-bold text-white tracking-wide">Recent Orders</h3>
            <button className="text-zinc-400 hover:text-white text-sm font-medium uppercase tracking-wider transition-colors">
              View All
            </button>
          </div>
          <div className="overflow-x-auto custom-scrollbar">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-zinc-800 text-zinc-400 text-xs font-semibold uppercase tracking-widest bg-zinc-900/50">
                  <th className="py-4 px-4 font-medium">Order ID</th>
                  <th className="py-4 px-4 font-medium">Customer</th>
                  <th className="py-4 px-4 font-medium">Date</th>
                  <th className="py-4 px-4 font-medium">Total</th>
                  <th className="py-4 px-4 font-medium text-right">Status</th>
                </tr>
              </thead>
              <tbody>
                {RECENT_ORDERS.map((order, idx) => (
                  <tr key={order.id} className={`group border-b border-zinc-800/50 hover:bg-zinc-800/20 transition-colors duration-300 ${idx === RECENT_ORDERS.length - 1 ? 'border-none' : ''}`}>
                    <td className="py-4 px-4 font-mono text-zinc-300 text-sm">{order.id}</td>
                    <td className="py-4 px-4 text-white font-medium text-sm whitespace-pre-wrap">{order.customer}</td>
                    <td className="py-4 px-4 text-zinc-400 text-sm whitespace-nowrap">{order.date}</td>
                    <td className="py-4 px-4 text-zinc-200 text-sm">${order.total.toFixed(2)}</td>
                    <td className="py-4 px-4 text-right">
                      <StatusBadge status={order.status} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Low Stock Alerts */}
        <div className="bg-zinc-900 border border-zinc-800 p-6 flex flex-col gap-6">
          <h3 className="font-serif text-2xl font-bold text-white tracking-wide">Low Stock Alert</h3>
          <div className="flex flex-col gap-6 overflow-y-auto custom-scrollbar">
            {LOW_STOCK.map((item) => (
              <div key={item.id} className="flex gap-4 group">
                <div className="w-16 h-16 shrink-0 aspect-square bg-zinc-800 overflow-hidden">
                  <img src={item.imageUrl} alt={item.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                </div>
                <div className="flex flex-col justify-center flex-grow">
                  <h4 className="text-zinc-200 text-sm font-medium leading-snug whitespace-pre-wrap">{item.name}</h4>
                  <div className="flex items-center justify-between mt-2">
                    <span className="text-rose-400 text-xs font-bold tracking-wider">{item.stock} left in stock</span>
                  </div>
                </div>
                <div className="flex flex-col justify-center">
                  <button className="text-xs bg-white text-black font-semibold uppercase tracking-wider px-3 py-2 hover:bg-zinc-200 transition-colors">
                    Restock
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const renderStaff = () => (
    <div className="flex flex-col gap-8">
      <div className="bg-zinc-900 border border-zinc-800 p-6 flex flex-col gap-6 overflow-hidden">
        <div className="flex items-center justify-between">
          <h3 className="font-serif text-2xl font-bold text-white tracking-wide">Staff Management</h3>
          <button className="bg-white text-black text-sm font-semibold uppercase tracking-wider px-4 py-2 hover:bg-zinc-200 transition-colors">
            Add Staff
          </button>
        </div>
        <div className="overflow-x-auto custom-scrollbar">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-zinc-800 text-zinc-400 text-xs font-semibold uppercase tracking-widest bg-zinc-900/50">
                <th className="py-4 px-4 font-medium">Employee Name</th>
                <th className="py-4 px-4 font-medium">Role</th>
                <th className="py-4 px-4 font-medium">Last Login</th>
                <th className="py-4 px-4 font-medium text-right">Status</th>
              </tr>
            </thead>
            <tbody>
              {STAFF.map((emp, idx) => (
                <tr key={emp.id} className={`group border-b border-zinc-800/50 hover:bg-zinc-800/20 transition-colors duration-300 ${idx === STAFF.length - 1 ? 'border-none' : ''}`}>
                  <td className="py-4 px-4 text-white font-medium text-sm whitespace-pre-wrap">{emp.name}</td>
                  <td className="py-4 px-4 text-zinc-300 text-sm whitespace-nowrap">{emp.role}</td>
                  <td className="py-4 px-4 text-zinc-400 text-sm whitespace-nowrap">{emp.lastLogin}</td>
                  <td className="py-4 px-4 text-right">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold tracking-wider uppercase border ${
                      emp.status === 'Active' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' : 
                      emp.status === 'Offline' ? 'bg-zinc-500/10 text-zinc-400 border-zinc-500/20' : 
                      'bg-amber-500/10 text-amber-400 border-amber-500/20'
                    }`}>
                      {emp.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#0A0A0A] flex flex-col md:flex-row font-sans">
      
      {/* Mobile Header (Visible only on small screens) */}
      <div className="md:hidden flex items-center justify-between p-4 border-b border-zinc-800 bg-[#0A0A0A] z-40 sticky top-0">
        <h1 className="font-serif text-xl font-bold text-white tracking-wide">OmniWear Admin</h1>
        <button className="text-zinc-400 hover:text-white transition-colors" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
          {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Sidebar Overlay (Mobile) */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={() => setIsMobileMenuOpen(false)}
            className="fixed inset-0 bg-black/60 z-40 md:hidden backdrop-blur-sm"
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <aside className={`
        fixed md:static inset-y-0 left-0 z-50 w-64 bg-zinc-900/50 backdrop-blur-md border-r border-zinc-800 transform transition-transform duration-300 ease-in-out flex flex-col
        ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
      `}>
        <div className="p-6 hidden md:block">
          <h1 className="font-serif text-2xl font-bold text-white tracking-wide mb-1">OmniWear Admin</h1>
          <span className="text-zinc-500 text-xs uppercase tracking-widest font-semibold">Management Console</span>
        </div>
        
        <nav className="flex-1 py-6 md:py-4 px-4 flex flex-col gap-2 overflow-y-auto custom-scrollbar">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeMenu === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  setActiveMenu(item.id);
                  setIsMobileMenuOpen(false);
                }}
                className={`flex items-center gap-3 px-4 py-3 text-sm font-medium transition-all duration-300 w-full text-left
                  ${isActive 
                    ? 'bg-white text-black' 
                    : 'text-zinc-400 hover:bg-zinc-800 hover:text-white'}
                `}
              >
                <Icon className={`w-5 h-5 ${isActive ? 'text-black' : 'text-zinc-500'}`} />
                {item.id}
              </button>
            );
          })}
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0">
        {/* Top Header */}
        <header className="sticky top-0 z-30 bg-[#0A0A0A]/90 backdrop-blur-md border-b border-zinc-800 px-6 sm:px-8 py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <h2 className="font-serif text-2xl md:text-3xl font-bold text-white tracking-wide hidden md:block">{activeMenu}</h2>
          
          <div className="flex items-center gap-6 self-end sm:self-auto w-full sm:w-auto justify-end">
            <div className="relative group w-full sm:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
              <input 
                type="text" 
                placeholder="Search anything..." 
                className="w-full bg-zinc-900 border border-zinc-800 text-sm text-white pl-10 pr-4 py-2.5 focus:border-white focus:ring-1 focus:ring-white focus:outline-none transition-all placeholder:text-zinc-600"
              />
            </div>
            <button className="relative text-zinc-400 hover:text-white transition-colors p-1 hidden sm:block">
              <Bell className="w-5 h-5" />
              <span className="absolute top-0 right-0 w-2 h-2 bg-rose-500 rounded-full border border-[#0A0A0A]"></span>
            </button>
            <div className="hidden sm:flex items-center gap-3 pl-6 border-l border-zinc-800">
              <div className="flex flex-col items-end">
                <span className="text-sm font-bold text-white">Admin User</span>
                <span className="text-xs text-zinc-500 tracking-wider">Superadmin</span>
              </div>
              <div className="w-10 h-10 rounded-none bg-zinc-800 overflow-hidden">
                <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop" alt="Admin" className="w-full h-full object-cover" />
              </div>
            </div>
          </div>
        </header>

        {/* Scrollable Content Area */}
        <div className="p-6 sm:p-8 flex-1 overflow-y-auto custom-scrollbar">
          <div className="max-w-7xl mx-auto w-full">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeMenu}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
              >
                {activeMenu === 'Dashboard' && renderDashboard()}
                {activeMenu === 'Staff' && renderStaff()}
                {activeMenu !== 'Dashboard' && activeMenu !== 'Staff' && (
                  <div className="bg-zinc-900 border border-zinc-800 p-12 text-center flex flex-col items-center justify-center min-h-[400px]">
                    <Package className="w-12 h-12 text-zinc-700 mb-4" />
                    <h3 className="font-serif text-2xl text-white mb-2">{activeMenu} Module</h3>
                    <p className="text-zinc-500">This module is currently under development.</p>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </main>

    </div>
  );
};
