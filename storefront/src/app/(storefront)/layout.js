import { Navbar } from '../../components/storefront/Navbar';
import { Footer } from '../../components/storefront/Footer';

export default function StorefrontLayout({ children }) {
  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground dark">
      <Navbar />
      <main className="flex-1 pt-32">
        {children}
      </main>
      <Footer />
    </div>
  );
}
