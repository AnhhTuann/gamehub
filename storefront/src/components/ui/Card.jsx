export function Card({ children, className = '', hoverable = false, ...props }) {
  let styles = {
    backgroundColor: 'white',
    borderRadius: 'var(--radius-lg)',
    boxShadow: 'var(--shadow-sm)',
    border: '1px solid var(--border)',
  };

  const finalClassName = ` ${className} ${hoverable ? 'card-hover' : ''}`.trim();

  return (
    <div className={finalClassName} style={styles} {...props}>
      {children}
    </div>
  );
}
