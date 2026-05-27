import Link from 'next/link';

export function HeroBanner({ title, subtitle, primaryAction, secondaryAction, backgroundImage }) {
  return (
    <section style={{ 
      position: 'relative', 
      height: '60vh', 
      minHeight: '500px',
      borderRadius: 'var(--radius-lg)', 
      overflow: 'hidden',
      display: 'flex',
      alignItems: 'center',
      padding: 'var(--spacing-xl)',
      background: `linear-gradient(to right, rgba(0,0,0,0.8), rgba(0,0,0,0.2)), url("${backgroundImage || 'https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?auto=format&fit=crop&q=80'}")`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      color: 'white'
    }}>
      <div style={{ maxWidth: '600px', zIndex: 1 }}>
        <h1 style={{ fontSize: '3.5rem', marginBottom: 'var(--spacing-sm)', color: 'white' }}>
          {title}
        </h1>
        <p style={{ fontSize: '1.25rem', marginBottom: 'var(--spacing-lg)', opacity: 0.9 }}>
          {subtitle}
        </p>
        <div style={{ display: 'flex', gap: 'var(--spacing-md)' }}>
          {primaryAction && (
            <Link href={primaryAction.href} className="btn btn-primary" style={{ padding: '0.75rem 2rem', fontSize: '1.1rem' }}>
              {primaryAction.label}
            </Link>
          )}
          {secondaryAction && (
            <Link href={secondaryAction.href} className="btn btn-secondary glass" style={{ padding: '0.75rem 2rem', fontSize: '1.1rem', color: 'white', border: '1px solid rgba(255,255,255,0.3)' }}>
              {secondaryAction.label}
            </Link>
          )}
        </div>
      </div>
    </section>
  );
}
