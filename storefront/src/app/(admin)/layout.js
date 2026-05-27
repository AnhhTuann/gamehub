import { Sidebar } from '../../components/admin/Sidebar';

export default function AdminLayout({ children }) {
  return (
    <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: '#f1f5f9' }}>
      <Sidebar />
      <main style={{ flex: 1, marginLeft: '260px', padding: 'var(--spacing-xl)' }}>
        {children}
      </main>
    </div>
  );
}
