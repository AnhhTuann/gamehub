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
  addedBy?: string;
  addedDate?: string;
  stockQuantity: number;
}

// Initial Mock Games Data
const INITIAL_GAMES: Game[] = [
  { id: '1', title: 'Chrono Trigger Reborn', category: 'RPG', price: 14.99, status: 'Active', coverGradient: 'from-[#bd93f9] to-[#ff79c6]', addedBy: 'Cloud Strife (Staff)', addedDate: '2026-05-31', stockQuantity: 42 },
  { id: '2', title: 'Street Fighter II: Turbo', category: 'Fighting', price: 9.99, status: 'Active', coverGradient: 'from-[#ff5555] to-[#ffb86c]', addedBy: 'Tifa Lockhart (Admin)', addedDate: '2026-05-30', stockQuantity: 15 },
  { id: '3', title: 'Super Mario World 8-Bit', category: 'Platformer', price: 19.99, status: 'Active', coverGradient: 'from-[#50fa7b] to-[#8be9fd]', addedBy: 'Cloud Strife (Staff)', addedDate: '2026-05-31', stockQuantity: 8 },
  { id: '4', title: 'Metroid Prime: Retro Edition', category: 'Adventure', price: 29.99, status: 'Draft', coverGradient: 'from-[#ffb86c] to-[#ff5555]', addedBy: 'Barret Wallace (Staff)', addedDate: '2026-05-29', stockQuantity: 0 },
  { id: '5', title: 'Castlevania: Symphony', category: 'Metroidvania', price: 15.99, status: 'Active', coverGradient: 'from-[#8be9fd] to-[#bd93f9]', addedBy: 'Cloud Strife (Staff)', addedDate: '2026-05-31', stockQuantity: 104 },
];

// Available gradients for covers in form
const GRADIENTS = [
  { label: 'Dracula Purple', value: 'from-[#bd93f9] to-[#ff79c6]' },
  { label: 'Acid Cyber', value: 'from-[#50fa7b] to-[#8be9fd]' },
  { label: 'Sunset Neon', value: 'from-[#ffb86c] to-[#ff5555]' },
  { label: 'Vortex Cyan', value: 'from-[#8be9fd] to-[#bd93f9]' },
];

interface Order {
  id: string;
  customer: string;
  date: string;
  total: number;
  status: 'COMPLETED' | 'PENDING' | 'REFUNDED';
  gamesList: { title: string; price: number; code: string; coverGradient: string }[];
}

const INITIAL_ORDERS: Order[] = [
  {
    id: 'GH-990412',
    customer: 'player1@gmail.com',
    date: 'Oct 24, 2026',
    total: 34.98,
    status: 'COMPLETED',
    gamesList: [
      { title: 'Chrono Trigger Reborn', price: 14.99, code: 'CHRO-TRIG-NEO9-9381', coverGradient: 'from-[#bd93f9] to-[#ff79c6]' },
      { title: 'Super Mario World 8-Bit', price: 19.99, code: 'MARI-WORL-EMU9-8802', coverGradient: 'from-[#50fa7b] to-[#8be9fd]' }
    ]
  },
  {
    id: 'GH-829401',
    customer: 'cyber_samurai@yahoo.com',
    date: 'Oct 23, 2026',
    total: 9.99,
    status: 'COMPLETED',
    gamesList: [
      { title: 'Street Fighter II: Turbo', price: 9.99, code: 'STRF-TURB-CODE-7761', coverGradient: 'from-[#ff5555] to-[#ffb86c]' }
    ]
  },
  {
    id: 'GH-773019',
    customer: 'doom_fanatic@proton.me',
    date: 'Oct 22, 2026',
    total: 29.99,
    status: 'PENDING',
    gamesList: [
      { title: 'Metroid Prime: Retro Edition', price: 29.99, code: 'PENDING-GENERATION-KEY', coverGradient: 'from-[#ffb86c] to-[#ff5555]' }
    ]
  },
  {
    id: 'GH-661023',
    customer: 'retro_girl@gmail.com',
    date: 'Oct 20, 2026',
    total: 31.98,
    status: 'REFUNDED',
    gamesList: [
      { title: 'Castlevania: Symphony', price: 15.99, code: 'VOID-REFUNDED-KEY-0091', coverGradient: 'from-[#8be9fd] to-[#bd93f9]' },
      { title: 'Castlevania: Symphony', price: 15.99, code: 'VOID-REFUNDED-KEY-0092', coverGradient: 'from-[#8be9fd] to-[#bd93f9]' }
    ]
  },
  {
    id: 'GH-554092',
    customer: 'cloud_strife@shinra.co',
    date: 'Oct 18, 2026',
    total: 14.99,
    status: 'COMPLETED',
    gamesList: [
      { title: 'Chrono Trigger Reborn', price: 14.99, code: 'CHRO-TRIG-NEO9-9382', coverGradient: 'from-[#bd93f9] to-[#ff79c6]' }
    ]
  },
  {
    id: 'GH-441093',
    customer: 'tifa_lockhart@seventhheaven.bar',
    date: 'Oct 15, 2026',
    total: 9.99,
    status: 'PENDING',
    gamesList: [
      { title: 'Street Fighter II: Turbo', price: 9.99, code: 'PENDING-GENERATION-KEY', coverGradient: 'from-[#ff5555] to-[#ffb86c]' }
    ]
  }
];

