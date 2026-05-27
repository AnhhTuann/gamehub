import { Navbar } from '../../components/storefront/Navbar';

export default function StorefrontLayout({ children }) {
  return (
    <>
      <Navbar />
      <main className="container" style={{ paddingTop: '80px', minHeight: 'calc(100vh - 80px)' }}>
        {children}
      </main>
      <footer style={{ padding: 'var(--spacing-xl) 0', borderTop: '1px solid var(--border)', marginTop: 'var(--spacing-xl)', textAlign: 'center', color: 'var(--text-secondary)' }}>
        <p>&copy; {new Date().getFullYear()} OmniWear. All rights reserved.</p>
      </footer>
    </>
  );
}
