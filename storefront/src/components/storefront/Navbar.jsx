import Link from 'next/link';

export function Navbar() {
  return (
    <header className="fixed top-0 left-0 w-full h-16 z-50 glass cinematic-shadow">
      <div className="container h-full flex justify-between items-center">
        <div className="text-2xl font-bold font-heading tracking-tight">
          <Link href="/">OmniWear</Link>
        </div>
        <nav className="flex gap-8 items-center">
          <Link href="/products" className="text-sm font-medium hover:text-primary transition-colors relative group">
            Shop
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all group-hover:w-full"></span>
          </Link>
          <Link href="/cart" className="text-sm font-medium hover:text-primary transition-colors relative group">
            Cart
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all group-hover:w-full"></span>
          </Link>
          <Link href="/login" className="px-5 py-2 text-sm font-medium bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors shadow-lg shadow-primary/20 hover:shadow-primary/40 hover:-translate-y-0.5">
            Login
          </Link>
        </nav>
      </div>
    </header>
  );
}
