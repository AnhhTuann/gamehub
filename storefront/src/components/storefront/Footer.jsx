import Link from 'next/link';

export function Footer() {
  return (
    <footer className="w-full border-t border-border bg-background/50 mt-16 py-12">
      <div className="container grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className="col-span-1 md:col-span-1">
          <h2 className="text-xl font-heading font-bold mb-4">OmniWear</h2>
          <p className="text-muted-foreground text-sm">
            Elevating your style with premium quality, modern design, and cinematic aesthetics.
          </p>
        </div>
        <div>
          <h3 className="font-bold mb-4">Shop</h3>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li><Link href="/products?category=Men" className="hover:text-primary transition-colors">Men's Collection</Link></li>
            <li><Link href="/products?category=Women" className="hover:text-primary transition-colors">Women's Collection</Link></li>
            <li><Link href="/products?category=Accessories" className="hover:text-primary transition-colors">Accessories</Link></li>
            <li><Link href="/products?category=Shoes" className="hover:text-primary transition-colors">Shoes</Link></li>
          </ul>
        </div>
        <div>
          <h3 className="font-bold mb-4">Company</h3>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li><Link href="/about" className="hover:text-primary transition-colors">About Us</Link></li>
            <li><Link href="/contact" className="hover:text-primary transition-colors">Contact</Link></li>
            <li><Link href="/careers" className="hover:text-primary transition-colors">Careers</Link></li>
          </ul>
        </div>
        <div>
          <h3 className="font-bold mb-4">Legal</h3>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li><Link href="/privacy" className="hover:text-primary transition-colors">Privacy Policy</Link></li>
            <li><Link href="/terms" className="hover:text-primary transition-colors">Terms of Service</Link></li>
          </ul>
        </div>
      </div>
      <div className="container mt-12 pt-8 border-t border-border text-center text-sm text-muted-foreground">
        &copy; {new Date().getFullYear()} OmniWear. All rights reserved.
      </div>
    </footer>
  );
}
