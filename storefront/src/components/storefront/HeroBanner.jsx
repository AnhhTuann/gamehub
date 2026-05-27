import Link from 'next/link';

export function HeroBanner({ title, subtitle, primaryAction, secondaryAction, backgroundImage }) {
  return (
    <section className="relative h-[60vh] min-h-[500px] w-full rounded-2xl overflow-hidden flex items-center p-12 md:p-24 group">
      {/* Background Image with Overlay and Vignette */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center transition-transform duration-1000 group-hover:scale-105"
        style={{ backgroundImage: `url("${backgroundImage || 'https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?auto=format&fit=crop&q=80'}")` }}
      />
      <div className="absolute inset-0 z-0 bg-gradient-to-r from-black/90 to-black/30" />
      <div className="absolute inset-0 z-0 shadow-[inset_0_0_120px_rgba(0,0,0,0.8)] pointer-events-none" />
      
      {/* Content */}
      <div className="relative z-10 max-w-3xl text-white">
        <h1 className="text-5xl md:text-6xl font-bold font-sans mb-6 tracking-tight leading-tight">
          {title}
        </h1>
        <p className="text-lg md:text-xl text-white/90 mb-10 max-w-2xl leading-relaxed">
          {subtitle}
        </p>
        <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
          {primaryAction && (
            <Link href={primaryAction.href} className="flex-1 sm:flex-none text-center px-10 py-4 text-base font-medium bg-primary text-primary-foreground rounded-full hover:bg-primary/90 transition-all shadow-lg shadow-primary/30 hover:shadow-primary/50 hover:-translate-y-1">
              {primaryAction.label}
            </Link>
          )}
          {secondaryAction && (
            <Link href={secondaryAction.href} className="flex-1 sm:flex-none text-center px-10 py-4 text-base font-medium bg-white text-black rounded-full hover:bg-gray-100 transition-all shadow-lg hover:shadow-xl hover:-translate-y-1">
              {secondaryAction.label}
            </Link>
          )}
        </div>
      </div>
    </section>
  );
}
