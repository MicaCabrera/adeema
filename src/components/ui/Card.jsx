export default function Card({ children, className = '', hover = true, glass = false }) {
  const base = 'rounded-2xl border transition-all duration-300';
  const glassStyle = glass
    ? 'bg-white/5 border-white/10 backdrop-blur-sm'
    : 'bg-surface border-primary-900/40';
  const hoverStyle = hover ? 'card-hover hover:border-primary-500/50' : '';

  return (
    <div className={`${base} ${glassStyle} ${hoverStyle} ${className}`}>
      {children}
    </div>
  );
}
