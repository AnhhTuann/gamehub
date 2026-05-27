'use client';

export default function AdminDashboard() {
  const stats = [
    { label: 'Total Revenue', value: '$24,590.00', trend: '+12.5%' },
    { label: 'Orders', value: '356', trend: '+5.2%' },
    { label: 'Customers', value: '1,245', trend: '+18.1%' },
    { label: 'Avg Order Value', value: '$69.07', trend: '-2.4%' }
  ];

  return (
    <div className="animate-fade-in">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--spacing-xl)' }}>
        <h1 style={{ fontSize: '2rem' }}>Dashboard Overview</h1>
        <div style={{ color: 'var(--text-secondary)' }}>May 27, 2026</div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 'var(--spacing-lg)', marginBottom: 'var(--spacing-xl)' }}>
        {stats.map(stat => (
          <div key={stat.label} style={{ 
            backgroundColor: 'white', 
            padding: 'var(--spacing-lg)', 
            borderRadius: 'var(--radius-lg)',
            boxShadow: 'var(--shadow-sm)',
            border: '1px solid var(--border)'
          }}>
            <h3 style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: 'var(--spacing-sm)' }}>{stat.label}</h3>
            <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between' }}>
              <span style={{ fontSize: '2rem', fontWeight: 'bold', fontFamily: 'var(--font-heading)' }}>{stat.value}</span>
              <span style={{ 
                color: stat.trend.startsWith('+') ? '#10b981' : '#ef4444', 
                fontWeight: '500',
                backgroundColor: stat.trend.startsWith('+') ? '#d1fae5' : '#fee2e2',
                padding: '2px 8px',
                borderRadius: 'var(--radius-full)',
                fontSize: '0.85rem'
              }}>
                {stat.trend}
              </span>
            </div>
          </div>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 'var(--spacing-lg)' }}>
        {/* Revenue Chart Mock */}
        <div style={{ backgroundColor: 'white', padding: 'var(--spacing-lg)', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border)' }}>
          <h3 style={{ marginBottom: 'var(--spacing-lg)' }}>Revenue Overview</h3>
          <div style={{ height: '300px', display: 'flex', alignItems: 'flex-end', gap: '10px' }}>
            {[40, 60, 45, 80, 65, 90, 75].map((h, i) => (
              <div key={i} style={{ flex: 1, backgroundColor: 'var(--primary)', height: `${h}%`, borderRadius: '4px 4px 0 0', opacity: 0.8 }} />
            ))}
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 'var(--spacing-md)', color: 'var(--text-secondary)' }}>
            <span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span><span>Sun</span>
          </div>
        </div>

        {/* Recent Orders Mock */}
        <div style={{ backgroundColor: 'white', padding: 'var(--spacing-lg)', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border)' }}>
          <h3 style={{ marginBottom: 'var(--spacing-lg)' }}>Recent Orders</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-md)' }}>
            {[1, 2, 3, 4, 5].map((order) => (
              <div key={order} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: 'var(--spacing-md)', borderBottom: '1px solid var(--border)' }}>
                <div>
                  <p style={{ fontWeight: '500' }}>Order #{1020 + order}</p>
                  <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>2 items</p>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <p style={{ fontWeight: 'bold' }}>${(order * 15.5 + 20).toFixed(2)}</p>
                  <p style={{ fontSize: '0.8rem', color: '#f59e0b' }}>Processing</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
