import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  LayoutDashboard, 
  ShoppingCart, 
  Package, 
  Users, 
  Settings as SettingsIcon, 
  Search, 
  Plus, 
  Edit, 
  Trash2, 
  Gamepad2, 
  X, 
  TrendingUp, 
  ShieldAlert, 
  Coins, 
  Activity, 
  Server, 
  RefreshCw, 
  Check, 
  ArrowUpRight, 
  ArrowDownRight,
  Menu
} from 'lucide-react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip as RechartsTooltip, 
  ResponsiveContainer 
} from 'recharts';

// Define the interface for Game
interface Game {
  id: string;
  title: string;
  category: string;
  price: number;
  status: 'Active' | 'Draft';
  coverGradient: string;
}

// Initial Mock Games Data
const INITIAL_GAMES: Game[] = [
  { id: '1', title: 'Chrono Trigger Reborn', category: 'RPG', price: 14.99, status: 'Active', coverGradient: 'from-[#bd93f9] to-[#ff79c6]' },
  { id: '2', title: 'Street Fighter II: Turbo', category: 'Fighting', price: 9.99, status: 'Active', coverGradient: 'from-[#ff5555] to-[#ffb86c]' },
  { id: '3', title: 'Super Mario World 8-Bit', category: 'Platformer', price: 19.99, status: 'Active', coverGradient: 'from-[#50fa7b] to-[#8be9fd]' },
  { id: '4', title: 'Metroid Prime: Retro Edition', category: 'Adventure', price: 29.99, status: 'Draft', coverGradient: 'from-[#ffb86c] to-[#ff5555]' },
  { id: '5', title: 'Castlevania: Symphony', category: 'Metroidvania', price: 15.99, status: 'Active', coverGradient: 'from-[#8be9fd] to-[#bd93f9]' },
];

// Available gradients for covers in form
const GRADIENTS = [
  { label: 'Dracula Purple', value: 'from-[#bd93f9] to-[#ff79c6]' },
  { label: 'Acid Cyber', value: 'from-[#50fa7b] to-[#8be9fd]' },
  { label: 'Sunset Neon', value: 'from-[#ffb86c] to-[#ff5555]' },
  { label: 'Vortex Cyan', value: 'from-[#8be9fd] to-[#bd93f9]' },
];

