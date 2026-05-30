import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { ChevronRight, ShoppingCart, Heart, Star, Monitor, Calendar, Building2, Gamepad2 } from 'lucide-react';
import { Game } from '../types';
import { getGameDetails } from '../services/api';
import { useCart } from '../context/CartContext';

/* ===== Pixel Star Rating ===== */
const PixelRating = ({ rating }: { rating: number }) => {
  const fullStars = Math.floor(rating);
  const hasHalf = rating - fullStars >= 0.5;
  return (
    <div className="flex items-center gap-1">
      {[...Array(5)].map((_, i) => (
        <Star
          key={i}
          className={`w-4 h-4 ${
            i < fullStars
              ? 'text-[var(--neon-yellow)] fill-[var(--neon-yellow)]'
              : i === fullStars && hasHalf
              ? 'text-[var(--neon-yellow)] fill-[var(--neon-yellow)] opacity-50'
              : 'text-[var(--text-muted)] opacity-30'
          }`}
        />
      ))}
      <span className="text-sm font-semibold text-[var(--neon-yellow)] ml-2">{rating.toFixed(1)} STARS</span>
    </div>
  );
};

/* ===== Metadata Row ===== */
const MetaRow = ({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) => (
  <div className="flex items-center gap-3 py-2.5">
    <span className="text-[var(--accent)] shrink-0">{icon}</span>
    <span className="text-sm text-[var(--text-muted)] w-28 shrink-0 font-medium tracking-wide">{label}</span>
    <span className="text-sm font-semibold" style={{ color: '#f8f8f2' }}>{value}</span>
  </div>
);

/* ===== Tabs Component ===== */
const TABS = ['Description', 'System Requirements', 'Reviews'] as const;
type TabType = typeof TABS[number];

const TabContent = ({ tab, game }: { tab: TabType; game: Game }) => {
  if (tab === 'Description') {
    return (
      <div className="text-sm text-[var(--text-secondary)] leading-relaxed space-y-4">
        <p>{game.description || 'No description available.'}</p>
      </div>
    );
  }
  if (tab === 'System Requirements') {
    const specItem = (label: string, value: string) => (
      <li key={label} className="flex items-start gap-2 py-1.5 border-b border-[rgba(189,147,249,0.08)] last:border-0">
        <span className="text-[var(--text-muted)] w-20 shrink-0 text-xs font-semibold uppercase tracking-wide mt-0.5">{label}</span>
        <span className="text-sm" style={{ color: '#f8f8f2' }}>{value}</span>
      </li>
    );
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Minimum specs card */}
        <div className="rounded-lg border p-6" style={{ background: 'rgba(68,71,90,0.40)', borderColor: 'rgba(189,147,249,0.30)' }}>
          <div className="flex items-center gap-2 mb-5">
            <div className="w-2 h-2 rounded-full bg-[var(--neon-orange)]" />
            <h4 className="font-pixel text-[9px] text-[var(--accent)] tracking-wider">MINIMUM</h4>
          </div>
          <ul className="space-y-0">
            {specItem('OS', 'Windows 10 64-bit')}
            {specItem('CPU', 'Core i5-8400 / Ryzen 5 2600')}
            {specItem('RAM', '12 GB')}
            {specItem('GPU', 'GTX 1080 / RX 5700 XT')}
            {specItem('Storage', '50 GB SSD')}
          </ul>
        </div>
        {/* Recommended specs card */}
        <div className="rounded-lg border p-6" style={{ background: 'rgba(68,71,90,0.40)', borderColor: 'rgba(80,250,123,0.30)' }}>
          <div className="flex items-center gap-2 mb-5">
            <div className="w-2 h-2 rounded-full bg-[var(--neon-green)]" />
            <h4 className="font-pixel text-[9px] text-[var(--neon-green)] tracking-wider">RECOMMENDED</h4>
          </div>
          <ul className="space-y-0">
            {specItem('OS', 'Windows 10/11 64-bit')}
            {specItem('CPU', 'Core i7-10700K / Ryzen 7 3700X')}
            {specItem('RAM', '16 GB')}
            {specItem('GPU', 'RTX 3070 / RX 6800 XT')}
            {specItem('Storage', '50 GB NVMe SSD')}
          </ul>
        </div>
      </div>
    );
  }
  // Reviews
  return (
    <div className="space-y-6">
      {[
        { user: 'PixelMaster88', rating: 5, text: 'Absolutely incredible remake. The atmosphere is unmatched.' },
        { user: 'RetroGamer_X', rating: 4, text: 'Faithful to the original with stunning modern graphics. Minor performance issues on launch.' },
        { user: 'HorrorFan2024', rating: 5, text: 'A masterclass in psychological horror. Every moment is perfectly crafted.' },
      ].map((review, i) => (
        <div key={i} className="bg-[var(--bg-tertiary)] border border-[var(--border-primary)] rounded-lg p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-semibold text-[var(--neon-pink)]">{review.user}</span>
            <div className="flex gap-0.5">
              {[...Array(5)].map((_, j) => (
                <Star key={j} className={`w-3 h-3 ${j < review.rating ? 'text-[var(--neon-yellow)] fill-[var(--neon-yellow)]' : 'text-[var(--text-muted)]'}`} />
              ))}
            </div>
          </div>
          <p className="text-sm text-[var(--text-secondary)] leading-relaxed">{review.text}</p>
        </div>
      ))}
    </div>
  );
};

