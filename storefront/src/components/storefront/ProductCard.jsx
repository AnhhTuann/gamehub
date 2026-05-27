import Link from 'next/link';

export function ProductCard({ product }) {
  return (
    <Link href={`/products/${product.id}`} className="group block h-full">
      <div className="h-full rounded-2xl overflow-hidden border border-border bg-card/90 backdrop-blur-sm shadow-lg hover:shadow-[0_20px_50px_rgba(0,0,0,0.5)] hover:border-primary/50 transition-all duration-500 hover:-translate-y-2 flex flex-col">
        {/* Image Container with 1:1 aspect ratio */}
        <div className="relative aspect-square bg-muted overflow-hidden flex-shrink-0">
          <img 
            src={product.image || product.img || `https://source.unsplash.com/random/500x500/?clothing,${product.id}`} 
            alt={product.name || product.title} 
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
          {/* Overlay and Vignette for cinematic mood */}
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
          <div className="absolute inset-0 z-0 shadow-[inset_0_0_40px_rgba(0,0,0,0.4)] pointer-events-none" />
          
          {product.isNew && (
            <div className="absolute top-4 right-4 bg-white text-black px-3 py-1.5 text-xs font-bold rounded-sm uppercase tracking-wider shadow-md">
              New
            </div>
          )}
        </div>
        
        {/* Content Container */}
        <div className="p-6 flex flex-col flex-1 gap-4">
          <div className="flex flex-col gap-1">
            <h3 className="font-sans font-semibold text-lg leading-snug text-foreground group-hover:text-primary transition-colors">
              {product.name || product.title}
            </h3>
            <p className="text-muted-foreground text-xs font-bold uppercase tracking-wider mt-1">{product.category}</p>
          </div>
          
          <div className="mt-auto pt-4 border-t border-border/50 flex justify-between items-center">
            <span className="font-bold text-xl text-foreground whitespace-nowrap">
              ${product.price}
            </span>
            <button 
              onClick={(e) => { e.preventDefault(); /* Add to cart */ }}
              className="opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 bg-primary text-primary-foreground text-sm font-bold rounded-full px-5 py-2.5 hover:scale-105 transition-all duration-300 shadow-lg"
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
}
