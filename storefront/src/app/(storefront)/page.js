'use client';

import Link from 'next/link';

export default function Home() {
  return (
    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-xl)' }}>
      {/* Hero Section */}
      <section style={{ 
        position: 'relative', 
        height: '60vh', 
        minHeight: '500px',
        borderRadius: 'var(--radius-lg)', 
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
        padding: 'var(--spacing-xl)',
        background: 'linear-gradient(to right, rgba(0,0,0,0.8), rgba(0,0,0,0.2)), url("https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?auto=format&fit=crop&q=80")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        color: 'white'
      }}>
        <div style={{ maxWidth: '600px', zIndex: 1 }}>
          <h1 style={{ fontSize: '3.5rem', marginBottom: 'var(--spacing-sm)', color: 'white' }}>
            Elevate Your <span style={{ color: 'var(--primary)' }}>Style</span>
          </h1>
          <p style={{ fontSize: '1.25rem', marginBottom: 'var(--spacing-lg)', opacity: 0.9 }}>
            Discover the latest trends in fashion. Premium quality, modern design, exclusively for you.
          </p>
          <div style={{ display: 'flex', gap: 'var(--spacing-md)' }}>
            <Link href="/products" className="btn btn-primary" style={{ padding: '0.75rem 2rem', fontSize: '1.1rem' }}>
              Shop Collection
            </Link>
            <Link href="/products?sale=true" className="btn btn-secondary glass" style={{ padding: '0.75rem 2rem', fontSize: '1.1rem', color: 'white', border: '1px solid rgba(255,255,255,0.3)' }}>
              Flash Sale
            </Link>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 'var(--spacing-lg)' }}>
          <h2 style={{ fontSize: '2rem' }}>Featured Categories</h2>
          <Link href="/categories" style={{ color: 'var(--primary)', fontWeight: 500 }}>View All</Link>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: 'var(--spacing-md)' }}>
          {['Men', 'Women', 'Accessories', 'Shoes'].map((cat, i) => (
            <Link href={`/products?category=${cat.toLowerCase()}`} key={cat} style={{
              height: '200px',
              borderRadius: 'var(--radius-md)',
              background: `linear-gradient(to top, rgba(0,0,0,0.7), transparent), url("https://source.unsplash.com/random/400x400/?fashion,${cat}")`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              display: 'flex',
              alignItems: 'flex-end',
              padding: 'var(--spacing-md)',
              color: 'white',
              transition: 'var(--transition)',
              overflow: 'hidden'
            }}
            onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.02)'}
            onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
            >
              <h3 style={{ color: 'white', fontSize: '1.5rem' }}>{cat}</h3>
            </Link>
          ))}
        </div>
      </section>

      {/* Best Sellers */}
      <section>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 'var(--spacing-lg)' }}>
          <h2 style={{ fontSize: '2rem' }}>Best Sellers</h2>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 'var(--spacing-lg)' }}>
          {/* Mock Product Cards */}
          {[1, 2, 3, 4].map((item) => (
            <div key={item} style={{ 
              borderRadius: 'var(--radius-md)', 
              overflow: 'hidden',
              boxShadow: 'var(--shadow-sm)',
              backgroundColor: 'var(--bg-color)',
              border: '1px solid var(--border)',
              transition: 'var(--transition)'
            }}
            onMouseOver={(e) => e.currentTarget.style.boxShadow = 'var(--shadow-lg)'}
            onMouseOut={(e) => e.currentTarget.style.boxShadow = 'var(--shadow-sm)'}
            >
              <div style={{ height: '300px', backgroundColor: '#f1f5f9', position: 'relative' }}>
                <img src={`https://source.unsplash.com/random/400x500/?clothing,${item}`} alt="Product" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                <div style={{ position: 'absolute', top: '10px', right: '10px', background: 'white', padding: '4px 8px', borderRadius: 'var(--radius-sm)', fontSize: '0.8rem', fontWeight: 'bold' }}>NEW</div>
              </div>
              <div style={{ padding: 'var(--spacing-md)' }}>
                <h3 style={{ fontSize: '1.1rem', marginBottom: '0.25rem' }}>Premium Cotton T-Shirt {item}</h3>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: 'var(--spacing-sm)' }}>Urban Collection</p>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontWeight: 'bold', fontSize: '1.2rem' }}>$49.99</span>
                  <button className="btn btn-primary" style={{ padding: '0.5rem 1rem' }}>Add</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