export const Admin = () => {
  const [activeMenu, setActiveMenu] = useState('Catalog');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [games, setGames] = useState<Game[]>(INITIAL_GAMES);
  const [searchQuery, setSearchQuery] = useState('');

  // Modals state
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [selectedGame, setSelectedGame] = useState<Game | null>(null);

  // Form states (Add/Edit)
  const [formTitle, setFormTitle] = useState('');
  const [formCategory, setFormCategory] = useState('');
  const [formPrice, setFormPrice] = useState('');
  const [formStatus, setFormStatus] = useState<'Active' | 'Draft'>('Active');
  const [formGradient, setFormGradient] = useState('from-[#bd93f9] to-[#ff79c6]');

  // Handlers
  const handleOpenAdd = () => {
    setFormTitle('');
    setFormCategory('');
    setFormPrice('');
    setFormStatus('Active');
    setFormGradient('from-[#bd93f9] to-[#ff79c6]');
    setIsAddOpen(true);
  };

  const handleAddGame = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formTitle || !formCategory || !formPrice) return;
    
    const newGame: Game = {
      id: Date.now().toString(),
      title: formTitle,
      category: formCategory,
      price: parseFloat(formPrice) || 0,
      status: formStatus,
      coverGradient: formGradient
    };

    setGames([newGame, ...games]);
    setIsAddOpen(false);
  };

  const handleOpenEdit = (game: Game) => {
    setSelectedGame(game);
    setFormTitle(game.title);
    setFormCategory(game.category);
    setFormPrice(game.price.toString());
    setFormStatus(game.status);
    setFormGradient(game.coverGradient);
    setIsEditOpen(true);
  };

  const handleSaveEdit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedGame || !formTitle || !formCategory || !formPrice) return;

    setGames(games.map(g => g.id === selectedGame.id ? {
      ...g,
      title: formTitle,
      category: formCategory,
      price: parseFloat(formPrice) || 0,
      status: formStatus,
      coverGradient: formGradient
    } : g));

    setIsEditOpen(false);
    setSelectedGame(null);
  };

  const handleOpenDelete = (game: Game) => {
    setSelectedGame(game);
    setIsDeleteOpen(true);
  };

  const handleConfirmDelete = () => {
    if (!selectedGame) return;
    setGames(games.filter(g => g.id !== selectedGame.id));
    setIsDeleteOpen(false);
    setSelectedGame(null);
  };

  const filteredGames = games.filter(game => 
    game.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
    game.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Mock Overview Sales Data
  const overviewSalesData = [
    { name: 'W1', sales: 4200 },
    { name: 'W2', sales: 5900 },
    { name: 'W3', sales: 4800 },
    { name: 'W4', sales: 8100 },
    { name: 'W5', sales: 6500 },
    { name: 'W6', sales: 9400 },
  ];

  return (
    <div className="min-h-screen bg-[#282a36] text-[#f8f8f2] flex flex-col md:flex-row font-sans">
      
      {/* Mobile Top Navbar */}
      <div className="md:hidden flex items-center justify-between p-4 bg-[#191a21] border-b border-[#6272a4]/30 z-30">
        <div className="flex items-center gap-2">
          <Gamepad2 className="w-6 h-6 text-[#bd93f9] animate-pulse" />
          <h1 className="font-['Press_Start_2P'] text-[10px] tracking-wider text-[#bd93f9]">GAMEHUB ADMIN</h1>
        </div>
        <button 
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="p-2 border border-[#6272a4]/40 rounded bg-[#44475a] text-[#f8f8f2] active:scale-95 transition-transform"
        >
          <Menu className="w-5 h-5" />
        </button>
      </div>

      {/* Sidebar Overlay (Mobile) */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsMobileMenuOpen(false)}
            className="fixed inset-0 bg-black/75 z-40 md:hidden backdrop-blur-sm"
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <aside className={`
        fixed md:static inset-y-0 left-0 z-50 w-64 bg-[#191a21] border-r-2 border-[#bd93f9]/20 transform transition-transform duration-300 ease-in-out flex flex-col justify-between shrink-0
        ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
      `}>
        <div>
          {/* Logo */}
          <div className="p-6 border-b border-[#6272a4]/20 flex items-center gap-3">
            <div className="w-8 h-8 rounded bg-gradient-to-br from-[#bd93f9] to-[#ff79c6] flex items-center justify-center shadow-[0_0_15px_rgba(189,147,249,0.4)]">
              <Gamepad2 className="w-5 h-5 text-[#191a21]" />
            </div>
            <div>
              <h1 className="font-['Press_Start_2P'] text-[9px] leading-tight text-[#bd93f9] tracking-wider">GAMEHUB</h1>
              <span className="text-[10px] text-[#ff79c6] font-bold tracking-widest uppercase">ADMIN PANEL</span>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="p-4 flex flex-col gap-2">
            {[
              { id: 'Overview', icon: LayoutDashboard },
              { id: 'Catalog', icon: Package },
              { id: 'Orders', icon: ShoppingCart },
              { id: 'Customers', icon: Users },
              { id: 'Settings', icon: SettingsIcon }
            ].map((item) => {
              const Icon = item.icon;
              const isActive = activeMenu === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveMenu(item.id);
                    setIsMobileMenuOpen(false);
                  }}
                  className={`flex items-center gap-3 w-full px-4 py-3 rounded-lg text-sm font-semibold tracking-wide transition-all duration-200 relative group overflow-hidden
                    ${isActive 
                      ? 'text-[#bd93f9] bg-[#44475a]/45 border-l-4 border-[#bd93f9] shadow-[inset_4px_0_0_rgba(189,147,249,0.2)]' 
                      : 'text-[#6272a4] hover:text-[#ff79c6] hover:bg-[#44475a]/25 border-l-4 border-transparent'}
                  `}
                >
                  <Icon className={`w-5 h-5 transition-transform duration-200 group-hover:scale-110 ${isActive ? 'text-[#bd93f9]' : 'text-[#6272a4] group-hover:text-[#ff79c6]'}`} />
                  <span>{item.id}</span>
                  {isActive && (
                    <span className="absolute right-3 w-1.5 h-1.5 rounded-full bg-[#bd93f9] shadow-[0_0_8px_#bd93f9]"></span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* User Info footer in Sidebar */}
        <div className="p-4 border-t border-[#6272a4]/20 bg-[#14151a] flex items-center gap-3">
          <div className="w-9 h-9 rounded-full border border-[#bd93f9]/40 bg-[#282a36] overflow-hidden">
            <img 
              src="https://images.unsplash.com/photo-1566492031773-4f4e44671857?auto=format&fit=crop&w=80&h=80&q=80" 
              alt="Admin Avatar" 
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs font-bold text-[#f8f8f2] truncate">RetroAdmin_01</p>
            <p className="text-[10px] text-[#50fa7b] font-mono tracking-wider">ONLINE</p>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 p-6 md:p-8 flex flex-col min-w-0">
        
        {/* Dynamic Content Switching */}
        <AnimatePresence mode="wait">
          {activeMenu === 'Catalog' && (
            <motion.div
              key="catalog"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.25 }}
              className="flex flex-col gap-6"
            >
              {/* Header section */}
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                  <h2 className="font-['Press_Start_2P'] text-lg sm:text-2xl text-[#bd93f9] tracking-wider drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]">
                    INVENTORY MANAGEMENT
                  </h2>
                  <p className="text-xs text-[#6272a4] mt-1 tracking-wide font-medium">
                    Catalog database of current digital activation codes.
                  </p>
                </div>
                <div>
                  <button 
                    onClick={handleOpenAdd}
                    className="flex items-center gap-2 px-5 py-3 bg-[#bd93f9] hover:bg-[#ff79c6] text-[#282a36] font-bold text-xs rounded border-b-4 border-[#6272a4] active:border-b-0 active:translate-y-[4px] shadow-[0_4px_15px_rgba(189,147,249,0.3)] transition-all uppercase tracking-wider shrink-0"
                  >
                    <Plus className="w-4 h-4 text-[#282a36]" />
                    ADD NEW GAME
                  </button>
                </div>
              </div>

              {/* Search and Quick Filters bar */}
              <div className="bg-[#44475a]/30 border border-[#6272a4]/25 p-4 rounded-lg flex flex-col sm:flex-row gap-4 items-center">
                <div className="relative w-full">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-[#6272a4]" />
                  <input 
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search game by title or category..."
                    className="w-full bg-[#191a21] border border-[#6272a4]/30 rounded-md py-2.5 pl-10 pr-4 text-sm text-[#f8f8f2] focus:outline-none focus:border-[#ff79c6] focus:ring-1 focus:ring-[#ff79c6] placeholder-[#6272a4]/60 transition-colors"
                  />
                </div>
                <div className="flex gap-2 w-full sm:w-auto shrink-0 justify-end">
                  <span className="text-xs text-[#6272a4] hidden xl:inline font-mono">
                    SHOWING: {filteredGames.length} GAMES
                  </span>
                </div>
              </div>

              {/* Data Table */}
              <div className="border-2 border-[#6272a4]/40 rounded-lg overflow-hidden bg-[#282a36] shadow-[0_10px_25px_rgba(0,0,0,0.4)]">
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="border-b border-[#6272a4]/40 bg-[#191a21]/80 text-[#6272a4] text-xs font-bold uppercase tracking-wider">
                        <th className="py-4 px-6 font-semibold">COVER</th>
                        <th className="py-4 px-6 font-semibold">TITLE</th>
                        <th className="py-4 px-6 font-semibold">CATEGORY</th>
                        <th className="py-4 px-6 font-semibold">PRICE</th>
                        <th className="py-4 px-6 font-semibold">STATUS</th>
                        <th className="py-4 px-6 font-semibold text-center">ACTIONS</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#6272a4]/20">
                      {filteredGames.length > 0 ? (
                        filteredGames.map((game) => (
                          <tr key={game.id} className="hover:bg-[#44475a]/40 transition-colors group">
                            {/* COVER COLUMN */}
                            <td className="py-4 px-6">
                              <div className={`w-12 h-14 bg-gradient-to-br ${game.coverGradient} rounded-md border border-[#6272a4]/30 flex items-center justify-center shadow-[0_0_10px_rgba(189,147,249,0.15)] group-hover:scale-105 transition-transform duration-250`}>
                                <Gamepad2 className="w-6 h-6 text-[#282a36] opacity-80" />
                              </div>
                            </td>

                            {/* TITLE COLUMN */}
                            <td className="py-4 px-6">
                              <span className="font-bold text-[#f8f8f2] text-sm md:text-base tracking-wide block group-hover:text-[#ff79c6] transition-colors">
                                {game.title}
                              </span>
                              <span className="text-[10px] text-[#6272a4] font-mono tracking-wider block mt-0.5 uppercase">
                                ID: #{game.id}
                              </span>
                            </td>

                            {/* CATEGORY COLUMN */}
                            <td className="py-4 px-6">
                              <span className="px-2.5 py-1 rounded bg-[#44475a] text-[#f8f8f2] text-xs font-semibold tracking-wide">
                                {game.category}
                              </span>
                            </td>

                            {/* PRICE COLUMN */}
                            <td className="py-4 px-6 font-mono text-sm md:text-base font-bold text-[#50fa7b]">
                              ${game.price.toFixed(2)}
                            </td>

                            {/* STATUS COLUMN */}
                            <td className="py-4 px-6">
                              {game.status === 'Active' ? (
                                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-[#50fa7b] text-[#282a36] shadow-[0_0_8px_rgba(80,250,123,0.3)]">
                                  <span className="w-1.5 h-1.5 rounded-full bg-[#282a36] animate-pulse"></span>
                                  ACTIVE
                                </span>
                              ) : (
                                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-[#44475a] text-[#bfc5d6] border border-[#6272a4]/30">
                                  <span className="w-1.5 h-1.5 rounded-full bg-[#bfc5d6]"></span>
                                  DRAFT
                                </span>
                              )}
                            </td>

                            {/* ACTIONS COLUMN */}
                            <td className="py-4 px-6">
                              <div className="flex items-center justify-center gap-3">
                                <button 
                                  onClick={() => handleOpenEdit(game)}
                                  title="Edit Game"
                                  className="p-2 bg-[#44475a] border border-[#6272a4]/40 rounded hover:border-[#bd93f9] text-[#6272a4] hover:text-[#bd93f9] hover:shadow-[0_0_10px_rgba(189,147,249,0.3)] transition-all active:scale-95"
                                >
                                  <Edit className="w-4.5 h-4.5" />
                                </button>
                                <button 
                                  onClick={() => handleOpenDelete(game)}
                                  title="Delete Game"
                                  className="p-2 bg-[#44475a] border border-[#6272a4]/40 rounded hover:border-[#ff5555] text-[#6272a4] hover:text-[#ff5555] hover:shadow-[0_0_10px_rgba(255,85,85,0.3)] transition-all active:scale-95"
                                >
                                  <Trash2 className="w-4.5 h-4.5" />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan={6} className="py-12 text-center text-[#6272a4]">
                            <div className="flex flex-col items-center justify-center gap-2">
                              <Gamepad2 className="w-12 h-12 text-[#6272a4]/40 animate-bounce" />
                              <span className="text-sm font-semibold">NO MATCHING GAMES FOUND IN CART CATALOG.</span>
                              <span className="text-xs font-mono text-[#6272a4]/60">Try searching for other keywords.</span>
                            </div>
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </motion.div>
          )}

          {activeMenu === 'Overview' && (
            <motion.div
              key="overview"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.25 }}
              className="flex flex-col gap-6"
            >
              {/* Header */}
              <div>
                <h2 className="font-['Press_Start_2P'] text-lg sm:text-2xl text-[#bd93f9] tracking-wider drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]">
                  ADMIN OVERVIEW
                </h2>
                <p className="text-xs text-[#6272a4] mt-1 tracking-wide font-medium">
                  Real-time game store activity status and server statistics.
                </p>
              </div>

              {/* Stats Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                  { label: 'TOTAL REVENUE', value: '$84,250.00', trend: '+18.2%', isUp: true, icon: Coins, color: 'text-[#50fa7b]', border: 'border-[#50fa7b]' },
                  { label: 'KEYS REDEEMED', value: '1,424 Keys', trend: '+8.9%', isUp: true, icon: ShoppingCart, color: 'text-[#bd93f9]', border: 'border-[#bd93f9]' },
                  { label: 'ACTIVE GAMERS', value: '4,891 Players', trend: '-2.4%', isUp: false, icon: Users, color: 'text-[#ff79c6]', border: 'border-[#ff79c6]' },
                  { label: 'SERVER HEURISTIC', value: '99.98% OK', trend: 'STABLE', isUp: true, icon: Server, color: 'text-[#8be9fd]', border: 'border-[#8be9fd]' }
                ].map((stat, idx) => {
                  const Icon = stat.icon;
                  return (
                    <div 
                      key={idx} 
                      className={`bg-[#44475a]/30 border-2 ${stat.border}/30 p-6 rounded-lg shadow-[0_8px_20px_rgba(0,0,0,0.3)] flex flex-col gap-4 relative group hover:border-r-4 hover:border-b-4 transition-all duration-200`}
                    >
                      <div className="flex justify-between items-start">
                        <span className="text-[10px] font-['Press_Start_2P'] text-[#6272a4] leading-relaxed">
                          {stat.label}
                        </span>
                        <Icon className={`w-5 h-5 ${stat.color}`} />
                      </div>
                      <div className="flex items-end justify-between mt-2">
                        <span className="text-2xl font-bold tracking-tight text-[#f8f8f2]">{stat.value}</span>
                        <div className={`flex items-center gap-0.5 text-xs font-bold ${stat.isUp ? 'text-[#50fa7b]' : 'text-[#ff5555]'}`}>
                          {stat.isUp ? <ArrowUpRight className="w-3.5 h-3.5" /> : <ArrowDownRight className="w-3.5 h-3.5" />}
                          {stat.trend}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Chart Block */}
              <div className="bg-[#44475a]/20 border border-[#6272a4]/25 p-6 rounded-lg shadow-lg">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-2">
                    <TrendingUp className="w-5 h-5 text-[#bd93f9]" />
                    <h3 className="font-bold text-[#f8f8f2] text-base md:text-lg">WEEKLY STORE REVENUE</h3>
                  </div>
                  <span className="text-xs text-[#50fa7b] font-mono font-bold tracking-widest px-2 py-0.5 rounded bg-[#50fa7b]/10 border border-[#50fa7b]/20">
                    LIVE TELEMETRY
                  </span>
                </div>
                <div className="h-[280px] w-full font-mono text-xs">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={overviewSalesData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                      <defs>
                        <linearGradient id="revenueGlow" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#bd93f9" stopOpacity={0.4}/>
                          <stop offset="95%" stopColor="#bd93f9" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#6272a4" strokeOpacity={0.15} />
                      <XAxis dataKey="name" stroke="#6272a4" strokeOpacity={0.5} tick={{ fill: '#6272a4' }} />
                      <YAxis stroke="#6272a4" strokeOpacity={0.5} tick={{ fill: '#6272a4' }} tickFormatter={(value) => `$${value}`} />
                      <RechartsTooltip 
                        contentStyle={{ backgroundColor: '#191a21', border: '1px solid #6272a4', borderRadius: '4px', color: '#f8f8f2' }}
                        itemStyle={{ color: '#ff79c6' }}
                      />
                      <Area type="monotone" dataKey="sales" stroke="#bd93f9" strokeWidth={3} fillOpacity={1} fill="url(#revenueGlow)" />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Sub grid */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* System Diagnostics */}
                <div className="bg-[#44475a]/25 border border-[#6272a4]/25 p-5 rounded-lg flex flex-col gap-4">
                  <div className="flex items-center justify-between border-b border-[#6272a4]/20 pb-3">
                    <h4 className="font-bold text-sm text-[#ff79c6] tracking-wide flex items-center gap-2">
                      <Activity className="w-4 h-4" /> SYSTEM TELEMETRY
                    </h4>
                    <span className="text-[10px] text-[#50fa7b] font-mono font-bold">ALL SERVICES OPERATIONAL</span>
                  </div>
                  <div className="flex flex-col gap-3 font-mono text-xs text-[#bfc5d6]">
                    {[
                      { item: 'API Gateway Latency', metric: '24ms', state: 'OPTIMAL', progress: 85, color: 'bg-[#50fa7b]' },
                      { item: 'Database Pool Utilization', metric: '32%', state: 'HEALTHY', progress: 32, color: 'bg-[#8be9fd]' },
                      { item: 'Activation Mail Queue', metric: '0 pending', state: 'CLEAR', progress: 100, color: 'bg-[#50fa7b]' },
                      { item: 'Active Game Servers', metric: '16 Instances', state: 'LOAD BALANCED', progress: 64, color: 'bg-[#bd93f9]' }
                    ].map((diag, i) => (
                      <div key={i} className="flex flex-col gap-1 bg-[#191a21]/50 p-2.5 border border-[#6272a4]/10 rounded">
                        <div className="flex justify-between font-bold">
                          <span>{diag.item}</span>
                          <span className="text-[#ff79c6]">{diag.metric}</span>
                        </div>
                        <div className="w-full bg-[#44475a]/40 h-1.5 rounded-full overflow-hidden mt-1.5">
                          <div className={`h-full ${diag.color}`} style={{ width: `${diag.progress}%` }}></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Server Console Logs */}
                <div className="bg-[#44475a]/25 border border-[#6272a4]/25 p-5 rounded-lg flex flex-col gap-3">
                  <div className="flex items-center justify-between border-b border-[#6272a4]/20 pb-3">
                    <h4 className="font-bold text-sm text-[#bd93f9] tracking-wide flex items-center gap-2">
                      <Server className="w-4 h-4" /> SERVER LOGS (LIVE)
                    </h4>
                    <RefreshCw className="w-3.5 h-3.5 text-[#6272a4] animate-spin" />
                  </div>
                  <div className="font-mono text-[11px] leading-relaxed text-[#6272a4] flex flex-col gap-2 h-[200px] overflow-y-auto bg-[#191a21]/80 p-3 rounded border border-[#6272a4]/25 custom-scrollbar">
                    <p><span className="text-[#50fa7b]">[SYS]</span> 10:29:06 - Cron key scavenger daemon started.</p>
                    <p><span className="text-[#bd93f9]">[AUTH]</span> 10:29:12 - Google OAuth verification successful for Player #8491.</p>
                    <p><span className="text-[#ff79c6]">[SHOP]</span> 10:29:15 - Order success callback: Cart ID 38294 processed.</p>
                    <p><span className="text-[#8be9fd]">[KEY]</span> 10:29:15 - Activation code CD-KEY #50921 dispatched to player email.</p>
                    <p><span className="text-[#ff5555]">[WARN]</span> 10:29:30 - Cache store connection pooled, auto-rebalancing...</p>
                    <p><span className="text-[#50fa7b]">[SYS]</span> 10:29:45 - Health Check completed: 200 OK.</p>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {activeMenu === 'Orders' && (
            <motion.div
              key="orders"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.25 }}
              className="flex flex-col gap-6"
            >
              {/* Header */}
              <div>
                <h2 className="font-['Press_Start_2P'] text-lg sm:text-2xl text-[#bd93f9] tracking-wider drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]">
                  GAME ORDERS
                </h2>
                <p className="text-xs text-[#6272a4] mt-1 tracking-wide font-medium">
                  Review game keys purchases log and digital codes status.
                </p>
              </div>

              {/* Mock Orders List */}
              <div className="border border-[#6272a4]/30 rounded-lg overflow-hidden bg-[#282a36] shadow-lg">
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="border-b border-[#6272a4]/40 bg-[#191a21]/90 text-[#6272a4] text-xs font-bold uppercase tracking-wider">
                        <th className="py-4 px-6">ORDER ID</th>
                        <th className="py-4 px-6">CUSTOMER</th>
                        <th className="py-4 px-6">GAME PURCHASED</th>
                        <th className="py-4 px-6">TOTAL PRICE</th>
                        <th className="py-4 px-6">ACTIVATION CODE</th>
                        <th className="py-4 px-6">DELIVERY</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#6272a4]/15 font-sans text-xs md:text-sm">
                      {[
                        { id: 'GH-8902', customer: 'Sophia Chen', game: 'Chrono Trigger Reborn', price: 14.99, code: 'CHRO-TRIG-NEO9-9381', delivered: true },
                        { id: 'GH-8903', customer: 'Marcus Wright', game: 'Street Fighter II: Turbo', price: 9.99, code: 'STRF-TURB-CODE-7761', delivered: true },
                        { id: 'GH-8904', customer: 'Elena Rodriguez', game: 'Super Mario World 8-Bit', price: 19.99, code: 'MARI-WORL-EMU9-8802', delivered: true },
                        { id: 'GH-8905', customer: 'David Kim', game: 'Castlevania: Symphony', price: 15.99, code: 'CAST-SOTN-PIXL-4481', delivered: true },
                        { id: 'GH-8906', customer: 'Olivia Martinez', game: 'Metroid Prime: Retro Edition', price: 29.99, code: 'METR-PRIM-GCUB-1120', delivered: false }
                      ].map((order, i) => (
                        <tr key={i} className="hover:bg-[#44475a]/30 transition-colors">
                          <td className="py-4 px-6 font-mono font-bold text-[#bd93f9]">#{order.id}</td>
                          <td className="py-4 px-6 font-semibold text-[#f8f8f2]">{order.customer}</td>
                          <td className="py-4 px-6 text-[#ff79c6] font-medium">{order.game}</td>
                          <td className="py-4 px-6 font-mono text-[#50fa7b] font-bold">${order.price.toFixed(2)}</td>
                          <td className="py-4 px-6 font-mono text-xs tracking-wider bg-[#191a21]/50 py-1.5 px-3 rounded inline-block my-2 text-[#bfc5d6]">
                            {order.code}
                          </td>
                          <td className="py-4 px-6">
                            {order.delivered ? (
                              <span className="text-[#50fa7b] font-bold flex items-center gap-1">
                                <Check className="w-4 h-4" /> DISPATCHED
                              </span>
                            ) : (
                              <span className="text-[#ffb86c] font-bold flex items-center gap-1 animate-pulse">
                                <RefreshCw className="w-3.5 h-3.5 animate-spin" /> PENDING
                              </span>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </motion.div>
          )}

          {activeMenu === 'Customers' && (
            <motion.div
              key="customers"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.25 }}
              className="flex flex-col gap-6"
            >
              {/* Header */}
              <div>
                <h2 className="font-['Press_Start_2P'] text-lg sm:text-2xl text-[#bd93f9] tracking-wider drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]">
                  REGISTERED PLAYERS
                </h2>
                <p className="text-xs text-[#6272a4] mt-1 tracking-wide font-medium">
                  Scoreboard list of customer players registered on the game platform.
                </p>
              </div>

              {/* Customers Scoreboard Table */}
              <div className="border border-[#6272a4]/30 rounded-lg overflow-hidden bg-[#282a36] shadow-lg">
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="border-b border-[#6272a4]/40 bg-[#191a21]/90 text-[#6272a4] text-xs font-bold uppercase tracking-wider">
                        <th className="py-4 px-6">PLAYER</th>
                        <th className="py-4 px-6">EMAIL ADDRESS</th>
                        <th className="py-4 px-6">PLAYER LEVEL</th>
                        <th className="py-4 px-6">PLAYTIME HOURS</th>
                        <th className="py-4 px-6 text-center">ACCOUNT STATUS</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#6272a4]/15 text-xs md:text-sm">
                      {[
                        { name: 'RetroGamer99', email: 'gamer99@gamehub.io', level: 'Lv. 74 Paladin', hours: '412 Hrs', status: 'ACTIVE' },
                        { name: 'Sophia_Chen', email: 'sophia@example.com', level: 'Lv. 52 Wizard', hours: '215 Hrs', status: 'ACTIVE' },
                        { name: 'Wright_Marcus', email: 'marcus.w@wright.org', level: 'Lv. 39 Rogue', hours: '124 Hrs', status: 'ACTIVE' },
                        { name: 'ChronoNerd', email: 'chrono_fanatic@retro.net', level: 'Lv. 99 TimeTraveler', hours: '1,048 Hrs', status: 'ACTIVE' },
                        { name: 'ShadowCheater', email: 'hackerboy@toxic.ru', level: 'Lv. 01 Banned', hours: '2 Hrs', status: 'BANNED' }
                      ].map((cust, i) => (
                        <tr key={i} className="hover:bg-[#44475a]/30 transition-colors">
                          <td className="py-4 px-6 font-bold text-[#f8f8f2] flex items-center gap-3">
                            <div className="w-8 h-8 rounded bg-[#44475a] flex items-center justify-center font-mono border border-[#6272a4]/40 text-[#ff79c6]">
                              {cust.name.substring(0, 2).toUpperCase()}
                            </div>
                            {cust.name}
                          </td>
                          <td className="py-4 px-6 font-mono text-[#6272a4]">{cust.email}</td>
                          <td className="py-4 px-6 font-semibold text-[#bd93f9]">{cust.level}</td>
                          <td className="py-4 px-6 font-mono text-[#50fa7b]">{cust.hours}</td>
                          <td className="py-4 px-6 text-center">
                            {cust.status === 'ACTIVE' ? (
                              <span className="px-3 py-1 rounded bg-[#50fa7b]/10 text-[#50fa7b] border border-[#50fa7b]/30 font-bold text-xs">
                                NORMAL
                              </span>
                            ) : (
                              <span className="px-3 py-1 rounded bg-[#ff5555]/10 text-[#ff5555] border border-[#ff5555]/30 font-bold text-xs shadow-[0_0_8px_rgba(255,85,85,0.2)]">
                                BANNED
                              </span>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </motion.div>
          )}

          {activeMenu === 'Settings' && (
            <motion.div
              key="settings"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.25 }}
              className="flex flex-col gap-6"
            >
              {/* Header */}
              <div>
                <h2 className="font-['Press_Start_2P'] text-lg sm:text-2xl text-[#bd93f9] tracking-wider drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]">
                  ARCADE CONFIGURATION
                </h2>
                <p className="text-xs text-[#6272a4] mt-1 tracking-wide font-medium">
                  Toggle admin flags and control the portal engine.
                </p>
              </div>

              {/* Settings Card */}
              <div className="bg-[#44475a]/25 border border-[#6272a4]/20 rounded-lg p-6 max-w-2xl flex flex-col gap-6">
                <div className="flex flex-col gap-4">
                  {[
                    { title: 'Server Engine Double XP Event', desc: 'Activates automatic double experience rate for platform users.', defaultChecked: true },
                    { title: 'Arcade Maintenance Mode', desc: 'Locks client access and displays a 90s style CRT "OUT OF SERVICE" screen.', defaultChecked: false },
                    { title: 'Hype Multiplier Boost (5.0x)', desc: 'Accelerates visual glow animations on the clientside dashboard.', defaultChecked: true },
                    { title: 'Allow Anonymous CD-Key Claim', desc: 'Allows unregistered players to fetch active licenses using guest checkout.', defaultChecked: false }
                  ].map((setting, idx) => (
                    <div key={idx} className="flex justify-between items-start gap-6 p-4 bg-[#191a21]/50 border border-[#6272a4]/15 rounded-lg">
                      <div className="flex-1">
                        <h4 className="font-bold text-sm md:text-base text-[#f8f8f2]">{setting.title}</h4>
                        <p className="text-xs text-[#6272a4] mt-1">{setting.desc}</p>
                      </div>
                      <div className="shrink-0 flex items-center">
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input type="checkbox" defaultChecked={setting.defaultChecked} className="sr-only peer" />
                          <div className="w-11 h-6 bg-[#44475a] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-[#f8f8f2] after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#50fa7b]"></div>
                        </label>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="border-t border-[#6272a4]/20 pt-6 flex justify-end">
                  <button className="px-6 py-2.5 bg-[#bd93f9] hover:bg-[#ff79c6] text-[#282a36] font-bold text-xs tracking-wider uppercase rounded shadow-lg active:scale-95 transition-all">
                    SAVE SYSTEM CONFIG
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </main>

      {/* =================================================== */}
      {/* ADD NEW GAME MODAL */}
      {/* =================================================== */}
      <AnimatePresence>
        {isAddOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsAddOpen(false)}
              className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            />
            
            <motion.div 
              initial={{ scale: 0.9, opacity: 0, y: 30 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 30 }}
              transition={{ type: 'spring', damping: 25, stiffness: 350 }}
              className="relative w-full max-w-lg bg-[#282a36] border-4 border-[#bd93f9] rounded-lg shadow-[0_0_30px_rgba(189,147,249,0.4)] z-10 overflow-hidden"
            >
              {/* Header */}
              <div className="bg-[#191a21] px-6 py-4 border-b-2 border-[#bd93f9] flex items-center justify-between">
                <h3 className="font-['Press_Start_2P'] text-[10px] tracking-wider text-[#bd93f9]">
                  ✚ ADD NEW GAME
                </h3>
                <button 
                  onClick={() => setIsAddOpen(false)}
                  className="p-1 text-[#6272a4] hover:text-[#ff79c6] transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Form Body */}
              <form onSubmit={handleAddGame} className="p-6 flex flex-col gap-5">
                
                {/* Title Input */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold text-[#ff79c6] tracking-wider font-mono">
                    GAME TITLE
                  </label>
                  <input 
                    type="text" 
                    required
                    value={formTitle}
                    onChange={(e) => setFormTitle(e.target.value)}
                    placeholder="e.g. Chrono Trigger 2"
                    className="w-full bg-[#191a21] border border-[#6272a4] rounded px-3 py-2 text-sm text-[#f8f8f2] focus:outline-none focus:border-[#ff79c6] transition-colors"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  {/* Category Input */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-bold text-[#ff79c6] tracking-wider font-mono">
                      CATEGORY
                    </label>
                    <input 
                      type="text" 
                      required
                      value={formCategory}
                      onChange={(e) => setFormCategory(e.target.value)}
                      placeholder="e.g. RPG / Fighting"
                      className="w-full bg-[#191a21] border border-[#6272a4] rounded px-3 py-2 text-sm text-[#f8f8f2] focus:outline-none focus:border-[#ff79c6] transition-colors"
                    />
                  </div>

                  {/* Price Input */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-bold text-[#ff79c6] tracking-wider font-mono">
                      PRICE (USD)
                    </label>
                    <input 
                      type="number" 
                      step="0.01"
                      required
                      value={formPrice}
                      onChange={(e) => setFormPrice(e.target.value)}
                      placeholder="14.99"
                      className="w-full bg-[#191a21] border border-[#6272a4] rounded px-3 py-2 text-sm text-[#f8f8f2] focus:outline-none focus:border-[#ff79c6] transition-colors font-mono"
                    />
                  </div>
                </div>

                {/* Status Selection */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold text-[#ff79c6] tracking-wider font-mono">
                    CATALOGUE STATUS
                  </label>
                  <div className="flex gap-4">
                    <button
                      type="button"
                      onClick={() => setFormStatus('Active')}
                      className={`flex-1 py-2 rounded text-xs font-bold transition-all border
                        ${formStatus === 'Active' 
                          ? 'bg-[#50fa7b] text-[#282a36] border-[#50fa7b] shadow-[0_0_10px_rgba(80,250,123,0.3)]' 
                          : 'bg-[#191a21] text-[#6272a4] border-[#6272a4]/30'}`}
                    >
                      ACTIVE
                    </button>
                    <button
                      type="button"
                      onClick={() => setFormStatus('Draft')}
                      className={`flex-1 py-2 rounded text-xs font-bold transition-all border
                        ${formStatus === 'Draft' 
                          ? 'bg-[#44475a] text-[#f8f8f2] border-[#bd93f9]' 
                          : 'bg-[#191a21] text-[#6272a4] border-[#6272a4]/30'}`}
                    >
                      DRAFT (INACTIVE)
                    </button>
                  </div>
                </div>

                {/* Cover Gradient Selection */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold text-[#ff79c6] tracking-wider font-mono">
                    CARTRIDGE COLOR (GRADIENT)
                  </label>
                  <div className="grid grid-cols-4 gap-2">
                    {GRADIENTS.map((grad, i) => (
                      <button
                        key={i}
                        type="button"
                        onClick={() => setFormGradient(grad.value)}
                        className={`h-10 bg-gradient-to-br ${grad.value} rounded border-2 transition-all relative flex items-center justify-center
                          ${formGradient === grad.value ? 'border-[#f8f8f2] scale-105 shadow-md' : 'border-transparent opacity-85 hover:opacity-100'}`}
                        title={grad.label}
                      >
                        {formGradient === grad.value && (
                          <Check className="w-4 h-4 text-[#282a36] stroke-[3]" />
                        )}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Form Buttons */}
                <div className="flex gap-3 border-t border-[#6272a4]/20 pt-4 mt-2">
                  <button
                    type="button"
                    onClick={() => setIsAddOpen(false)}
                    className="flex-1 py-2.5 bg-[#44475a] hover:bg-[#ff5555] text-[#f8f8f2] text-xs font-bold rounded tracking-wider transition-colors"
                  >
                    CANCEL
                  </button>
                  <button
                    type="submit"
                    className="flex-1 py-2.5 bg-[#bd93f9] hover:bg-[#50fa7b] hover:text-[#282a36] text-[#282a36] text-xs font-bold rounded tracking-wider shadow-[0_4px_12px_rgba(189,147,249,0.2)] transition-colors"
                  >
                    ADD TO CATALOGUE
                  </button>
                </div>

              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* =================================================== */}
      {/* EDIT GAME MODAL */}
      {/* =================================================== */}
      <AnimatePresence>
        {isEditOpen && selectedGame && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => {
                setIsEditOpen(false);
                setSelectedGame(null);
              }}
              className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            />
            
            <motion.div 
              initial={{ scale: 0.9, opacity: 0, y: 30 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 30 }}
              transition={{ type: 'spring', damping: 25, stiffness: 350 }}
              className="relative w-full max-w-lg bg-[#282a36] border-4 border-[#ff79c6] rounded-lg shadow-[0_0_30px_rgba(255,121,198,0.4)] z-10 overflow-hidden"
            >
              {/* Header */}
              <div className="bg-[#191a21] px-6 py-4 border-b-2 border-[#ff79c6] flex items-center justify-between">
                <h3 className="font-['Press_Start_2P'] text-[10px] tracking-wider text-[#ff79c6]">
                  ✎ EDIT SYSTEM GAME
                </h3>
                <button 
                  onClick={() => {
                    setIsEditOpen(false);
                    setSelectedGame(null);
                  }}
                  className="p-1 text-[#6272a4] hover:text-[#ff79c6] transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Form Body */}
              <form onSubmit={handleSaveEdit} className="p-6 flex flex-col gap-5">
                
                {/* Title Input */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold text-[#ff79c6] tracking-wider font-mono">
                    GAME TITLE
                  </label>
                  <input 
                    type="text" 
                    required
                    value={formTitle}
                    onChange={(e) => setFormTitle(e.target.value)}
                    placeholder="e.g. Chrono Trigger 2"
                    className="w-full bg-[#191a21] border border-[#6272a4] rounded px-3 py-2 text-sm text-[#f8f8f2] focus:outline-none focus:border-[#ff79c6] transition-colors"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  {/* Category Input */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-bold text-[#ff79c6] tracking-wider font-mono">
                      CATEGORY
                    </label>
                    <input 
                      type="text" 
                      required
                      value={formCategory}
                      onChange={(e) => setFormCategory(e.target.value)}
                      placeholder="e.g. RPG / Fighting"
                      className="w-full bg-[#191a21] border border-[#6272a4] rounded px-3 py-2 text-sm text-[#f8f8f2] focus:outline-none focus:border-[#ff79c6] transition-colors"
                    />
                  </div>

                  {/* Price Input */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-bold text-[#ff79c6] tracking-wider font-mono">
                      PRICE (USD)
                    </label>
                    <input 
                      type="number" 
                      step="0.01"
                      required
                      value={formPrice}
                      onChange={(e) => setFormPrice(e.target.value)}
                      placeholder="14.99"
                      className="w-full bg-[#191a21] border border-[#6272a4] rounded px-3 py-2 text-sm text-[#f8f8f2] focus:outline-none focus:border-[#ff79c6] transition-colors font-mono"
                    />
                  </div>
                </div>

                {/* Status Selection */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold text-[#ff79c6] tracking-wider font-mono">
                    CATALOGUE STATUS
                  </label>
                  <div className="flex gap-4">
                    <button
                      type="button"
                      onClick={() => setFormStatus('Active')}
                      className={`flex-1 py-2 rounded text-xs font-bold transition-all border
                        ${formStatus === 'Active' 
                          ? 'bg-[#50fa7b] text-[#282a36] border-[#50fa7b] shadow-[0_0_10px_rgba(80,250,123,0.3)]' 
                          : 'bg-[#191a21] text-[#6272a4] border-[#6272a4]/30'}`}
                    >
                      ACTIVE
                    </button>
                    <button
                      type="button"
                      onClick={() => setFormStatus('Draft')}
                      className={`flex-1 py-2 rounded text-xs font-bold transition-all border
                        ${formStatus === 'Draft' 
                          ? 'bg-[#44475a] text-[#f8f8f2] border-[#ff79c6]' 
                          : 'bg-[#191a21] text-[#6272a4] border-[#6272a4]/30'}`}
                    >
                      DRAFT (INACTIVE)
                    </button>
                  </div>
                </div>

                {/* Cover Gradient Selection */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold text-[#ff79c6] tracking-wider font-mono">
                    CARTRIDGE COLOR (GRADIENT)
                  </label>
                  <div className="grid grid-cols-4 gap-2">
                    {GRADIENTS.map((grad, i) => (
                      <button
                        key={i}
                        type="button"
                        onClick={() => setFormGradient(grad.value)}
                        className={`h-10 bg-gradient-to-br ${grad.value} rounded border-2 transition-all relative flex items-center justify-center
                          ${formGradient === grad.value ? 'border-[#f8f8f2] scale-105 shadow-md' : 'border-transparent opacity-85 hover:opacity-100'}`}
                        title={grad.label}
                      >
                        {formGradient === grad.value && (
                          <Check className="w-4 h-4 text-[#282a36] stroke-[3]" />
                        )}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Form Buttons */}
                <div className="flex gap-3 border-t border-[#6272a4]/20 pt-4 mt-2">
                  <button
                    type="button"
                    onClick={() => {
                      setIsEditOpen(false);
                      setSelectedGame(null);
                    }}
                    className="flex-1 py-2.5 bg-[#44475a] hover:bg-[#ff5555] text-[#f8f8f2] text-xs font-bold rounded tracking-wider transition-colors"
                  >
                    CANCEL
                  </button>
                  <button
                    type="submit"
                    className="flex-1 py-2.5 bg-[#ff79c6] hover:bg-[#50fa7b] hover:text-[#282a36] text-[#282a36] text-xs font-bold rounded tracking-wider shadow-[0_4px_12px_rgba(255,121,198,0.2)] transition-colors"
                  >
                    SAVE CHANGES
                  </button>
                </div>

              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* =================================================== */}
      {/* DELETE GAME WARNING DIALOG */}
      {/* =================================================== */}
      <AnimatePresence>
        {isDeleteOpen && selectedGame && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => {
                setIsDeleteOpen(false);
                setSelectedGame(null);
              }}
              className="absolute inset-0 bg-black/85 backdrop-blur-sm"
            />
            
            <motion.div 
              initial={{ scale: 0.9, opacity: 0, y: 30 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 30 }}
              transition={{ type: 'spring', damping: 25, stiffness: 400 }}
              className="relative w-full max-w-md bg-[#282a36] border-4 border-[#ff5555] rounded-lg shadow-[0_0_35px_rgba(255,85,85,0.4)] z-10 overflow-hidden"
            >
              {/* Box Header */}
              <div className="bg-[#191a21] px-5 py-3.5 border-b-2 border-[#ff5555] flex items-center gap-2">
                <ShieldAlert className="w-5 h-5 text-[#ff5555]" />
                <h3 className="font-['Press_Start_2P'] text-[9px] tracking-wider text-[#ff5555]">
                  CRITICAL ACCESS WARNING
                </h3>
              </div>

              {/* Warning Content */}
              <div className="p-6 flex flex-col gap-4 text-center">
                <p className="font-['Press_Start_2P'] text-[10px] leading-relaxed text-[#f8f8f2] bg-[#191a21] p-4 border border-[#ff5555]/30 rounded">
                  ERASING ITEM: &quot;{selectedGame.title.toUpperCase()}&quot;
                </p>
                <p className="text-xs text-[#6272a4] leading-relaxed">
                  Are you absolutely certain, Player 1? Deleting this game from the inventory database will permanently revoke activation capability for new buyers. This operation is irrevocable.
                </p>

                {/* Choice Buttons */}
                <div className="flex gap-4 mt-2">
                  <button
                    onClick={() => {
                      setIsDeleteOpen(false);
                      setSelectedGame(null);
                    }}
                    className="flex-1 py-2.5 bg-[#44475a] hover:bg-[#bfc5d6] hover:text-[#282a36] text-[#f8f8f2] text-xs font-bold rounded tracking-wider transition-colors uppercase"
                  >
                    ABORT MISSION
                  </button>
                  <button
                    onClick={handleConfirmDelete}
                    className="flex-1 py-2.5 bg-[#ff5555] hover:bg-[#ff79c6] text-[#282a36] text-xs font-bold rounded tracking-wider shadow-[0_4px_12px_rgba(255,85,85,0.3)] transition-colors uppercase"
                  >
                    YES, ERASE GAME
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
};

