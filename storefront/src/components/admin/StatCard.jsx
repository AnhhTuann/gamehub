import { Card } from '../ui/Card';

export function StatCard({ label, value, trend }) {
  const isPositive = trend.startsWith('+');
  
  return (
    <Card style={{ padding: 'var(--spacing-lg)' }}>
      <h3 style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: 'var(--spacing-sm)' }}>
        {label}
      </h3>
      <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between' }}>
        <span style={{ fontSize: '2rem', fontWeight: 'bold', fontFamily: 'var(--font-heading)' }}>
          {value}
        </span>
        <span style={{ 
          color: isPositive ? '#10b981' : '#ef4444', 
          fontWeight: '500',
          backgroundColor: isPositive ? '#d1fae5' : '#fee2e2',
          padding: '2px 8px',
          borderRadius: 'var(--radius-full)',
          fontSize: '0.85rem'
        }}>
          {trend}
        </span>
      </div>
    </Card>
  );
}