export const Admin = () => {
  const [activeMenu, setActiveMenu] = useState('Orders');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [games, setGames] = useState<Game[]>(INITIAL_GAMES);
  const [searchQuery, setSearchQuery] = useState('');
  
  // Orders page state
  const [orders, setOrders] = useState<Order[]>(INITIAL_ORDERS);
  const [orderSearchQuery, setOrderSearchQuery] = useState('');
  const [orderStatusFilter, setOrderStatusFilter] = useState('All');
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [isOrderDetailsOpen, setIsOrderDetailsOpen] = useState(false);

  // Modals state
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [isRestockOpen, setIsRestockOpen] = useState(false);
  const [selectedGame, setSelectedGame] = useState<Game | null>(null);

  // Form states (Add/Edit)
  const [formTitle, setFormTitle] = useState('');
  const [formCategory, setFormCategory] = useState('');
  const [formPrice, setFormPrice] = useState('');
  const [formStatus, setFormStatus] = useState<'Active' | 'Draft'>('Active');
  const [formGradient, setFormGradient] = useState('from-[#bd93f9] to-[#ff79c6]');
  const [formStock, setFormStock] = useState<number>(0);
  const [restockAmount, setRestockAmount] = useState<number>(0);

  // Utility for Generating CD-Keys
  const generateCDKeys = (quantity: number) => {
    const keys = [];
    for (let i = 0; i < quantity; i++) {
      keys.push(`GHUB-${Math.random().toString(36).substring(2, 6).toUpperCase()}-${Math.random().toString(36).substring(2, 6).toUpperCase()}`);
    }
    return keys;
  };

  // Handlers
  const handleOpenAdd = () => {
    setFormTitle('');
    setFormCategory('');
    setFormPrice('');
    setFormStock(0);
    setFormStatus('Active');
    setFormGradient('from-[#bd93f9] to-[#ff79c6]');
    setIsAddOpen(true);
  };

  const handleAddGame = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formTitle || !formCategory || !formPrice) return;
    
    if (formStock > 0) {
      console.log(`Generating ${formStock} random CD-Keys for ${formTitle}...`, generateCDKeys(formStock));
    }

    const newGame: Game = {
      id: Date.now().toString(),
      title: formTitle,
      category: formCategory,
      price: parseFloat(formPrice) || 0,
      status: formStock > 0 ? 'Active' : 'Draft',
      coverGradient: formGradient,
      addedBy: 'Admin (You)',
      addedDate: new Date().toISOString().split('T')[0],
      stockQuantity: formStock
    };

    setGames([newGame, ...games]);
    setIsAddOpen(false);
  };

  const handleOpenRestock = (game: Game) => {
    setSelectedGame(game);
    setRestockAmount(10);
    setIsRestockOpen(true);
  };

  const handleRestockSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedGame || restockAmount <= 0) return;
    
    console.log(`Generating ${restockAmount} random CD-Keys for ${selectedGame.title}...`, generateCDKeys(restockAmount));

    setGames(games.map(g => g.id === selectedGame.id ? {
      ...g,
      stockQuantity: g.stockQuantity + restockAmount,
      status: (g.stockQuantity + restockAmount) > 0 ? 'Active' : 'Draft'
    } : g));
    
    setIsRestockOpen(false);
    setSelectedGame(null);
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

  const handleGenerateKeys = (orderId: string) => {
    setOrders(orders.map(o => {
      if (o.id === orderId) {
        return {
          ...o,
          status: 'COMPLETED' as const,
          gamesList: o.gamesList.map(g => ({
            ...g,
            code: `${g.title.substring(0, 4).toUpperCase()}-${Math.random().toString(36).substring(2, 6).toUpperCase()}-${Math.random().toString(36).substring(2, 6).toUpperCase()}-${Math.random().toString(36).substring(2, 6).toUpperCase()}`
          }))
        };
      }
      return o;
    }));
    setSelectedOrder(prev => {
      if (!prev) return null;
      return {
        ...prev,
        status: 'COMPLETED',
        gamesList: prev.gamesList.map(g => ({
          ...g,
          code: `${g.title.substring(0, 4).toUpperCase()}-${Math.random().toString(36).substring(2, 6).toUpperCase()}-${Math.random().toString(36).substring(2, 6).toUpperCase()}-${Math.random().toString(36).substring(2, 6).toUpperCase()}`
        }))
      };
    });
  };

  const handleRefundOrder = (orderId: string) => {
    setOrders(orders.map(o => {
      if (o.id === orderId) {
        return {
          ...o,
          status: 'REFUNDED' as const,
          gamesList: o.gamesList.map(g => ({
            ...g,
            code: `VOID-REFUNDED-KEY-${Math.floor(1000 + Math.random() * 9000)}`
          }))
        };
      }
      return o;
    }));
    setSelectedOrder(prev => {
      if (!prev) return null;
      return {
        ...prev,
        status: 'REFUNDED',
        gamesList: prev.gamesList.map(g => ({
          ...g,
          code: `VOID-REFUNDED-KEY-${Math.floor(1000 + Math.random() * 9000)}`
        }))
      };
    });
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
                        <th className="py-4 px-6 font-semibold">GAME TITLE</th>
                        <th className="py-4 px-6 font-semibold">PRICE</th>
                        <th className="py-4 px-6 font-semibold text-center">IN STOCK</th>
                        <th className="py-4 px-6 font-semibold">ADDED BY</th>
                        <th className="py-4 px-6 font-semibold text-center">STATUS</th>
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
                                ID: #{game.id} | {game.category}
                              </span>
                            </td>

                            {/* PRICE COLUMN */}
                            <td className="py-4 px-6 font-mono text-sm md:text-base font-bold text-[#50fa7b]">
                              ${game.price.toFixed(2)}
                            </td>

                            {/* IN STOCK COLUMN */}
                            <td className="py-4 px-6 text-center font-mono font-bold text-[#f8f8f2]">
                              {game.stockQuantity}
                            </td>

                            {/* ADDED BY COLUMN */}
                            <td className="py-4 px-6 text-xs text-[#bd93f9] font-semibold">
                              {game.addedBy}
                            </td>

                            {/* STATUS COLUMN */}
                            <td className="py-4 px-6 text-center">
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
                                  onClick={() => handleOpenRestock(game)}
                                  title="Add Stock"
                                  className="p-2 bg-[#44475a] border border-[#6272a4]/40 rounded hover:border-[#50fa7b] text-[#6272a4] hover:text-[#50fa7b] hover:shadow-[0_0_10px_rgba(80,250,123,0.3)] transition-all active:scale-95"
                                >
                                  <Plus className="w-4.5 h-4.5" />
                                </button>
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
                  ORDER MANAGEMENT
                </h2>
                <p className="text-xs text-[#6272a4] mt-1 tracking-wide font-medium">
                  Monitor gamer purchases, transaction totals, activation keys, and processing status.
                </p>
              </div>

              {/* Control Bar (Search & Filter) */}
              <div className="bg-[#44475a]/30 border border-[#6272a4]/25 p-4 rounded-lg flex flex-col md:flex-row gap-4 items-center justify-between">
                {/* Search field */}
                <div className="relative w-full md:max-w-md">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-[#6272a4]" />
                  <input 
                    type="text"
                    value={orderSearchQuery}
                    onChange={(e) => setOrderSearchQuery(e.target.value)}
                    placeholder="Search Order ID or Email..."
                    className="w-full bg-[#191a21] border border-[#6272a4]/30 rounded-md py-2.5 pl-10 pr-4 text-sm text-[#f8f8f2] focus:outline-none focus:border-[#ff79c6] focus:ring-1 focus:ring-[#ff79c6] placeholder-[#6272a4]/60 transition-colors"
                  />
                </div>

                {/* Status Dropdown Filter */}
                <div className="flex items-center gap-3 w-full md:w-auto justify-end">
                  <span className="text-xs text-[#6272a4] font-mono font-bold uppercase whitespace-nowrap">STATUS:</span>
                  <select
                    value={orderStatusFilter}
                    onChange={(e) => setOrderStatusFilter(e.target.value)}
                    className="bg-[#191a21] border border-[#6272a4]/30 text-xs font-bold text-[#f8f8f2] rounded px-3 py-2.5 focus:outline-none focus:border-[#bd93f9] cursor-pointer"
                  >
                    <option value="All">ALL ORDERS</option>
                    <option value="COMPLETED">COMPLETED</option>
                    <option value="PENDING">PENDING</option>
                    <option value="REFUNDED">REFUNDED</option>
                  </select>
                </div>
              </div>

              {/* Order Data Table */}
              <div className="border border-[#6272a4]/40 rounded-lg overflow-hidden bg-[#44475a]/20 shadow-[0_10px_25px_rgba(0,0,0,0.4)]">
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="border-b border-[#6272a4]/40 bg-[#191a21]/90 text-[#6272a4] text-xs font-bold uppercase tracking-wider">
                        <th className="py-4 px-6">ORDER ID</th>
                        <th className="py-4 px-6">CUSTOMER</th>
                        <th className="py-4 px-6">DATE</th>
                        <th className="py-4 px-6">TOTAL</th>
                        <th className="py-4 px-6">STATUS</th>
                        <th className="py-4 px-6 text-center">ACTION</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#6272a4]/15 font-sans text-xs md:text-sm text-[#f8f8f2]">
                      {orders.filter(order => {
                        const matchesSearch = order.id.toLowerCase().includes(orderSearchQuery.toLowerCase()) ||
                                              order.customer.toLowerCase().includes(orderSearchQuery.toLowerCase());
                        const matchesStatus = orderStatusFilter === 'All' || order.status === orderStatusFilter;
                        return matchesSearch && matchesStatus;
                      }).length > 0 ? (
                        orders.filter(order => {
                          const matchesSearch = order.id.toLowerCase().includes(orderSearchQuery.toLowerCase()) ||
                                                order.customer.toLowerCase().includes(orderSearchQuery.toLowerCase());
                          const matchesStatus = orderStatusFilter === 'All' || order.status === orderStatusFilter;
                          return matchesSearch && matchesStatus;
                        }).map((order) => (
                          <tr key={order.id} className="hover:bg-[#44475a]/40 transition-colors group">
                            {/* ORDER ID */}
                            <td className="py-4 px-6 font-mono font-bold text-[#bd93f9]">
                              #{order.id}
                            </td>

                            {/* CUSTOMER */}
                            <td className="py-4 px-6 font-semibold truncate max-w-[180px]" title={order.customer}>
                              {order.customer}
                            </td>

                            {/* DATE */}
                            <td className="py-4 px-6 text-[#bfc5d6] whitespace-nowrap">
                              {order.date}
                            </td>

                            {/* TOTAL */}
                            <td className="py-4 px-6 font-mono font-bold text-[#50fa7b]">
                              ${order.total.toFixed(2)}
                            </td>

                            {/* STATUS */}
                            <td className="py-4 px-6">
                              {order.status === 'COMPLETED' && (
                                <span className="inline-block px-3 py-1 rounded bg-[#50fa7b]/15 text-[#50fa7b] border border-[#50fa7b]/30 font-bold text-[10px] uppercase shadow-[0_0_8px_rgba(80,250,123,0.15)]">
                                  COMPLETED
                                </span>
                              )}
                              {order.status === 'PENDING' && (
                                <span className="inline-block px-3 py-1 rounded bg-transparent text-[#ffb86c] border border-[#ffb86c] font-bold text-[10px] uppercase animate-pulse">
                                  PENDING
                                </span>
                              )}
                              {order.status === 'REFUNDED' && (
                                <span className="inline-block px-3 py-1 rounded bg-[#ff5555]/20 text-[#ff5555] border border-[#ff5555]/40 font-bold text-[10px] uppercase">
                                  REFUNDED
                                </span>
                              )}
                            </td>

                            {/* ACTION */}
                            <td className="py-4 px-6 text-center">
                              <button 
                                onClick={() => {
                                  setSelectedOrder(order);
                                  setIsOrderDetailsOpen(true);
                                }}
                                className="px-3.5 py-1.5 bg-[#44475a]/60 border border-[#6272a4]/40 rounded text-xs font-bold text-[#bd93f9] hover:text-[#ff79c6] hover:border-[#ff79c6] hover:shadow-[0_0_10px_rgba(255,121,198,0.25)] transition-all active:scale-95 uppercase tracking-wider"
                              >
                                VIEW
                              </button>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan={6} className="py-12 text-center text-[#6272a4]">
                            <div className="flex flex-col items-center justify-center gap-2">
                              <Gamepad2 className="w-12 h-12 text-[#6272a4]/30 animate-bounce" />
                              <span className="text-sm font-semibold">NO MATCHING ORDERS DISCOVERED.</span>
                              <span className="text-xs font-mono text-[#6272a4]/60">Try refining search metrics.</span>
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

                <div className="grid grid-cols-3 gap-4">
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

                  {/* Initial Stock Input */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-bold text-[#ff79c6] tracking-wider font-mono">
                      INITIAL STOCK
                    </label>
                    <input 
                      type="number" 
                      min="0"
                      required
                      value={formStock}
                      onChange={(e) => setFormStock(parseInt(e.target.value) || 0)}
                      placeholder="0"
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
                
                {/* Audit Trail */}
                {selectedGame?.addedBy && (
                  <div className="bg-[#44475a]/30 border border-[#6272a4]/40 rounded-lg p-3 mb-1 flex items-center gap-2">
                    <ShieldAlert className="w-4 h-4 text-[#bd93f9]" />
                    <p className="text-xs font-mono text-[#f8f8f2] tracking-tight">
                      <span className="text-[#6272a4]">Added by:</span> <span className="text-[#50fa7b] font-bold">{selectedGame.addedBy}</span> <span className="text-[#6272a4]">on {selectedGame.addedDate}</span>
                    </p>
                  </div>
                )}

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

      {/* =================================================== */}
      {/* ORDER DETAILS MODAL */}
      {/* =================================================== */}
      <AnimatePresence>
        {isOrderDetailsOpen && selectedOrder && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => {
                setIsOrderDetailsOpen(false);
                setSelectedOrder(null);
              }}
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
                  🔍 ORDER DETAILS: #{selectedOrder.id}
                </h3>
                <button 
                  onClick={() => {
                    setIsOrderDetailsOpen(false);
                    setSelectedOrder(null);
                  }}
                  className="p-1 text-[#6272a4] hover:text-[#ff79c6] transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Modal Body */}
              <div className="p-6 flex flex-col gap-5">
                
                {/* Meta details */}
                <div className="grid grid-cols-2 gap-4 bg-[#191a21]/50 border border-[#6272a4]/20 p-4 rounded text-xs font-mono">
                  <div className="flex flex-col gap-1">
                    <span className="text-[#6272a4]">CUSTOMER EMAIL</span>
                    <span className="text-[#f8f8f2] font-semibold truncate">{selectedOrder.customer}</span>
                  </div>
                  <div className="flex flex-col gap-1">
                    <span className="text-[#6272a4]">ORDER DATE</span>
                    <span className="text-[#f8f8f2] font-semibold">{selectedOrder.date}</span>
                  </div>
                  <div className="flex flex-col gap-1 mt-2">
                    <span className="text-[#6272a4]">TRANSACTION STATUS</span>
                    <div>
                      {selectedOrder.status === 'COMPLETED' && (
                        <span className="inline-block px-2 py-0.5 rounded bg-[#50fa7b]/10 text-[#50fa7b] font-bold text-[9px]">COMPLETED</span>
                      )}
                      {selectedOrder.status === 'PENDING' && (
                        <span className="inline-block px-2 py-0.5 rounded bg-[#ffb86c]/10 text-[#ffb86c] font-bold text-[9px] animate-pulse">PENDING</span>
                      )}
                      {selectedOrder.status === 'REFUNDED' && (
                        <span className="inline-block px-2 py-0.5 rounded bg-[#ff5555]/10 text-[#ff5555] font-bold text-[9px]">REFUNDED</span>
                      )}
                    </div>
                  </div>
                  <div className="flex flex-col gap-1 mt-2">
                    <span className="text-[#6272a4]">TOTAL AMOUNT</span>
                    <span className="text-[#50fa7b] font-bold">${selectedOrder.total.toFixed(2)}</span>
                  </div>
                </div>

                {/* Purchased Games list */}
                <div className="flex flex-col gap-3">
                  <span className="text-xs font-bold text-[#ff79c6] tracking-wider font-mono">
                    GAMES &amp; ACTIVATION CODES
                  </span>
                  <div className="flex flex-col gap-3 max-h-[220px] overflow-y-auto custom-scrollbar">
                    {selectedOrder.gamesList.map((g, idx) => (
                      <div key={idx} className="flex gap-4 p-3 bg-[#44475a]/30 border border-[#6272a4]/20 rounded group font-sans">
                        <div className={`w-10 h-12 bg-gradient-to-br ${g.coverGradient} rounded border border-[#6272a4]/20 flex items-center justify-center shrink-0`}>
                          <Gamepad2 className="w-5 h-5 text-[#282a36] opacity-75" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <span className="text-xs font-bold text-[#f8f8f2] block truncate group-hover:text-[#ff79c6] transition-colors">
                            {g.title}
                          </span>
                          <span className="text-[10px] text-[#6272a4] font-mono mt-0.5 block">
                            Price: ${g.price.toFixed(2)}
                          </span>
                          
                          {/* Key container */}
                          <div className="flex items-center gap-2 mt-1.5">
                            <span className={`text-[10px] font-mono tracking-wider px-2 py-1 rounded select-all flex-1 text-center truncate
                              ${selectedOrder.status === 'REFUNDED' 
                                ? 'bg-[#ff5555]/15 text-[#ff5555] line-through border border-[#ff5555]/30' 
                                : selectedOrder.status === 'PENDING'
                                ? 'bg-[#ffb86c]/10 text-[#ffb86c]/70 border border-[#ffb86c]/20'
                                : 'bg-[#191a21] text-[#50fa7b] border border-[#50fa7b]/20 shadow-[0_0_8px_rgba(80,250,123,0.15)]'
                              }`}>
                              {g.code}
                            </span>
                            {selectedOrder.status === 'COMPLETED' && (
                              <button
                                type="button"
                                onClick={() => navigator.clipboard.writeText(g.code)}
                                className="px-2 py-1 bg-[#44475a] border border-[#6272a4]/40 hover:border-[#50fa7b] hover:text-[#50fa7b] rounded text-[9px] font-bold text-[#bfc5d6] transition-colors active:scale-90"
                              >
                                COPY
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Modal Buttons */}
                <div className="flex gap-3 border-t border-[#6272a4]/20 pt-4 mt-1">
                  
                  {/* Cancel/Close */}
                  <button
                    type="button"
                    onClick={() => {
                      setIsOrderDetailsOpen(false);
                      setSelectedOrder(null);
                    }}
                    className="flex-1 py-2.5 bg-[#44475a] hover:bg-[#bfc5d6] hover:text-[#282a36] text-[#f8f8f2] text-xs font-bold rounded tracking-wider transition-colors uppercase"
                  >
                    CLOSE WINDOW
                  </button>

                  {/* Actions depending on state */}
                  {selectedOrder.status === 'PENDING' && (
                    <button
                      type="button"
                      onClick={() => handleGenerateKeys(selectedOrder.id)}
                      className="flex-1 py-2.5 bg-[#50fa7b] hover:bg-[#8be9fd] text-[#282a36] text-xs font-bold rounded tracking-wider shadow-[0_4px_12px_rgba(80,250,123,0.25)] transition-colors uppercase"
                    >
                      GENERATE KEYS
                    </button>
                  )}

                  {selectedOrder.status === 'COMPLETED' && (
                    <button
                      type="button"
                      onClick={() => handleRefundOrder(selectedOrder.id)}
                      className="flex-1 py-2.5 bg-[#ff5555] hover:bg-[#ff79c6] text-[#282a36] text-xs font-bold rounded tracking-wider shadow-[0_4px_12px_rgba(255,85,85,0.25)] transition-colors uppercase"
                    >
                      REFUND ORDER
                    </button>
                  )}
                </div>

              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* =================================================== */}
      {/* RESTOCK MODAL */}
      {/* =================================================== */}
      <AnimatePresence>
        {isRestockOpen && selectedGame && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => {
                setIsRestockOpen(false);
                setSelectedGame(null);
              }}
              className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            />
            
            <motion.div 
              initial={{ scale: 0.9, opacity: 0, y: 30 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 30 }}
              transition={{ type: 'spring', damping: 25, stiffness: 350 }}
              className="relative w-full max-w-sm bg-[#282a36] border-4 border-[#50fa7b] rounded-lg shadow-[0_0_30px_rgba(80,250,123,0.3)] z-10 overflow-hidden"
            >
              {/* Header */}
              <div className="bg-[#191a21] px-6 py-4 border-b-2 border-[#50fa7b] flex items-center justify-between">
                <h3 className="font-['Press_Start_2P'] text-[10px] tracking-wider text-[#50fa7b]">
                  ADD STOCK
                </h3>
                <button 
                  onClick={() => {
                    setIsRestockOpen(false);
                    setSelectedGame(null);
                  }}
                  className="p-1 text-[#6272a4] hover:text-[#50fa7b] transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Form Body */}
              <form onSubmit={handleRestockSubmit} className="p-6 flex flex-col gap-6">
                
                <div className="text-center">
                  <h4 className="text-[#f8f8f2] font-bold tracking-wide">{selectedGame.title}</h4>
                  <p className="text-xs text-[#6272a4] font-mono mt-1">Current Stock: <span className="text-[#50fa7b]">{selectedGame.stockQuantity}</span></p>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold text-[#50fa7b] tracking-wider font-mono text-center">
                    QUANTITY TO ADD
                  </label>
                  <input 
                    type="number" 
                    min="1"
                    required
                    value={restockAmount}
                    onChange={(e) => setRestockAmount(parseInt(e.target.value) || 0)}
                    className="w-full bg-[#191a21] border border-[#6272a4] rounded px-3 py-3 text-center text-xl font-bold text-[#f8f8f2] focus:outline-none focus:border-[#50fa7b] transition-colors font-mono"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 bg-[#50fa7b] hover:bg-[#8be9fd] text-[#282a36] text-xs font-bold rounded tracking-wider shadow-[0_4px_12px_rgba(80,250,123,0.2)] transition-colors uppercase"
                >
                  GENERATE & ADD TO WAREHOUSE
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
};

