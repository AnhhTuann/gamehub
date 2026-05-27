import Link from 'next/link';

export default function StorefrontLayout({ children }) {
  return (
    <>
      <header className="navbar glass">
        <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', height: '100%' }}>
          <div className="logo" style={{ fontSize: '1.5rem', fontWeight: 'bold', fontFamily: 'var(--font-heading)' }}>
            <Link href="/">OmniWear</Link>
          </div>
          <nav style={{ display: 'flex', gap: 'var(--spacing-lg)' }}>
            <Link href="/products" className="nav-link">Shop</Link>
            <Link href="/cart" className="nav-link">Cart</Link>
            <Link href="/login" className="nav-link">Login</Link>
          </nav>
        </div>
      </header>
      <main className="container" style={{ paddingTop: '80px', minHeight: 'calc(100vh - 80px)' }}>
        {children}
      </main>
      <footer style={{ padding: 'var(--spacing-xl) 0', borderTop: '1px solid var(--border)', marginTop: 'var(--spacing-xl)', textAlign: 'center', color: 'var(--text-secondary)' }}>
        <p>&copy; {new Date().getFullYear()} OmniWear. All rights reserved.</p>
      </footer>
    </>
  );
}