/* ===== Main ProductDetail Page ===== */
export const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { addToCart } = useCart();
  const [game, setGame] = useState<Game | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState<string>('');
  const [activeTab, setActiveTab] = useState<TabType>('Description');
  const [isWishlisted, setIsWishlisted] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    if (id) {
      setLoading(true);
      getGameDetails(parseInt(id)).then(data => {
        setGame(data);
        if (data?.image) setSelectedImage(data.image);
        setLoading(false);
      });
    }
  }, [id]);

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto w-full px-4 md:px-6 py-12 flex-1">
        <div className="border-2 border-[var(--accent)] rounded-lg p-8 md:p-12" style={{ boxShadow: '0 0 30px var(--accent-glow)' }}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            {/* Left skeleton */}
            <div className="space-y-4">
              <div className="aspect-[4/3] bg-[var(--bg-tertiary)] rounded-lg animate-pulse" />
              <div className="grid grid-cols-5 gap-2">
                {[...Array(5)].map((_, i) => <div key={i} className="aspect-video bg-[var(--bg-tertiary)] rounded animate-pulse" />)}
              </div>
            </div>
            {/* Right skeleton */}
            <div className="space-y-6">
              <div className="h-5 bg-[var(--bg-tertiary)] w-1/4 rounded animate-pulse" />
              <div className="h-10 bg-[var(--bg-tertiary)] w-3/4 rounded animate-pulse" />
              <div className="h-20 bg-[var(--bg-tertiary)] w-full rounded animate-pulse" />
              <div className="h-8 bg-[var(--bg-tertiary)] w-1/3 rounded animate-pulse" />
              <div className="h-14 bg-[var(--bg-tertiary)] w-full rounded animate-pulse" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!game) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center gap-4 py-20">
        <span className="text-6xl">🎮</span>
        <p className="font-pixel text-xs text-[var(--text-muted)] tracking-wider">GAME NOT FOUND</p>
        <Link to="/shop" className="text-sm font-medium text-[var(--accent)] hover:text-[var(--accent-hover)] transition-colors">
          → Back to Catalog
        </Link>
      </div>
    );
  }

  const allImages = [game.image, ...(game.screenshots || [])].filter(Boolean) as string[];

  return (
    <div className="max-w-7xl mx-auto w-full px-4 md:px-6 py-8 flex-1">
      {/* Breadcrumb */}
      <div className="text-sm text-[var(--text-muted)] mb-6 flex items-center gap-2">
        <Link to="/" className="hover:text-[var(--accent)] transition-colors">Home</Link>
        <ChevronRight className="w-3 h-3" />
        <Link to="/shop" className="hover:text-[var(--accent)] transition-colors">Catalog</Link>
        <ChevronRight className="w-3 h-3" />
        <span className="text-[var(--text-secondary)]">{game.title}</span>
      </div>

      {/* ===== Main Product Container with glowing purple border ===== */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="border-2 border-[var(--accent)] rounded-lg overflow-hidden"
        style={{ boxShadow: '0 0 30px var(--accent-glow), inset 0 0 20px rgba(0,0,0,0.1)' }}
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
          <div className="bg-[var(--bg-secondary)] p-6 md:p-8 h-full">
            <div className="sticky top-24">
              {/* Main Image */}
              <div
                className="relative w-full rounded-lg overflow-hidden border border-[var(--border-primary)] mb-4 flex items-center justify-center"
                style={{ background: 'radial-gradient(ellipse at center, rgba(68,71,90,0.6) 0%, rgba(30,31,41,0.95) 100%)', aspectRatio: '16/10' }}
              >
                <img
                  src={selectedImage}
                  alt={game.title}
                  className="max-w-full max-h-full w-full h-full object-contain transition-all duration-500 drop-shadow-[0_8px_24px_rgba(0,0,0,0.5)]"
                  style={{ objectPosition: 'center' }}
                />
                {/* Corner pixel decoration */}
                <span className="absolute top-2 left-2 text-[var(--accent)] opacity-40 font-pixel text-[7px] tracking-widest select-none">▸ PREVIEW</span>
                {/* Subtle scanline overlay */}
                <div className="absolute inset-0 bg-[repeating-linear-gradient(0deg,transparent,transparent_2px,rgba(0,0,0,0.025)_2px,rgba(0,0,0,0.025)_4px)] pointer-events-none" />
              </div>

            {/* Thumbnail Gallery */}
            <div className="grid grid-cols-5 gap-2">
              {allImages.slice(0, 5).map((img, i) => (
                <button
                  key={i}
                  onClick={() => setSelectedImage(img)}
                  className={`aspect-video rounded overflow-hidden border-2 transition-all duration-200 ${
                    selectedImage === img
                      ? 'border-[var(--accent)] shadow-[0_0_10px_var(--accent-glow)]'
                      : 'border-[var(--border-primary)] hover:border-[var(--accent)] opacity-70 hover:opacity-100'
                  }`}
                >
                  <img src={img} alt={`Screenshot ${i + 1}`} className="w-full h-full object-cover" />
                </button>
              ))}
              {/* Fill empty slots with placeholder */}
              {allImages.length < 5 && [...Array(5 - allImages.length)].map((_, i) => (
                <div key={`placeholder-${i}`} className="aspect-video rounded border-2 border-[var(--border-primary)] flex items-center justify-center" style={{ background: 'linear-gradient(to bottom right, var(--card-fallback-from), var(--card-fallback-to))' }}>
                  <span className="text-lg opacity-30">🎮</span>
                </div>
              ))}
            </div>
            </div>
          </div>

          {/* ===== RIGHT COLUMN — Product Info ===== */}
          <div className="bg-[var(--bg-card)] p-6 md:p-8 flex flex-col">
            {/* Genre Badge */}
            <span className="text-[11px] font-semibold text-[var(--accent)] tracking-wider uppercase mb-3">
              {game.genre?.name || 'GAME'}
            </span>

            {/* Title — Pixel font, purple-pink glow */}
            <h1 className="font-pixel text-lg md:text-xl lg:text-2xl leading-relaxed mb-4 tracking-wider">
              <span className="text-transparent bg-clip-text" style={{ backgroundImage: 'linear-gradient(to right, var(--logo-from), var(--logo-to))' }}>
                {game.title.toUpperCase()}
              </span>
            </h1>

            {/* Description — Sans-serif */}
            <p className="text-sm text-[var(--text-secondary)] leading-relaxed mb-6">
              {game.description
                ? game.description.substring(0, 250) + (game.description.length > 250 ? '...' : '')
                : 'Experience this incredible game. A masterpiece of the genre, crafted with modern technology and a captivating atmosphere.'}
            </p>

            {/* Metadata */}
            <div className="border-t border-b border-[var(--border-primary)] py-2 mb-6 space-y-0.5">
              <MetaRow icon={<Gamepad2 className="w-4 h-4" />} label="Category" value={game.genre?.name?.toUpperCase() || 'GAME'} />
              <MetaRow icon={<Monitor className="w-4 h-4" />} label="Platform" value={game.platforms?.join(', ') || 'PC, CONSOLE'} />
              <MetaRow icon={<Building2 className="w-4 h-4" />} label="Developer" value={game.developers?.join(', ') || 'Unknown'} />
              <MetaRow icon={<Calendar className="w-4 h-4" />} label="Release Date" value={game.released ? new Date(game.released).toLocaleDateString('en-US', { month: 'long', year: 'numeric' }) : 'TBA'} />
            </div>

            {/* Rating */}
            <div className="mb-6">
              <PixelRating rating={game.rating} />
            </div>

            {/* Price */}
            <div className="mb-6">
              <span className="text-3xl font-bold text-[var(--neon-green)]">
                ${game.price.toFixed(2)}
              </span>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col gap-3 mb-6">
              {/* ADD TO CART — massive purple button */}
              <button
                onClick={() => addToCart(game)}
                className="w-full py-4 flex items-center justify-center gap-3 text-sm font-bold uppercase tracking-wider bg-[var(--btn-primary-bg)] text-[var(--btn-primary-text)] rounded-md border-2 border-[var(--accent-hover)] hover:-translate-y-0.5 active:translate-y-0.5 transition-all duration-200"
                style={{ boxShadow: '4px 4px 0 0 var(--card-shadow), 0 0 15px var(--accent-glow)' }}
              >
                <ShoppingCart className="w-5 h-5" />
                ADD TO CART
              </button>

              {/* ADD TO WISH LIST — secondary dark button */}
              <button
                onClick={() => setIsWishlisted(!isWishlisted)}
                className={`w-full py-3 flex items-center justify-center gap-3 text-sm font-semibold uppercase tracking-wide rounded-md border border-[var(--border-primary)] transition-all duration-200 ${
                  isWishlisted
                    ? 'bg-[var(--accent-subtle)] text-[var(--accent)] border-[var(--accent)]'
                    : 'bg-[var(--bg-tertiary)] text-[var(--accent)] hover:border-[var(--accent)] hover:bg-[var(--accent-subtle)]'
                }`}
              >
                <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-[var(--accent)]' : ''}`} />
                {isWishlisted ? 'WISHLISTED ✓' : 'ADD TO WISH LIST'}
              </button>
            </div>

            {/* Pixel collectibles — dark pill */}
            <div className="flex items-center gap-3 mt-auto pt-4 border-t border-[var(--border-primary)]">
              <span className="text-[10px] font-semibold text-[var(--text-muted)] uppercase tracking-wider">Collect</span>
              <div
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full"
                style={{ background: 'rgba(68,71,90,0.6)', border: '1px solid rgba(189,147,249,0.25)' }}
              >
                <span className="text-base leading-none" title="Achievement">🏆</span>
                <span className="text-base leading-none" title="Gem">💎</span>
                <span className="text-base leading-none" title="Star">⭐</span>
                <span className="text-base leading-none" title="Shield">🛡️</span>
                <span className="text-base leading-none" title="Sword">⚔️</span>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* ===== Tabs Section ===== */}
      <div className="mt-10">
        {/* Tab headers */}
        <div className="flex border-b border-[var(--border-primary)] mb-6 gap-0">
          {TABS.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-3 text-sm font-medium tracking-wide transition-all duration-200 border-b-2 ${
                activeTab === tab
                  ? 'text-[var(--accent)] border-[var(--accent)]'
                  : 'text-[var(--text-muted)] border-transparent hover:text-[var(--text-secondary)] hover:border-[var(--accent)]'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Tab content */}
        <div className="bg-[var(--bg-card)] border border-[var(--border-primary)] rounded-lg p-6 md:p-8">
          <TabContent tab={activeTab} game={game} />
        </div>
      </div>
    </div>
  );
};
