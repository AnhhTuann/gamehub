import Link from 'next/link';

export function CategoryCard({ category, image }) {
  return (
    <Link href={`/products?category=${category.toLowerCase()}`} className="card-hover" style={{
      height: '200px',
      borderRadius: 'var(--radius-md)',
      background: `linear-gradient(to top, rgba(0,0,0,0.7), transparent), url("${image || `https://source.unsplash.com/random/400x400/?fashion,${category}`}")`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      display: 'flex',
      alignItems: 'flex-end',
      padding: 'var(--spacing-md)',
      color: 'white',
      overflow: 'hidden'
    }}>
      <h3 style={{ color: 'white', fontSize: '1.5rem', margin: 0 }}>{category}</h3>
    </Link>
  );
}
