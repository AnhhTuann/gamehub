import Link from 'next/link';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';

export function ProductCard({ product }) {
  return (
    <Link href={`/products/${product.id}`} style={{ display: 'block' }}>
      <Card hoverable style={{ overflow: 'hidden' }}>
        <div style={{ height: '300px', backgroundColor: '#f1f5f9', position: 'relative' }}>
          <img 
            src={product.image || product.img || `https://source.unsplash.com/random/400x500/?clothing,${product.id}`} 
            alt={product.name || product.title} 
            style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
          />
          {product.isNew && (
            <div style={{ position: 'absolute', top: '10px', right: '10px', background: 'white', padding: '4px 8px', borderRadius: 'var(--radius-sm)', fontSize: '0.8rem', fontWeight: 'bold', color: 'black' }}>
              NEW
            </div>
          )}
        </div>
        <div style={{ padding: 'var(--spacing-md)' }}>
          <h3 style={{ fontSize: '1.1rem', marginBottom: '0.25rem', color: 'var(--text-primary)' }}>{product.name || product.title}</h3>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: 'var(--spacing-sm)' }}>{product.category}</p>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontWeight: 'bold', fontSize: '1.2rem', color: 'var(--text-primary)' }}>${product.price}</span>
            <Button onClick={(e) => { e.preventDefault(); /* Add to cart */ }} style={{ padding: '0.4rem 0.8rem', fontSize: '0.9rem' }}>
              Add
            </Button>
          </div>
        </div>
      </Card>
    </Link>
  );
}
