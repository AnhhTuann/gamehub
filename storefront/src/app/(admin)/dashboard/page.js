'use client';

import { StatCard } from '../../../components/admin/StatCard';
import { ChartMock } from '../../../components/admin/ChartMock';
import { Card } from '../../../components/ui/Card';

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
          <StatCard key={stat.label} {...stat} />
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 'var(--spacing-lg)' }}>
        <ChartMock 
          title="Revenue Overview" 
          data={[40, 60, 45, 80, 65, 90, 75]} 
          labels={['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']} 
        />

        <Card style={{ padding: 'var(--spacing-lg)' }}>
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
        </Card>
      </div>
    </div>
  );
}
