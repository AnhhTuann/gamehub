import { Card } from '../ui/Card';

export function ChartMock({ title, data, labels }) {
  return (
    <Card style={{ padding: 'var(--spacing-lg)' }}>
      <h3 style={{ marginBottom: 'var(--spacing-lg)' }}>{title}</h3>
      <div style={{ height: '300px', display: 'flex', alignItems: 'flex-end', gap: '10px' }}>
        {data.map((h, i) => (
          <div key={i} style={{ flex: 1, backgroundColor: 'var(--primary)', height: `${h}%`, borderRadius: '4px 4px 0 0', opacity: 0.8 }} />
        ))}
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 'var(--spacing-md)', color: 'var(--text-secondary)' }}>
        {labels.map((label, i) => (
          <span key={i}>{label}</span>
        ))}
      </div>
    </Card>
  );
}
