import Link from 'next/link';

export function CategoryCard({ category, label }) {
  const images = {
    'Men': 'https://images.unsplash.com/photo-1516257984-b1b4d707412e?auto=format&fit=crop&q=80',
    'Women': 'https://images.unsplash.com/photo-1532453288672-3a27e9be9efd?auto=format&fit=crop&q=80',
    'Accessories': 'https://images.unsplash.com/photo-1523206489230-c012c64b2b48?auto=format&fit=crop&q=80',
    'Shoes': 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&q=80',
  };

  const image = images[category] || images['Men'];

  return (
    <Link href={`/products?category=${category}`} className="group block overflow-hidden rounded-2xl aspect-[3/4] relative cinematic-shadow">
      <img 
        src={image} 
        alt={label || category} 
        className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent group-hover:from-black/100 transition-colors duration-500" />
      <div className="absolute inset-0 z-0 shadow-[inset_0_0_50px_rgba(0,0,0,0.5)] pointer-events-none" />

      <div className="absolute bottom-8 left-8 right-8 text-white z-10">
        <h3 className="text-2xl font-bold font-sans tracking-wide mb-2 drop-shadow-md">{label || category}</h3>
        <span className="inline-block text-sm font-medium opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 text-primary drop-shadow-md">
          Shop Collection &rarr;
        </span>
      </div>
    </Link>
  );
}
