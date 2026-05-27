'use client';

import Link from 'next/link';

export function Sidebar() {
  const menuItems = [
    { name: 'Dashboard', path: '/dashboard' },
    { name: 'Products', path: '/dashboard/products' },
    { name: 'Orders', path: '/dashboard/orders' },
    { name: 'Customers', path: '/dashboard/users' },
    { name: 'Coupons', path: '/dashboard/coupons' }
  ];

  return (
    <aside style={{
      width: '260px',
      backgroundColor: '#0f172a',
      color: 'white',
      display: 'flex',
      flexDirection: 'column',
      position: 'fixed',
      height: '100vh'
    }}>
      <div style={{ padding: 'var(--spacing-xl) var(--spacing-lg)', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
        <h2 style={{ fontSize: '1.5rem', fontFamily: 'var(--font-heading)', color: 'white' }}>OmniWear Admin</h2>
      </div>
      <nav style={{ display: 'flex', flexDirection: 'column', padding: 'var(--spacing-md) 0', flex: 1 }}>
        {menuItems.map(item => (
          <Link 
            key={item.name} 
            href={item.path}
            style={{
              padding: 'var(--spacing-md) var(--spacing-lg)',
              display: 'flex',
              alignItems: 'center',
              color: '#cbd5e1',
              transition: 'var(--transition)',
              borderLeft: '3px solid transparent'
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.05)';
              e.currentTarget.style.color = 'white';
              e.currentTarget.style.borderLeftColor = 'var(--primary)';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.backgroundColor = 'transparent';
              e.currentTarget.style.color = '#cbd5e1';
              e.currentTarget.style.borderLeftColor = 'transparent';
            }}
          >
            {item.name}
          </Link>
        ))}
      </nav>
      <div style={{ padding: 'var(--spacing-lg)', borderTop: '1px solid rgba(255,255,255,0.1)' }}>
        <button style={{ 
          width: '100%', 
          padding: '0.75rem', 
          background: 'rgba(255,255,255,0.1)', 
          border: 'none', 
          color: 'white',
          borderRadius: 'var(--radius-sm)',
          cursor: 'pointer'
        }}>Logout</button>
      </div>
    </aside>
  );
}
